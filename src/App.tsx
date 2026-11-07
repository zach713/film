import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { THEME_PALETTES, ThemePalette } from './themePalettes';
import { PortalMainCard } from './components/portal/PortalMainCard';
import { StreamPlayerModal } from './components/portal/StreamPlayerModal';
import { SyncDownloadModal } from './components/portal/SyncDownloadModal';
import { SolarBackground } from './components/portal/SolarBackground';

export default function App() {
  // Changed active color to Electric Cyan & Cobalt (#00F0FF)
  const [currentTheme, setCurrentTheme] = useState<ThemePalette>(THEME_PALETTES[0]);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isStreamOpen, setIsStreamOpen] = useState(false);
  const [activeStreamsCount, setActiveStreamsCount] = useState(14820);

  // Live active streams simulation counter (incrementing gently)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStreamsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#07080c] text-white flex flex-col items-center justify-center font-sans relative p-4 sm:p-8"
      style={{
        // Dynamic selection color matching active theme
        caretColor: currentTheme.primary,
      }}
    >
      {/* Ambient Animated Background Canvas with current theme */}
      <SolarBackground currentTheme={currentTheme} />

      {/* Floating Minimalist Color Palette Picker */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-1.5 bg-[#0e111c]/90 backdrop-blur-md border border-neutral-800/80 px-3 py-1.5 rounded-full shadow-xl">
        <Palette className="w-3.5 h-3.5 text-neutral-400 mr-0.5" />
        {THEME_PALETTES.map((theme) => {
          const isSelected = theme.id === currentTheme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setCurrentTheme(theme)}
              title={theme.name}
              aria-label={`Switch to ${theme.name}`}
              className={`w-5 h-5 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                isSelected
                  ? 'scale-125 ring-2 ring-white shadow-lg'
                  : 'hover:scale-110 opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: theme.primary,
                boxShadow: isSelected ? `0 0 10px ${theme.primary}` : undefined,
              }}
            >
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-white block" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Standalone Centered Card */}
      <main className="w-full max-w-xl flex flex-col items-center justify-center my-auto">
        <PortalMainCard
          onOpenDownload={() => setIsDownloadOpen(true)}
          onOpenStream={() => setIsStreamOpen(true)}
          activeStreamsCount={activeStreamsCount}
          theme={currentTheme}
        />
      </main>

      {/* Syncing Files Modal (opens on download CTA and redirects to offer link) */}
      {isDownloadOpen && (
        <SyncDownloadModal
          onClose={() => setIsDownloadOpen(false)}
          theme={currentTheme}
        />
      )}

      {/* Online Streaming Player Modal (opens on poster / trailer click) */}
      {isStreamOpen && (
        <StreamPlayerModal onClose={() => setIsStreamOpen(false)} />
      )}
    </div>
  );
}
