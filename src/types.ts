/**
 * StreamFlix - Core Type Definitions
 */

export interface Episode {
  id: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  overview: string;
  duration: string;
  thumbnailUrl: string;
  progressPercent?: number;
}

export type MaturityRating = 'ALL' | '7+' | '13+' | '16+' | '18+' | 'TV-MA' | 'TV-14' | 'PG-13' | 'R';

export interface MediaItem {
  id: string;
  title: string;
  type: 'movie' | 'tv';
  backdropUrl: string;
  posterUrl: string;
  logoUrl?: string;
  matchScore: number; // e.g. 98
  releaseYear: number;
  maturityRating: MaturityRating;
  duration: string; // e.g. '2h 18m' or '3 Seasons'
  quality: '4K Ultra HD' | 'HD' | 'HDR';
  audio: 'Dolby Atmos' | '5.1' | 'Spatial Audio' | 'Stereo';
  genres: string[];
  tags: string[]; // e.g. ['Mind-bending', 'Dark', 'Gritty', 'Ominous']
  overview: string;
  cast: string[];
  creators: string[];
  director?: string;
  advisoryWarnings?: string[];
  isOriginal?: boolean;
  isNew?: boolean;
  top10Rank?: number; // 1-10 if in top 10
  seasonsCount?: number;
  episodes?: Episode[];
  progressPercent?: number; // for Continue Watching
  featured?: boolean;
  videoTheme: 'cyber' | 'fantasy' | 'space' | 'crime' | 'thriller' | 'action' | 'nature' | 'drama';
}

export interface UserProfile {
  id: string;
  name: string;
  avatarColor: string;
  avatarIcon: string;
  isKids: boolean;
  language: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  imageUrl: string;
  mediaId: string;
  unread: boolean;
}
