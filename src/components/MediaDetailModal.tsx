import React, { useState, useEffect } from 'react';
import { X, Play, Plus, Check, ThumbsUp, ThumbsDown, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaDetailModalProps {
  item: MediaItem;
  allItems: MediaItem[];
  onClose: () => void;
  onPlay: (item: MediaItem) => void;
  isInMyList: boolean;
  onToggleMyList: (item: MediaItem) => void;
  userRating?: 'liked' | 'disliked' | null;
  onRate?: (item: MediaItem, rating: 'liked' | 'disliked') => void;
  onSelectSimilar: (item: MediaItem) => void;
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({
  item,
  allItems,
  onClose,
  onPlay,
  isInMyList,
  onToggleMyList,
  userRating,
  onRate,
  onSelectSimilar,
}) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Find similar titles based on shared genres
  const similarItems = allItems
    .filter((other) => other.id !== item.id && other.genres.some((g) => item.genres.includes(g)))
    .slice(0, 6);

  // Fallback similar items if none match
  const displaySimilar = similarItems.length >= 3 ? similarItems : allItems.filter((i) => i.id !== item.id).slice(0, 6);

  const episodes = item.episodes || [
    {
      id: `${item.id}-ep1`,
      seasonNumber: 1,
      episodeNumber: 1,
      title: 'Pilot: The Catalyst',
      overview: 'A fateful discovery triggers a sequence of irreversible decisions, bringing ancient tensions to the breaking point.',
      duration: '54m',
      thumbnailUrl: item.backdropUrl,
      progressPercent: 30,
    },
    {
      id: `${item.id}-ep2`,
      seasonNumber: 1,
      episodeNumber: 2,
      title: 'Descent into Shadows',
      overview: 'Pursued by relentless adversaries, the team is forced underground into uncharted territories where loyalties fracture.',
      duration: '49m',
      thumbnailUrl: item.backdropUrl,
    },
    {
      id: `${item.id}-ep3`,
      seasonNumber: 1,
      episodeNumber: 3,
      title: 'The Reckoning',
      overview: 'With the perimeter breached and resources running scarce, a desperate gambit offers either total victory or obliteration.',
      duration: '58m',
      thumbnailUrl: item.backdropUrl,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#181818] rounded-none md:rounded-lg overflow-hidden shadow-2xl border border-neutral-800 text-white my-auto max-h-[96vh] md:max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-[#181818]/80 hover:bg-[#282828] text-white flex items-center justify-center transition-colors focus:outline-none shadow-md"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative aspect-video w-full max-h-[440px] overflow-hidden bg-neutral-900">
          <img
            src={item.backdropUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#181818] to-transparent" />

          {/* Banner Overlay Controls */}
          <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10 flex flex-col justify-end">
            {item.isOriginal && (
              <span className="font-display font-black text-xs md:text-sm tracking-widest text-[#E50914] uppercase mb-1">
                N  S E R I E S
              </span>
            )}
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
              {item.title}
            </h2>

            {/* Action Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onPlay(item)}
                  className="py-2 px-6 md:px-8 bg-white hover:bg-neutral-200 text-black font-bold text-sm md:text-base rounded flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                  <span>Play</span>
                </button>

                <button
                  onClick={() => onToggleMyList(item)}
                  className="w-10 h-10 rounded-full border border-neutral-400 hover:border-white bg-[#2a2a2a]/80 text-white flex items-center justify-center transition-colors"
                  title={isInMyList ? 'Remove from My List' : 'Add to My List'}
                >
                  {isInMyList ? <Check className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => onRate && onRate(item, 'liked')}
                  className={`w-10 h-10 rounded-full border border-neutral-400 hover:border-white bg-[#2a2a2a]/80 flex items-center justify-center transition-colors ${
                    userRating === 'liked' ? 'text-[#E50914] border-[#E50914]' : 'text-white'
                  }`}
                  title="Like"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onRate && onRate(item, 'disliked')}
                  className={`w-10 h-10 rounded-full border border-neutral-400 hover:border-white bg-[#2a2a2a]/80 flex items-center justify-center transition-colors ${
                    userRating === 'disliked' ? 'text-neutral-400 border-neutral-400' : 'text-white'
                  }`}
                  title="Not for me"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className="w-10 h-10 rounded-full border border-neutral-400 hover:border-white bg-[#2a2a2a]/80 text-white flex items-center justify-center transition-colors"
                title={isAudioMuted ? 'Unmute preview' : 'Mute preview'}
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body: Split Columns */}
        <div className="px-6 md:px-10 py-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {/* Left 2 Columns: Metadata & Overview */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-neutral-300">
                <span className="text-emerald-400 font-bold">{item.matchScore}% Match</span>
                <span aria-hidden="true">·</span>
                <span>{item.releaseYear}</span>
                <span aria-hidden="true">·</span>
                <span className="border border-neutral-600 px-1 py-0.5 rounded text-[11px] text-neutral-300">
                  {item.maturityRating}
                </span>
                <span aria-hidden="true">·</span>
                <span>{item.duration}</span>
                <span aria-hidden="true">·</span>
                <span className="border border-neutral-700 px-1 py-0.5 rounded text-[10px] text-neutral-400">
                  {item.quality}
                </span>
                <span className="border border-neutral-700 px-1 py-0.5 rounded text-[10px] text-neutral-400">
                  {item.audio}
                </span>
              </div>

              {item.top10Rank && (
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className="bg-[#E50914] text-white px-1.5 py-0.5 rounded text-[10px] font-black uppercase">
                    TOP 10
                  </span>
                  <span>#{item.top10Rank} in {item.type === 'tv' ? 'TV Shows' : 'Movies'} Today</span>
                </div>
              )}

              <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-normal">
                {item.overview}
              </p>

              {item.advisoryWarnings && item.advisoryWarnings.length > 0 && (
                <div className="pt-2 text-xs text-neutral-400">
                  <span className="font-semibold text-neutral-300">Advisory: </span>
                  {item.advisoryWarnings.join(', ')}
                </div>
              )}
            </div>

            {/* Right Column: Cast, Genres, Mood */}
            <div className="space-y-3 text-xs md:text-sm text-neutral-400">
              <div>
                <span className="text-neutral-500">Cast: </span>
                <span className="text-neutral-200">{item.cast.join(', ')}</span>
              </div>

              <div>
                <span className="text-neutral-500">Genres: </span>
                <span className="text-neutral-200">{item.genres.join(', ')}</span>
              </div>

              <div>
                <span className="text-neutral-500">This show is: </span>
                <span className="text-neutral-200">{item.tags.join(', ')}</span>
              </div>

              {item.creators && item.creators.length > 0 && (
                <div>
                  <span className="text-neutral-500">Creators: </span>
                  <span className="text-neutral-200">{item.creators.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Episodes Section for TV Shows */}
          {item.type === 'tv' && (
            <div className="border-t border-neutral-800 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-white font-display">Episodes</h3>
                {item.seasonsCount && item.seasonsCount > 1 && (
                  <div className="relative">
                    <select
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(Number(e.target.value))}
                      className="appearance-none bg-[#242424] border border-neutral-700 hover:border-neutral-500 text-xs text-white py-1.5 pl-3 pr-8 rounded cursor-pointer focus:outline-none"
                    >
                      {Array.from({ length: item.seasonsCount }, (_, i) => i + 1).map((s) => (
                        <option key={s} value={s}>
                          Season {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                )}
              </div>

              {/* Episode list */}
              <div className="space-y-3 divide-y divide-neutral-800/80">
                {episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => onPlay(item)}
                    className="pt-3 flex items-start gap-3 md:gap-4 group cursor-pointer hover:bg-neutral-800/40 p-2 rounded transition-colors"
                  >
                    <span className="text-sm md:text-base font-bold text-neutral-400 w-5 shrink-0 pt-3">
                      {ep.episodeNumber}
                    </span>
                    <div className="relative w-28 md:w-36 aspect-video bg-neutral-900 rounded overflow-hidden shrink-0">
                      <img
                        src={ep.thumbnailUrl}
                        alt={ep.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/60 border border-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                        </div>
                      </div>
                      {ep.progressPercent && (
                        <div className="absolute bottom-0 inset-x-0 h-1 bg-neutral-700">
                          <div
                            className="h-full bg-[#E50914]"
                            style={{ width: `${ep.progressPercent}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs md:text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                          {ep.title}
                        </h4>
                        <span className="text-xs text-neutral-400 shrink-0">{ep.duration}</span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        {ep.overview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This (Recommendations Grid) */}
          <div className="border-t border-neutral-800 pt-6 space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-white font-display">More Like This</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {displaySimilar.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => onSelectSimilar(sim)}
                  className="bg-[#242424] rounded overflow-hidden cursor-pointer group hover:bg-[#2d2d2d] transition-colors border border-neutral-800/80"
                >
                  <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                    <img
                      src={sim.backdropUrl}
                      alt={sim.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 text-xs font-semibold text-white bg-black/60 px-1.5 py-0.5 rounded">
                      {sim.duration}
                    </div>
                  </div>
                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 text-xs font-bold">{sim.matchScore}% Match</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleMyList(sim);
                        }}
                        className="w-7 h-7 rounded-full border border-neutral-500 hover:border-white bg-[#181818] flex items-center justify-center text-white"
                        title="Add to My List"
                      >
                        {isInMyList ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-white truncate">{sim.title}</p>
                    <p className="text-[11px] text-neutral-400 line-clamp-3 leading-relaxed">
                      {sim.overview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About [Title] Details Footer */}
          <div className="border-t border-neutral-800 pt-6 space-y-2 text-xs text-neutral-400">
            <h3 className="text-base font-bold text-white font-display pb-2">
              About <span className="text-neutral-200">{item.title}</span>
            </h3>
            {item.director && (
              <div>
                <span className="text-neutral-500">Director: </span>
                <span className="text-neutral-300">{item.director}</span>
              </div>
            )}
            <div>
              <span className="text-neutral-500">Cast: </span>
              <span className="text-neutral-300">{item.cast.join(', ')}</span>
            </div>
            <div>
              <span className="text-neutral-500">Writers & Creators: </span>
              <span className="text-neutral-300">{(item.creators || []).join(', ')}</span>
            </div>
            <div>
              <span className="text-neutral-500">Genres: </span>
              <span className="text-neutral-300">{item.genres.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-neutral-500">Maturity Rating: </span>
              <span className="border border-neutral-600 px-1.5 py-0.5 rounded text-[11px] text-white">
                {item.maturityRating}
              </span>
              <span className="text-neutral-400 text-[11px]">
                Recommended for ages {item.maturityRating} and older.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
