import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { STUDIO_IMAGE } from '../data/projects';
import { SITE_CONFIG } from '../config/siteConfig';

interface EditorialIntroProps {
  onLearnMore?: () => void;
}

export const EditorialIntro: React.FC<EditorialIntroProps> = ({ onLearnMore }) => {
  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#F0F1FA] text-[#111116] overflow-hidden transition-colors duration-500">
      {/* Structural Hairline Grid Lines */}
      <div className="absolute inset-0 bg-subtle-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 sm:space-y-20">
        {/* Editorial Section Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-black/10 text-xs font-mono text-zinc-600 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[#1A2FFB] font-bold text-sm">01</span>
            <span>/</span>
            <span className="uppercase font-semibold tracking-wider text-black">STUDIO IDENTITY &amp; MONOGRAPH</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>{SITE_CONFIG.locationLabel}</span>
            <span aria-hidden="true">·</span>
            <span>EST. {SITE_CONFIG.yearEstablished}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#1A2FFB] font-semibold">ABOUT BORA</span>
          </div>
        </div>

        {/* Monumental Stacked Typography (Art-Directed Staggered Lines inspired by Lusion) */}
        <div className="py-6 sm:py-14">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-[0.96] text-[#111116] select-none space-y-2">
            <span className="block text-zinc-400 pl-0 sm:pl-4 transition-colors hover:text-[#111116]">
              WE ARE
            </span>
            <span className="block pl-0 sm:pl-16">
              A CREATIVE
            </span>
            <span className="block pl-0 sm:pl-8 text-transparent bg-clip-text bg-gradient-to-r from-[#111116] via-[#1A2FFB] to-[#111116]">
              DEVELOPMENT PRACTICE
            </span>
            <span className="block pl-0 sm:pl-24">
              BUILDING DISTINCTIVE
            </span>
            <span className="block text-[#1A2FFB] pl-0 sm:pl-12">
              DIGITAL EXPERIENCES.
            </span>
          </h2>
        </div>

        {/* Asymmetrical 2-Column Editorial Grid with Studio Monograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-10 border-t border-black/10">
          {/* Left Column: Studio Manifesto */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#1A2FFB] font-bold tracking-widest uppercase">
              <span>MANIFESTO STATEMENT</span>
              <ArrowDownRight className="w-4 h-4" />
            </div>

            <p className="text-xl sm:text-2xl font-normal text-zinc-900 leading-snug tracking-tight">
              We reject the homogeny of off-the-shelf templates and sterile interface libraries.
            </p>

            <p className="text-sm sm:text-base text-zinc-700 font-light leading-relaxed">
              BORA operates as an intimate digital practice where contemporary visual art direction, real-time WebGL graphics, and solid software architecture fuse into unified tactile artifacts. Every interaction is scored with intentional easing curves; every texture carries physical specular depth.
            </p>

            {/* Core Pillars */}
            <div className="space-y-4 pt-4 border-t border-black/10">
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-[#1A2FFB] pt-0.5">01</span>
                <div>
                  <h4 className="text-sm font-bold text-black uppercase tracking-wider">Spatial 3D &amp; WebGL</h4>
                  <p className="text-xs text-zinc-600 font-light mt-0.5">Custom GLSL shaders, procedural geometry, and real-time environment reflections.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-[#1A2FFB] pt-0.5">02</span>
                <div>
                  <h4 className="text-sm font-bold text-black uppercase tracking-wider">High-End E-Commerce</h4>
                  <p className="text-xs text-zinc-600 font-light mt-0.5">Architectural lookbooks, tactile draping, and frictionless headless checkout.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-[#1A2FFB] pt-0.5">03</span>
                <div>
                  <h4 className="text-sm font-bold text-black uppercase tracking-wider">Enterprise Systems</h4>
                  <p className="text-xs text-zinc-600 font-light mt-0.5">Quiet, keyboard-first information architecture handling complex operations.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#111116] hover:text-[#1A2FFB] transition-colors cursor-pointer"
              >
                <span>Read Full Studio Philosophy</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Studio Concept Imagery with Architectural Scrim */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group overflow-hidden rounded-2xl bg-zinc-200 border border-black/10 shadow-xl">
              <img
                src={STUDIO_IMAGE}
                alt="Studio Space Architectural Concept Visualization"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1A2FFB]" />
                    <span className="font-semibold text-white tracking-wider">STUDIO ARCHITECTURAL CONCEPT</span>
                  </div>
                  <span className="text-zinc-300">EXPLORATORY ATELIER</span>
                </div>
                <p className="text-sm font-light text-zinc-200 mt-3 max-w-lg leading-relaxed">
                  Where spatial models, architectural lighting studies, and tactile physical materials inspire procedural browser rendering pipelines.
                </p>
              </div>
            </div>

            {/* Studio Technical Specification Strip */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 px-2 gap-2">
              <span>DESIGN PHILOSOPHY: BESPOKE CRAFT</span>
              <span>RENDER TARGET: 60/120 FPS PBR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
