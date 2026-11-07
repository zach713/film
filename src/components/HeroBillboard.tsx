import React, { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../types';
import { startAmbientTrailerSound, stopAmbientTrailerSound } from '../utils/audio';

interface HeroBillboardProps {
  items: MediaItem[];
  onPlay: (item: MediaItem) => void;
  onMoreInfo: (item: MediaItem) => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  items,
  onPlay,
  onMoreInfo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const featuredList = items.filter((i) => i.featured);
  const currentItem = featuredList[currentIndex] || items[0];

  useEffect(() => {
    // When unmuted, play cinematic ambient drone
    if (!isMuted) {
      startAmbientTrailerSound();
    } else {
      stopAmbientTrailerSound();
    }
    return () => {
      stopAmbientTrailerSound();
    };
  }, [isMuted, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  if (!currentItem) return null;

  return (
    <section className="relative w-full h-[78vh] min-h-[550px] max-h-[850px] overflow-hidden select-none">
      {/* Background Cinematic Image / Backdrop */}
      <div className="absolute inset-0">
        <img
          src={currentItem.backdropUrl}
          alt={currentItem.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out"
        />

        {/* Cinematic Vignettes and Scrims */}
        {/* Left-to-right reading gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 md:via-[#141414]/50 to-transparent w-full md:w-3/4" />
        {/* Bottom fade into the carousel rows */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
        {/* Top subtle vignette for navbar */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#141414]/80 to-transparent" />
      </div>

      {/* Hero Typography & Primary Actions Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-2xl space-y-4">
          {/* Netflix Series / Film Branding Mark */}
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xs md:text-sm tracking-widest text-[#E50914] uppercase">
              {currentItem.isOriginal ? 'N  S E R I E S' : 'N  F I L M'}
            </span>
          </div>

          {/* Huge Main Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md text-balance leading-none">
            {currentItem.title}
          </h1>

          {/* Top 10 Ribbon */}
          {currentItem.top10Rank && (
            <div className="flex items-center gap-2.5 text-xs md:text-sm font-bold text-white">
              <span className="bg-[#E50914] text-white px-1.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider">
                TOP 10
              </span>
              <span>#{currentItem.top10Rank} in {currentItem.type === 'tv' ? 'TV Shows' : 'Movies'} Today</span>
            </div>
          )}

          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-300 font-medium">
            <span className="text-emerald-400 font-bold">{currentItem.matchScore}% Match</span>
            <span aria-hidden="true">·</span>
            <span>{currentItem.releaseYear}</span>
            <span aria-hidden="true">·</span>
            <span className="border border-neutral-600 px-1 py-0.2 rounded text-[11px] text-neutral-300">
              {currentItem.maturityRating}
            </span>
            <span aria-hidden="true">·</span>
            <span>{currentItem.duration}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[11px] border border-neutral-700 px-1 rounded text-neutral-400">
              {currentItem.quality}
            </span>
          </div>

          {/* Synopsis Logline */}
          <p className="text-sm md:text-base text-neutral-200 line-clamp-3 leading-relaxed drop-shadow-sm font-normal">
            {currentItem.overview}
          </p>

          {/* Action Buttons: Play + More Info */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onPlay(currentItem)}
              className="py-2 md:py-2.5 px-6 md:px-8 bg-white hover:bg-neutral-200 text-black font-bold text-sm md:text-base rounded flex items-center gap-2.5 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md shadow-black/40"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </button>

            <button
              onClick={() => onMoreInfo(currentItem)}
              className="py-2 md:py-2.5 px-5 md:px-7 bg-neutral-600/70 hover:bg-neutral-600/50 text-white font-semibold text-sm md:text-base rounded flex items-center gap-2.5 transition-all duration-200 backdrop-blur-sm"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Edge: Mute/Unmute Audio Toggle & Maturity Rating Strip */}
      <div className="absolute right-0 bottom-28 md:bottom-36 z-20 flex items-center gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-full border border-white/40 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute trailer preview audio' : 'Mute trailer preview audio'}
          title={isMuted ? 'Listen to soundtrack preview' : 'Mute soundtrack'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />}
        </button>

        <div className="bg-[#141414]/70 border-l-3 border-neutral-200 py-1 pl-3 pr-5 text-xs font-semibold text-neutral-200 backdrop-blur-sm">
          {currentItem.maturityRating}
        </div>
      </div>

      {/* Hero Switcher Indicators (Bottom Right Dots & Arrows) */}
      {featuredList.length > 1 && (
        <div className="absolute left-4 md:left-12 bottom-6 z-20 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-black/40 transition-colors"
            aria-label="Previous featured release"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            {featuredList.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-6 bg-[#E50914]' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-black/40 transition-colors"
            aria-label="Next featured release"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};
