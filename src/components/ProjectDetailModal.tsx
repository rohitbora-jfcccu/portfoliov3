import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, ArrowRight, Layers, Cpu, CheckCircle2, Sliders } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (proj: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [lensTint, setLensTint] = useState<'cobalt' | 'prismatic' | 'onyx'>('cobalt');
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive' | 'architecture'>('overview');
  const [activeGarmentWeave, setActiveGarmentWeave] = useState<'heavy-wool' | 'raw-silk' | 'technical-nylon'>('heavy-wool');
  const [nodeTraffic, setNodeTraffic] = useState<number>(480);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape & trap initial focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    if (project && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto bg-[#16161D] border border-white/10 rounded-2xl shadow-2xl flex flex-col text-[#F0F1FA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#16161D]/95 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono text-zinc-400">
            <span className="text-[#1A2FFB] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="text-white font-medium hidden sm:inline">{project.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab segmented controls */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-2.5 sm:px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'overview' ? 'bg-[#1A2FFB] text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monograph
              </button>
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-2.5 sm:px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'interactive' ? 'bg-[#1A2FFB] text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Simulator
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-2.5 sm:px-3 py-1 rounded transition-colors cursor-pointer hidden sm:inline-block ${
                  activeTab === 'architecture' ? 'bg-[#1A2FFB] text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tech Stack
              </button>
            </div>

            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
              aria-label="Close project monograph"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-10 space-y-8 sm:space-y-10">
          {/* Hero Header */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {project.conceptNote}
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-base sm:text-xl text-zinc-300 font-light max-w-3xl leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Interactive Feature Simulator Area */}
          {activeTab === 'interactive' && (
            <div className="bg-[#111116] border border-white/10 rounded-xl p-5 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#1A2FFB]">
                  <Sliders className="w-4 h-4" />
                  <span className="font-semibold">{project.interactiveFeature.title}</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">INTERACTIVE PROTOTYPE</span>
              </div>
              <p className="text-sm text-zinc-300">
                {project.interactiveFeature.description}
              </p>

              {/* Specific interactive modules based on project type */}
              {project.interactiveFeature.type === 'eyewear-tint' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono text-zinc-400">Photochromic Tint Filter:</span>
                    <button
                      onClick={() => setLensTint('cobalt')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                        lensTint === 'cobalt' ? 'bg-[#1A2FFB] text-white font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Electric Cobalt
                    </button>
                    <button
                      onClick={() => setLensTint('prismatic')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                        lensTint === 'prismatic' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Prismatic Aurora
                    </button>
                    <button
                      onClick={() => setLensTint('onyx')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                        lensTint === 'onyx' ? 'bg-zinc-700 text-white font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Titanium Smoke
                    </button>
                  </div>

                  <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className={`absolute inset-0 transition-opacity duration-500 pointer-events-none mix-blend-color ${
                        lensTint === 'cobalt' ? 'bg-[#1A2FFB]/40' : lensTint === 'prismatic' ? 'bg-gradient-to-tr from-pink-500/40 via-purple-500/30 to-cyan-500/40' : 'bg-black/60'
                      }`} 
                    />
                    <div className="absolute bottom-4 left-4 text-xs font-mono bg-black/80 px-3 py-1.5 rounded border border-white/10 text-white">
                      Simulated Refractive Index: {lensTint === 'cobalt' ? '1.58 (Polycarbonate)' : lensTint === 'prismatic' ? '1.67 (High Index)' : '1.52 (Crown Glass)'}
                    </div>
                  </div>
                </div>
              )}

              {project.interactiveFeature.type === 'lookbook-preview' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono text-zinc-400">Garment Material Weave:</span>
                    <button
                      onClick={() => setActiveGarmentWeave('heavy-wool')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                        activeGarmentWeave === 'heavy-wool' ? 'bg-[#1A2FFB] text-white font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Sculptured Wool (540 GSM)
                    </button>
                    <button
                      onClick={() => setActiveGarmentWeave('raw-silk')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                        activeGarmentWeave === 'raw-silk' ? 'bg-[#1A2FFB] text-white font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Raw Organza Silk (120 GSM)
                    </button>
                    <button
                      onClick={() => setActiveGarmentWeave('technical-nylon')}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                        activeGarmentWeave === 'technical-nylon' ? 'bg-[#1A2FFB] text-white font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Membrane Ripstop
                    </button>
                  </div>

                  <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/80 px-3 py-1.5 rounded text-xs font-mono text-white border border-white/10">
                      Simulated Drape Rigidity: {activeGarmentWeave === 'heavy-wool' ? 'High Structural Hold' : activeGarmentWeave === 'raw-silk' ? 'Fluid Aerodynamic Suspension' : 'High Elastic Tensile'}
                    </div>
                  </div>
                </div>
              )}

              {project.interactiveFeature.type === 'system-nodes' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">Simulate Node Event Load:</span>
                    <span className="text-xs font-mono text-[#1A2FFB] font-bold">{nodeTraffic} events / sec</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    value={nodeTraffic}
                    onChange={(e) => setNodeTraffic(Number(e.target.value))}
                    className="w-full accent-[#1A2FFB] cursor-pointer"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-mono">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-zinc-400 block">Worker Threads</span>
                      <span className="text-white font-bold text-sm">{Math.ceil(nodeTraffic / 85)} Active</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-zinc-400 block">Processing Latency</span>
                      <span className="text-[#1A2FFB] font-bold text-sm">{(nodeTraffic * 0.038).toFixed(1)} ms</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-zinc-400 block">Backpressure</span>
                      <span className="text-emerald-400 font-bold text-sm">Optimal 0.01%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Overview Tab: Monograph Image & Narrative */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Monograph Narrative Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-zinc-300 leading-relaxed font-light">
                <div className="space-y-3">
                  <h3 className="text-xs font-mono text-[#1A2FFB] font-semibold uppercase tracking-wider">
                    01. The Problem Space
                  </h3>
                  <p>{project.challenge}</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono text-[#1A2FFB] font-semibold uppercase tracking-wider">
                    02. Architectural Solution
                  </h3>
                  <p>{project.solution}</p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                  Engineering &amp; Performance Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.specifications.map((m, idx) => (
                    <div key={idx} className="bg-[#111116] p-5 rounded-xl border border-white/5 space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-xs text-zinc-400 font-mono">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Architecture Tab: Deliverables & Tech Stack */}
          {activeTab === 'architecture' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Deliverables */}
                <div className="bg-[#111116] p-6 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#1A2FFB] font-semibold">
                    <Layers className="w-4 h-4" />
                    <span>DELIVERABLES &amp; ARTIFACTS</span>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {project.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1A2FFB] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="bg-[#111116] p-6 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#1A2FFB] font-semibold">
                    <Cpu className="w-4 h-4" />
                    <span>TECHNICAL ARCHITECTURE</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Footer Action */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>BORA SELECTED WORK MONOGRAPH</span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white text-[#111116] hover:bg-[#1A2FFB] hover:text-white rounded-lg font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
            >
              Close Monograph
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
