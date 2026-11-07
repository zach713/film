import React, { useState } from 'react';
import { Play, Maximize2, X, Camera, Film } from 'lucide-react';
import { FilmStill } from '../../movieData';

interface TrailersAndStillsProps {
  stills: FilmStill[];
  onWatchTrailer: (trailerTitle?: string) => void;
}

export const TrailersAndStills: React.FC<TrailersAndStillsProps> = ({
  stills,
  onWatchTrailer,
}) => {
  const [activeLightboxStill, setActiveLightboxStill] = useState<FilmStill | null>(null);

  const trailerClips = [
    {
      id: 'trailer-main',
      title: 'Official Teaser Trailer (4K IMAX)',
      duration: '2:18',
      type: 'Teaser',
      thumbnail: stills[0]?.url || '',
    },
    {
      id: 'trailer-bts',
      title: 'Featurette: Shooting in 70mm Space Simulators',
      duration: '4:45',
      type: 'Behind the Scenes',
      thumbnail: stills[1]?.url || stills[0]?.url || '',
    },
    {
      id: 'trailer-score',
      title: 'The Score: Recording the 4-Manual Pipe Organ',
      duration: '3:32',
      type: 'Soundtrack Featurette',
      thumbnail: stills[2]?.url || stills[0]?.url || '',
    },
  ];

  return (
    <section id="media" className="py-20 md:py-28 px-4 md:px-8 border-t border-white/10 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-cyan-400">
          Media & Gallery
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
          Trailers & 70mm Film Stills
        </h2>
      </div>

      {/* Video Trailers Section */}
      <div className="space-y-6">
        <h3 className="text-lg md:text-xl font-bold text-white font-display flex items-center gap-2">
          <Film className="w-4 h-4 text-cyan-400" />
          <span>Official Film Trailers & Featurettes</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trailerClips.map((clip) => (
            <div
              key={clip.id}
              onClick={() => onWatchTrailer(clip.title)}
              className="group bg-[#111116] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-cyan-400/60 transition-all duration-300 flex flex-col shadow-lg"
            >
              <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                <img
                  src={clip.thumbnail}
                  alt={clip.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-mono text-white">
                  {clip.duration}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  {clip.type}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {clip.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 70mm Stills Gallery Grid */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-white font-display flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>High-Resolution Production Stills</span>
          </h3>
          <span className="text-xs text-neutral-400">Click any frame for 4K lightbox view</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stills.map((still) => (
            <div
              key={still.id}
              onClick={() => setActiveLightboxStill(still)}
              className="group relative aspect-video rounded-xl overflow-hidden bg-neutral-900 cursor-pointer border border-white/10 hover:border-cyan-400/60 transition-all duration-300 shadow-xl"
            >
              <img
                src={still.url}
                alt={still.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm md:text-base font-bold text-white font-display">
                    {still.title}
                  </h4>
                  <Maximize2 className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-neutral-300 line-clamp-1 mt-1 font-light">
                  {still.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxStill && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <button
            onClick={() => setActiveLightboxStill(null)}
            className="absolute top-6 right-6 text-white hover:text-cyan-400 p-2 rounded-full bg-white/10 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full space-y-4">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-neutral-950">
              <img
                src={activeLightboxStill.url}
                alt={activeLightboxStill.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-neutral-300 text-xs md:text-sm">
              <div>
                <h4 className="font-bold text-white text-base font-display">
                  {activeLightboxStill.title}
                </h4>
                <p className="text-neutral-400 text-xs mt-0.5">{activeLightboxStill.caption}</p>
              </div>
              <span className="font-mono text-[11px] text-cyan-400 border border-cyan-800/60 px-2 py-1 rounded bg-cyan-950/40 shrink-0">
                Format: 70mm 15-Perf IMAX
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
