import React, { useState, useEffect } from 'react';
import { THEME_PALETTES, ThemePalette } from './themePalettes';
import { PortalMainCard } from './components/portal/PortalMainCard';
import { SyncDownloadModal } from './components/portal/SyncDownloadModal';
import { StreamPlayerModal } from './components/portal/StreamPlayerModal';
import { SolarBackground } from './components/portal/SolarBackground';

export default function App() {
  // Use Hyper Pink & Orange theme matching the exact neon styling of the screenshot
  const [currentTheme] = useState<ThemePalette>(THEME_PALETTES[4]); // Hyper Pink & Orange (#FF007A)
  // Modal defaults to open so user immediately sees their requested Syncing Files screen
  const [isDownloadOpen, setIsDownloadOpen] = useState(true);
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
    <div className="min-h-screen bg-[#07080c] text-white flex flex-col items-center justify-center font-sans selection:bg-[#FF007A] selection:text-white relative p-4 sm:p-8">
      {/* Ambient Animated Background Canvas */}
      <SolarBackground currentTheme={currentTheme} />

      {/* Main Standalone Centered Card (Exactly matching user's design) */}
      <main className="w-full max-w-xl flex flex-col items-center justify-center my-auto">
        <PortalMainCard
          onOpenDownload={() => setIsDownloadOpen(true)}
          onOpenStream={() => setIsStreamOpen(true)}
          activeStreamsCount={activeStreamsCount}
          theme={currentTheme}
        />
      </main>

      {/* Interactive Syncing Files & Download Modal (opens on CTA click) */}
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
