
import React, { useState, useMemo, useEffect } from 'react';
import { COURSE_MODULES } from '../constants';
import { UserState, Module } from '../types';

interface SidebarProps {
  userState: UserState;
  onSelectModule: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userState, onSelectModule }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Store which sections are currently expanded
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Roadmap': true // Expand Roadmap by default
  });

  const groupedModules = useMemo(() => {
    const filtered = COURSE_MODULES.filter(module => 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.section.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groups: Record<string, Module[]> = {};
    filtered.forEach(mod => {
      if (!groups[mod.section]) groups[mod.section] = [];
      groups[mod.section].push(mod);
    });
    return groups;
  }, [searchTerm]);

  const sections = Object.keys(groupedModules);

  // When a user selects a module, we should probably ensure its section is expanded
  useEffect(() => {
    const activeModule = COURSE_MODULES.find(m => m.id === userState.currentModuleId);
    if (activeModule) {
      setExpandedSections(prev => ({
        ...prev,
        [activeModule.section]: true
      }));
    }
  }, [userState.currentModuleId]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSectionProgress = (sectionModules: Module[]) => {
    const completedCount = sectionModules.filter(m => userState.completedModules.includes(m.id)).length;
    return Math.round((completedCount / sectionModules.length) * 100);
  };

  return (
    <div className="w-80 bg-slate-900 text-slate-100 flex flex-col h-full border-r border-slate-800 shadow-2xl z-20">
      {/* Header & Brand */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2.5 rounded-xl shadow-lg shadow-blue-900/20">
            <i className="fas fa-database text-xl text-white"></i>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">Career Masterclass</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">DataAnalyst Pro</p>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Progress</span>
            <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/30 font-bold">LVL {userState.level}</span>
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-black text-white">{userState.points}</span>
            <span className="text-xs font-medium text-slate-500 uppercase">XP</span>
          </div>
          <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-700 ease-out rounded-full" 
              style={{ width: `${(userState.completedModules.length / COURSE_MODULES.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-slate-500 font-medium">
              {userState.completedModules.length} / {COURSE_MODULES.length} Done
            </p>
            <i className="fas fa-trophy text-yellow-500/80 text-[10px]"></i>
          </div>
        </div>
      </div>

      {/* Topic Index Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-6 pt-6 pb-2">
          <div className="relative mb-4 group">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs group-focus-within:text-blue-500 transition-colors"></i>
            <input 
              type="text"
              placeholder="Search curriculum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Scrollable Curriculum List */}
        <nav className="flex-1 overflow-y-auto px-3 pb-6 custom-scrollbar">
          {sections.map(section => {
            const progress = getSectionProgress(groupedModules[section]);
            const isExpanded = expandedSections[section];
            
            return (
              <div key={section} className="mb-2 last:mb-0">
                {/* Section Header Button */}
                <button 
                  onClick={() => toggleSection(section)}
                  className="w-full px-3 py-3 flex flex-col gap-1 hover:bg-slate-800/50 rounded-xl transition-colors group text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-300 transition-colors">
                      {section}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold ${progress === 100 ? 'text-green-500' : 'text-slate-600'}`}>
                        {progress}%
                      </span>
                      <i className={`fas fa-chevron-right text-[8px] text-slate-700 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}></i>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 h-[2px] rounded-full overflow-hidden mt-1">
                    <div 
                      className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-green-500' : 'bg-slate-600'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="space-y-1 mt-1 px-1 animate-fade-in">
                    {groupedModules[section].map((module) => {
                      const isCompleted = userState.completedModules.includes(module.id);
                      const isActive = userState.currentModuleId === module.id;
                      
                      return (
                        <button
                          key={module.id}
                          onClick={() => onSelectModule(module.id)}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 group relative ${
                            isActive 
                              ? 'bg-blue-600 shadow-lg shadow-blue-900/20 text-white' 
                              : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] shrink-0 transition-colors ${
                            isCompleted 
                              ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                              : isActive ? 'bg-white/20 text-white' : 'bg-slate-800 border border-slate-700 group-hover:border-slate-600'
                          }`}>
                            {isCompleted ? (
                              <i className="fas fa-check"></i>
                            ) : (
                              <i className="fas fa-play text-[7px] opacity-40"></i>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                              {module.title}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[8px] font-bold uppercase tracking-tighter ${isActive ? 'text-blue-200' : 'text-slate-600'}`}>
                                {module.videoTimestamp} • {module.points} XP
                              </span>
                            </div>
                          </div>

                          {isActive && (
                            <div className="absolute right-2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          
          {sections.length === 0 && (
            <div className="text-center py-10">
              <i className="fas fa-search text-slate-700 text-2xl mb-2"></i>
              <p className="text-xs text-slate-500">No results found.</p>
            </div>
          )}
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default Sidebar;
