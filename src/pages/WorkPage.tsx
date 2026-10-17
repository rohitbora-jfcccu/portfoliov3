import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';

interface WorkPageProps {
  onSelectProject: (p: Project) => void;
  onNavigateHome: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'E-Commerce', 'Spatial 3D', 'Enterprise Systems'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-24 px-6 sm:px-12 lg:px-20 bg-[#111116] text-[#F0F1FA]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="space-y-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="text-[#1A2FFB] font-bold">ARCHIVE</span>
            <span>/</span>
            <span>ALL COMMISSIONS</span>
            <span>·</span>
            <span>2026 EDITIONS</span>
          </div>

          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
            SELECTED WORK
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            A comprehensive index of digital flagships, spatial WebGL applications, and enterprise systems built with intention.
          </p>

          {/* Filter Bar (Segmented Controls) */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB] ${
                  activeCategory === cat
                    ? 'bg-[#1A2FFB] text-white font-semibold shadow-sm'
                    : 'bg-[#181820] text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              className="group bg-[#16161D] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#1A2FFB]/50 transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
              aria-label={`Open monograph for ${project.title}`}
            >
              <div className="p-6 space-y-5">
                <div className="relative overflow-hidden rounded-xl bg-black aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-white border border-white/10">
                    {project.category}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{project.year}</span>
                  <span className="text-[#1A2FFB] font-semibold">{project.techStack[0]}</span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-[#1A2FFB] transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-300 font-light leading-relaxed line-clamp-3">
                  {project.overview}
                </p>
              </div>

              <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>VIEW MONOGRAPH</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#1A2FFB] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
