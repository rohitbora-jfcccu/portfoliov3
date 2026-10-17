export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'E-Commerce' | 'Spatial 3D' | 'Enterprise Systems';
  year: string;
  image: string;
  accentColor: string;
  overview: string;
  conceptNote: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  techStack: string[];
  specifications: { label: string; value: string }[];
  interactiveFeature: {
    title: string;
    description: string;
    type: 'eyewear-tint' | 'lookbook-preview' | 'system-nodes';
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'aura-atelier',
    title: 'AURA Atelier',
    subtitle: 'High-Fashion Digital Flagship & Tactile Lookbook Concept',
    category: 'E-Commerce',
    year: '2026',
    image: '/src/assets/images/fashion_ecommerce_aura_1792214165834.jpg',
    accentColor: '#1A2FFB',
    overview: 'An avant-garde luxury e-commerce prototype exploring architectural grid systems, fabric draping physics simulations, and responsive headless checkout choreography.',
    conceptNote: 'Concept Prototype Demonstration — Exploring tactile digital fashion presentation.',
    challenge: 'Conventional luxury retail catalogs use repetitive flat grids that fail to communicate the tactile drape, material density, and sculptural silhouette of tailored garments.',
    solution: 'Designed an editorial monograph interface featuring dynamic lookbook staging, tactile weave weight inspectors, and an instantaneous modular checkout drawer.',
    deliverables: [
      'Interactive Art Direction',
      'Editorial Grid Typography',
      'Tactile Fabric Weave Inspector',
      'Headless Storefront Architecture'
    ],
    techStack: ['React 19', 'Three.js', 'Tailwind CSS', 'TypeScript', 'Web Audio API'],
    specifications: [
      { label: 'Target Frame Rate', value: '60 FPS' },
      { label: 'Asset Payload Budget', value: '< 1.2 MB' },
      { label: 'Checkout Step Count', value: '2 Steps' }
    ],
    interactiveFeature: {
      title: 'Tactile Garment Material Inspector',
      description: 'Switch between tailored wool, raw organza silk, and membrane nylon to test visual drape characteristics.',
      type: 'lookbook-preview'
    }
  },
  {
    id: 'lumen-optical',
    title: 'LUMEN Optical',
    subtitle: 'Spatial Eyewear & Photochromic Glass WebGL Laboratory',
    category: 'Spatial 3D',
    year: '2026',
    image: '/src/assets/images/fashion_glass_lumen_1792214165080.jpg',
    accentColor: '#1A2FFB',
    overview: 'An interactive real-time 3D optical laboratory allowing users to test photochromic UV transitions, titanium frame specular reflections, and micro-refractive indices directly in the browser.',
    conceptNote: 'Interactive WebGL Demonstrator — Physically-based lens refraction in real-time.',
    challenge: 'Digital eyewear retail traditionally relies on static photos that cannot depict real optical glass refraction, ambient light absorption, or dynamic photochromic tinting.',
    solution: 'Engineered a real-time shader pipeline featuring environment map reflections, refractive index adjustments, and interactive photochromic gradient transitions.',
    deliverables: [
      'Real-Time PBR Glass Shaders',
      'Refraction & Dispersion System',
      'Photochromic UV Simulator',
      'Spatial Product Architecture'
    ],
    techStack: ['Three.js', 'WebGL 2.0', 'PBR Shaders', 'TypeScript', 'Tailwind CSS'],
    specifications: [
      { label: 'PBR Texture Resolution', value: '2048 x 2048' },
      { label: 'Shader Pass Latency', value: '< 16.6 ms' },
      { label: 'Interactive Views', value: '360° Free Orbit' }
    ],
    interactiveFeature: {
      title: 'Photochromic Lens & Frame Customizer',
      description: 'Dynamically toggle between Electric Cobalt, Prismatic Aurora, and Titanium Smoke lens filters with simulated refraction indexes.',
      type: 'eyewear-tint'
    }
  },
  {
    id: 'kinetic-core',
    title: 'KINETIC Operations',
    subtitle: 'Modular Enterprise Intelligence & Logistics Engine Concept',
    category: 'Enterprise Systems',
    year: '2026',
    image: '/src/assets/images/erp_business_kinetic_1792214165796.jpg',
    accentColor: '#1A2FFB',
    overview: 'A next-generation enterprise resource and business management platform concept designed to replace cognitive clutter with calm, modular information architecture and keyboard-first navigation.',
    conceptNote: 'Enterprise System Architecture Prototype — Keyboard-driven data canvas.',
    challenge: 'Traditional enterprise ERP software burdens operators with deeply nested menus, fragmented operational views, and sluggish UI response times.',
    solution: 'Architected a unified workspace featuring live node ingestion simulation, high-density virtualized data grids, and keyboard command shortcuts.',
    deliverables: [
      'System Architecture Redesign',
      'Simulated Ingestion Topology',
      'Keyboard-First Command Palette',
      'Modular Dashboard Framework'
    ],
    techStack: ['React 19', 'TypeScript', 'Tabular Virtualization', 'Tailwind CSS', 'WebSockets Ready'],
    specifications: [
      { label: 'Simulated Ingestion Peak', value: '1,000 evt/s' },
      { label: 'UI Interaction Latency', value: '< 80 ms' },
      { label: 'Grid Virtualization', value: '50,000+ Rows' }
    ],
    interactiveFeature: {
      title: 'Simulated Node Ingestion & Load Dispatcher',
      description: 'Adjust event ingestion rates to observe simulated worker thread allocation, worker backpressure, and latency calculations.',
      type: 'system-nodes'
    }
  }
];

export const STUDIO_IMAGE = '/src/assets/images/editorial_studio_bora_1792214166541.jpg';
