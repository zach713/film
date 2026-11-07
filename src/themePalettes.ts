export interface ThemePalette {
  id: string;
  name: string;
  primary: string; // main glow / badge / accent color
  secondary: string; // gradient end
  accent: string;
  ribbon1: string; // stripe color 1
  ribbon2: string; // stripe color 2
  btnGradient: string; // tailwind or css gradient
  ringShadow: string;
  btnShadow: string;
  textShadow: string;
  badgeBorder: string;
  badgeText: string;
  dotColor: string;
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'electric-cyan',
    name: 'Electric Cyan & Cobalt',
    primary: '#00F0FF',
    secondary: '#3B82F6',
    accent: '#67E8F9',
    ribbon1: '#00F0FF',
    ribbon2: '#1D4ED8',
    btnGradient: 'from-[#00F0FF] via-[#0284C7] to-[#1D4ED8]',
    ringShadow: '0 0 24px #00F0FF, 0 0 50px rgba(0, 240, 255, 0.65), inset 0 0 15px rgba(59, 130, 246, 0.5)',
    btnShadow: '0 0 32px rgba(0, 240, 255, 0.7), 0 0 65px rgba(29, 78, 216, 0.45)',
    textShadow: '0 0 12px rgba(0, 240, 255, 0.85), 0 0 24px rgba(59, 130, 246, 0.5)',
    badgeBorder: 'border-cyan-500/50',
    badgeText: 'text-cyan-400',
    dotColor: '#00F0FF',
  },
  {
    id: 'deep-amethyst',
    name: 'Deep Violet & Nebula',
    primary: '#A855F7',
    secondary: '#EC4899',
    accent: '#C084FC',
    ribbon1: '#A855F7',
    ribbon2: '#7C3AED',
    btnGradient: 'from-[#A855F7] via-[#9333EA] to-[#6366F1]',
    ringShadow: '0 0 24px #A855F7, 0 0 50px rgba(168, 85, 247, 0.65), inset 0 0 15px rgba(236, 72, 153, 0.5)',
    btnShadow: '0 0 32px rgba(168, 85, 247, 0.7), 0 0 65px rgba(99, 102, 241, 0.45)',
    textShadow: '0 0 12px rgba(168, 85, 247, 0.85), 0 0 24px rgba(168, 85, 247, 0.5)',
    badgeBorder: 'border-purple-500/50',
    badgeText: 'text-purple-400',
    dotColor: '#A855F7',
  },
  {
    id: 'hyper-pink',
    name: 'Hyper Pink & Orange',
    primary: '#FF007A',
    secondary: '#FF5E00',
    accent: '#FF70A6',
    ribbon1: '#FF007A',
    ribbon2: '#FF5E00',
    btnGradient: 'from-[#FF007A] via-[#FF2A6D] to-[#FF5E00]',
    ringShadow: '0 0 24px #FF007A, 0 0 50px rgba(255, 0, 122, 0.65), inset 0 0 15px rgba(255, 94, 0, 0.5)',
    btnShadow: '0 0 32px rgba(255, 0, 122, 0.7), 0 0 65px rgba(255, 94, 0, 0.4)',
    textShadow: '0 0 12px rgba(255, 0, 122, 0.85), 0 0 24px rgba(255, 0, 122, 0.5)',
    badgeBorder: 'border-pink-500/50',
    badgeText: 'text-[#FF007A]',
    dotColor: '#FF007A',
  },
  {
    id: 'solar-sunrise',
    name: 'Solar Gold & Ember',
    primary: '#F59E0B',
    secondary: '#EF4444',
    accent: '#FDE047',
    ribbon1: '#F59E0B',
    ribbon2: '#DC2626',
    btnGradient: 'from-[#F59E0B] via-[#F97316] to-[#EF4444]',
    ringShadow: '0 0 24px #F59E0B, 0 0 50px rgba(245, 158, 11, 0.65), inset 0 0 15px rgba(239, 68, 68, 0.5)',
    btnShadow: '0 0 32px rgba(245, 158, 11, 0.7), 0 0 65px rgba(239, 68, 68, 0.45)',
    textShadow: '0 0 12px rgba(245, 158, 11, 0.85), 0 0 24px rgba(239, 68, 68, 0.5)',
    badgeBorder: 'border-amber-500/50',
    badgeText: 'text-amber-400',
    dotColor: '#F59E0B',
  },
  {
    id: 'neon-emerald',
    name: 'Cyber Emerald & Mint',
    primary: '#10B981',
    secondary: '#06B6D4',
    accent: '#34D399',
    ribbon1: '#10B981',
    ribbon2: '#0D9488',
    btnGradient: 'from-[#10B981] via-[#059669] to-[#06B6D4]',
    ringShadow: '0 0 24px #10B981, 0 0 50px rgba(16, 185, 129, 0.65), inset 0 0 15px rgba(6, 182, 212, 0.5)',
    btnShadow: '0 0 32px rgba(16, 185, 129, 0.7), 0 0 65px rgba(6, 182, 212, 0.45)',
    textShadow: '0 0 12px rgba(16, 185, 129, 0.85), 0 0 24px rgba(16, 182, 212, 0.5)',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-400',
    dotColor: '#10B981',
  },
  {
    id: 'crimson-red',
    name: 'Cinematic Crimson & Scarlet',
    primary: '#E50914',
    secondary: '#FF2A4D',
    accent: '#FF4D6D',
    ribbon1: '#E50914',
    ribbon2: '#991B1B',
    btnGradient: 'from-[#E50914] via-[#DC2626] to-[#991B1B]',
    ringShadow: '0 0 24px #E50914, 0 0 50px rgba(229, 9, 20, 0.65), inset 0 0 15px rgba(255, 42, 77, 0.5)',
    btnShadow: '0 0 32px rgba(229, 9, 20, 0.7), 0 0 65px rgba(153, 27, 27, 0.45)',
    textShadow: '0 0 12px rgba(229, 9, 20, 0.85), 0 0 24px rgba(229, 9, 20, 0.5)',
    badgeBorder: 'border-red-600/50',
    badgeText: 'text-[#E50914]',
    dotColor: '#E50914',
  },
];
