import React, { useState, useEffect } from 'react';
import { Terminal, Github, Mail, Menu, X, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenTerminalModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'terminal', 'projects', 'skills', 'architecture', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Terminal', href: '#terminal', id: 'terminal' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Architecture', href: '#architecture', id: 'architecture' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#about"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-indigo-400 font-mono font-medium border border-zinc-700/60">
                v3.0
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-mono tracking-tight -mt-0.5 hidden sm:block">
              fullstack_engineer.ts
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800/60 text-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-indigo-600/30 text-indigo-300 shadow-sm border border-indigo-500/30'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA / Socials */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/70 border border-transparent hover:border-zinc-700/60 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Send Email"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/70 border border-transparent hover:border-zinc-700/60 transition-all"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Connect</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="#contact"
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white"
          >
            Contact
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-900/95 border-b border-zinc-800 backdrop-blur-xl px-4 pt-3 pb-6 mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-white bg-indigo-600/20 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {PERSONAL_INFO.status}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
