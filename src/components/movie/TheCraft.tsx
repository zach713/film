import React, { useState } from 'react';
import { Disc, Play, Pause, Music, Sliders, Volume2 } from 'lucide-react';
import { SoundtrackTrack } from '../../movieData';
import { playScoreTrack, stopScoreTrack } from '../../utils/audio';

interface TheCraftProps {
  soundtrack: SoundtrackTrack[];
}

export const TheCraft: React.FC<TheCraftProps> = ({ soundtrack }) => {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  const handleToggleTrack = (track: SoundtrackTrack) => {
    if (activeTrackId === track.id) {
      stopScoreTrack();
      setActiveTrackId(null);
    } else {
      playScoreTrack(track.fundamentalFreq);
      setActiveTrackId(track.id);
    }
  };

  return (
    <section id="craft" className="py-20 md:py-28 px-4 md:px-8 border-t border-white/10 bg-[#09090c]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-cyan-400">
            The Production & Music
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            The Craft Behind The Vision
          </h2>
        </div>

        {/* 3 Asymmetric Bento Cards on Production */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <span className="font-mono text-cyan-400 text-xs font-bold uppercase tracking-wider">
              01. Cinematography
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Shot on 70mm 15-Perf IMAX
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              Director of Photography Hoyte van Hoytema utilized bespoke ultra-high-resolution IMAX film cameras mounted directly to centrifuge counterweights, capturing unmatched textural detail at 18,000 horizontal lines of resolution.
            </p>
            <div className="pt-2 text-xs text-neutral-400 font-mono">
              Aspect Ratio: 1.43:1 Native IMAX
            </div>
          </div>

          <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <span className="font-mono text-cyan-400 text-xs font-bold uppercase tracking-wider">
              02. Production Design
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              120-Ton Practical Station
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              Rather than rely on green screens, production constructed a fully functional pressurized habitat set on Stage 5 with pneumatic airlocks and rotating corridor gantries to induce genuine disorienting zero-g choreography.
            </p>
            <div className="pt-2 text-xs text-neutral-400 font-mono">
              Stage 5 · Warner Bros. Studios
            </div>
          </div>

          <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
            <span className="font-mono text-cyan-400 text-xs font-bold uppercase tracking-wider">
              03. Acoustic Engineering
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Cathedral Pipe Organ Score
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              Hans Zimmer traveled to Temple Church in London to record the thunderous 4-manual pipe organ, layering seismic 16-foot bass pedals against vintage analog Moog synthesizers to create the sound of cosmic silence.
            </p>
            <div className="pt-2 text-xs text-neutral-400 font-mono">
              Recorded at Abbey Road Studios
            </div>
          </div>
        </div>

        {/* Interactive Original Soundtrack Player */}
        <div id="soundtrack" className="bg-[#0f0f14] border border-white/10 rounded-2xl p-6 md:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Disc className={`w-6 h-6 ${activeTrackId ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white font-display">
                  Original Motion Picture Soundtrack
                </h3>
                <p className="text-xs text-neutral-400">
                  Composed by <span className="text-white font-semibold">Hans Zimmer</span> · WaterTower Music
                </p>
              </div>
            </div>

            {/* Audio state badge */}
            <div className="flex items-center gap-2 text-xs font-mono">
              {activeTrackId ? (
                <span className="flex items-center gap-2 text-cyan-400 bg-cyan-950/60 border border-cyan-700/60 px-3 py-1.5 rounded-full">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Synthesizer Audition Active</span>
                </span>
              ) : (
                <span className="text-neutral-500">Click any track below to preview theme</span>
              )}
            </div>
          </div>

          {/* Tracklist items */}
          <div className="divide-y divide-white/5 space-y-1">
            {soundtrack.map((track) => {
              const isPlaying = activeTrackId === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleToggleTrack(track)}
                  className={`pt-3 pb-3 px-3 rounded-lg flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isPlaying ? 'bg-cyan-950/30 border border-cyan-800/40 text-cyan-300' : 'hover:bg-neutral-900/60 text-white'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <button
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isPlaying
                          ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/40'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                      aria-label={isPlaying ? 'Pause track' : 'Play track'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-neutral-500">{track.trackNumber}.</span>
                        <h4 className="text-sm font-bold truncate">{track.title}</h4>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">{track.notes}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-neutral-400">
                    {isPlaying && (
                      <div className="flex items-end gap-0.5 h-4">
                        <span className="w-1 bg-cyan-400 animate-pulse h-2" />
                        <span className="w-1 bg-cyan-400 animate-pulse h-4" />
                        <span className="w-1 bg-cyan-400 animate-pulse h-3" />
                      </div>
                    )}
                    <span>{track.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
