
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ModuleContent from './components/ModuleContent';
import LoadingOverlay from './components/LoadingOverlay';
import { COURSE_MODULES } from './constants';
import { UserState } from './types';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('dataAnalyst_pro_theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [isLoading, setIsLoading] = useState(false);
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('dataAnalyst_pro_state');
    return saved ? JSON.parse(saved) : {
      points: 0,
      completedModules: [],
      currentModuleId: 'intro-roadmap',
      level: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('dataAnalyst_pro_state', JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    localStorage.setItem('dataAnalyst_pro_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectModule = useCallback((id: string) => {
    if (id === userState.currentModuleId) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setUserState(prev => ({ ...prev, currentModuleId: id }));
      setIsLoading(false);
    }, 1200);
  }, [userState.currentModuleId]);

  const handleToggleModuleCompletion = (points: number, shouldComplete: boolean) => {
    setUserState(prev => {
      const isAlreadyCompleted = prev.completedModules.includes(prev.currentModuleId);
      
      if (shouldComplete && !isAlreadyCompleted) {
        // Complete and add points
        const newPoints = prev.points + points;
        const newLevel = Math.floor(newPoints / 1000) + 1;
        return {
          ...prev,
          points: newPoints,
          completedModules: [...prev.completedModules, prev.currentModuleId],
          level: newLevel
        };
      } else if (!shouldComplete && isAlreadyCompleted) {
        // Unmark and remove points
        const newPoints = Math.max(0, prev.points - points);
        const newLevel = Math.floor(newPoints / 1000) + 1;
        return {
          ...prev,
          points: newPoints,
          completedModules: prev.completedModules.filter(id => id !== prev.currentModuleId),
          level: newLevel
        };
      }
      
      return prev;
    });
  };

  const currentModule = COURSE_MODULES.find(m => m.id === userState.currentModuleId) || COURSE_MODULES[0];

  return (
    <div className={`flex h-screen overflow-hidden font-sans antialiased transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      <LoadingOverlay isVisible={isLoading} />

      <Sidebar 
        userState={userState} 
        onSelectModule={handleSelectModule} 
      />
      
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        <div className="sticky top-0 z-10 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex justify-between items-center transition-colors duration-300">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500">Current Unit:</h2>
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
              {currentModule.section}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:ring-2 hover:ring-blue-500/20 transition-all"
              aria-label="Toggle Dark Mode"
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
            
            <a 
              href="https://www.ayeshperera.online/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white">
                  <i className="fas fa-code"></i>
                </div>
                <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white">
                  <i className="fas fa-brain"></i>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight leading-none">Ayesh Perera</span>
                <span className="text-[8px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest leading-none mt-0.5 group-hover:underline">Visit Architect</span>
              </div>
              <i className="fas fa-external-link-alt text-[10px] text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors ml-1"></i>
            </a>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
            <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <i className="fas fa-user-circle text-lg"></i>
            </button>
          </div>
        </div>

        <ModuleContent 
          module={currentModule} 
          onComplete={(points) => handleToggleModuleCompletion(points, true)}
          onToggle={(shouldComplete) => handleToggleModuleCompletion(currentModule.points, shouldComplete)}
          isCompleted={userState.completedModules.includes(currentModule.id)}
        />

        <footer className="mt-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 px-8 transition-colors duration-300">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                  <i className="fas fa-database text-white text-xs"></i>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">DataAnalyst Pro</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                The ultimate companion to the 16+ hour Masterclass. Gamifying your path to a career in data.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://www.linkedin.com/in/ayeshperera/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all" title="LinkedIn">
                  <i className="fab fa-linkedin-in text-sm"></i>
                </a>
                <a href="https://www.ayeshperera.online/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all" title="Portfolio">
                  <i className="fas fa-globe text-sm"></i>
                </a>
                <a href="https://www.paypal.com/donate/?hosted_button_id=YOUR_ACTUAL_ID&business=pereraayesh7@gmail.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#003087] hover:text-white transition-all" title="Donate via PayPal">
                  <i className="fab fa-paypal text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 hover:text-white transition-all">
                  <i className="fab fa-github text-sm"></i>
                </a>
              </div>
              
              <div className="pt-2">
                <a 
                  href="https://www.paypal.com/donate/?business=pereraayesh7@gmail.com&no_recurring=0&currency_code=USD" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#ffc439] hover:bg-[#f4b41a] text-black px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm"
                >
                  <i className="fab fa-paypal"></i>
                  Donate with PayPal
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">Take it Further</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://www.freecodecamp.org/learn/data-analysis-with-python/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      <i className="fab fa-free-code-camp"></i>
                      Data Analysis with Python
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Full Certification via freeCodeCamp</p>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.freecodecamp.org/learn/relational-database/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      <i className="fab fa-free-code-camp"></i>
                      Relational Databases (SQL)
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Interactive Linux/SQL terminal cert</p>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">Sample Data Sets</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://www.kaggle.com/datasets" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      <i className="fas fa-table"></i>
                      Kaggle Datasets
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">The gold standard for finding data</p>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://datasetsearch.research.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      <i className="fab fa-google"></i>
                      Google Dataset Search
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Search millions of public datasets</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <p>© 2024 DataAnalyst Pro Learning Platform</p>
            <div className="flex gap-8">
              <a href="https://www.ayeshperera.online/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Portfolio</a>
              <a href="https://www.linkedin.com/in/ayeshperera/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
              <a href="https://www.paypal.com/donate/?business=pereraayesh7@gmail.com&no_recurring=0&currency_code=USD" target="_blank" rel="noopener noreferrer" className="hover:text-[#003087] transition-colors font-bold">Donate</a>
              <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Privacy</a>
              <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Terms</a>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
};

export default App;
