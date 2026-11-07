import React, { useState } from 'react';
import { UserCheck, Quote, Shield } from 'lucide-react';
import { Character } from '../../movieData';

interface CharactersShowcaseProps {
  characters: Character[];
}

export const CharactersShowcase: React.FC<CharactersShowcaseProps> = ({ characters }) => {
  const [activeId, setActiveId] = useState(characters[0]?.id || '');
  const activeChar = characters.find((c) => c.id === activeId) || characters[0];

  if (!characters || characters.length === 0) return null;

  return (
    <section id="characters" className="py-20 md:py-28 px-4 md:px-8 border-t border-white/10 bg-[#0a0a0d]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-cyan-400">
              The Expedition Crew
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
              Cast & Characters
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 max-w-md">
            Click any crew member below to inspect their mission dossier, psychological evaluation, and operational clearance.
          </p>
        </div>

        {/* Featured Character Spotlight Stage */}
        <div className="bg-[#111116] border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Character Photo Column (5 cols) */}
          <div className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto min-h-[380px] bg-neutral-900 overflow-hidden">
            <img
              src={activeChar.image}
              alt={activeChar.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111116]" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 font-mono text-[11px]">
                {activeChar.clearance}
              </span>
            </div>
          </div>

          {/* Character Details Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  {activeChar.role}
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-1">
                  {activeChar.name}
                </h3>
                <p className="text-sm font-semibold text-neutral-400">
                  Portrayed by <span className="text-neutral-200">{activeChar.actor}</span>
                </p>
              </div>

              {/* Character Quote */}
              <div className="p-4 rounded-lg bg-neutral-900/80 border-l-2 border-cyan-400 flex items-start gap-3">
                <Quote className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-neutral-200 italic leading-relaxed">
                  {activeChar.quote}
                </p>
              </div>

              {/* Character Bio */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                  Dossier & Background
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {activeChar.bio}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Station Duty Active</span>
              </span>
              <span>·</span>
              <span>Psychological Clearance: Certified</span>
            </div>
          </div>
        </div>

        {/* 4-Crew Selector Thumbnails Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {characters.map((char) => {
            const isSelected = char.id === activeId;
            return (
              <button
                key={char.id}
                onClick={() => setActiveId(char.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                  isSelected
                    ? 'bg-neutral-900 border-cyan-400 shadow-lg shadow-cyan-950/40'
                    : 'bg-[#101014] border-white/5 hover:border-white/20'
                }`}
              >
                <img
                  src={char.image}
                  alt={char.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                    {char.name}
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate">{char.actor}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
