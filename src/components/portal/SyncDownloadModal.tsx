import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Check } from 'lucide-react';
import { ThemePalette } from '../../themePalettes';

const OFFER_URL = 'https://trkoffer.net/cl/i/e6q64q';

interface SyncDownloadModalProps {
  onClose: () => void;
  theme?: ThemePalette;
}

export const SyncDownloadModal: React.FC<SyncDownloadModalProps> = ({ onClose }) => {
  const [percent] = useState(100);

  useEffect(() => {
    // Automatically redirect after brief display of the 100% synced status
    const timer = setTimeout(() => {
      try {
        window.location.href = OFFER_URL;
      } catch {
        // Safe fallback in case of iframe navigation restrictions
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Syncing Files Modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none"
    >
      {/* Background ambient neon glow matching user screenshot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] rounded-full bg-[#FF007A]/20 blur-[140px]" />
      </div>

      {/* Main Modal Card (Exact match to user screenshot) */}
      <div
        className="relative w-full max-w-[480px] sm:max-w-[500px] bg-[#0c0e17] border border-[#1e2335] rounded-[28px] p-6 sm:p-9 space-y-6 shadow-2xl text-center z-10 transition-all"
        style={{
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 0, 122, 0.18)',
        }}
      >
        {/* Top-Right Close Button matching screenshot */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-[#141824] hover:bg-[#1a2030] text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-[#23283a] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. TOP SPINNING PINK NEON RING WITH SYNC ARROWS */}
        <div className="flex justify-center pt-2">
          <div
            className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border-[5px] sm:border-[6px] border-[#FF007A] flex items-center justify-center relative transition-all"
            style={{
              boxShadow: '0 0 32px #FF007A, inset 0 0 16px rgba(255, 0, 122, 0.4)',
            }}
          >
            <RefreshCw
              className="w-10 sm:w-11 h-10 sm:h-11 text-[#FF007A] animate-spin stroke-[2.75]"
              style={{ filter: 'drop-shadow(0 0 8px #FF007A)' }}
            />
          </div>
        </div>

        {/* 2. HEADLINE & PERCENTAGE SUBTITLE */}
        <div className="space-y-1.5">
          <h2 className="font-mono text-xl sm:text-2xl font-black text-white tracking-[0.18em] uppercase">
            SYNCING FILES...
          </h2>
          <p className="font-mono text-xs sm:text-[13px] text-neutral-400 tracking-wide font-normal">
            Allocating high-speed cloud mirrors ({percent}%)
          </p>
        </div>

        {/* 3. STEP STATUS BOX (Exact 3 items from user screenshot) */}
        <div className="bg-[#0f121d] border border-[#1b2031] rounded-2xl p-4 sm:p-5 text-left space-y-3.5 shadow-inner">
          {/* Step 1 */}
          <div className="flex items-center gap-3.5 font-mono text-[11px] sm:text-xs font-bold text-white tracking-wider">
            <div
              className="w-6 h-6 rounded-full bg-[#FF007A] flex items-center justify-center text-white shrink-0"
              style={{ boxShadow: '0 0 10px #FF007A' }}
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
              className="w-6 h-6 rounded-full bg-[#FF007A] flex items-center justify-center text-white shrink-0"
              style={{ boxShadow: '0 0 10px #FF007A' }}
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
              className="w-6 h-6 rounded-full bg-[#FF007A] flex items-center justify-center text-white shrink-0"
              style={{ boxShadow: '0 0 10px #FF007A' }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3.5]" />
            </div>
            <span className="text-white">
              GENERATING SECURE ROUTING TUNNEL...
            </span>
          </div>
        </div>

        {/* 4. GLOWING HORIZONTAL PROGRESS BAR (Exact pink-to-orange gradient from screenshot) */}
        <div className="relative h-2 sm:h-2.5 w-full bg-[#151928] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 w-full"
            style={{
              background: 'linear-gradient(90deg, #FF007A 0%, #FF2670 45%, #FF5E00 100%)',
              boxShadow: '0 0 16px #FF007A, 0 0 28px rgba(255, 94, 0, 0.6)',
            }}
          />
        </div>

        {/* 5. LAST SECTION: REDIRECTING STATUS (Exact layout from user screenshot) */}
        <div className="pt-1">
          <a
            href={OFFER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 font-mono text-[11px] sm:text-xs font-bold text-neutral-300 hover:text-white tracking-wider uppercase transition-colors group cursor-pointer"
            title="Click to redirect immediately to mirror node"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FF007A] animate-spin shrink-0 stroke-[2.5] group-hover:scale-110" />
            <span className="text-neutral-300 group-hover:text-white group-hover:underline decoration-[#FF007A]">
              REDIRECTING TO DOWNLOAD MIRROR NODE SECURELY...
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
