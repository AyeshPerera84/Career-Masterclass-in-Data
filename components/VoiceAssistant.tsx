
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { Module } from '../types';

interface VoiceAssistantProps {
  module: Module;
  onClose: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ module, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Audio utility functions as per coding guidelines
  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  const stopSession = () => {
    if (sessionRef.current) {
      // session.close is not strictly defined in types but recommended
      try { sessionRef.current.close(); } catch(e) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsActive(false);
  };

  const startSession = async () => {
    try {
      setError(null);
      setIsActive(true);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current.values()) {
                source.stop();
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: (e) => {
            console.error('Live session error:', e);
            setError("Connection lost. Please try again.");
            stopSession();
          },
          onclose: () => {
            setIsActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `You are a world-class Data Analyst tutor. 
          The student is currently stuck on the module: "${module.title}". 
          Module Description: "${module.description}".
          Module Content Context: "${module.content}".
          Be helpful, encouraging, and explain complex concepts simply. 
          Only answer questions related to data analysis and the current course. 
          Keep your verbal responses concise and conversational.`
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setError("Microphone access denied or connection failed.");
      setIsActive(false);
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="p-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive ? 'bg-blue-600 scale-110 shadow-[0_0_40px_rgba(37,99,235,0.4)]' : 'bg-slate-800'
              }`}>
                <i className={`fas ${isActive ? (isSpeaking ? 'fa-volume-up' : 'fa-microphone') : 'fa-microphone-slash'} text-3xl text-white`}></i>
              </div>
              {isActive && (
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"></div>
              )}
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            {isActive ? "Tutor is Listening..." : "Need Help with this Module?"}
          </h2>
          <p className="text-sm text-slate-400 mb-8 max-w-xs mx-auto">
            {isActive 
              ? "Ask anything about SQL, Excel, or Python for this unit. I'm here to help you unstick!" 
              : `Start a voice conversation to ask questions about "${module.title}".`}
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            {!isActive ? (
              <button 
                onClick={startSession}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-3"
              >
                <i className="fas fa-play text-xs"></i>
                Start Voice Session
              </button>
            ) : (
              <button 
                onClick={stopSession}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
              >
                <i className="fas fa-stop text-xs"></i>
                End Conversation
              </button>
            )}
            <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mt-2">
              Powered by Gemini Live API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
