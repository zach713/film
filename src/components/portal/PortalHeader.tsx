import React, { useState } from 'react';
import { Download, Volume2, VolumeX, Palette, ChevronDown, Check } from 'lucide-react';
import { THEME_PALETTES, ThemePalette } from '../../themePalettes';

interface PortalHeaderProps {
  onOpenDownload: () => void;
  isPlayingScore: boolean;
  onToggleScore: () => void;
  activeTab: 'portal' | 'story' | 'mirrors' | 'reviews';
  onTabChange: (tab: 'portal' | 'story' | 'mirrors' | 'reviews') => void;
  currentTheme: ThemePalette;
  onSelectTheme: (theme: ThemePalette) => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  onOpenDownload,
  isPlayingScore,
  onToggleScore,
  activeTab,
  onTabChange,
  currentTheme,
  onSelectTheme,
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#07080c]/90 backdrop-blur-md border-b border-neutral-800/80 py-3 px-4 md:px-8 select-none shadow-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: currentTheme.primary }}
          />
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('portal');
            }}
            className="font-serif-movie text-base sm:text-lg font-black tracking-wider text-white uppercase whitespace-nowrap transition-colors"
          >
            CAMPUS DRIVERS
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-bold tracking-wider uppercase text-neutral-400">
          <button
            onClick={() => onTabChange('portal')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'portal' ? 'text-white border-b-2 pb-0.5' : 'hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'portal' ? currentTheme.primary : 'transparent',
            }}
          >
            Portal Card
          </button>
          <button
            onClick={() => onTabChange('mirrors')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'mirrors' ? 'text-white border-b-2 pb-0.5' : 'hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'mirrors' ? currentTheme.primary : 'transparent',
            }}
          >
            Cloud Mirrors
          </button>
          <button
            onClick={() => onTabChange('story')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'story' ? 'text-white border-b-2 pb-0.5' : 'hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'story' ? currentTheme.primary : 'transparent',
            }}
          >
            Film Lore
          </button>
          <button
            onClick={() => onTabChange('reviews')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'reviews' ? 'text-white border-b-2 pb-0.5' : 'hover:text-white'
            }`}
            style={{
              borderColor: activeTab === 'reviews' ? currentTheme.primary : 'transparent',
            }}
          >
            Reviews
          </button>
        </nav>

        {/* Zone 3: Actions + Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Palette Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-neutral-700 hover:border-neutral-500 bg-[#121522] text-xs font-mono text-neutral-300 hover:text-white transition-colors"
              title="Change portal color theme"
              aria-label="Change color palette"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
              <span className="hidden sm:inline">{currentTheme.name.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#10131e] border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 text-xs font-mono space-y-1">
                <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Select Color Theme
                </p>
                {THEME_PALETTES.map((pal) => {
                  const isSelected = pal.id === currentTheme.id;
                  return (
                    <button
                      key={pal.id}
                      onClick={() => {
                        onSelectTheme(pal);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                        isSelected ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full shadow-sm"
                          style={{
                            background: `linear-gradient(135deg, ${pal.primary}, ${pal.secondary})`,
                          }}
                        />
                        <span>{pal.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Soundtrack theme audio toggle */}
          <button
            onClick={onToggleScore}
            className="w-8 h-8 rounded-full border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 flex items-center justify-center transition-all"
            style={{
              borderColor: isPlayingScore ? currentTheme.primary : undefined,
              color: isPlayingScore ? currentTheme.primary : undefined,
            }}
            title={isPlayingScore ? 'Mute film theme' : 'Listen to film soundtrack'}
            aria-label="Toggle film soundtrack"
          >
            {isPlayingScore ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Download CTA Button */}
          <button
            onClick={onOpenDownload}
            className={`px-3.5 sm:px-4 py-2 bg-gradient-to-r ${currentTheme.btnGradient} text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-1.5 sm:gap-2 hover:scale-105 active:scale-95 transition-transform whitespace-nowrap shadow-md`}
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Download 4K</span>
            <span className="sm:hidden">4K</span>
          </button>
        </div>
      </div>
    </header>
  );
};
