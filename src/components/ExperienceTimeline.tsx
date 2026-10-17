import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, Sparkles } from 'lucide-react';
import { TIMELINE_ITEMS } from '../data/portfolioData';
import { ExperienceItem } from '../types';

export const ExperienceTimeline: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Work' | 'Education' | 'Achievement'>('All');

  const filteredItems = filter === 'All'
    ? TIMELINE_ITEMS
    : TIMELINE_ITEMS.filter((item) => item.type === filter);

  const getIcon = (type: ExperienceItem['type']) => {
    switch (type) {
      case 'Work': return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'Education': return <GraduationCap className="w-4 h-4 text-indigo-400" />;
      case 'Achievement': return <Award className="w-4 h-4 text-amber-400" />;
      default: return <Briefcase className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="experience" className="py-20 relative bg-zinc-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Path &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience &amp; Milestones
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Academic foundation in Artificial Intelligence and hands-on software engineering achievements.
          </p>

          {/* Type Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {(['All', 'Work', 'Education', 'Achievement'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  filter === t
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 space-y-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline marker */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover:border-indigo-500 flex items-center justify-center shadow-md transition-colors">
                {getIcon(item.type)}
              </div>

              {/* Item Card */}
              <div className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60 inline-block mb-1">
                      {item.type}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-400">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-zinc-400 font-mono gap-0.5 mt-2 sm:mt-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 text-[10px] font-mono border border-zinc-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
