import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate real-world form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something High-Impact
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Interested in hiring, discussing a software engineering opportunity, or collaborating on an AI system?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Direct Contact
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400">Primary Inbox</span>
                    <p className="text-sm font-semibold text-white font-mono break-all">
                      {PERSONAL_INFO.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <p className="text-xs font-mono text-emerald-400 mt-3 pt-3 border-t border-zinc-800/80">
                  ✔ Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Profiles & Location */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Engineering Network
              </span>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">GitHub</p>
                    <p className="text-xs font-mono text-zinc-500">@{PERSONAL_INFO.handle}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-400 group-hover:underline">Visit Profile &rarr;</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                  <div>
                    <p className="text-sm font-semibold text-white">LinkedIn</p>
                    <p className="text-xs font-mono text-zinc-500">Professional Network</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-400 group-hover:underline">Connect &rarr;</span>
              </a>

              <div className="flex items-center gap-2 pt-2 text-xs font-mono text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-cyan-950/20 border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase">
                  Candidate Status
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Available for full-time Software Engineer positions, distributed systems roles, and AI engineering internships.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Send a Direct Dispatch</span>
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Fill in the details below to transmit a message directly to Rohit Bora.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                    Thank you for reaching out. Rohit will review your note and respond back shortly at your provided email.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-indigo-400 hover:underline pt-2 font-mono"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Software Engineering Role / Technical Discussion"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Rohit, I saw your work on NeuroFlow and would love to chat about..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
