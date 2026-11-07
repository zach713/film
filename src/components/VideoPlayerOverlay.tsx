import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sliders,
  MessageSquare,
  ListVideo,
  FastForward,
} from 'lucide-react';
import { MediaItem } from '../types';
import { playNetflixTudum } from '../utils/audio';

interface VideoPlayerOverlayProps {
  item: MediaItem;
  onClose: () => void;
  onNextEpisode?: () => void;
}

export const VideoPlayerOverlay: React.FC<VideoPlayerOverlayProps> = ({
  item,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(145); // starts at 2m 25s for realism
  const [duration, setDuration] = useState(3480); // 58 minutes
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subtitles, setSubtitles] = useState<'off' | 'en' | 'es' | 'fr'>('off');
  const [audioTrack, setAudioTrack] = useState<'en-orig' | 'en-atmos' | 'es' | 'fr'>('en-atmos');
  const [isAudioSubtitlesOpen, setIsAudioSubtitlesOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);
  const [isEpisodesOpen, setIsEpisodesOpen] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Play Netflix "Ta-dum" chime on mount!
  useEffect(() => {
    playNetflixTudum();
  }, []);

  // Keyboard navigation shortcuts: Space to toggle play, Escape to close, arrows to scrub
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen?.().catch(() => {});
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
        triggerControls();
      } else if (e.key === 'ArrowRight') {
        setCurrentTime((prev) => Math.min(prev + 10, duration));
        triggerControls();
      } else if (e.key === 'ArrowLeft') {
        setCurrentTime((prev) => Math.max(prev - 10, 0));
        triggerControls();
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted((prev) => !prev);
        triggerControls();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration, isFullscreen, onClose]);

  // Simulation timer for video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  // Canvas animated cinematic visual background tailored to movie theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      // Base dark film background
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, w, h);

      // Theme-specific cinematic visual simulation
      if (item.videoTheme === 'cyber') {
        // Neon streaks and vertical rain
        ctx.strokeStyle = 'rgba(0, 220, 255, 0.15)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 40; i++) {
          const x = (i * 47 + frame * 4) % w;
          const y = ((i * 123 + frame * 9) % h);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 25);
          ctx.stroke();
        }

        // Cyber neon ambient glows
        const grad = ctx.createRadialGradient(w * 0.7, h * 0.4, 50, w * 0.7, h * 0.4, 400);
        grad.addColorStop(0, 'rgba(229, 9, 20, 0.18)');
        grad.addColorStop(0.5, 'rgba(0, 180, 255, 0.08)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      } else if (item.videoTheme === 'space') {
        // Cosmic starfield + nebula drift
        for (let i = 0; i < 80; i++) {
          const x = (i * 97) % w;
          const y = (i * 61) % h;
          const r = (Math.sin(frame * 0.02 + i) + 1.2) * 1.2;
          ctx.fillStyle = i % 4 === 0 ? 'rgba(255, 220, 180, 0.7)' : 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        const grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 80, w * 0.5, h * 0.5, 500);
        grad.addColorStop(0, 'rgba(147, 51, 234, 0.15)');
        grad.addColorStop(0.7, 'rgba(59, 130, 246, 0.08)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      } else if (item.videoTheme === 'fantasy') {
        // Floating fiery embers
        for (let i = 0; i < 45; i++) {
          const x = (i * 63 + Math.sin(frame * 0.01 + i) * 30) % w;
          const y = (h - ((frame * 2 + i * 50) % h));
          ctx.fillStyle = i % 2 === 0 ? 'rgba(249, 115, 22, 0.4)' : 'rgba(239, 68, 68, 0.3)';
          ctx.beginPath();
          ctx.arc(x, y, (i % 3) + 1, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Ambient cinematic vignette with subtle grain
        const grad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, w / 1.5);
        grad.addColorStop(0, 'rgba(30, 30, 35, 0.3)');
        grad.addColorStop(1, 'rgba(10, 10, 12, 0.95)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [item.videoTheme]);

  const triggerControls = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(newProgress * duration);
    triggerControls();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const currentEp = item.episodes?.[currentEpisodeIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={triggerControls}
      onClick={() => {
        setIsAudioSubtitlesOpen(false);
        setIsSpeedOpen(false);
        setIsEpisodesOpen(false);
      }}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none cursor-default"
    >
      {/* Visual Canvas Backdrop */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Hero Backdrop Still Image in Center with High Cinematic Mood */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-45">
        <img
          src={item.backdropUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="max-w-5xl w-full max-h-[85vh] object-cover rounded shadow-2xl filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Subtitles Overlay in Center Bottom */}
      {subtitles !== 'off' && isPlaying && (
        <div className="absolute bottom-28 inset-x-0 flex justify-center pointer-events-none z-20 px-8">
          <p className="bg-black/70 text-yellow-300 font-sans text-base md:text-xl font-medium px-4 py-1.5 rounded text-center max-w-2xl text-shadow-strong">
            {subtitles === 'en'
              ? '“The anomaly is accelerating... we need to bypass the security matrix now.”'
              : '“L’anomalie s’accélère... nous devons contourner la matrice.”'}
          </p>
        </div>
      )}

      {/* Center Big Play/Pause Toggle Touch target */}
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={() => {
          setIsPlaying(!isPlaying);
          triggerControls();
        }}
      >
        {!isPlaying && (
          <div className="w-20 h-20 rounded-full bg-black/60 border border-white/60 flex items-center justify-center text-white backdrop-blur-md shadow-2xl transform scale-110 transition-transform">
            <Play className="w-10 h-10 fill-white ml-1" />
          </div>
        )}
      </div>

      {/* TOP HEADER CONTROLS */}
      <div
        className={`relative z-30 flex items-center justify-between p-4 md:p-8 bg-gradient-to-b from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-white hover:text-neutral-300 p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none flex items-center gap-2"
            aria-label="Back to browse"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div>
            <h2 className="text-base md:text-lg font-bold text-white font-display flex items-center gap-2">
              <span>{item.title}</span>
              {currentEp && (
                <span className="text-neutral-400 font-normal text-xs md:text-sm">
                  · S{currentEp.seasonNumber}:E{currentEp.episodeNumber} "{currentEp.title}"
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-[#E50914] font-bold">Ultra HD 4K</span>
              <span aria-hidden="true">·</span>
              <span>{item.audio}</span>
              <span aria-hidden="true">·</span>
              <span>{item.maturityRating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-display font-black text-xl text-[#E50914] tracking-wider select-none">
            NETFLIX
          </span>
        </div>
      </div>

      {/* BOTTOM CONTROL BAR */}
      <div
        className={`relative z-30 p-4 md:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 space-y-3 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Timeline Bar */}
        <div
          onClick={handleSeek}
          className="relative h-2 bg-neutral-700/80 hover:h-3 rounded-full cursor-pointer transition-all duration-150 group"
        >
          {/* Progress fill */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#E50914] rounded-full flex items-center justify-end"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="w-3.5 h-3.5 bg-[#E50914] rounded-full scale-0 group-hover:scale-100 transition-transform shadow-md" />
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between gap-4 pt-1">
          {/* Left Buttons: Play, Rewind 10s, Forward 10s, Volume, Elapsed Time */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="text-white hover:text-neutral-300 transition-colors p-1"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTime((prev) => Math.max(prev - 10, 0));
              }}
              className="text-white hover:text-neutral-300 transition-colors p-1 relative"
              title="Rewind 10 seconds"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-[9px] absolute inset-0 flex items-center justify-center font-bold">10</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTime((prev) => Math.min(prev + 10, duration));
              }}
              className="text-white hover:text-neutral-300 transition-colors p-1 relative"
              title="Fast forward 10 seconds"
            >
              <RotateCw className="w-5 h-5" />
              <span className="text-[9px] absolute inset-0 flex items-center justify-center font-bold">10</span>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="text-white hover:text-neutral-300 transition-colors p-1"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-16 md:w-24 accent-[#E50914] h-1 bg-neutral-600 rounded-lg cursor-pointer"
              />
            </div>

            {/* Duration Display */}
            <span className="text-xs text-neutral-300 font-mono tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Buttons: Episodes, Subtitles, Speed, Fullscreen */}
          <div className="flex items-center gap-3 md:gap-4 relative">
            {/* Episodes Drawer Toggle (for TV shows) */}
            {item.episodes && item.episodes.length > 0 && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEpisodesOpen(!isEpisodesOpen);
                    setIsAudioSubtitlesOpen(false);
                    setIsSpeedOpen(false);
                  }}
                  className="text-white hover:text-neutral-300 p-1 flex items-center gap-1.5"
                  title="Episodes"
                >
                  <ListVideo className="w-5 h-5" />
                </button>

                {isEpisodesOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 bottom-12 w-72 md:w-80 bg-[#181818]/95 border border-neutral-800 rounded shadow-2xl p-3 z-40 max-h-72 overflow-y-auto"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                      Episodes
                    </p>
                    <div className="space-y-1.5">
                      {item.episodes.map((ep, idx) => (
                        <button
                          key={ep.id}
                          onClick={() => {
                            setCurrentEpisodeIndex(idx);
                            setCurrentTime(0);
                            setIsEpisodesOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded flex items-center gap-2 text-xs transition-colors ${
                            idx === currentEpisodeIndex ? 'bg-[#2a2a2a] text-white font-bold' : 'text-neutral-400 hover:bg-neutral-800'
                          }`}
                        >
                          <span className="font-mono">{ep.episodeNumber}.</span>
                          <span className="truncate flex-1">{ep.title}</span>
                          <span className="text-neutral-500 text-[10px]">{ep.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Audio & Subtitles Dialog */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAudioSubtitlesOpen(!isAudioSubtitlesOpen);
                  setIsEpisodesOpen(false);
                  setIsSpeedOpen(false);
                }}
                className={`p-1 transition-colors ${
                  subtitles !== 'off' ? 'text-[#E50914]' : 'text-white hover:text-neutral-300'
                }`}
                title="Audio & Subtitles"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              {isAudioSubtitlesOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 bottom-12 w-64 md:w-72 bg-[#181818]/95 border border-neutral-800 rounded shadow-2xl p-4 z-40 text-xs grid grid-cols-2 gap-4"
                >
                  <div>
                    <p className="font-bold uppercase text-neutral-400 text-[10px] tracking-wider mb-2">Audio</p>
                    <div className="space-y-1">
                      {[
                        { id: 'en-atmos', label: 'English [Original] (Dolby Atmos)' },
                        { id: 'en-orig', label: 'English (5.1)' },
                        { id: 'es', label: 'Spanish' },
                        { id: 'fr', label: 'French' },
                      ].map((track) => (
                        <button
                          key={track.id}
                          onClick={() => setAudioTrack(track.id as any)}
                          className={`w-full text-left py-1 text-xs transition-colors ${
                            audioTrack === track.id ? 'font-bold text-white flex items-center justify-between' : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <span>{track.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-bold uppercase text-neutral-400 text-[10px] tracking-wider mb-2">Subtitles</p>
                    <div className="space-y-1">
                      {[
                        { id: 'off', label: 'Off' },
                        { id: 'en', label: 'English [CC]' },
                        { id: 'es', label: 'Spanish' },
                        { id: 'fr', label: 'French' },
                      ].map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSubtitles(sub.id as any)}
                          className={`w-full text-left py-1 text-xs transition-colors ${
                            subtitles === sub.id ? 'font-bold text-[#E50914]' : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Playback Speed Selector */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSpeedOpen(!isSpeedOpen);
                  setIsAudioSubtitlesOpen(false);
                  setIsEpisodesOpen(false);
                }}
                className="text-xs font-bold text-white hover:text-neutral-300 p-1 border border-neutral-600 rounded px-1.5"
                title="Playback speed"
              >
                {playbackSpeed}x
              </button>

              {isSpeedOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 bottom-12 w-28 bg-[#181818]/95 border border-neutral-800 rounded shadow-2xl p-2 z-40 text-xs space-y-1"
                >
                  <p className="text-[10px] font-bold uppercase text-neutral-400 px-1 pb-1">Speed</p>
                  {[0.5, 0.75, 1, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        setPlaybackSpeed(spd);
                        setIsSpeedOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                        playbackSpeed === spd ? 'bg-[#E50914] text-white font-bold' : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {spd}x {spd === 1 && '(Normal)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="text-white hover:text-neutral-300 p-1"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
