/**
 * Centralized site configuration for BORA Portfolio
 * Edit developer details, contact endpoints, social links, and studio metadata here.
 */
export interface SiteConfig {
  studioName: string;
  tagline: string;
  subtagline: string;
  contactEmail: string;
  locationLabel: string;
  technicalBadge: string;
  yearEstablished: string;
  socials: {
    label: string;
    url: string;
  }[];
}

export const SITE_CONFIG: SiteConfig = {
  studioName: 'BORA',
  tagline: 'CREATIVE DIRECTION & CODE',
  subtagline: 'An independent creative development practice building immersive 3D experiences, editorial flagships, and modular software interfaces.',
  // Primary contact email (editable)
  contactEmail: 'rohitbora535@gmail.com',
  // Non-geographical / editable location label (honest, no fabricated physical headquarters)
  locationLabel: 'Digital Practice · Available Globally',
  // Technical badge instead of arbitrary coordinates
  technicalBadge: 'WebGL 2.0 · PBR Pipeline · React 19',
  yearEstablished: '2026',
  socials: [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'X (Twitter)', url: 'https://twitter.com' },
    { label: 'ReadCV', url: 'https://read.cv' },
  ],
};
