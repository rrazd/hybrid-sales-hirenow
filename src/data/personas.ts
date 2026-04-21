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
      photoImage: '/alex-avatar.png',
    },
  },
  Amy: {
    color: '#1D4ED8',
    bg: '#EFF6FF',
    role: 'LinkedIn Sales Rep',
    avatar: {
      type: 'photo',
      photoImage: '/amy-avatar.png',
    },
  },
};
