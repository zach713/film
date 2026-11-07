export const TARGET_MIRROR_URL = 'https://trckapp.org/cl/i/6nj558';

export interface DownloadPackage {
  id: string;
  name: string;
  resolution: string;
  codec: string;
  size: string;
  bitrate: string;
  audio: string;
  subtitles: string[];
  recommended?: boolean;
}

export interface CloudMirror {
  id: string;
  name: string;
  region: string;
  pingMs: number;
  speedMbps: number;
  status: 'Online' | 'Optimal' | 'High Speed';
  protocol: string;
}

export interface FilmReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const LAST_SUNRISE_PACKAGES: DownloadPackage[] = [
  {
    id: 'pkg-4k',
    name: '4K UHD Cinema Master',
    resolution: '3840 x 2160p (2160p)',
    codec: 'HEVC / H.265 10-bit HDR',
    size: '14.8 GB',
    bitrate: '28.4 Mbps',
    audio: 'DTS-HD Master Audio 5.1 + Mandarin Atmos',
    subtitles: ['English', 'Simplified Chinese', 'Traditional Chinese', 'Spanish', 'French'],
    recommended: true,
  },
  {
    id: 'pkg-1080p',
    name: '1080p Full HD BluRay Remux',
    resolution: '1920 x 1080p',
    codec: 'x264 High Profile',
    size: '6.4 GB',
    bitrate: '9.2 Mbps',
    audio: 'Dolby Digital AC3 5.1',
    subtitles: ['English', 'Simplified Chinese', 'Spanish'],
  },
  {
    id: 'pkg-720p',
    name: '720p Mobile & Offline Stream',
    resolution: '1280 x 720p',
    codec: 'H.264 MP4 Universal',
    size: '1.9 GB',
    bitrate: '3.1 Mbps',
    audio: 'AAC Stereo 320 kbps',
    subtitles: ['English', 'Simplified Chinese'],
  },
  {
    id: 'pkg-ost',
    name: 'Original Motion Picture Soundtrack',
    resolution: '24-bit / 96kHz Lossless',
    codec: 'FLAC + MP3 320kbps',
    size: '340 MB',
    bitrate: 'Studio Master',
    audio: 'Original Ambient Electronic Score',
    subtitles: [],
  },
];

export const CLOUD_MIRRORS: CloudMirror[] = [
  {
    id: 'm-tokyo',
    name: 'Tokyo Fast CDN Edge',
    region: 'Asia-East (Tokyo)',
    pingMs: 14,
    speedMbps: 1140,
    status: 'Optimal',
    protocol: 'HTTPS Direct Stream',
  },
  {
    id: 'm-frankfurt',
    name: 'Frankfurt Core Mirror',
    region: 'Europe-West (Frankfurt)',
    pingMs: 24,
    speedMbps: 980,
    status: 'High Speed',
    protocol: 'Encrypted Multi-Thread',
  },
  {
    id: 'm-us-west',
    name: 'San Jose Cloud Cluster',
    region: 'US-West (Silicon Valley)',
    pingMs: 29,
    speedMbps: 1020,
    status: 'Optimal',
    protocol: 'Direct CDN SSL',
  },
  {
    id: 'm-ipfs',
    name: 'Decentralized IPFS Web3 Node',
    region: 'Distributed Global P2P',
    pingMs: 38,
    speedMbps: 750,
    status: 'Online',
    protocol: 'IPFS / Torrent Swarm',
  },
];

export const FILM_DETAILS = {
  title: 'CAMPUS DRIVERS',
  subtitle: 'Supercharged (2025) · Dir. C.S. Quill Adaptation · 4K UHD Master',
  year: 2025,
  director: 'C.S. Quill',
  masterFormat: '4K UHD Master',
  runtime: '1h 52m',
  genre: 'Romance · Drama · New Adult · Fast Rides',
  rating: 'PG-13',
  posterImage: '/assets/images/user_poster.webp',
  fallbackImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSyn1_5EHhj_j8v82_-D9wDdhLQovMIJm_zIf64botPczrZXRCKpWbB9wwxyCCOun3jQthWJqYS87LmArpFR9W6fcmpRq7wj_ZyO445z-Mw8CQqW-Lwo8or3EAN7ZpkETkbFLyXLkvSafO6DJN-j3UUGAFjdeZBEFJnXkR-Wz0y4f66zze9bkXZcYd-PI/s750/br6TrAPctmobu6QM730sBEC18eH.webp',
  awards: [
    'Bestselling New Adult Adaptation — European Film Market Premiere',
    'Audience Choice Winner — Contemporary Romance Film Festival',
    'Nominee: Best Soundtrack & Best Chemistry — Streamers Choice Awards',
  ],
  synopsis:
    'Four charismatic university friends run Campus Drivers, an exclusive private application offering rides in vintage muscle cars across the campus and Mediterranean coastline. When Lane crosses paths with Lois, a fiery bet between drivers spirals into an irresistible, high-octane romance that threatens to overturn all their carefully crafted rules.',
};

export const INITIAL_REVIEWS: FilmReview[] = [
  {
    id: 'rev-1',
    author: 'Camille_R',
    rating: 5,
    date: '2 hours ago',
    comment: 'The chemistry between Lane and Lois is sizzling! The 1969 Chevrolet SS coastal cruising scenes in 4K HDR are pure cinematic perfection.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Julian_M',
    rating: 5,
    date: '4 hours ago',
    comment: 'High-speed 4K master download finished in 90 seconds on the Tokyo CDN mirror. The soundtrack is an absolute vibe.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Sophie_L',
    rating: 4.9,
    date: '1 day ago',
    comment: 'Finally an adaptation that captures the witty banter, romance, and aesthetic of the book. 10/10 recommendation!',
    verified: true,
  },
];
