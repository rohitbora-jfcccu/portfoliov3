import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Sliders, RefreshCw } from 'lucide-react';

interface LiquidChromeTypographyProps {
  onInteract?: () => void;
}

export const LiquidChromeTypography: React.FC<LiquidChromeTypographyProps> = ({ onInteract }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chromaMode, setChromaMode] = useState<'iridescent' | 'mercury' | 'cobalt'>('iridescent');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const stateRef = useRef({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    vx: 0,
    vy: 0,
    isDown: false,
    mode: 'iridescent' as 'iridescent' | 'mercury' | 'cobalt',
    ripples: [] as { x: number; y: number; radius: number; maxRadius: number; strength: number; speed: number }[],
  });

  useEffect(() => {
    stateRef.current.mode = chromaMode;
  }, [chromaMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastX = 0;
    let lastY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      stateRef.current.targetX = x;
      stateRef.current.targetY = y;
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      stateRef.current.vx = dx * 0.04;
      stateRef.current.vy = dy * 0.04;

      // Add fluid ripple on meaningful movement
      if (Math.hypot(dx, dy) > 10 && stateRef.current.ripples.length < 10) {
        stateRef.current.ripples.push({
          x: clientX - rect.left,
          y: clientY - rect.top,
          radius: 6,
          maxRadius: Math.max(rect.width, rect.height) * 0.45,
          strength: 1.0,
          speed: 3.8,
        });
      }

      lastX = clientX;
      lastY = clientY;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      stateRef.current.isDown = true;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // High-energy impulse ring
      stateRef.current.ripples.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
        radius: 12,
        maxRadius: Math.max(rect.width, rect.height) * 0.65,
        strength: 2.2,
        speed: 4.8,
      });

      if (onInteract) onInteract();
    };

    const handlePointerUp = () => {
      stateRef.current.isDown = false;
    };

    canvas.addEventListener('mousemove', handlePointerMove, { passive: true });
    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    canvas.addEventListener('touchend', handlePointerUp);
    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mouseup', handlePointerUp);

    const render = () => {
      animationId = requestAnimationFrame(render);
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      const s = stateRef.current;
      // Spring settling towards pointer
      s.x += (s.targetX - s.x) * 0.08;
      s.y += (s.targetY - s.y) * 0.08;
      s.vx *= 0.92;
      s.vy *= 0.92;

      if (!prefersReducedMotion) {
        time += 0.022 + (s.isDown ? 0.03 : 0);
      }

      // Update ripple physics
      for (let i = s.ripples.length - 1; i >= 0; i--) {
        const rip = s.ripples[i];
        rip.radius += rip.speed;
        rip.strength *= 0.945;
        if (rip.strength < 0.02 || rip.radius > rip.maxRadius) {
          s.ripples.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // Monumental Letterforms Configuration
      const fontSize = Math.min(width * 0.3, height * 0.74);
      ctx.font = `900 ${fontSize}px 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw Text Mask for Source-In Clipping
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('BORA', cx, cy);
      ctx.globalCompositeOperation = 'source-in';

      // 2. Liquid Chrome Gradient Generation
      const px = s.x * width;
      const py = s.y * height;

      const grad = ctx.createLinearGradient(
        px * 0.45 + Math.sin(time * 0.8) * 150,
        0,
        width - px * 0.45 + Math.cos(time * 0.6) * 150,
        height
      );

      const mode = s.mode;
      if (mode === 'iridescent') {
        const hue = (time * 24) % 360;
        grad.addColorStop(0.0, `hsl(${hue}, 95%, 68%)`);
        grad.addColorStop(0.18, '#1A2FFB');
        grad.addColorStop(0.38, '#F0F1FA');
        grad.addColorStop(0.55, `hsl(${(hue + 125) % 360}, 90%, 65%)`);
        grad.addColorStop(0.72, '#FFFFFF');
        grad.addColorStop(0.88, '#1A2FFB');
        grad.addColorStop(1.0, `hsl(${(hue + 245) % 360}, 95%, 72%)`);
      } else if (mode === 'mercury') {
        grad.addColorStop(0.0, '#EAEBFA');
        grad.addColorStop(0.2, '#121218');
        grad.addColorStop(0.48, '#FFFFFF');
        grad.addColorStop(0.7, '#242534');
        grad.addColorStop(0.88, '#F0F1FA');
        grad.addColorStop(1.0, '#3C3E56');
      } else {
        grad.addColorStop(0.0, '#090E47');
        grad.addColorStop(0.25, '#1A2FFB');
        grad.addColorStop(0.48, '#A0B4FF');
        grad.addColorStop(0.68, '#FFFFFF');
        grad.addColorStop(0.88, '#1A2FFB');
        grad.addColorStop(1.0, '#060A2B');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 3. Multi-ring wave refraction with chromatic edge dispersion
      for (const rip of s.ripples) {
        // Outer refraction ring
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = mode === 'iridescent' 
          ? `rgba(26, 47, 251, ${rip.strength * 0.5})` 
          : `rgba(255, 255, 255, ${rip.strength * 0.4})`;
        ctx.lineWidth = Math.max(2, 6 * rip.strength);
        ctx.stroke();

        // Core specular ridge
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${rip.strength * 0.8})`;
        ctx.lineWidth = Math.max(3, 12 * rip.strength);
        ctx.stroke();
      }

      // 4. Dynamic Cursor Specular Flare
      const flare = ctx.createRadialGradient(px, py, 6, px, py, Math.max(width, height) * 0.55);
      flare.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
      flare.addColorStop(0.22, mode === 'mercury' ? 'rgba(240, 245, 255, 0.45)' : 'rgba(26, 47, 251, 0.65)');
      flare.addColorStop(0.65, 'rgba(240, 241, 250, 0.12)');
      flare.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = flare;
      ctx.fillRect(0, 0, width, height);

      // 5. Prismatic Light Streaks across letterforms
      for (let i = 0; i < 3; i++) {
        const sy = ((time * 80 + i * 160) % (height * 1.8)) - height * 0.4;
        const streak = ctx.createLinearGradient(0, sy, width, sy + 70);
        streak.addColorStop(0, 'transparent');
        streak.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)');
        streak.addColorStop(1, 'transparent');
        ctx.fillStyle = streak;
        ctx.fillRect(0, sy - 35, width, 70);
      }

      ctx.restore();

      // 6. Crisp Outlined Dimensional Bevel
      ctx.save();
      ctx.lineWidth = Math.max(2, fontSize * 0.016);
      const strokeGrad = ctx.createLinearGradient(0, 0, width, height);
      strokeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      strokeGrad.addColorStop(0.5, '#1A2FFB');
      strokeGrad.addColorStop(1, 'rgba(240, 241, 250, 0.6)');
      ctx.strokeStyle = strokeGrad;
      ctx.strokeText('BORA', cx, cy);
      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('touchend', handlePointerUp);
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mouseup', handlePointerUp);
    };
  }, []);

  return (
    <div
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-[#111116] border-y border-white/5 overflow-hidden flex flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Volumetric Glow */}
      <div
        className="absolute w-[680px] h-[340px] rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{
          background: chromaMode === 'iridescent'
            ? 'radial-gradient(circle, rgba(26,47,251,0.25) 0%, rgba(240,241,250,0.08) 55%, transparent 100%)'
            : chromaMode === 'cobalt'
            ? 'radial-gradient(circle, rgba(26,47,251,0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        }}
      />

      {/* Top Editorial Label & Shaders Control */}
      <div className="relative z-10 w-full max-w-6xl flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="text-[#1A2FFB] font-bold">02</span>
          <span>/</span>
          <span className="text-white font-semibold">SIGNATURE SHADER SCULPTURE</span>
          <span aria-hidden="true">·</span>
          <span>LIQUID-CHROME DISPERSION</span>
          <span className="text-zinc-600 hidden md:inline">· 60 FPS RIPPLE KINEMATICS</span>
        </div>

        {/* Shaders Mode Switch */}
        <div className="flex items-center gap-1.5 bg-[#16161D]/90 border border-white/10 p-1 rounded-lg backdrop-blur-md text-xs font-mono">
          <button
            onClick={() => setChromaMode('iridescent')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2FFB] ${
              chromaMode === 'iridescent' ? 'bg-[#1A2FFB] text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Holographic
          </button>
          <button
            onClick={() => setChromaMode('mercury')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2FFB] ${
              chromaMode === 'mercury' ? 'bg-white text-[#111116] shadow-sm font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Liquid Mercury
          </button>
          <button
            onClick={() => setChromaMode('cobalt')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2FFB] ${
              chromaMode === 'cobalt' ? 'bg-[#1A2FFB] text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Cobalt Alloy
          </button>
        </div>
      </div>

      {/* Interactive Canvas Viewport */}
      <div className="relative z-10 w-full max-w-6xl h-[240px] sm:h-[320px] md:h-[400px] lg:h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ touchAction: 'none' }}
          role="img"
          aria-label="Interactive BORA Liquid Chrome Typography sculpture responding to pointer movement"
        />
      </div>

      {/* Bottom Technical Indicator */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between text-xs font-mono text-zinc-500 mt-4 pt-4 border-t border-white/5">
        <span>POINTER SPEED CREATES SURFACE WAVE DISPERSION · CLICK TO EMIT IMPULSE</span>
        <span className="hidden sm:inline">GPU ACCELERATED CANVAS COMPOSITOR</span>
      </div>
    </div>
  );
};
