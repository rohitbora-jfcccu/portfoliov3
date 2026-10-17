import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Globe } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface ContactFinaleProps {
  onNavigate?: (route: string) => void;
}

export const ContactFinale: React.FC<ContactFinaleProps> = ({ onNavigate }) => {
  const [selectedService, setSelectedService] = useState<string>('Luxury E-Commerce');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('3–6 Months');
  const [selectedBudget, setSelectedBudget] = useState<string>('$50k–$100k');
  const [clientName, setClientName] = useState<string>('');
  const [projectBrief, setProjectBrief] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const services = [
    'Luxury E-Commerce',
    '3D & WebGL Spatial',
    'Enterprise ERP Platform',
    'Creative Flagship Experience'
  ];

  const timelines = ['1–3 Months', '3–6 Months', 'Ongoing Partnership'];
  const budgets = ['$25k–$50k', '$50k–$100k', '$100k+'];

  const recipientEmail = SITE_CONFIG.contactEmail;

  // Construct formatted inquiry text
  const inquirySubject = `Commission Inquiry: ${selectedService} — ${clientName || 'New Client'}`;
  const inquiryBody = `Hello BORA Team,

I would like to inquire about initiating a project with your creative practice.

Project Details:
- Practice Discipline: ${selectedService}
- Anticipated Timeline: ${selectedTimeline}
- Budget Tier: ${selectedBudget}
- Client / Brand: ${clientName || 'Not specified'}

Project Overview & Intent:
${projectBrief || 'We are seeking an award-winning digital experience with bespoke craft and performance.'}

Looking forward to discussing next steps.`;

  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(inquirySubject)}&body=${encodeURIComponent(inquiryBody)}`;

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(`${inquirySubject}\n\n${inquiryBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="relative w-full pt-24 sm:pt-28 pb-12 px-6 sm:px-12 lg:px-20 bg-[#111116] text-[#F0F1FA] border-t border-white/10 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1A2FFB]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 relative z-10">
        {/* Massive Concluding Statement */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="text-[#1A2FFB] font-bold">06</span>
            <span>/</span>
            <span className="uppercase tracking-wider text-white">COMMISSIONS &amp; INQUIRIES</span>
            <span>·</span>
            <span>2026/2027 CALENDAR</span>
          </div>
          <h2 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[0.98]">
            HAVE A BIG IDEA? <br />
            <span className="text-[#1A2FFB]">LET'S MAKE IT REAL.</span>
          </h2>
          <p className="text-base sm:text-xl text-zinc-300 font-light max-w-2xl pt-2">
            We partner with ambitious founders, visionary brands, and forward-thinking enterprises.
          </p>
        </div>

        {/* Interactive Scope & Inquiry Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#16161D] border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12">
          {/* Left Column: Scope Builder */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-zinc-400">
              <span className="text-[#1A2FFB] font-semibold">PROJECT SCOPE BUILDER</span>
              <span>CONFIGURE BRIEF</span>
            </div>

            {/* Service Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-zinc-400 block uppercase">
                1. Select Desired Discipline
              </label>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedService(s)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB] ${
                      selectedService === s
                        ? 'bg-[#1A2FFB] text-white font-semibold shadow-md'
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline & Budget Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-mono text-zinc-400 block uppercase">
                  2. Target Timeline
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {timelines.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTimeline(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB] ${
                        selectedTimeline === t
                          ? 'bg-white text-[#111116] font-semibold'
                          : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono text-zinc-400 block uppercase">
                  3. Budget Tier
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBudget(b)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB] ${
                        selectedBudget === b
                          ? 'bg-white text-[#111116] font-semibold'
                          : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                  Your Organization or Brand Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Atelier Noir / Quantum Robotics"
                  className="w-full bg-[#111116] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#1A2FFB]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1.5 uppercase">
                  Project Intent / Core Objectives
                </label>
                <textarea
                  rows={3}
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  placeholder="Briefly describe what you are looking to build or transform..."
                  className="w-full bg-[#111116] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#1A2FFB] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Instant Action & Email Composer Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#111116] p-6 sm:p-8 rounded-xl border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-[#1A2FFB] font-semibold">AUTOMATED DISPATCH</span>
                <span>DIRECT TO INBOX</span>
              </div>

              <div className="bg-black/50 p-4 rounded-lg border border-white/5 space-y-2 font-mono text-xs text-zinc-300">
                <div className="text-zinc-500 truncate">To: {recipientEmail}</div>
                <div className="text-zinc-500 truncate">Subject: {inquirySubject}</div>
                <div className="pt-2 text-zinc-400 whitespace-pre-line border-t border-white/5 max-h-36 overflow-y-auto">
                  {inquiryBody}
                </div>
              </div>
            </div>

            {/* Launch & Copy Actions */}
            <div className="space-y-3 pt-4">
              <a
                href={mailtoUrl}
                className="w-full py-3.5 bg-[#1A2FFB] hover:bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Mail className="w-4 h-4" />
                <span>Launch Email in Mail Client</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyInquiry}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Inquiry Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Formatted Brief to Clipboard</span>
                  </>
                )}
              </button>

              <div className="text-center text-xs font-mono text-zinc-500 pt-1">
                Direct contact: <a href={`mailto:${recipientEmail}`} className="text-zinc-300 underline hover:text-white">{recipientEmail}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Polished Editorial Footer */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-white font-black text-sm tracking-tight">{SITE_CONFIG.studioName}</span>
            <span className="text-zinc-600">/</span>
            <span>© {SITE_CONFIG.yearEstablished} {SITE_CONFIG.studioName} CREATIVE PRACTICE</span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline">ALL RIGHTS RESERVED</span>
          </div>

          {/* Social Links from siteConfig */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {SITE_CONFIG.socials.map((soc) => (
              <a
                key={soc.label}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {soc.label}
              </a>
            ))}
          </div>

          {/* Location indicator */}
          <div className="flex items-center gap-2 text-zinc-500">
            <Globe className="w-3.5 h-3.5 text-[#1A2FFB]" />
            <span>{SITE_CONFIG.locationLabel.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
