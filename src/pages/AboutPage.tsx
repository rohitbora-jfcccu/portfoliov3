import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_IMAGE } from '../data/projects';
import { AboutApproach } from '../components/AboutApproach';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { SITE_CONFIG } from '../config/siteConfig';

interface AboutPageProps {
  onTalkClick?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onTalkClick }) => {
  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-24 px-6 sm:px-12 lg:px-20 bg-[#111116] text-[#F0F1FA]">
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24">
        {/* Page Hero Header */}
        <div className="space-y-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="text-[#1A2FFB] font-bold">ABOUT {SITE_CONFIG.studioName}</span>
            <span>/</span>
            <span>CREATIVE STUDIO MONOGRAPH</span>
            <span>·</span>
            <span>EST. {SITE_CONFIG.yearEstablished}</span>
          </div>

          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.02]">
            WE ENGINEER THE SENSORY DIGITAL FRONTIER.
          </h1>

          <p className="text-base sm:text-2xl text-zinc-300 font-light max-w-3xl leading-relaxed">
            {SITE_CONFIG.studioName} is an independent creative development practice. We believe digital artifacts should possess the same gravitas, material weight, and intentionality as bespoke physical architecture.
          </p>
        </div>

        {/* Studio Atelier Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-white/10 relative">
            <img
              src={STUDIO_IMAGE}
              alt="Atelier Space Architectural Concept Visualization"
              referrerPolicy="no-referrer"
              className="w-full h-[320px] sm:h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-xs font-mono text-zinc-300">
                <span className="text-white font-bold block mb-1">ATELIER ARCHITECTURAL CONCEPT</span>
                <span>Prototyping procedural shaders and tactile physical interfaces.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 text-sm text-zinc-300 font-light leading-relaxed">
            <h3 className="text-xs font-mono text-[#1A2FFB] uppercase tracking-wider font-semibold">
              01. The Studio Ethos
            </h3>
            <p>
              In an era inundated with homogenous web templates and disposable interfaces, {SITE_CONFIG.studioName} focuses exclusively on commissions requiring deep creative ambition and technical mastery.
            </p>
            <p>
              Every surface we render is calculated from first principles: custom GLSL refraction curves, frame-pacing tuned to high-refresh displays, and uncompromised accessibility.
            </p>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={onTalkClick}
                className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#1A2FFB] transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2FFB]"
              >
                <span>INITIATE STUDIO DIALOGUE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Studio Methodology & Principles */}
        <div className="rounded-2xl overflow-hidden">
          <AboutApproach />
        </div>

        {/* Capabilities Section */}
        <div className="rounded-2xl overflow-hidden">
          <CapabilitiesSection />
        </div>
      </div>
    </div>
  );
};
