import React, { useState } from 'react';
import { Award, Film, Sun, Sparkles, ChevronDown } from 'lucide-react';
import { FILM_DETAILS } from '../../lastSunriseData';

export const FilmStoryAndAwards: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl overflow-hidden border border-neutral-800/80 bg-[#0d0f17] p-6 sm:p-8 space-y-6 shadow-xl text-left select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <span className="font-mono-code text-[11px] uppercase font-bold tracking-widest text-[#FF007A]">
            About The Film
          </span>
          <h3 className="font-serif-movie text-xl sm:text-2xl font-bold text-white">
            The Story Behind The Extinction
          </h3>
        </div>
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Award className="w-5 h-5" />
        </div>
      </div>

      {/* Awards Laurels */}
      <div className="space-y-2">
        <p className="font-mono-code text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          Festival Accolades & Trophies
        </p>
        <div className="space-y-2">
          {FILM_DETAILS.awards.map((award, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-[#121522] border border-neutral-800/80 flex items-center gap-3 text-xs text-neutral-200"
            >
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{award}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Story Synopsis */}
      <div className="space-y-2">
        <p className="font-mono-code text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          Synopsis
        </p>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
          {isExpanded ? FILM_DETAILS.synopsis : `${FILM_DETAILS.synopsis.slice(0, 220)}...`}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-mono font-bold text-[#FF007A] hover:underline pt-1 flex items-center gap-1"
        >
          <span>{isExpanded ? 'Show Less' : 'Read Full Narrative'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Director Spotlight Note */}
      <div className="p-4 rounded-xl bg-[#121522] border border-cyan-800/40 text-xs space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase font-mono text-[11px]">
          <Film className="w-3.5 h-3.5" />
          <span>Director Wen Ren (任文)</span>
        </div>
        <p className="text-neutral-300 leading-relaxed font-light">
          Shot in just 14 freezing days across the Inner Mongolian steppe with a micro-budget of $250,000, Wen Ren’s directorial debut won the Grand Prix at Portugal's prestigious Fantasporto Film Festival.
        </p>
      </div>
    </div>
  );
};
