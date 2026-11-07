import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { playNetflixTudum } from '../../utils/audio';

interface TrailerModalProps {
  trailerTitle?: string;
  heroImage: string;
  movieTitle: string;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  trailerTitle = 'Official Teaser Trailer (4K IMAX)',
  heroImage,
  movieTitle,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(12);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    playNetflixTudum();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 800);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none">
      <div className="relative max-w-5xl w-full bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="p-4 px-6 flex items-center justify-between border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white font-display">
              {movieTitle} — <span className="text-neutral-400 font-normal">{trailerTitle}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close trailer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src={heroImage}
            alt={movieTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-90"
          />

          {/* Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

          {/* Subtitles Overlay */}
          {isPlaying && (
            <div className="absolute bottom-16 inset-x-0 flex justify-center pointer-events-none px-6">
              <p className="bg-black/80 text-yellow-300 font-sans text-sm md:text-lg font-medium px-4 py-1.5 rounded text-center shadow-lg">
                “This signal isn’t coming from deep space... it’s coming from inside the Jovian core.”
              </p>
            </div>
          )}

          {/* Play/Pause Central Trigger */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-black/70 border border-white/60 text-white flex items-center justify-center shadow-2xl transform scale-105 transition-transform">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            )}
          </div>
        </div>

        {/* Video Player Controls */}
        <div className="p-4 px-6 bg-black/90 space-y-2">
          {/* Scrubber */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, pct)));
            }}
            className="relative h-1.5 bg-neutral-700 rounded-full cursor-pointer hover:h-2 transition-all"
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-cyan-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-300 pt-1">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-cyan-400 p-1"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={() => setProgress(0)}
                className="text-neutral-400 hover:text-white p-1"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-neutral-400 hover:text-white p-1"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-mono text-[11px] text-neutral-400">
                0:{progress < 10 ? `0${Math.floor(progress / 2)}` : Math.floor(progress / 2)} / 2:18
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-cyan-400 border border-cyan-800 px-1.5 py-0.5 rounded">
                4K HDR · IMAX 70mm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
