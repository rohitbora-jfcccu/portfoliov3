import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

interface Capability {
  id: string;
  number: string;
  title: string;
  tagline: string;
  deliverables: string[];
  techStack: string[];
}

export const CapabilitiesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('frontend');

  const capabilities: Capability[] = [
    {
      id: 'frontend',
      number: '01',
      title: 'Frontend Engineering & Performance',
      tagline: 'Architecting ultra-responsive client-side systems optimized for 60/120 FPS render loops and zero-layout shifts.',
      deliverables: [
        'Component Architecture & Design Systems',
        'Frame-Pacing & Web Vitals Optimization',
        'State Management & Tabular Virtualization',
        'Progressive Web Apps & Offline Caching'
      ],
      techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js']
    },
    {
      id: 'threejs',
      number: '02',
      title: '3D & Interactive WebGL Experiences',
      tagline: 'Translating physical materials, refractions, and kinematics into smooth browser-native WebGL shaders and spatial scenes.',
      deliverables: [
        'Procedural PBR Material Shaders',
        'Studio Lighting & Room Environment Rigs',
        'Custom GLSL Vertex & Fragment Shaders',
        'Kinematic Physics & Gyroscopic Control'
      ],
      techStack: ['Three.js', 'WebGL 2.0', 'GLSL', 'RoomEnvironment', 'PMREM']
    },
    {
      id: 'design',
      number: '03',
      title: 'Digital Design & Art Direction',
      tagline: 'Sculpting high-contrast editorial typography, deliberate spatial rhythms, and distinctive visual identities.',
      deliverables: [
        'Editorial Typography & Grid Systems',
        'Interactive Motion Choreography',
        'High-Fidelity Visual Systems',
        'Responsive Ergonomic Design'
      ],
      techStack: ['Design Systems', 'Micro-Kinematics', 'Visual Guidelines']
    },
    {
      id: 'ecommerce',
      number: '04',
      title: 'Luxury E-Commerce & Retail Flagships',
      tagline: 'Merging high-fashion lookbook aesthetic sensibility with frictionless headless checkout workflows.',
      deliverables: [
        'Tactile Product & Lookbook Viewers',
        'Headless Commerce Choreography',
        'Real-time Customizers & Sizing Engines',
        'Instantaneous Cart & Checkout Flow'
      ],
      techStack: ['Shopify Storefront API', 'Headless Commerce', 'Tailwind CSS']
    },
    {
      id: 'enterprise',
      number: '05',
      title: 'Business Applications & ERP Systems',
      tagline: 'Deconstructing complex enterprise databases into calm, keyboard-first, modular command interfaces.',
      deliverables: [
        'High-Density Tabular Information Architecture',
        'Real-time Telemetry & Node Visualizations',
        'Keyboard-First Command Palettes',
        'Multi-tenant Modular Navigation'
      ],
      techStack: ['React 19', 'TypeScript', 'WebSockets', 'Virtualized Grids']
    },
    {
      id: 'motion',
      number: '06',
      title: 'Kinetic Motion & Prototyping',
      tagline: 'Creating tactile, physical weight through spring kinematics, liquid displacement, and audio-reactive feedback.',
      deliverables: [
        'Fluid Liquid-Chrome Displacement Shaders',
        'Spring Physics & Exponential Settling',
        'Procedural Particle Simulations',
        'Sound Design & Web Audio Oscillators'
      ],
      techStack: ['Canvas 2D / WebGL', 'Web Audio API', 'Spring Kinematics']
    }
  ];

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#111116] text-[#F0F1FA] border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="text-[#1A2FFB] font-bold">05</span>
              <span>/</span>
              <span className="uppercase tracking-wider text-white">CORE CAPABILITIES</span>
              <span>·</span>
              <span>TECHNICAL DISCIPLINES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
              STUDIO EXPERTISE
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-500 max-w-xs">
            STRUCTURED DISCIPLINES POWERED BY MODERN ARCHITECTURE AND ART-DIRECTED PRECISION.
          </div>
        </div>

        {/* Expandable Rows */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {capabilities.map((cap) => {
            const isExpanded = expandedId === cap.id;
            return (
              <div
                key={cap.id}
                className="group py-6 sm:py-8 transition-colors duration-200"
              >
                {/* Clickable Header Row */}
                <button
                  onClick={() => toggleRow(cap.id)}
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2FFB]"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="text-xs sm:text-sm font-mono text-zinc-500 group-hover:text-[#1A2FFB] transition-colors">
                      {cap.number}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#1A2FFB] transition-colors">
                      {cap.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-400 group-hover:text-white">
                    <span className="text-xs font-mono hidden sm:inline text-zinc-500">
                      {isExpanded ? 'COLLAPSE' : 'EXPAND'}
                    </span>
                    <div className="p-2 rounded-full border border-white/10 group-hover:border-[#1A2FFB] transition-colors">
                      {isExpanded ? <Minus className="w-4 h-4 text-[#1A2FFB]" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="pt-6 pb-4 pl-8 sm:pl-16 grid grid-cols-1 md:grid-cols-12 gap-8 text-sm animate-in fade-in duration-200">
                    <div className="md:col-span-5 space-y-3">
                      <p className="text-zinc-300 font-light leading-relaxed">
                        {cap.tagline}
                      </p>
                      {/* Tech Stack */}
                      <div className="pt-3">
                        <span className="text-xs font-mono text-zinc-500 block mb-2">Core Tech:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {cap.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7 space-y-2">
                      <span className="text-xs font-mono text-[#1A2FFB] font-semibold block mb-2">
                        Key Deliverables &amp; Artifacts:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400 text-xs font-mono">
                        {cap.deliverables.map((del, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#1A2FFB]" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
