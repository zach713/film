import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Send } from 'lucide-react';
import { INITIAL_REVIEWS, FilmReview } from '../../lastSunriseData';

export const AudienceReviews: React.FC = () => {
  const [reviews, setReviews] = useState<FilmReview[]>(INITIAL_REVIEWS);
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newAuthor.trim()) return;

    const newRev: FilmReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setNewComment('');
    setNewAuthor('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl overflow-hidden border border-neutral-800/80 bg-[#0d0f17] p-6 sm:p-8 space-y-6 shadow-xl text-left select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <span className="font-mono-code text-[11px] uppercase font-bold tracking-widest text-amber-400">
            Community Feedback
          </span>
          <h3 className="font-serif-movie text-xl font-bold text-white">
            Audience Reviews & Ratings
          </h3>
        </div>
        <div className="flex items-center gap-1 text-amber-400 font-mono font-bold text-sm">
          <Star className="w-4 h-4 fill-current" />
          <span>4.9 / 5.0</span>
        </div>
      </div>

      {/* Review Cards List */}
      <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar pr-1">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-3.5 rounded-xl bg-[#121522] border border-neutral-800/80 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-mono">{rev.author}</span>
                {rev.verified && (
                  <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 border border-cyan-800 px-1.5 py-0.2 rounded">
                    Verified Streamer
                  </span>
                )}
              </div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(rev.rating) ? 'fill-current' : 'text-neutral-600'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-neutral-300 font-light leading-relaxed">{rev.comment}</p>
            <span className="text-[10px] text-neutral-500 font-mono block">{rev.date}</span>
          </div>
        ))}
      </div>

      {/* Submit a review form */}
      <form onSubmit={handleSubmit} className="border-t border-neutral-800 pt-4 space-y-3">
        <p className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Leave Your Reaction / Review
        </p>

        <div className="flex items-center gap-3">
          <input
            type="text"
            required
            placeholder="Your Alias / Handle"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="bg-[#121522] border border-neutral-700 text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#FF007A] flex-1"
          />

          {/* Star selector */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                className={`p-1 ${star <= newRating ? 'text-amber-400' : 'text-neutral-600'}`}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            required
            placeholder="Share your thoughts on the 4K Master..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-[#121522] border border-neutral-700 text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-[#FF007A] flex-1"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-[#FF007A] to-[#FF5E00] text-white font-mono font-bold text-xs uppercase rounded-lg flex items-center gap-1.5 shadow-md shadow-[#FF007A]/30 hover:scale-105 active:scale-95 transition-transform shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
        </div>

        {isSubmitted && (
          <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Review submitted successfully!</span>
          </p>
        )}
      </form>
    </div>
  );
};
