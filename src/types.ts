export type ProjectCategory = 'all' | 'fullstack' | 'ai' | 'systems' | 'devtools';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'fullstack' | 'ai' | 'systems' | 'devtools';
  tags: string[];
  featured: boolean;
  metrics?: string;
  architectureDetails?: string[];
  keyFeatures: string[];
  githubUrl: string;
  liveUrl?: string;
  stars?: number;
  iconName: 'bot' | 'network' | 'code' | 'shield' | 'cpu' | 'database';
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 0-100
    levelLabel: 'Advanced' | 'Proficient' | 'Expert';
    experienceYears: string;
    featured?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Work' | 'Education' | 'Achievement';
  description: string;
  highlights: string[];
  skills: string[];
}
