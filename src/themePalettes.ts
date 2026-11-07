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
    id: 'solar-sunrise',
    name: 'Solar Gold & Ember',
    primary: '#F59E0B',
    secondary: '#EF4444',
    accent: '#FDE047',
    ribbon1: '#F59E0B',
    ribbon2: '#DC2626',
    btnGradient: 'from-[#F59E0B] via-[#F97316] to-[#EF4444]',
    ringShadow: '0 0 20px #F59E0B, 0 0 45px rgba(245, 158, 11, 0.6), inset 0 0 15px rgba(239, 68, 68, 0.5)',
    btnShadow: '0 0 32px rgba(245, 158, 11, 0.6), 0 0 65px rgba(239, 68, 68, 0.4)',
    textShadow: '0 0 10px rgba(245, 158, 11, 0.8), 0 0 20px rgba(239, 68, 68, 0.4)',
    badgeBorder: 'border-amber-500/50',
    badgeText: 'text-amber-400',
    dotColor: '#F59E0B',
  },
  {
    id: 'electric-cyan',
    name: 'Electric Cyan & Cobalt',
    primary: '#00F0FF',
    secondary: '#3B82F6',
    accent: '#67E8F9',
    ribbon1: '#00F0FF',
    ribbon2: '#2563EB',
    btnGradient: 'from-[#00F0FF] via-[#0284C7] to-[#2563EB]',
    ringShadow: '0 0 20px #00F0FF, 0 0 45px rgba(0, 240, 255, 0.6), inset 0 0 15px rgba(59, 130, 246, 0.5)',
    btnShadow: '0 0 32px rgba(0, 240, 255, 0.6), 0 0 65px rgba(37, 99, 235, 0.4)',
    textShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)',
    badgeBorder: 'border-cyan-500/50',
    badgeText: 'text-cyan-400',
    dotColor: '#00F0FF',
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
    ringShadow: '0 0 20px #10B981, 0 0 45px rgba(16, 185, 129, 0.6), inset 0 0 15px rgba(6, 182, 212, 0.5)',
    btnShadow: '0 0 32px rgba(16, 185, 129, 0.6), 0 0 65px rgba(6, 182, 212, 0.4)',
    textShadow: '0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(6, 182, 212, 0.4)',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-400',
    dotColor: '#10B981',
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
    ringShadow: '0 0 20px #A855F7, 0 0 45px rgba(168, 85, 247, 0.6), inset 0 0 15px rgba(236, 72, 153, 0.5)',
    btnShadow: '0 0 32px rgba(168, 85, 247, 0.6), 0 0 65px rgba(99, 102, 241, 0.4)',
    textShadow: '0 0 10px rgba(168, 85, 247, 0.8), 0 0 20px rgba(168, 85, 247, 0.4)',
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
    ringShadow: '0 0 20px #FF007A, 0 0 45px rgba(255, 0, 122, 0.6), inset 0 0 15px rgba(255, 94, 0, 0.5)',
    btnShadow: '0 0 32px rgba(255, 0, 122, 0.65), 0 0 65px rgba(255, 94, 0, 0.35)',
    textShadow: '0 0 10px rgba(255, 0, 122, 0.8), 0 0 20px rgba(255, 0, 122, 0.4)',
    badgeBorder: 'border-pink-500/50',
    badgeText: 'text-[#FF007A]',
    dotColor: '#FF007A',
  },
];
