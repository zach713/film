import React, { useState } from 'react';
import { Download, Check, Sparkles, Users, Star, Play } from 'lucide-react';
import { FILM_DETAILS } from '../../lastSunriseData';
import { ThemePalette } from '../../themePalettes';

interface PortalMainCardProps {
  onOpenDownload?: () => void;
  onOpenStream: () => void;
  activeStreamsCount: number;
  theme: ThemePalette;
}

export const PortalMainCard: React.FC<PortalMainCardProps> = ({
  onOpenDownload,
  onOpenStream,
  activeStreamsCount,
  theme,
}) => {
  const [imageError, setImageError] = useState(false);

  const posterSrc = imageError
    ? FILM_DETAILS.fallbackImageUrl
    : FILM_DETAILS.posterImage;

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/90 border border-neutral-800/80 bg-[#0d0f17] select-none transition-all duration-300">
      {/* 1. TOP DIAGONAL STRIPED HAZARD RIBBON */}
      <div
        className="w-full py-2.5 px-4 text-center overflow-hidden transition-all duration-500"
        style={{
          background: `repeating-linear-gradient(-45deg, ${theme.ribbon1}, ${theme.ribbon1} 16px, ${theme.ribbon2} 16px, ${theme.ribbon2} 32px)`,
        }}
      >
        <div className="flex items-center justify-center gap-2 text-white font-black tracking-widest text-[10px] sm:text-xs uppercase drop-shadow font-mono">
          <Sparkles className="w-3.5 h-3.5 fill-white text-white animate-spin" />
          <span>EXCLUSIVE CAMPUS DRIVERS DOWNLOAD PORTAL</span>
          <Sparkles className="w-3.5 h-3.5 fill-white text-white animate-spin" />
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 sm:p-8 space-y-6 flex flex-col items-center text-center">
        {/* 2. CIRCULAR HERO AVATAR WITH NEON GLOW RING & CHECK BADGE */}
        <div className="relative -mt-2">
          {/* Outer glowing circular frame */}
          <div
            className="w-28 sm:w-32 h-28 sm:h-32 rounded-full p-1 flex items-center justify-center overflow-hidden relative transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              boxShadow: theme.ringShadow,
            }}
          >
            {/* User Provided Couple Poster inside circle */}
            <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900">
              <img
                src={posterSrc}
                alt="Campus Drivers Couple"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-[center_35%] scale-110 hover:scale-125 transition-transform duration-500"
              />
              {/* Subtle Title text overlay inside circular badge */}
              <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center pointer-events-none p-1">
                <span className="font-serif-movie text-[11px] sm:text-xs font-black text-amber-300 tracking-wider text-center leading-tight drop-shadow-md">
                  CAMPUS<br />DRIVERS
                </span>
              </div>
            </div>
          </div>

          {/* Verified checkmark badge at bottom right of circle */}
          <div
            className="absolute bottom-0 right-1 w-7 h-7 rounded-full border-2 border-[#0d0f17] flex items-center justify-center text-white shadow-lg transition-colors duration-500"
            style={{
              backgroundColor: theme.primary,
              boxShadow: `0 0 14px ${theme.primary}80`,
            }}
          >
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        </div>

        {/* 3. MAIN TITLE */}
        <div>
          <h1 className="font-serif-movie text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase text-balance drop-shadow-lg">
            {FILM_DETAILS.title}
          </h1>
        </div>

        {/* 4. FAST OFFLINE MIRROR STATUS PILL */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="neon-text-green">FAST OFFLINE MIRROR</span>
          <span aria-hidden="true" className="text-emerald-600">·</span>
          <span>AVAILABLE NOW</span>
        </div>

        {/* 5. CINEMATIC HERO IMAGE CARD SHOWING USER POSTER */}
        <div
          className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[460px] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl group cursor-pointer"
          onClick={onOpenStream}
        >
          <img
            src={posterSrc}
            alt="Campus Drivers Official Poster"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

          {/* Hover Play Button Overlay with theme color */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 25px ${theme.primary}aa`,
              }}
            >
              <Play className="w-7 h-7 fill-white ml-0.5" />
            </div>
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono border border-white/10">
              1969 Chevrolet SS Edition
            </span>
            <span
              className="text-white font-bold px-2.5 py-1 rounded text-[10px] uppercase font-mono shadow"
              style={{ backgroundColor: `${theme.primary}ee` }}
            >
              Watch Trailer (4K)
            </span>
          </div>
        </div>

        {/* 6. PROMINENT NEON GRADIENT CTA BUTTON */}
        <div className="w-full space-y-2.5 pt-1">
          <button
            onClick={onOpenDownload}
            className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${theme.btnGradient} text-white font-black text-base sm:text-lg uppercase tracking-wider font-mono flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
            style={{
              boxShadow: theme.btnShadow,
            }}
          >
            <Download className="w-6 h-6 stroke-[2.5]" />
            <span>DOWNLOAD MOVIE (4K / 1080P)</span>
          </button>

          {/* Monospace Subtext with matching theme glow */}
          <p
            className="font-mono-code text-[11px] sm:text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors duration-500"
            style={{
              color: theme.primary,
              textShadow: theme.textShadow,
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: theme.primary }}
            />
            <span>START HIGH-SPEED MIRRORS DOWNLOAD IMMEDIATELY</span>
          </p>
        </div>

        {/* 7. EASY 3-STEP DIRECT ACCESS BOX */}
        <div className="w-full bg-[#10131e] border border-neutral-800/80 rounded-2xl p-5 sm:p-6 text-left space-y-4 shadow-inner">
          <p
            className="font-mono-code text-center text-xs font-bold uppercase tracking-widest pb-1 transition-colors duration-500"
            style={{
              color: theme.primary,
              textShadow: theme.textShadow,
            }}
          >
            EASY 3-STEP DIRECT ACCESS
          </p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5">
              <div
                className="w-7 h-7 rounded-full border-2 font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-500"
                style={{
                  borderColor: theme.primary,
                  color: theme.primary,
                  backgroundColor: `${theme.primary}15`,
                  boxShadow: `0 0 10px ${theme.primary}40`,
                }}
              >
                1
              </div>
              <div className="space-y-0.5">
                <h4 className="font-mono-code text-xs font-bold text-white uppercase tracking-wider">
                  CLICK DOWNLOAD MOVIE BUTTON
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Press the CTA button above to load active cloud mirrors.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5">
              <div
                className="w-7 h-7 rounded-full border-2 font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-500"
                style={{
                  borderColor: theme.primary,
                  color: theme.primary,
                  backgroundColor: `${theme.primary}15`,
                  boxShadow: `0 0 10px ${theme.primary}40`,
                }}
              >
                2
              </div>
              <div className="space-y-0.5">
                <h4 className="font-mono-code text-xs font-bold text-white uppercase tracking-wider">
                  SELECT FILE FORMAT AND QUALITY
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Choose your preferred download quality (4K UHD 2160p, Full HD 1080p, or MP4 mobile optimized).
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="flex items-start gap-3.5 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={onOpenDownload}
            >
              <div
                className="w-7 h-7 rounded-full border-2 font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-500"
                style={{
                  borderColor: theme.primary,
                  color: theme.primary,
                  backgroundColor: `${theme.primary}15`,
                  boxShadow: `0 0 10px ${theme.primary}40`,
                }}
              >
                3
              </div>
              <div className="space-y-0.5">
                <h4 className="font-mono-code text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>DOWNLOAD BEAUTIFUL FULL HD</span>
                  <span className="text-[10px] text-pink-400 font-mono">→</span>
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Your browser will instantly retrieve the high quality zip packages or individual files.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8. STAT CARDS / SOCIAL PROOF */}
        <div className="w-full grid grid-cols-2 gap-4">
          {/* Active Streams Card */}
          <div className="bg-[#10131e] border border-neutral-800/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-1">
            <Users
              className="w-6 h-6 mb-1 transition-colors duration-500"
              style={{ color: theme.primary }}
            />
            <p className="font-mono-code text-2xl sm:text-3xl font-black text-white">
              {activeStreamsCount.toLocaleString()}+
            </p>
            <p className="font-mono-code text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              ACTIVE STREAMS TODAY
            </p>
          </div>

          {/* User Rating Card */}
          <div className="bg-[#10131e] border border-neutral-800/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center space-y-1">
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="font-mono-code text-2xl sm:text-3xl font-black text-white">
              4.9/5 Rating
            </p>
            <p className="font-mono-code text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              USER SATISFACTION
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
