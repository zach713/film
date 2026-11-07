import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../types';
import { MediaCard } from './MediaCard';

interface MediaRowProps {
  title: string;
  items: MediaItem[];
  onPlay: (item: MediaItem) => void;
  onMoreInfo: (item: MediaItem) => void;
  myListIds: Set<string>;
  onToggleMyList: (item: MediaItem) => void;
  isTop10?: boolean;
  userRatings?: Record<string, 'liked' | 'disliked'>;
  onRate?: (item: MediaItem, rating: 'liked' | 'disliked') => void;
}

export const MediaRow: React.FC<MediaRowProps> = ({
  title,
  items,
  onPlay,
  onMoreInfo,
  myListIds,
  onToggleMyList,
  isTop10 = false,
  userRatings = {},
  onRate,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  if (!items || items.length === 0) return null;

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/row my-6 md:my-8">
      {/* Row Header */}
      <div className="px-4 md:px-12 mb-2 md:mb-3 flex items-center justify-between">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-normal font-display flex items-center gap-2 group cursor-pointer hover:text-neutral-200">
          <span>{title}</span>
          <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-transform group-hover:translate-x-1 duration-200 opacity-0 group-hover:opacity-100 hidden sm:inline-flex items-center">
            Explore All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </span>
        </h2>
      </div>

      {/* Row Carousel Area */}
      <div className="relative">
        {/* Left Slider Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-10 md:w-14 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/row:opacity-100 cursor-pointer focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 md:w-8 h-6 md:h-8" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-center gap-2 sm:gap-3 px-4 md:px-12 overflow-x-auto no-scrollbar py-4 scroll-smooth"
        >
          {items.map((item, index) => (
            <MediaCard
              key={`${item.id}-${index}`}
              item={item}
              onPlay={onPlay}
              onMoreInfo={onMoreInfo}
              isInMyList={myListIds.has(item.id)}
              onToggleMyList={onToggleMyList}
              isTop10={isTop10}
              rank={isTop10 ? index + 1 : undefined}
              userRating={userRatings[item.id]}
              onRate={onRate}
            />
          ))}
        </div>

        {/* Right Slider Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-10 md:w-14 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/row:opacity-100 cursor-pointer focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 md:w-8 h-6 md:h-8" />
          </button>
        )}
      </div>
    </div>
  );
};
