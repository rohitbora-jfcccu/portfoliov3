import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project, PROJECTS } from '../data/projects';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
  onViewAllWork: () => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onSelectProject,
  onViewAllWork,
}) => {
  const [tiltProject, setTiltProject] = useState<string | null>(null);
  const [tiltStyle, setTiltStyle] = useState<{ rx: number; ry: number; gx: number; gy: number }>({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    // Only apply tilt on fine pointer (desktop) devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -4.5;
    const ry = ((x - centerX) / centerX) * 4.5;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    setTiltProject(id);
    setTiltStyle({ rx, ry, gx, gy });
  };

  const handleCardMouseLeave = () => {
    setTiltProject(null);
    setTiltStyle({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#111116] text-[#F0F1FA] border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="text-[#1A2FFB] font-bold">03</span>
              <span>/</span>
              <span className="uppercase tracking-wider text-white">CURATED EDITIONS</span>
              <span>·</span>
              <span>CONCEPT PROTOTYPES</span>
            </div>
            <h2 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-none">
              SELECTED WORK
            </h2>
            <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
              A collection of digital products, interfaces, and experiences built with intention.
            </p>
          </div>

          <button
            onClick={onViewAllWork}
            className="self-start md:self-auto px-6 py-3.5 bg-[#16161D] hover:bg-white text-zinc-300 hover:text-[#111116] border border-white/10 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2.5 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
          >
            <span>View Full Archive (3)</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Project 1: AURA Atelier (Featured Flagship Horizontal Presentation) */}
        {PROJECTS[0] && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectProject(PROJECTS[0])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject(PROJECTS[0]);
              }
            }}
            onMouseMove={(e) => handleCardMouseMove(e, PROJECTS[0].id)}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: tiltProject === PROJECTS[0].id 
                ? `perspective(1000px) rotateX(${tiltStyle.rx}deg) rotateY(${tiltStyle.ry}deg) scale3d(1.008, 1.008, 1.008)` 
                : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
              transition: tiltProject === PROJECTS[0].id ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
            }}
            className="group relative bg-[#16161D] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#1A2FFB]/50 shadow-2xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
            aria-label={`Open project monograph for ${PROJECTS[0].title}`}
          >
            {/* Dynamic Cursor Glare */}
            {tiltProject === PROJECTS[0].id && (
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-30 transition-opacity"
                style={{
                  background: `radial-gradient(circle at ${tiltStyle.gx}% ${tiltStyle.gy}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                }}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
              {/* Media Visual Column */}
              <div className="lg:col-span-7 overflow-hidden rounded-xl bg-black aspect-[4/3] relative">
                <img
                  src={PROJECTS[0].image}
                  alt={PROJECTS[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A2FFB]" />
                  <span>FLAGSHIP E-COMMERCE</span>
                </div>
              </div>

              {/* Editorial Text Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="text-[#1A2FFB] font-bold">EDITION 01</span>
                  <span aria-hidden="true">·</span>
                  <span>{PROJECTS[0].year}</span>
                  <span aria-hidden="true">·</span>
                  <span>CONCEPT PROTOTYPE</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-[#1A2FFB] transition-colors tracking-tight">
                  {PROJECTS[0].title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {PROJECTS[0].overview}
                </p>

                {/* Technical Specifications */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono">
                  {PROJECTS[0].specifications.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="text-lg font-bold text-white tabular-nums block">{m.value}</span>
                      <span className="text-zinc-500">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Action affordance */}
                <div className="pt-4">
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#111116] group-hover:bg-[#1A2FFB] group-hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-md">
                    <span>View Project Monograph</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Asymmetrical 2-Column Grid for Project 2 & 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Project 2: LUMEN Optical */}
          {PROJECTS[1] && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelectProject(PROJECTS[1])}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(PROJECTS[1]);
                }
              }}
              onMouseMove={(e) => handleCardMouseMove(e, PROJECTS[1].id)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: tiltProject === PROJECTS[1].id 
                  ? `perspective(1000px) rotateX(${tiltStyle.rx}deg) rotateY(${tiltStyle.ry}deg) scale3d(1.008, 1.008, 1.008)` 
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: tiltProject === PROJECTS[1].id ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
              }}
              className="group relative bg-[#16161D] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#1A2FFB]/50 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 space-y-6 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
              aria-label={`Open project monograph for ${PROJECTS[1].title}`}
            >
              {tiltProject === PROJECTS[1].id && (
                <div
                  className="absolute inset-0 pointer-events-none z-10 opacity-30"
                  style={{
                    background: `radial-gradient(circle at ${tiltStyle.gx}% ${tiltStyle.gy}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                  }}
                />
              )}

              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-xl bg-black aspect-[4/3]">
                  <img
                    src={PROJECTS[1].image}
                    alt={PROJECTS[1].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A2FFB]" />
                    <span>SPATIAL WEBGL 3D</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="text-[#1A2FFB] font-bold">EDITION 02</span>
                  <span aria-hidden="true">·</span>
                  <span>{PROJECTS[1].year}</span>
                  <span aria-hidden="true">·</span>
                  <span>PBR SHADERS</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#1A2FFB] transition-colors tracking-tight">
                  {PROJECTS[1].title}
                </h3>

                <p className="text-sm text-zinc-300 font-light leading-relaxed line-clamp-3">
                  {PROJECTS[1].overview}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  LIVE PHOTOCHROMIC LAB
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-white group-hover:text-[#1A2FFB] transition-colors">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          )}

          {/* Project 3: KINETIC Core */}
          {PROJECTS[2] && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelectProject(PROJECTS[2])}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(PROJECTS[2]);
                }
              }}
              onMouseMove={(e) => handleCardMouseMove(e, PROJECTS[2].id)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: tiltProject === PROJECTS[2].id 
                  ? `perspective(1000px) rotateX(${tiltStyle.rx}deg) rotateY(${tiltStyle.ry}deg) scale3d(1.008, 1.008, 1.008)` 
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: tiltProject === PROJECTS[2].id ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
              }}
              className="group relative bg-[#16161D] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#1A2FFB]/50 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 space-y-6 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
              aria-label={`Open project monograph for ${PROJECTS[2].title}`}
            >
              {tiltProject === PROJECTS[2].id && (
                <div
                  className="absolute inset-0 pointer-events-none z-10 opacity-30"
                  style={{
                    background: `radial-gradient(circle at ${tiltStyle.gx}% ${tiltStyle.gy}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                  }}
                />
              )}

              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-xl bg-black aspect-[4/3]">
                  <img
                    src={PROJECTS[2].image}
                    alt={PROJECTS[2].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A2FFB]" />
                    <span>ENTERPRISE SYSTEM</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span className="text-[#1A2FFB] font-bold">EDITION 03</span>
                  <span aria-hidden="true">·</span>
                  <span>{PROJECTS[2].year}</span>
                  <span aria-hidden="true">·</span>
                  <span>LOGISTICS CORE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#1A2FFB] transition-colors tracking-tight">
                  {PROJECTS[2].title}
                </h3>

                <p className="text-sm text-zinc-300 font-light leading-relaxed line-clamp-3">
                  {PROJECTS[2].overview}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  INGESTION DISPATCHER
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-white group-hover:text-[#1A2FFB] transition-colors">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
