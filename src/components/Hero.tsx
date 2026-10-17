import React, { useState } from 'react';
import { ArrowRight, Terminal as TerminalIcon, Github, Mail, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient mesh and glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[350px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Status pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-sm mb-6 hover:border-indigo-500/40 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{PERSONAL_INFO.status}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200">{PERSONAL_INFO.name}</span>.
            <br />
            <span className="text-zinc-300 text-3xl sm:text-4xl md:text-5xl font-bold">
              Full-Stack &amp; AI Systems Engineer.
            </span>
          </h1>

          {/* Subtitle / Bio */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-normal max-w-2xl mb-8 leading-relaxed">
            Final-year Computer Science (AI) engineer building low-latency distributed microservices, 
            graph-based autonomous AI agent pipelines, and polished, responsive web applications.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#terminal"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-mono text-xs font-medium border border-zinc-700/80 hover:border-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span>Launch Terminal CLI</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-300 hover:text-white font-mono text-xs border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
              title="Click to copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links & Quick Tags */}
          <div className="flex items-center gap-4 text-zinc-400 text-sm mb-12">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white hover:underline transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="font-mono text-xs">@{PERSONAL_INFO.handle}</span>
            </a>
            <span className="text-zinc-700">•</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-white hover:underline transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="font-mono text-xs">Direct Email</span>
            </a>
            <span className="text-zinc-700">•</span>
            <a
              href="#architecture"
              className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Architecture Demo</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm shadow-xl">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-3 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-300">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
