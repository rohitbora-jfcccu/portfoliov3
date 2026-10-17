import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, ArrowRight, Activity, Cpu, Server, Zap, ShieldCheck } from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  sub: string;
  durationMs: number;
  tokens?: number;
  status: 'idle' | 'running' | 'success';
}

export const SystemVisualizer: React.FC = () => {
  const [pipelineType, setPipelineType] = useState<'agent' | 'realtime'>('agent');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([
    'Pipeline initialized. Ready for execution trigger.',
  ]);

  const agentSteps: PipelineStep[] = [
    { id: 'ingest', name: 'Prompt Ingestion & Tokenizer', sub: 'BPE encoding + Sanitization', durationMs: 400, tokens: 48, status: 'idle' },
    { id: 'embed', name: 'Vector Search & Dense RAG', sub: 'HNSW index top-k=4 retrieval', durationMs: 650, tokens: 280, status: 'idle' },
    { id: 'dag', name: 'DAG Task Planner & Dispatch', sub: 'Multi-agent cycle detection', durationMs: 500, tokens: 120, status: 'idle' },
    { id: 'eval', name: 'LLM Multi-Turn Inference', sub: 'Gemini reasoning stream', durationMs: 900, tokens: 650, status: 'idle' },
    { id: 'guard', name: 'Guardrail & Output Validation', sub: 'Hallucination & schema check', durationMs: 350, tokens: 0, status: 'idle' },
  ];

  const realtimeSteps: PipelineStep[] = [
    { id: 'client', name: 'Optimistic Client Mutation', sub: 'Local Yjs state transaction', durationMs: 80, status: 'idle' },
    { id: 'ws', name: 'WebSocket Binary Frame', sub: 'Protobuf encoded frame', durationMs: 120, status: 'idle' },
    { id: 'crdt', name: 'CRDT Conflict Merge', sub: 'State vector convergence', durationMs: 150, status: 'idle' },
    { id: 'pubsub', name: 'Redis Cluster Pub/Sub', sub: 'Fan-out to connected edges', durationMs: 200, status: 'idle' },
    { id: 'ack', name: 'Authoritative Client Sync', sub: 'Sub-50ms roundtrip delivery', durationMs: 100, status: 'idle' },
  ];

  const activeSteps = pipelineType === 'agent' ? agentSteps : realtimeSteps;

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIdx(0);
    setLogs([`[0.00s] Initializing ${pipelineType === 'agent' ? 'NeuroFlow Agent' : 'PulseSync CRDT'} execution pipeline...`]);
  };

  useEffect(() => {
    if (!isRunning || currentStepIdx === -1) return;

    if (currentStepIdx < activeSteps.length) {
      const step = activeSteps[currentStepIdx];
      const timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          `[${((currentStepIdx + 1) * 0.25).toFixed(2)}s] ✔ Executed step: ${step.name} (${step.sub})`,
        ]);
        setCurrentStepIdx((prev) => prev + 1);
      }, step.durationMs);

      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
      setLogs((prev) => [
        ...prev,
        `[SUCCESS] Pipeline execution finalized with zero dropped packets and 100% convergence.`,
      ]);
    }
  }, [isRunning, currentStepIdx, activeSteps, pipelineType]);

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStepIdx(-1);
    setLogs(['Pipeline reset. Ready for trigger.']);
  };

  return (
    <section id="architecture" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive System Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Architecture Simulator
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Simulate real-time execution pipelines engineered by Rohit Bora — observe data flow, subagent orchestration, and CRDT conflict resolution.
            </p>
          </div>

          {/* Architecture Switcher */}
          <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => {
                setPipelineType('agent');
                resetSimulation();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                pipelineType === 'agent'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              NeuroFlow Agent DAG
            </button>
            <button
              onClick={() => {
                setPipelineType('realtime');
                resetSimulation();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                pipelineType === 'realtime'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              PulseSync CRDT Engine
            </button>
          </div>
        </div>

        {/* Simulator Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{pipelineType === 'agent' ? 'Autonomous Multi-Agent DAG Execution' : 'Sub-50ms Distributed CRDT State Sync'}</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Protocol: {pipelineType === 'agent' ? 'Graph RAG + SSE Stream' : 'WebSocket + Redis Pub/Sub Cluster'}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunning ? 'Processing Pipeline...' : 'Dispatch Packet'}</span>
              </button>
              <button
                onClick={resetSimulation}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-300 text-xs transition-colors cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Node Flow Diagram */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {activeSteps.map((step, idx) => {
                const isStepActive = isRunning && currentStepIdx === idx;
                const isStepCompleted = currentStepIdx > idx;

                return (
                  <div
                    key={step.id}
                    className={`relative rounded-xl p-4 border transition-all duration-300 flex flex-col justify-between ${
                      isStepActive
                        ? 'bg-indigo-950/50 border-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.03]'
                        : isStepCompleted
                        ? 'bg-zinc-950/80 border-emerald-500/50'
                        : 'bg-zinc-950/40 border-zinc-800/80 opacity-70'
                    }`}
                  >
                    <div>
                      {/* Step Indicator */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-500">
                          NODE 0{idx + 1}
                        </span>
                        {isStepCompleted ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : isStepActive ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-zinc-700" />
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-white mb-1">{step.name}</h4>
                      <p className="text-[11px] text-zinc-400 leading-snug">{step.sub}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>{step.durationMs}ms</span>
                      {step.tokens !== undefined && <span>{step.tokens} tokens</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Execution Terminal Log */}
          <div className="mt-4 rounded-xl bg-zinc-950 border border-zinc-800/90 p-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/80 text-[11px] text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Runtime Telemetry Feed</span>
              </span>
              <span className="text-zinc-500">Buffer: {logs.length} frames</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto text-zinc-300">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
