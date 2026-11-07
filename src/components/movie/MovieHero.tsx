import React from 'react';
import { Play, Ticket, Sparkles, Volume2, ArrowDown } from 'lucide-react';
import { MovieProfile } from '../../movieData';

interface MovieHeroProps {
  movie: MovieProfile;
  onWatchTrailer: () => void;
  onScrollToTickets: () => void;
  isPlayingScore: boolean;
  onToggleScore: () => void;
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  movie,
  onWatchTrailer,
  onScrollToTickets,
  isPlayingScore,
  onToggleScore,
}) => {
  return (
    <section id="top" className="relative min-h-[95vh] w-full flex flex-col justify-between overflow-hidden pt-24 pb-12 select-none">
      {/* Background Cinematic Widescreen Container */}
      <div className="absolute inset-0 -z-10">
        <img
          src={movie.heroImage}
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-105 scale-100"
        />

        {/* Ambient Film Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-[#09090b]/60" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#09090b] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#09090b]/90 to-transparent" />
      </div>

      {/* Top Festival Laurels Ribbon */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-widest text-neutral-300 uppercase py-1 px-4 border border-white/10 rounded-full bg-black/40 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Official Selection · 83rd Venice International Film Festival</span>
        </div>
      </div>

      {/* Center Cinematic Title Lockup */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 w-full text-center space-y-6 my-auto py-12">
        <p className="font-display text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-400 font-bold">
          {movie.subtitle}
        </p>

        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white uppercase text-balance leading-none drop-shadow-2xl">
          {movie.title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-200 font-light italic max-w-2xl mx-auto text-balance">
          {movie.tagline}
        </p>

        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-neutral-400 font-medium pt-1">
          <span className="text-white font-semibold">{movie.releaseDate}</span>
          <span aria-hidden="true">·</span>
          <span>{movie.runtime}</span>
          <span aria-hidden="true">·</span>
          <span className="text-neutral-300 border border-neutral-700 px-1.5 py-0.5 rounded text-[11px]">
            {movie.rating.split(' ')[0]}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-cyan-300 font-semibold">{movie.aspectRatio.split(' ')[0]}</span>
          <span aria-hidden="true">·</span>
          <span>{movie.soundFormat.split(' ')[0]}</span>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onWatchTrailer}
            className="px-6 md:px-8 py-3.5 bg-white hover:bg-neutral-200 text-black font-bold text-sm md:text-base rounded flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-black/60"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
            <span>Watch Official 4K Trailer</span>
          </button>

          <button
            onClick={onScrollToTickets}
            className="px-6 md:px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm md:text-base rounded flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-400/20"
          >
            <Ticket className="w-5 h-5" />
            <span>Find IMAX Showtimes</span>
          </button>

          <button
            onClick={onToggleScore}
            className={`px-4 py-3.5 rounded border text-xs font-semibold flex items-center gap-2 transition-colors backdrop-blur-md ${
              isPlayingScore
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                : 'bg-black/50 border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingScore ? 'animate-pulse text-cyan-400' : ''}`} />
            <span>{isPlayingScore ? 'Mute Theme' : 'Score: Hans Zimmer'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Formats Strip */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 border-t border-white/10 pt-4">
        <div className="flex items-center gap-4 md:gap-6 uppercase tracking-wider text-[11px] font-bold">
          <span className="text-white">Shot with 70mm IMAX Cameras</span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-white">Dolby Atmos Sound</span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-white">Syncopy & Warner Bros. Pictures</span>
        </div>

        <a
          href="#story"
          className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
        >
          <span>Explore Mission Dossier</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
