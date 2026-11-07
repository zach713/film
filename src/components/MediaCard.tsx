import React, { useState } from 'react';
import { Play, Plus, Check, ThumbsUp, ChevronDown, Volume2 } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
  onMoreInfo: (item: MediaItem) => void;
  isInMyList: boolean;
  onToggleMyList: (item: MediaItem) => void;
  isTop10?: boolean;
  rank?: number;
  userRating?: 'liked' | 'disliked' | null;
  onRate?: (item: MediaItem, rating: 'liked' | 'disliked') => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  onPlay,
  onMoreInfo,
  isInMyList,
  onToggleMyList,
  isTop10 = false,
  rank,
  userRating,
  onRate,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback gradient if an external image errors
  const fallbackGradients = [
    'from-neutral-900 to-neutral-800',
    'from-red-950/80 to-neutral-900',
    'from-blue-950/80 to-neutral-900',
    'from-purple-950/80 to-neutral-900',
  ];
  const fallbackIndex = item.title.length % fallbackGradients.length;

  return (
    <div
      className={`relative group shrink-0 transition-all duration-300 ${
        isTop10 ? 'w-48 md:w-60 h-64 md:h-80' : 'w-48 sm:w-60 md:w-72 h-32 sm:h-40 md:h-44'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top 10 Big Number Typography Overlay */}
      {isTop10 && rank !== undefined && (
        <div className="absolute left-0 bottom-0 top-0 w-24 md:w-32 flex items-center justify-start pointer-events-none z-10">
          <span
            className="font-display font-black text-7xl md:text-9xl tracking-tighter select-none leading-none"
            style={{
              WebkitTextStroke: '4px #595959',
              color: '#141414',
              textShadow: '0 0 10px rgba(0,0,0,0.8)',
            }}
          >
            {rank}
          </span>
        </div>
      )}

      {/* Main Card Container */}
      <div
        className={`relative w-full h-full rounded overflow-hidden bg-[#181818] cursor-pointer shadow-md transition-all duration-300 ${
          isTop10 ? 'ml-12 md:ml-16 w-36 md:w-44' : ''
        }`}
        onClick={() => onMoreInfo(item)}
      >
        {!imageError ? (
          <img
            src={isTop10 ? item.posterUrl : item.backdropUrl}
            alt={item.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col justify-end p-3 bg-gradient-to-br ${fallbackGradients[fallbackIndex]}`}
          >
            <span className="text-[10px] uppercase font-bold text-[#E50914] tracking-wider">
              {item.isOriginal ? 'Netflix Original' : 'Feature Film'}
            </span>
            <p className="font-bold text-xs text-white line-clamp-2">{item.title}</p>
          </div>
        )}

        {/* Netflix Red "N" Badge on Originals */}
        {item.isOriginal && (
          <div className="absolute top-2 left-2 z-10">
            <span className="font-display font-black text-sm text-[#E50914] drop-shadow-md select-none">
              N
            </span>
          </div>
        )}

        {/* Continue Watching Progress Bar */}
        {item.progressPercent !== undefined && item.progressPercent > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-neutral-700">
            <div
              className="h-full bg-[#E50914]"
              style={{ width: `${item.progressPercent}%` }}
            />
          </div>
        )}

        {/* Quiet title label overlay at the bottom if not hovering */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none">
          <p className="text-xs md:text-sm font-semibold text-white truncate drop-shadow">
            {item.title}
          </p>
        </div>
      </div>

      {/* Hover Floating Mini Card Preview (Netflix signature popup preview) */}
      {isHovered && !isTop10 && (
        <div
          className="absolute -top-12 -left-4 -right-4 bg-[#181818] rounded-md shadow-2xl shadow-black border border-neutral-800 z-30 transition-all duration-200 overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card Thumbnail / Header */}
          <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 cursor-pointer" onClick={() => onPlay(item)}>
            <img
              src={item.backdropUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            <div className="absolute top-2 left-2">
              <span className="font-display font-black text-xs text-[#E50914] drop-shadow">N</span>
            </div>
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate drop-shadow-md">
                {item.title}
              </span>
            </div>
          </div>

          {/* Quick Controls & Details */}
          <div className="p-3 space-y-2">
            {/* Action Buttons Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {/* Play Button */}
                <button
                  onClick={() => onPlay(item)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                  title="Play"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>

                {/* Add to My List Toggle */}
                <button
                  onClick={() => onToggleMyList(item)}
                  className="w-8 h-8 rounded-full border border-neutral-500 hover:border-white bg-[#2a2a2a]/80 text-white flex items-center justify-center transition-colors"
                  title={isInMyList ? 'Remove from My List' : 'Add to My List'}
                >
                  {isInMyList ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
                </button>

                {/* Thumbs Up Like Button */}
                <button
                  onClick={() => onRate && onRate(item, userRating === 'liked' ? 'liked' : 'liked')}
                  className={`w-8 h-8 rounded-full border border-neutral-500 hover:border-white bg-[#2a2a2a]/80 flex items-center justify-center transition-colors ${
                    userRating === 'liked' ? 'text-[#E50914] border-[#E50914]' : 'text-white'
                  }`}
                  title="I like this"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Expand More Info Chevron */}
              <button
                onClick={() => onMoreInfo(item)}
                className="w-8 h-8 rounded-full border border-neutral-500 hover:border-white bg-[#2a2a2a]/80 text-white flex items-center justify-center transition-colors"
                title="More info"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Match, Maturity, Duration */}
            <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-300">
              <span className="text-emerald-400 font-bold">{item.matchScore}% Match</span>
              <span className="border border-neutral-600 px-1 py-0.5 rounded text-[10px] text-neutral-300">
                {item.maturityRating}
              </span>
              <span>{item.duration}</span>
              <span className="border border-neutral-700 px-1 py-0.5 rounded text-[9px] text-neutral-400">
                {item.quality}
              </span>
            </div>

            {/* Genre Tags (Unboxed with ·) */}
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 truncate">
              {item.genres.slice(0, 3).map((genre, idx) => (
                <React.Fragment key={genre}>
                  <span>{genre}</span>
                  {idx < Math.min(item.genres.length - 1, 2) && (
                    <span aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
