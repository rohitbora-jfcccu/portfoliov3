import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Star } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800 flex items-start justify-between bg-zinc-950/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                {project.category}
              </span>
              {project.stars && (
                <span className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{project.stars}</span>
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
            <p className="text-xs text-zinc-400 mt-0.5">{project.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-300">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>Overview</span>
            </h4>
            <p className="text-zinc-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Performance & Metrics */}
          {project.metrics && (
            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-xs text-indigo-300/80 font-medium">Performance Benchmark:</span>
                <p className="text-sm font-semibold text-white font-mono">{project.metrics}</p>
              </div>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.architectureDetails && project.architectureDetails.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Architectural Design &amp; Decisions</span>
              </h4>
              <ul className="space-y-2">
                {project.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Features */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Features</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/80">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-mono text-xs border border-zinc-700/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs border border-zinc-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/30 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
