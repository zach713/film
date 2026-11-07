import React, { useState, useEffect } from 'react';
import { Film, Ticket, Play, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { MovieProfile } from '../../movieData';

interface MovieNavbarProps {
  movie: MovieProfile;
  availableMovies: MovieProfile[];
  onSelectMovie: (movie: MovieProfile) => void;
  onWatchTrailer: () => void;
  onScrollToTickets: () => void;
  isPlayingScore: boolean;
  onToggleScore: () => void;
}

export const MovieNavbar: React.FC<MovieNavbarProps> = ({
  movie,
  availableMovies,
  onSelectMovie,
  onWatchTrailer,
  onScrollToTickets,
  isPlayingScore,
  onToggleScore,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMovieMenuOpen, setIsMovieMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Characters', href: '#characters' },
    { label: 'Trailers & Stills', href: '#media' },
    { label: 'The Craft', href: '#craft' },
    { label: 'Soundtrack', href: '#soundtrack' },
    { label: 'Showtimes', href: '#showtimes' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#top"
            className="text-base md:text-lg font-black tracking-widest text-white uppercase whitespace-nowrap font-display flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{movie.title.split(':')[0]}</span>
          </a>

          {/* Film Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMovieMenuOpen(!isMovieMenuOpen)}
              className="text-[11px] font-semibold text-neutral-400 hover:text-white px-2 py-1 rounded border border-neutral-800 hover:border-neutral-600 flex items-center gap-1 transition-colors"
            >
              <span>Change Film</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isMovieMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#121215] border border-neutral-800 rounded shadow-2xl py-1 z-50">
                <p className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  Featured Official Films
                </p>
                {availableMovies.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onSelectMovie(m);
                      setIsMovieMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors flex flex-col ${
                      m.id === movie.id ? 'bg-cyan-950/40 text-cyan-300 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <span>{m.title}</span>
                    <span className="text-[10px] text-neutral-500 font-normal">{m.subtitle}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors whitespace-nowrap hover:underline underline-offset-8 decoration-cyan-400/80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio score toggle */}
          <button
            onClick={onToggleScore}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
              isPlayingScore
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/50'
                : 'border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500'
            }`}
            title={isPlayingScore ? 'Mute film theme' : 'Listen to film theme (Hans Zimmer)'}
            aria-label="Toggle film soundtrack score"
          >
            {isPlayingScore ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onWatchTrailer}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded transition-colors whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trailer</span>
          </button>

          <button
            onClick={onScrollToTickets}
            className="px-4 py-2 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 whitespace-nowrap flex items-center gap-1.5 uppercase tracking-wide"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Get Tickets</span>
          </button>
        </div>
      </div>
    </header>
  );
};
