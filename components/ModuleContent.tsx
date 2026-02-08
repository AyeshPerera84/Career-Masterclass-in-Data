
import React, { useState, useEffect } from 'react';
import { Module, UserState } from '../types';
import { getTutorFeedback, generateSQLChallenge } from '../services/geminiService';
import VoiceAssistant from './VoiceAssistant';

interface ModuleContentProps {
  module: Module;
  onComplete: (points: number) => void;
  onToggle: (shouldComplete: boolean) => void;
  isCompleted: boolean;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module, onComplete, onToggle, isCompleted }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiChallenge, setAiChallenge] = useState<string | null>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setShowExplanation(false);
    setFeedback(null);
    setAiChallenge(null);
    setIsVoiceOpen(false);
  }, [module]);

  const handleQuizSubmit = async () => {
    if (selectedOption === null) return;
    
    setLoading(true);
    const isCorrect = selectedOption === module.quiz?.correctAnswer;
    
    if (isCorrect) {
      setShowExplanation(true);
      if (!isCompleted) {
        onComplete(module.points);
      }
    }

    const tutorMsg = await getTutorFeedback(
      module.quiz?.question || "",
      module.quiz?.options[selectedOption] || "",
      module.content
    );
    setFeedback(tutorMsg);
    setLoading(false);
  };

  const handleGetChallenge = async () => {
    setLoading(true);
    const challenge = await generateSQLChallenge(module.title);
    setAiChallenge(challenge);
    setLoading(false);
  };

  const getSecondsFromTimestamp = (timestamp?: string) => {
    if (!timestamp) return 0;
    const parts = timestamp.split(':').map(p => parseInt(p, 10));
    
    if (parts.length === 3) {
      return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
    }
    if (parts.length === 2) {
      return (parts[0] * 60) + parts[1];
    }
    if (parts.length === 1) {
      return parts[0];
    }
    return 0;
  };

  const videoId = "PSNXoAs2FtQ";
  const startSeconds = getSecondsFromTimestamp(module.videoTimestamp);
  
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=0&rel=0&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 animate-fade-in pb-20">
      {isVoiceOpen && <VoiceAssistant module={module} onClose={() => setIsVoiceOpen(false)} />}

      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-4 text-sm uppercase tracking-widest">
        <i className="fas fa-graduation-cap"></i>
        Unit: {module.section}
      </div>
      
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">{module.title}</h1>
        {isCompleted && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-2 border border-green-200 dark:border-green-800/50 shadow-sm shrink-0">
            <i className="fas fa-check-circle"></i>
            Mastered
          </div>
        )}
      </div>

      <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 dark:shadow-blue-500/5 mb-8 border-4 border-white dark:border-slate-800 transition-all duration-300 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 mb-8 transition-colors duration-300">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Lesson Context</h3>
            <button 
              onClick={() => setIsVoiceOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/20"
            >
              <i className="fas fa-microphone"></i>
              Ask Voice Tutor
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed whitespace-pre-wrap mb-6">
            {module.content || module.description}
          </p>
        </div>

        {module.videoTimestamp && (
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
             <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Fast-Forward Link:</span>
             <a 
              href={`https://www.youtube.com/watch?v=${videoId}&t=${startSeconds}s`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/20 group"
            >
              <i className="fab fa-youtube transition-transform group-hover:scale-110"></i>
              Open YouTube at {module.videoTimestamp}
            </a>
          </div>
        )}
      </div>

      {isCompleted && module.caseStudy && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 rounded-2xl p-8 text-white mb-8 shadow-xl shadow-emerald-500/20 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-xl shrink-0">
              <i className="fas fa-external-link-alt text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Real-World Resource Unlocked!</h3>
              <p className="text-emerald-50 mb-6 text-sm leading-relaxed max-w-lg">
                Nice work. Deepen your understanding with this official resource.
              </p>
              <a 
                href={module.caseStudy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all shadow-lg"
              >
                {module.caseStudy.title}
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Manual Completion Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 mb-12 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
              <i className={`fas ${isCompleted ? 'fa-check-circle text-green-500' : 'fa-question-circle text-blue-500'}`}></i>
              Completed this section?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isCompleted ? "You've marked this as finished. Great job!" : `Mark it off to earn ${module.points} Mastery XP.`}
            </p>
          </div>
          
          <div className="flex items-center gap-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => onToggle(true)}
              className={`flex-1 md:w-28 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isCompleted 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {isCompleted && <i className="fas fa-check"></i>}
              Yes
            </button>
            <button
              onClick={() => onToggle(false)}
              className={`flex-1 md:w-28 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                !isCompleted 
                  ? 'bg-slate-400 dark:bg-slate-600 text-white' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {!isCompleted && <i className="fas fa-times"></i>}
              No
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 text-white overflow-hidden relative border border-slate-700 shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-brain text-6xl"></i>
          </div>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-lightbulb text-yellow-400"></i>
            Analyst Insight
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "The key to data analysis is storytelling. Your tools like SQL and Python are just the pens you use to write the story."
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <i className="fas fa-robot"></i>
            AI Practice Challenge
          </h3>
          <p className="text-sm text-blue-100 mb-4">
            Want to test your skills on {module.title}?
          </p>
          {aiChallenge ? (
            <div className="bg-white/10 p-3 rounded-lg text-xs italic mb-4 leading-relaxed border border-white/20 whitespace-pre-wrap font-mono">
              {aiChallenge}
            </div>
          ) : (
            <button 
              onClick={handleGetChallenge}
              disabled={loading}
              className="w-full py-2 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              {loading ? 'Consulting Gemini...' : 'Generate New Challenge'}
            </button>
          )}
        </div>
      </div>

      {module.quiz && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <i className="fas fa-tasks text-blue-500"></i>
            Check Your Understanding
          </h2>
          <p className="text-slate-700 dark:text-slate-300 font-medium mb-6">{module.quiz.question}</p>
          
          <div className="space-y-3 mb-8">
            {module.quiz.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                  selectedOption === idx 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{option}</span>
                {selectedOption === idx && <i className="fas fa-check-circle"></i>}
              </button>
            ))}
          </div>

          {!showExplanation ? (
            <button
              onClick={handleQuizSubmit}
              disabled={selectedOption === null || loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all"
            >
              {loading ? 'Checking...' : 'Submit Answer'}
            </button>
          ) : (
            <div className="animate-slide-up">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl mb-6">
                <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                     <i className="fas fa-check"></i>
                   </div>
                   <div>
                     <p className="text-green-800 dark:text-green-400 font-bold mb-1">Correct! +{module.points} XP</p>
                     <p className="text-green-700 dark:text-green-500 text-sm leading-relaxed">{module.quiz.explanation}</p>
                   </div>
                </div>
              </div>
              
              {feedback && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl mb-6 italic text-slate-600 dark:text-slate-400 text-sm relative">
                  <div className="absolute -top-3 left-4 px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 rounded">Tutor Advice</div>
                  "{feedback}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleContent;
