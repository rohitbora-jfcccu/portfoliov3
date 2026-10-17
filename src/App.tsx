import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero3D } from './components/Hero3D';
import { EditorialIntro } from './components/EditorialIntro';
import { LiquidChromeTypography } from './components/LiquidChromeTypography';
import { SelectedWork } from './components/SelectedWork';
import { AboutApproach } from './components/AboutApproach';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactFinale } from './components/ContactFinale';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Project, PROJECTS } from './data/projects';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Track global scroll progress for subtle glowing indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash || hash === 'home' || hash === 'index') {
        setCurrentRoute('home');
      } else if (hash === 'work') {
        setCurrentRoute('work');
      } else if (hash === 'about') {
        setCurrentRoute('about');
      } else if (hash === 'contact') {
        setCurrentRoute('contact');
      } else {
        const matched = PROJECTS.find((p) => p.id === hash);
        if (matched) {
          setSelectedProject(matched);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = project.id;
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    window.location.hash = currentRoute === 'home' ? '' : currentRoute;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#111116] text-[#F0F1FA] selection:bg-[#1A2FFB] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Radiant Electric-Blue Scroll Progress Indicator Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-[#1A2FFB] z-[60] transition-all duration-75 pointer-events-none"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px #1A2FFB, 0 0 4px #1A2FFB',
        }}
        aria-hidden="true"
      />

      {/* Global 3-Zone Navigation */}
      <Navigation
        currentRoute={currentRoute}
        onNavigate={navigateTo}
      />

      {/* Main Routed Content */}
      <main id="main-content">
        {currentRoute === 'home' && (
          <>
            {/* 1. Fullscreen Interactive 3D Hero */}
            <Hero3D
              onExploreClick={() => scrollToSection('selected-work-section')}
              onTalkClick={() => scrollToSection('contact-section')}
            />

            {/* Transition Bridge 1: Dark Obsidian to Soft Lavender */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-[#111116] via-[#1E2038] to-[#F0F1FA]" aria-hidden="true" />

            {/* 2. Editorial Typography-Led Introduction */}
            <div id="intro-section">
              <EditorialIntro onLearnMore={() => navigateTo('about')} />
            </div>

            {/* Transition Bridge 2: Soft Lavender to Dark Obsidian */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-[#F0F1FA] via-[#1C1D2E] to-[#111116]" aria-hidden="true" />

            {/* 3. Signature Interactive Liquid-Chrome Typography */}
            <div id="liquid-chrome-section">
              <LiquidChromeTypography />
            </div>

            {/* 4. Selected Work Showcase */}
            <div id="selected-work-section">
              <SelectedWork
                onSelectProject={handleSelectProject}
                onViewAllWork={() => navigateTo('work')}
              />
            </div>

            {/* Transition Bridge 3: Dark Obsidian to Light Philosophy Monograph */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-[#111116] via-[#1F223A] to-[#F5F6FC]" aria-hidden="true" />

            {/* 5. Creative Philosophy & 4 Governing Principles */}
            <div id="principles-section">
              <AboutApproach />
            </div>

            {/* Transition Bridge 4: Light Philosophy to Dark Capabilities */}
            <div className="h-16 sm:h-24 bg-gradient-to-b from-[#F5F6FC] via-[#1E2033] to-[#111116]" aria-hidden="true" />

            {/* 6. Capabilities & Structured Expertise */}
            <div id="capabilities-section">
              <CapabilitiesSection />
            </div>

            {/* 7. Contact Finale & Project Brief Generator */}
            <div id="contact-section">
              <ContactFinale onNavigate={navigateTo} />
            </div>
          </>
        )}

        {currentRoute === 'work' && (
          <WorkPage
            onSelectProject={handleSelectProject}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            onTalkClick={() => navigateTo('contact')}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            onNavigateHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Project Detail Modal with Live Interactive Simulator */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProject}
      />
    </div>
  );
}

export default App;
