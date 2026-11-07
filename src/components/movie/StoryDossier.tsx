import React from 'react';
import { Compass, ShieldCheck, Terminal, Radio } from 'lucide-react';
import { MovieProfile } from '../../movieData';

interface StoryDossierProps {
  movie: MovieProfile;
}

export const StoryDossier: React.FC<StoryDossierProps> = ({ movie }) => {
  return (
    <section id="story" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-cyan-400">
          The Premise & Lore
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
          The Story of {movie.title}
        </h2>
      </div>

      {/* Two Column Layout: Narrative Prose & Technical Mission Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
        {/* Left Column (7 cols): Synopsis & Director Vision */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-white font-display">
              The Abyss Beyond Jupiter
            </h3>
            <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-light">
              {movie.synopsis}
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-lg bg-neutral-900/60 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase font-bold tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Director's Vision Note</span>
            </div>
            <p className="text-sm md:text-base text-neutral-200 italic leading-relaxed">
              {movie.directorStatement}
            </p>
          </div>
        </div>

        {/* Right Column (5 cols): Technical Mission Dossier */}
        <div className="lg:col-span-5 bg-[#0e0e12] border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Technical Mission Dossier</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Telemetry Active</span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {movie.missionDossier.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-3">
                <span className="text-neutral-400 uppercase tracking-wider font-semibold text-[11px]">
                  {item.label}
                </span>
                <span className="font-mono text-neutral-200 text-right">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-start gap-3 bg-cyan-950/20 border border-cyan-800/40 p-4 rounded text-xs text-neutral-300">
            <Radio className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Deep Space Transponder frequency recorded at 942.8 THz. All ground command links through Houston Deep Space Network operate on a 74-minute roundtrip light delay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
