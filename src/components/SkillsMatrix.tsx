import React, { useState } from 'react';
import { Layout, Server, Brain, Database, Search, Check, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderCategoryIcon = (icon: string) => {
    const iconClass = "w-4 h-4";
    switch (icon) {
      case 'layout': return <Layout className={iconClass} />;
      case 'server': return <Server className={iconClass} />;
      case 'brain': return <Brain className={iconClass} />;
      case 'database': return <Database className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-zinc-950/60 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Arsenal
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            A comprehensive matrix of languages, frameworks, cloud primitives, and machine learning toolkits tested in production.
          </p>

          {/* Quick Skill Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skill (e.g. React, Python, Docker, RAG)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/60 font-mono"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 font-mono"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* If user is searching, show direct match grid */}
        {searchTerm ? (
          <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
              Search Results for "{searchTerm}"
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SKILL_CATEGORIES.flatMap((c) => c.skills)
                .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{skill.name}</span>
                        {skill.featured && (
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-mono font-medium">
                            Core
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">{skill.experienceYears} experience</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/40">
                      {skill.levelLabel}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          /* Normal Tabbed / Grid View */
          <div className="space-y-6">
            {/* Category Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeTab === idx
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 font-semibold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {renderCategoryIcon(cat.icon)}
                  <span>{cat.title}</span>
                </button>
              ))}
            </div>

            {/* Active Category Detail Card */}
            <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800/80 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-zinc-800/80 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span>{SKILL_CATEGORIES[activeTab].title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    {SKILL_CATEGORIES[activeTab].description}
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  {SKILL_CATEGORIES[activeTab].skills.length} competencies
                </span>
              </div>

              {/* Skills Progress Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILL_CATEGORIES[activeTab].skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{skill.name}</span>
                        {skill.featured && (
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono font-medium">
                            Core
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-cyan-400 font-medium">
                        {skill.levelLabel} ({skill.experienceYears})
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick summary strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
                <span className="text-xs text-zinc-500 font-mono uppercase">Primary Language</span>
                <p className="text-sm font-bold text-white mt-1">TypeScript &amp; Python</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
                <span className="text-xs text-zinc-500 font-mono uppercase">UI Engine</span>
                <p className="text-sm font-bold text-white mt-1">React 19 / Tailwind</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
                <span className="text-xs text-zinc-500 font-mono uppercase">Databases</span>
                <p className="text-sm font-bold text-white mt-1">PostgreSQL &amp; Redis</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
                <span className="text-xs text-zinc-500 font-mono uppercase">AI Focus</span>
                <p className="text-sm font-bold text-white mt-1">Agent DAGs &amp; Vector RAG</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
