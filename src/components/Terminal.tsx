import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const Terminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'welcome',
      command: 'init',
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-emerald-400 font-semibold">
            ⚡ Rohit Bora Developer Shell [v3.0.4-release]
          </p>
          <p className="text-zinc-400">
            Type <span className="text-indigo-400 font-semibold">'help'</span> to see available commands or click the shortcut chips below.
          </p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to command history for arrow-up / arrow-down navigation
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const tokens = trimmed.split(' ');
    const mainCommand = tokens[0].toLowerCase();
    const args = tokens.slice(1).join(' ').toLowerCase();

    let outputNode: React.ReactNode = null;

    switch (mainCommand) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-indigo-300 font-semibold">Available shell commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-zinc-300">
              <div><span className="text-cyan-400 font-medium">about</span> / <span className="text-cyan-400">whoami</span> — Overview &amp; bio</div>
              <div><span className="text-cyan-400 font-medium">skills</span> — Technical arsenal &amp; proficiency</div>
              <div><span className="text-cyan-400 font-medium">projects</span> — Key production engineering works</div>
              <div><span className="text-cyan-400 font-medium">contact</span> — Email &amp; social profiles</div>
              <div><span className="text-cyan-400 font-medium">cat resume</span> — Text curriculum vitae snapshot</div>
              <div><span className="text-cyan-400 font-medium">sudo hire</span> — Priority candidate acquisition</div>
              <div><span className="text-cyan-400 font-medium">date</span> — Display system time</div>
              <div><span className="text-cyan-400 font-medium">clear</span> — Flush console screen</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
      case 'about':
        outputNode = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-emerald-400 font-bold">{PERSONAL_INFO.name} (@{PERSONAL_INFO.handle})</p>
            <p className="text-zinc-300">{PERSONAL_INFO.title}</p>
            <p className="text-zinc-400 leading-relaxed">{PERSONAL_INFO.bio}</p>
            <p className="text-zinc-500 font-mono">Location: {PERSONAL_INFO.location} | Status: {PERSONAL_INFO.status}</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 py-1 text-xs font-mono">
            <p className="text-cyan-300 font-semibold">Core Technical Matrix:</p>
            <div className="space-y-1 text-zinc-300">
              <p><span className="text-indigo-400">Frontend:</span> React 19, TypeScript, Tailwind CSS, Next.js, Redux/Zustand, Vite</p>
              <p><span className="text-indigo-400">Backend:</span> Node.js, Express, Python (FastAPI/Flask), Java (Spring Boot), WebSockets</p>
              <p><span className="text-indigo-400">AI &amp; Data:</span> Gemini API, LangChain, Vector DBs / Embeddings, PyTorch, OpenCV</p>
              <p><span className="text-indigo-400">Database &amp; Infra:</span> PostgreSQL, MongoDB, Redis, Docker, Linux, CI/CD</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 py-1 text-xs">
            <p className="text-indigo-300 font-semibold">Featured Repositories &amp; Deployments:</p>
            <div className="space-y-1.5 font-mono">
              {PROJECTS.map((p) => (
                <div key={p.id} className="border-l-2 border-zinc-700 pl-2">
                  <span className="text-cyan-400 font-medium">{p.title}</span>: {p.tagline}
                  <div className="text-zinc-500 text-[11px]">
                    Tags: {p.tags.join(', ')} | <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">GitHub</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 py-1 text-xs font-mono">
            <p className="text-emerald-400 font-semibold">Transmission Channels:</p>
            <p className="text-zinc-300">Email: <span className="text-cyan-300">{PERSONAL_INFO.email}</span></p>
            <p className="text-zinc-300">GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">{PERSONAL_INFO.github}</a></p>
            <p className="text-zinc-300">LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">{PERSONAL_INFO.linkedin}</a></p>
          </div>
        );
        break;

      case 'cat':
        if (args === 'resume' || args === 'cv' || args === 'resume.txt') {
          outputNode = (
            <div className="p-3 bg-zinc-950/80 rounded border border-zinc-800 text-xs font-mono space-y-2 text-zinc-300">
              <p className="text-emerald-400 font-bold">=== ROHIT BORA — CURRICULUM VITAE ===</p>
              <p>Email: {PERSONAL_INFO.email} | GitHub: @{PERSONAL_INFO.handle}</p>
              <p>Education: B.Tech in CSE (Artificial Intelligence) — 2022 to 2026</p>
              <p>Focus: Distributed Systems, High-Concurrency APIs, LLM Agents &amp; RAG Architecture</p>
              <p className="text-zinc-400">Notice: Full PDF resume available on request via email or contact section below.</p>
            </div>
          );
        } else {
          outputNode = <p className="text-red-400 text-xs font-mono">cat: {args || 'file'}: No such file or directory. Try 'cat resume'.</p>;
        }
        break;

      case 'sudo':
        if (args.includes('hire')) {
          outputNode = (
            <div className="space-y-1.5 py-1 text-xs font-mono bg-emerald-950/30 border border-emerald-500/30 p-2 rounded">
              <p className="text-emerald-400 font-bold">Permission granted. Offer package initiated!</p>
              <p className="text-zinc-200">
                Rohit Bora is ready to interview and bring high impact to your engineering team.
              </p>
              <p className="text-indigo-300">
                Direct dispatch email: <a href={`mailto:${PERSONAL_INFO.email}?subject=Interview%20Invitation%20-%20Rohit%20Bora`} className="underline font-semibold">{PERSONAL_INFO.email}</a>
              </p>
            </div>
          );
        } else {
          outputNode = <p className="text-amber-400 text-xs font-mono">sudo: '{args}': Permission is granted only for 'sudo hire' 😉</p>;
        }
        break;

      case 'date':
        outputNode = <p className="text-zinc-300 text-xs font-mono">{new Date().toUTCString()}</p>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'matrix':
        outputNode = (
          <div className="font-mono text-emerald-500 text-xs leading-none select-none py-1 animate-pulse">
            01010010 01101111 01101000 01101001 01110100 00100000 01000010 01101111 01110010 01100001<br/>
            [SYS_INTEGRATION_OK] Neural link active. Building next-generation digital experiences.
          </div>
        );
        break;

      default:
        outputNode = (
          <p className="text-red-400 text-xs font-mono">
            zsh: command not found: {rawCmd}. Type <span className="text-cyan-400 font-semibold">'help'</span> for list of valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCmd,
        output: outputNode,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyPointer !== -1) {
        const nextIdx = historyPointer + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryPointer(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryPointer(-1);
          setInputVal('');
        }
      }
    }
  };

  const quickCommands = ['help', 'about', 'skills', 'projects', 'sudo hire', 'cat resume', 'clear'];

  return (
    <section id="terminal" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Terminal Header Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <TerminalIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Interactive Developer CLI</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-emerald-500/20">
                  LIVE
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Query candidate background, inspect tech stack, or trigger actions directly via shell.
              </p>
            </div>
          </div>

          {/* Quick command pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-zinc-500 font-mono hidden md:inline mr-1">Quick:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-[11px] font-mono transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Shell Window */}
        <div
          className={`rounded-2xl border border-zinc-800/90 bg-zinc-950 shadow-2xl overflow-hidden transition-all duration-300 font-mono ${
            isExpanded ? 'h-[580px]' : 'h-[420px]'
          } flex flex-col`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Top Bar with window controls */}
          <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:opacity-100 transition-opacity"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block hover:opacity-100 transition-opacity"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block hover:opacity-100 transition-opacity"></span>
              <span className="ml-2 text-xs text-zinc-400 font-medium">rohit@macbook-pro: ~/workspace/portfolio-v3</span>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([]);
                }}
                className="p-1 hover:text-white transition-colors"
                title="Clear screen"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-1 hover:text-white transition-colors"
                title={isExpanded ? 'Restore height' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed text-zinc-300">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-400 font-semibold">rohit@dev:~$</span>
                  <span className="text-zinc-100 font-semibold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Current Active Input Prompt */}
            <div className="flex items-center gap-2 text-zinc-200 pt-1">
              <span className="text-emerald-400 font-semibold whitespace-nowrap">rohit@dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                placeholder="type 'help' or command..."
                className="flex-1 bg-transparent text-zinc-100 focus:outline-none font-mono text-xs caret-emerald-400 placeholder:text-zinc-600"
              />
              <button
                onClick={() => executeCommand(inputVal)}
                className="text-zinc-500 hover:text-zinc-300 p-1"
                title="Execute command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Footer status bar */}
          <div className="px-4 py-1.5 bg-zinc-900/40 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 select-none">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Bash session online</span>
            </span>
            <span className="hidden sm:inline">UTF-8 | Node.js v22 | Vite</span>
          </div>
        </div>

      </div>
    </section>
  );
};
