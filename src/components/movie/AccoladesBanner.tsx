import React from 'react';
import { Star, Award } from 'lucide-react';
import { Accolade } from '../../movieData';

interface AccoladesBannerProps {
  accolades: Accolade[];
}

export const AccoladesBanner: React.FC<AccoladesBannerProps> = ({ accolades }) => {
  return (
    <section className="border-y border-white/10 bg-[#0c0c0e] py-12 px-4 md:px-8 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Metric Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-black text-sm">
              🍅
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white font-mono">98%</p>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                Rotten Tomatoes · Certified Fresh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-sm font-mono">
              91
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white font-mono">91 / 100</p>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                Metacritic · Universal Acclaim
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-white font-mono">5 / 5</p>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                Rolling Stone · Masterpiece
              </p>
            </div>
          </div>
        </div>

        {/* 3 Editorial Critic Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-2">
          {accolades.map((acc, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/40 border border-white/5 p-6 rounded-lg space-y-3 relative flex flex-col justify-between"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <blockquote className="text-sm md:text-base text-neutral-200 font-normal leading-relaxed italic">
                “{acc.quote}”
              </blockquote>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider font-display">
                  {acc.outlet}
                </span>
                <span className="text-neutral-400">{acc.critic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
