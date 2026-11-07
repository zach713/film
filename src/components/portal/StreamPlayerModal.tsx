import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, MessageSquare, ListVideo } from 'lucide-react';
import { playNetflixTudum } from '../../utils/audio';

interface StreamPlayerModalProps {
  onClose: () => void;
}

export const StreamPlayerModal: React.FC<StreamPlayerModalProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(18);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitles, setSubtitles] = useState<'en' | 'cn' | 'off'>('en');
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { title: 'The Solar Flare Observatory', time: '0:00' },
    { title: 'The Day The Sun Disappeared', time: '14:20' },
    { title: 'Departure in the Solar Rover', time: '38:15' },
    { title: 'Frozen Wasteland of District Four', time: '1:02:40' },
    { title: 'The Horizon of The Last Sunrise', time: '1:32:10' },
  ];

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
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none">
      <div className="relative max-w-5xl w-full bg-[#0a0c14] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="p-4 px-6 flex items-center justify-between border-b border-neutral-800 bg-black/60">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF007A] animate-pulse shadow-[0_0_8px_#FF007A]" />
            <h3 className="font-serif-movie text-base sm:text-lg font-bold text-white">
              Campus Drivers (2025) · <span className="font-mono text-xs text-neutral-400 font-normal">4K UHD Master Stream</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
          <img
            src="/assets/images/user_poster.webp"
            alt="Campus Drivers"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSyn1_5EHhj_j8v82_-D9wDdhLQovMIJm_zIf64botPczrZXRCKpWbB9wwxyCCOun3jQthWJqYS87LmArpFR9W6fcmpRq7wj_ZyO445z-Mw8CQqW-Lwo8or3EAN7ZpkETkbFLyXLkvSafO6DJN-j3UUGAFjdeZBEFJnXkR-Wz0y4f66zze9bkXZcYd-PI/s750/br6TrAPctmobu6QM730sBEC18eH.webp';
            }}
            className="w-full h-full object-cover object-top filter brightness-90"
          />

          {/* Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

          {/* Subtitles Overlay */}
          {subtitles !== 'off' && isPlaying && (
            <div className="absolute bottom-16 inset-x-0 flex justify-center pointer-events-none px-6">
              <p className="bg-black/80 text-yellow-300 font-sans text-sm sm:text-base md:text-lg font-medium px-4 py-1.5 rounded text-center shadow-lg max-w-xl">
                {subtitles === 'en'
                  ? '“If the sun never rises again... then we will drive until we find where light was born.”'
                  : '“如果太阳不再升起……那我们就一直开，直到找到光诞生的地方。”'}
              </p>
            </div>
          )}

          {/* Center Play Button Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-[#FF007A]/90 border border-white/60 text-white flex items-center justify-center shadow-2xl transform scale-110 transition-transform">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            )}
          </div>
        </div>

        {/* Video Controls Bar */}
        <div className="p-4 px-6 bg-[#0a0c14] space-y-3">
          {/* Timeline */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, pct)));
            }}
            className="relative h-2 bg-neutral-800 rounded-full cursor-pointer hover:h-2.5 transition-all group"
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#FF007A] to-[#FF5E00] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-[#FF007A] p-1 transition-colors"
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
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-mono text-[11px] text-neutral-400">
                {Math.floor((progress * 104) / 100)}m / 104m
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Subtitles toggle */}
              <button
                onClick={() =>
                  setSubtitles(subtitles === 'en' ? 'cn' : subtitles === 'cn' ? 'off' : 'en')
                }
                className={`font-mono text-[11px] px-2 py-0.5 rounded border transition-colors ${
                  subtitles !== 'off'
                    ? 'border-[#FF007A] text-[#FF007A] bg-[#FF007A]/10'
                    : 'border-neutral-700 text-neutral-400'
                }`}
              >
                Subtitles: {subtitles.toUpperCase()}
              </button>

              <span className="font-mono text-[11px] text-cyan-400 border border-cyan-800/80 px-2 py-0.5 rounded bg-cyan-950/40">
                4K UHD · 28.4 Mbps
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
