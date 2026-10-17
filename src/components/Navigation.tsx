import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface NavigationProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation (ESC to close menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Prevent background scrolling when full-screen menu overlay is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Index' },
    { id: 'work', label: 'Selected Work' },
    { id: 'about', label: 'Creative Studio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 3-Zone Top Bar Contract */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#111116]/90 backdrop-blur-md border-b border-white/5 py-3.5 sm:py-4'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-2xl font-black tracking-tighter text-white hover:text-[#1A2FFB] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
            aria-label={`${SITE_CONFIG.studioName} Studio Home`}
          >
            <span>{SITE_CONFIG.studioName}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A2FFB]" aria-hidden="true" />
          </button>

          {/* Zone 2: 4 single-line nav links with clean underline indicator */}
          <nav 
            className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-300"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2FFB] ${
                    isActive ? 'text-white font-medium' : 'hover:text-white text-zinc-400'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1A2FFB] rounded-full"
                      aria-hidden="true" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + custom Menu toggle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={() => handleLinkClick('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#111116] hover:bg-[#1A2FFB] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A2FFB]"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Custom Animated Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Immersive Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[#111116]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-14 lg:p-20 transition-all duration-300 animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Subtle noise background grid */}
          <div className="absolute inset-0 bg-subtle-grid opacity-20 pointer-events-none" />

          {/* Top Bar inside overlay */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-500 pt-12 sm:pt-0">
            <span>INDEX &amp; EXPLORATION</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>

          {/* Massive Editorial Menu Links */}
          <div className="relative z-10 max-w-4xl space-y-4 sm:space-y-6 my-auto">
            {navLinks.map((link, idx) => {
              const isActive = currentRoute === link.id;
              return (
                <div key={link.id} className="group flex items-baseline gap-4 sm:gap-8">
                  <span className="text-xs sm:text-sm font-mono text-zinc-600 group-hover:text-[#1A2FFB] transition-colors">
                    0{idx + 1}.
                  </span>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-3xl sm:text-6xl md:text-7xl font-black tracking-tighter text-left transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2FFB] ${
                      isActive 
                        ? 'text-white translate-x-2 sm:translate-x-3' 
                        : 'text-zinc-500 hover:text-white hover:translate-x-2 sm:hover:translate-x-3'
                    }`}
                  >
                    {link.label}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom metadata strip */}
          <div className="relative z-10 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">{SITE_CONFIG.studioName} CREATIVE PRACTICE</span>
              <span aria-hidden="true">·</span>
              <span>EST. {SITE_CONFIG.yearEstablished}</span>
              <span aria-hidden="true">·</span>
              <span>EXPERIENCE ARCHITECTURE</span>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href={`mailto:${SITE_CONFIG.contactEmail}`} 
                className="hover:text-white text-[#1A2FFB] font-semibold transition-colors"
              >
                {SITE_CONFIG.contactEmail}
              </a>
              <span className="text-zinc-600 hidden sm:inline">/</span>
              <span className="text-zinc-500">{SITE_CONFIG.locationLabel}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
