
import React, { useState, useEffect } from 'react';
import { MOTIVATIONAL_QUOTES } from '../constants';

interface LoadingOverlayProps {
  isVisible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Pick a random quote every time it appears
      const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
      setQuote(MOTIVATIONAL_QUOTES[randomIndex]);
    } else {
      // Add a small delay before unmounting to let animation finish
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ease-in-out ${
      isVisible ? 'opacity-100 backdrop-blur-md bg-white/70 dark:bg-slate-950/70' : 'opacity-0 backdrop-blur-none bg-white/0 dark:bg-slate-950/0 pointer-events-none'
    }`}>
      <div className="max-w-2xl px-8 text-center animate-scale-up">
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/30 animate-pulse">
              <i className="fas fa-brain text-white text-2xl"></i>
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
              <i className="fas fa-check text-[10px] text-white"></i>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-100 leading-tight tracking-tight italic">
            "{quote.text}"
          </p>
          <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
            — {quote.author}
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
          </div>
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Preparing next lesson...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
