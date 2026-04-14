import type { Perspective } from './flow';

export interface PersonaConfig {
  color: string;
  bg: string;
  role: string;
  avatar: {
    type: 'illustration' | 'initials' | 'photo';
    // illustration assets (Figma URLs — valid 7 days, replace if expired)
    bgImage?: string;
    personImage?: string;
    badgeImage?: string;
    initials?: string;
    photoImage?: string;
  };
}

export const personas: Record<Perspective, PersonaConfig> = {
  Alex: {
    color: '#B45309',
    bg: '#FFFBEB',
    role: 'LinkedIn Customer',
    avatar: {
      type: 'photo',
      photoImage: 'https://www.figma.com/api/mcp/asset/9ed20f34-1b35-48e5-8eab-2a7e246a0e21',
    },
  },
  Amy: {
    color: '#1D4ED8',
    bg: '#EFF6FF',
    role: 'LinkedIn Sales Rep',
    avatar: {
      type: 'photo',
      photoImage: 'https://www.figma.com/api/mcp/asset/cd74ed31-5008-466a-ab58-8394a1083f25',
    },
  },
};
