import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Sparkles, ChevronDown, ChevronUp, Move } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface Hero3DProps {
  onExploreClick?: () => void;
  onTalkClick?: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onExploreClick, onTalkClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [materialFinish, setMaterialFinish] = useState<'cobalt' | 'chrome' | 'obsidian'>('cobalt');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    speed: 1,
    finish: 'cobalt' as 'cobalt' | 'chrome' | 'obsidian',
    isPointerDown: false,
    dragDeltaX: 0,
    dragDeltaY: 0,
    reducedMotion: false,
  });

  useEffect(() => {
    stateRef.current.speed = speedMultiplier;
    stateRef.current.finish = materialFinish;
  }, [speedMultiplier, materialFinish]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.reducedMotion = mediaQuery.matches;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x111116, 0.035);

    // Perspective Camera with responsive aspect ratio compensation
    const aspect = width / height;
    const fov = aspect < 0.8 ? 54 : aspect < 1.2 ? 46 : 38;
    const cameraZ = aspect < 0.8 ? 10.4 : aspect < 1.2 ? 9.2 : 8.2;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
    camera.position.set(0, 0, cameraZ);

    // WebGL Renderer
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Studio Environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111116, 1.4);
    scene.add(hemiLight);

    // Cursor-tracking specular point light
    const cursorLight = new THREE.PointLight(0x4466ff, 5.2, 16);
    cursorLight.position.set(0, 0, 5);
    scene.add(cursorLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x1a2ffb, 5.0);
    rimLight.position.set(-8, -4, -4);
    scene.add(rimLight);

    const softFillLight = new THREE.DirectionalLight(0xf0f1fa, 1.6);
    softFillLight.position.set(0, -6, 5);
    scene.add(softFillLight);

    // Master Sculptural Group
    const masterGroup = new THREE.Group();
    // Art-directed spatial offset on desktop to harmonize with left-aligned headline
    if (aspect >= 1.2) {
      masterGroup.position.x = 1.35;
      masterGroup.position.y = 0;
    } else if (aspect < 0.8) {
      masterGroup.position.x = 0;
      masterGroup.position.y = 0.55;
    } else {
      masterGroup.position.x = 0.6;
      masterGroup.position.y = 0.2;
    }
    scene.add(masterGroup);

    // 1. Primary Mobius / Torus Knot Ribbon
    const ribbonGeom = new THREE.TorusKnotGeometry(1.65, 0.44, 220, 32, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a2ffb,
      metalness: 0.96,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      sheen: 0.85,
      sheenColor: new THREE.Color(0x88aaff),
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
    masterGroup.add(ribbonMesh);

    // 2. Counter-rotating outer titanium gimbal ring
    const outerRingGeom = new THREE.TorusGeometry(2.75, 0.065, 28, 140);
    const outerRingMat = new THREE.MeshPhysicalMaterial({
      color: 0xe6e8f8,
      metalness: 0.98,
      roughness: 0.18,
      clearcoat: 1.0,
    });
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
    outerRing.rotation.x = Math.PI / 2.8;
    masterGroup.add(outerRing);

    // 3. Central Crystalline Refractive Core
    const crystalGeom = new THREE.IcosahedronGeometry(0.9, 2);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.93,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.6,
      thickness: 1.3,
      specularIntensity: 1.0,
      attenuationColor: new THREE.Color(0x1a2ffb),
      attenuationDistance: 0.55,
    });
    const crystalMesh = new THREE.Mesh(crystalGeom, crystalMat);
    masterGroup.add(crystalMesh);

    // 4. Instanced Atmospheric Dust Nodes
    const particleCount = 64;
    const particleGeom = new THREE.SphereGeometry(0.035, 10, 10);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0x1a2ffb,
      emissiveIntensity: 0.6,
    });
    const instancedParticles = new THREE.InstancedMesh(particleGeom, particleMat, particleCount);
    const dummy = new THREE.Object3D();

    const particleOffsets: { radius: number; speed: number; yOffset: number; phi: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.5;
      const speed = 0.2 + Math.random() * 0.35;
      const yOffset = (Math.random() - 0.5) * 3.0;
      const phi = Math.random() * Math.PI * 2;
      particleOffsets.push({ radius, speed, yOffset, phi });

      dummy.position.set(Math.cos(phi) * radius, yOffset, Math.sin(phi) * radius);
      dummy.scale.setScalar(0.6 + Math.random() * 0.8);
      dummy.updateMatrix();
      instancedParticles.setMatrixAt(i, dummy.matrix);
    }
    instancedParticles.instanceMatrix.needsUpdate = true;
    masterGroup.add(instancedParticles);

    // 5. Contact Soft Shadow Ground Plane
    const shadowGeom = new THREE.PlaneGeometry(10, 10);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.18)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.85;
    scene.add(shadowPlane);

    // Pointer move listener
    let lastClientX = 0;
    let lastClientY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -(clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetX = normX;
      stateRef.current.targetY = normY;

      if (stateRef.current.isPointerDown) {
        const dx = clientX - lastClientX;
        const dy = clientY - lastClientY;
        stateRef.current.dragDeltaX += dx * 0.005;
        stateRef.current.dragDeltaY += dy * 0.005;
      }

      lastClientX = clientX;
      lastClientY = clientY;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      stateRef.current.isPointerDown = true;
      setIsInteracting(true);
      if ('touches' in e && e.touches.length > 0) {
        lastClientX = e.touches[0].clientX;
        lastClientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        lastClientX = e.clientX;
        lastClientY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      stateRef.current.isPointerDown = false;
      setIsInteracting(false);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('mousedown', handlePointerDown);
    canvasEl.addEventListener('touchstart', handlePointerDown, { passive: true });
    canvasEl.addEventListener('touchmove', handlePointerMove, { passive: true });
    canvasEl.addEventListener('touchend', handlePointerUp);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      const newAspect = newW / newH;
      camera.aspect = newAspect;
      camera.fov = newAspect < 0.8 ? 54 : newAspect < 1.2 ? 46 : 38;
      camera.position.z = newAspect < 0.8 ? 10.4 : newAspect < 1.2 ? 9.2 : 8.2;

      // Update position dynamically
      if (newAspect >= 1.2) {
        masterGroup.position.x = 1.35;
        masterGroup.position.y = 0;
      } else if (newAspect < 0.8) {
        masterGroup.position.x = 0;
        masterGroup.position.y = 0.55;
      } else {
        masterGroup.position.x = 0.6;
        masterGroup.position.y = 0.2;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();
      const speed = stateRef.current.reducedMotion ? 0 : stateRef.current.speed;

      // Update finish
      const currentFinish = stateRef.current.finish;
      if (currentFinish === 'cobalt') {
        ribbonMat.color.setHex(0x1a2ffb);
        ribbonMat.metalness = 0.96;
        ribbonMat.roughness = 0.14;
        ribbonMat.sheenColor.setHex(0x88aaff);
      } else if (currentFinish === 'chrome') {
        ribbonMat.color.setHex(0xffffff);
        ribbonMat.metalness = 0.98;
        ribbonMat.roughness = 0.06;
        ribbonMat.sheenColor.setHex(0xffffff);
      } else if (currentFinish === 'obsidian') {
        ribbonMat.color.setHex(0x14141a);
        ribbonMat.metalness = 0.88;
        ribbonMat.roughness = 0.22;
        ribbonMat.sheenColor.setHex(0x444455);
      }

      // Pointer interpolation
      stateRef.current.mouseX = THREE.MathUtils.damp(stateRef.current.mouseX, stateRef.current.targetX, 4, delta);
      stateRef.current.mouseY = THREE.MathUtils.damp(stateRef.current.mouseY, stateRef.current.targetY, 4, delta);

      // Specular light position
      cursorLight.position.x = stateRef.current.mouseX * 6.5;
      cursorLight.position.y = stateRef.current.mouseY * 4.5;

      // Damped drag momentum
      stateRef.current.dragDeltaX = THREE.MathUtils.damp(stateRef.current.dragDeltaX, 0, 3, delta);
      stateRef.current.dragDeltaY = THREE.MathUtils.damp(stateRef.current.dragDeltaY, 0, 3, delta);

      // Rotations
      ribbonMesh.rotation.x += (delta * 0.42 * speed) + stateRef.current.dragDeltaY;
      ribbonMesh.rotation.y += (delta * 0.38 * speed) + stateRef.current.dragDeltaX;

      outerRing.rotation.z -= delta * 0.22 * speed;
      outerRing.rotation.x += delta * 0.14 * speed;

      crystalMesh.rotation.y -= delta * 0.45 * speed;

      // Particles
      for (let i = 0; i < particleCount; i++) {
        const p = particleOffsets[i];
        p.phi += delta * p.speed * speed;
        dummy.position.set(
          Math.cos(p.phi) * p.radius,
          p.yOffset + Math.sin(elapsedTime * 1.5 + i) * 0.2,
          Math.sin(p.phi) * p.radius
        );
        dummy.scale.setScalar(0.7 + Math.sin(elapsedTime * 2 + i) * 0.25);
        dummy.updateMatrix();
        instancedParticles.setMatrixAt(i, dummy.matrix);
      }
      instancedParticles.instanceMatrix.needsUpdate = true;

      // Parallax and breathing float
      const targetGroupX = stateRef.current.mouseY * 0.32;
      const targetGroupY = stateRef.current.mouseX * 0.55;
      masterGroup.rotation.x = THREE.MathUtils.damp(masterGroup.rotation.x, targetGroupX, 3.5, delta);
      masterGroup.rotation.y = THREE.MathUtils.damp(masterGroup.rotation.y, targetGroupY, 3.5, delta);
      const floatBaseY = (container.clientWidth || window.innerWidth) < 768 ? 0.55 : 0;
      masterGroup.position.y = THREE.MathUtils.damp(masterGroup.position.y, floatBaseY + Math.sin(elapsedTime * 1.1) * 0.15, 2.5, delta);

      renderer.render(scene, camera);
    };

    renderer.compile(scene, camera);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      canvasEl.removeEventListener('mousedown', handlePointerDown);
      canvasEl.removeEventListener('touchstart', handlePointerDown);
      canvasEl.removeEventListener('touchmove', handlePointerMove);
      canvasEl.removeEventListener('touchend', handlePointerUp);

      ribbonGeom.dispose();
      ribbonMat.dispose();
      outerRingGeom.dispose();
      outerRingMat.dispose();
      crystalGeom.dispose();
      crystalMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#111116] pt-24 sm:pt-28 pb-10 px-6 sm:px-12 lg:px-20">
      {/* 3D Scene WebGL Isolated Mount */}
      <div
        ref={mountRef}
        className={`absolute inset-0 z-0 ${isInteracting ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ touchAction: 'pan-y' }}
        aria-label="Interactive 3D Procedural Ribbon Sculpture"
      />

      {/* Atmospheric subtle grid & studio perimeter vignette */}
      <div className="absolute inset-0 bg-subtle-grid opacity-20 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-[#111116]/80 pointer-events-none z-[1]" />
      {/* Editorial Scrim to preserve 100% typography legibility */}
      <div className="absolute top-0 left-0 w-full lg:w-3/5 h-full bg-gradient-to-r from-[#111116]/95 via-[#111116]/65 to-transparent pointer-events-none z-[1]" />

      {/* Hero Typographic Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center flex-1 pointer-events-none select-none my-auto pt-6 sm:pt-0">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Authentic Technical Kicker */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-400 font-mono tracking-widest">
            <span className="text-[#1A2FFB] font-bold">{SITE_CONFIG.studioName} ATELIER</span>
            <span aria-hidden="true">·</span>
            <span>{SITE_CONFIG.tagline}</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-500 hidden sm:inline">{SITE_CONFIG.technicalBadge}</span>
          </div>

          {/* Monumental Headline with refined contrast and text-shadow */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.85rem] font-black tracking-tighter text-white leading-[0.98] sm:leading-[0.94] text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            WE TURN IDEAS INTO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#1A2FFB]">
              EXTRAORDINARY
            </span>{' '}
            <br />
            DIGITAL EXPERIENCES.
          </h1>

          {/* Supporting Copy & Micro Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start pt-2">
            <p className="md:col-span-8 text-sm sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {SITE_CONFIG.subtagline}
            </p>

            <div className="md:col-span-4 hidden md:flex flex-col gap-1 text-xs font-mono text-zinc-400 border-l border-white/15 pl-6 bg-[#111116]/40 p-2 rounded backdrop-blur-sm">
              <span className="text-zinc-200 font-semibold">INTERACTIVE COMMISSION SPEC</span>
              <span>PBR Studio Environment</span>
              <span>Dual-Orbit Torus Geometry</span>
              <span>Dynamic Specular Highlights</span>
            </div>
          </div>

          {/* Action Affordances */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4 pointer-events-auto">
            <button
              onClick={onExploreClick}
              className="px-6 sm:px-7 py-3.5 sm:py-4 bg-white text-[#111116] hover:bg-[#F0F1FA] font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
            >
              <span>Explore Selected Work</span>
              <span className="text-xs text-zinc-500 font-mono">↓</span>
            </button>
            <button
              onClick={onTalkClick}
              className="px-6 sm:px-7 py-3.5 sm:py-4 bg-[#16161D]/90 hover:bg-[#1A2FFB] text-white border border-white/10 hover:border-transparent font-semibold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2FFB]"
            >
              Initiate Project Dialogue
            </button>
          </div>
        </div>
      </div>

      {/* Ergonomic Collapsible 3D Bottom Control Dock */}
      <div className="relative z-20 w-full flex flex-col items-center pointer-events-auto pt-6">
        <div className="bg-[#16161D]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md px-4 py-3 transition-all duration-300 max-w-xl w-full">
          {/* Header row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-[#1A2FFB]" />
              <span className="font-semibold text-white">REAL-TIME 3D SCULPTURE</span>
              <span className="text-zinc-500 hidden sm:inline">· PBR STUDIO RIG</span>
            </div>

            <button
              onClick={() => setIsDockCollapsed(!isDockCollapsed)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A2FFB]"
              aria-expanded={!isDockCollapsed}
            >
              <span>{isDockCollapsed ? "Inspect Controls" : "Zen Mode"}</span>
              {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Controls body */}
          {!isDockCollapsed && (
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs font-mono">
              {/* Finish presets */}
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Finish:</span>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg">
                  <button
                    onClick={() => setMaterialFinish('cobalt')}
                    className={`px-2.5 py-1 rounded transition-colors font-medium cursor-pointer ${
                      materialFinish === 'cobalt' ? 'bg-[#1A2FFB] text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Cobalt
                  </button>
                  <button
                    onClick={() => setMaterialFinish('chrome')}
                    className={`px-2.5 py-1 rounded transition-colors font-medium cursor-pointer ${
                      materialFinish === 'chrome' ? 'bg-white text-[#111116] shadow-sm font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Chrome
                  </button>
                  <button
                    onClick={() => setMaterialFinish('obsidian')}
                    className={`px-2.5 py-1 rounded transition-colors font-medium cursor-pointer ${
                      materialFinish === 'obsidian' ? 'bg-zinc-700 text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Obsidian
                  </button>
                </div>
              </div>

              {/* Kinetic speed */}
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Speed:</span>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg">
                  <button
                    onClick={() => setSpeedMultiplier(0)}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      speedMultiplier === 0 ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    0x
                  </button>
                  <button
                    onClick={() => setSpeedMultiplier(1)}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      speedMultiplier === 1 ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    1x
                  </button>
                  <button
                    onClick={() => setSpeedMultiplier(2.4)}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      speedMultiplier === 2.4 ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    2x
                  </button>
                </div>
              </div>

              {/* Interaction Hint */}
              <div className="hidden sm:flex items-center gap-1.5 text-zinc-400">
                <Move className="w-3 h-3 text-[#1A2FFB]" />
                <span>Drag to rotate</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
