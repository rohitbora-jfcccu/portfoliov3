import React, { useState } from 'react';
import { Bot, Network, Code, Shield, Cpu, Database, ExternalLink, Github, ArrowUpRight, Star, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'AI & Agents', value: 'ai' },
    { label: 'Systems & Realtime', value: 'systems' },
    { label: 'Full-Stack Apps', value: 'fullstack' },
    { label: 'Developer Tools', value: 'devtools' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const renderIcon = (name: Project['iconName']) => {
    const iconClass = "w-5 h-5";
    switch (name) {
      case 'bot': return <Bot className={iconClass} />;
      case 'network': return <Network className={iconClass} />;
      case 'code': return <Code className={iconClass} />;
      case 'shield': return <Shield className={iconClass} />;
      case 'cpu': return <Cpu className={iconClass} />;
      case 'database': return <Database className={iconClass} />;
      default: return <Code className={iconClass} />;
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production &amp; Research Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Production architectures, real-time distributed backends, and multi-agent AI frameworks crafted with strict engineering discipline.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800/80 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Icon + Category + Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/20 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition-colors">
                    {renderIcon(project.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.stars && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{project.stars}</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors mb-1.5 flex items-center justify-between">
                  <span>{project.title}</span>
                </h3>
                <p className="text-xs font-medium text-cyan-400/90 mb-3">{project.tagline}</p>
                
                {/* Description */}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Metrics Highlight Pill */}
                {project.metrics && (
                  <div className="mb-4 px-2.5 py-1.5 rounded-lg bg-zinc-950/60 border border-zinc-800 text-[11px] font-mono text-zinc-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="truncate">{project.metrics}</span>
                  </div>
                )}
              </div>

              {/* Bottom: Tags and Actions */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 text-[10px] font-mono border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 text-zinc-500 text-[10px] font-mono">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group-hover:underline cursor-pointer"
                  >
                    <span>Architecture Deep-Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Live Demo"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Architecture Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
