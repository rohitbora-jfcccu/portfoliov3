import React, { useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

export const AboutApproach: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const principles = [
    {
      num: '01',
      title: 'Understand the problem',
      headline: 'Deep structural clarity precedes aesthetic expression.',
      description: 'We deconstruct business constraints, user mental models, and technical requirements to unearth the core friction point before writing a single line of shader or layout code.',
      focusAreas: ['Information Architecture', 'System Discovery', 'Ergonomic Friction Mapping']
    },
    {
      num: '02',
      title: 'Design the experience',
      headline: 'Typography, pacing, and dimensional space as narrative.',
      description: 'We compose layouts with architectural tension, using generous negative space, intentional typographic scales, and chromatic contrast rather than cookie-cutter component libraries.',
      focusAreas: ['Bespoke Design Systems', 'Spatial Staging', 'Editorial Typography']
    },
    {
      num: '03',
      title: 'Engineer the interaction',
      headline: 'Performant mathematics powering physical digital weight.',
      description: 'Interfaces must feel tangible. We leverage Three.js, WebGL shaders, exponential inertia damping, and modern rendering pipelines to give pixels weight, friction, and fluid momentum.',
      focusAreas: ['Real-Time WebGL & PBR', 'Micro-Kinematics', 'Zero-Latency State Synchronization']
    },
    {
      num: '04',
      title: 'Refine every detail',
      headline: 'The difference between functional and memorable is obsessive craft.',
      description: 'We obsess over the micro-moments: the 120Hz spring settling curve, the subtle specular glint on dark stone, and the flawless transition between mobile touch and desktop cursor.',
      focusAreas: ['Frame-Pacing Profiling', 'Sub-Pixel Precision', 'Accessibility Standards']
    }
  ];

  return (
    <section className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#F5F6FC] text-[#111116] border-t border-black/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span className="text-[#1A2FFB] font-bold">04</span>
              <span>/</span>
              <span className="uppercase tracking-wider text-black">CREATIVE PHILOSOPHY</span>
              <span>·</span>
              <span>METHODOLOGY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111116] leading-[1.02]">
              GOOD IDEAS DESERVE <span className="text-[#1A2FFB]">EXTRAORDINARY</span> EXECUTION.
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-600 max-w-xs">
            FOUR GOVERNING PRINCIPLES GUIDING EVERY EXPERIMENTAL COMMISSION &amp; PRODUCTION SYSTEM.
          </div>
        </div>

        {/* Interactive Principles Monograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Principle Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {principles.map((p, idx) => {
              const isActive = activePrinciple === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActivePrinciple(idx)}
                  className={`p-6 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#1A2FFB]/30 shadow-md translate-x-2'
                      : 'bg-transparent border-black/5 hover:bg-white/60 hover:border-black/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#1A2FFB]' : 'text-zinc-400'}`}>
                        {p.num}.
                      </span>
                      <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${isActive ? 'text-[#111116]' : 'text-zinc-600'}`}>
                        {p.title}
                      </h3>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 text-[#1A2FFB]' : 'text-zinc-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Principle Expanded Details */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-2xl border border-black/10 shadow-sm space-y-8">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-4 border-b border-black/5">
              <span className="text-[#1A2FFB] font-bold">PRINCIPLE {principles[activePrinciple].num}</span>
              <span>METHODOLOGY FOCUS</span>
            </div>

            <div className="space-y-4">
              <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111116] leading-snug">
                "{principles[activePrinciple].headline}"
              </h4>
              <p className="text-base text-zinc-700 font-light leading-relaxed">
                {principles[activePrinciple].description}
              </p>
            </div>

            {/* Focus Areas */}
            <div className="pt-6 border-t border-black/5 space-y-3">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                Deliverable Focus &amp; Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {principles[activePrinciple].focusAreas.map((area, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[#F0F1FA] text-[#111116] border border-black/5 rounded-lg text-xs font-mono"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
