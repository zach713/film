import React from 'react';
import { Film } from 'lucide-react';
import { MovieProfile } from '../../movieData';

interface MovieFooterProps {
  movie: MovieProfile;
}

export const MovieFooter: React.FC<MovieFooterProps> = ({ movie }) => {
  return (
    <footer className="border-t border-white/10 bg-[#070709] py-16 px-4 md:px-8 text-neutral-400 text-xs select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Studios & Production Houses Billing */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 uppercase tracking-widest text-[11px] font-bold text-neutral-500 border-b border-white/5 pb-8">
          <span className="hover:text-white transition-colors">Syncopy</span>
          <span className="hover:text-white transition-colors">Warner Bros. Pictures</span>
          <span className="hover:text-white transition-colors">IMAX Experience</span>
          <span className="hover:text-white transition-colors">WaterTower Music</span>
          <span className="hover:text-white transition-colors">Dolby Cinema</span>
        </div>

        {/* Rating Advisory Block */}
        <div className="max-w-md mx-auto border border-neutral-800 p-4 rounded text-center space-y-1 bg-black/40">
          <span className="font-display font-black text-sm text-white tracking-widest block">
            {movie.rating.split(' ')[0]}
          </span>
          <p className="text-[11px] text-neutral-400">
            {movie.rating}
          </p>
        </div>

        {/* Legal & Policy Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-neutral-500">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
            Terms of Use
          </a>
          <a href="#accessibility" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
            Accessibility & Sensory Screenings
          </a>
          <a href="#press" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
            Press & Media Accreditation
          </a>
        </div>

        <p className="text-center text-[10px] text-neutral-600 max-w-xl mx-auto leading-relaxed">
          © 2026 Warner Bros. Entertainment Inc. and Syncopy Inc. All Rights Reserved. IMAX® is a registered trademark of IMAX Corporation. Dolby and the double-D symbol are registered trademarks of Dolby Laboratories.
        </p>
      </div>
    </footer>
  );
};
