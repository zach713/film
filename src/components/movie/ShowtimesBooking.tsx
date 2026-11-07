import React, { useState } from 'react';
import { Ticket, MapPin, Calendar, Clock, Check, Sparkles, X, QrCode } from 'lucide-react';
import { ShowtimeTheater } from '../../movieData';

interface ShowtimesBookingProps {
  theatersData: {
    city: string;
    items: ShowtimeTheater[];
  }[];
  movieTitle: string;
}

export const ShowtimesBooking: React.FC<ShowtimesBookingProps> = ({
  theatersData,
  movieTitle,
}) => {
  const [selectedCity, setSelectedCity] = useState(theatersData[0]?.city || 'New York');
  const [selectedFormat, setSelectedFormat] = useState<'All' | 'IMAX 70mm' | 'Dolby Cinema'>('All');
  const [selectedDate, setSelectedDate] = useState('Today, Nov 14');
  const [bookingShowtime, setBookingShowtime] = useState<{
    theater: string;
    time: string;
    format: string;
  } | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['C4', 'C5']);
  const [isBooked, setIsBooked] = useState(false);

  const dates = ['Today, Nov 14', 'Tomorrow, Nov 15', 'Sat, Nov 16', 'Sun, Nov 17'];

  const currentTheaters = theatersData.find((t) => t.city === selectedCity)?.items || [];
  const filteredTheaters = currentTheaters.filter((t) => {
    if (selectedFormat === 'All') return true;
    return t.format === selectedFormat;
  });

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleOpenBooking = (theater: ShowtimeTheater, time: string) => {
    setBookingShowtime({
      theater: theater.name,
      time,
      format: theater.format,
    });
    setIsBooked(false);
  };

  return (
    <section id="showtimes" className="py-20 md:py-28 px-4 md:px-8 border-t border-white/10 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-cyan-400">
          Theatrical Premiere
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
          Find IMAX 70mm Showtimes
        </h2>
        <p className="text-xs md:text-sm text-neutral-400">
          Experience {movieTitle} in the director's intended format: 15-perf 70mm film filling the entire 1.43:1 giant IMAX screen.
        </p>
      </div>

      {/* Booking Filter Controls */}
      <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* City Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {theatersData.map((cityGroup) => (
              <button
                key={cityGroup.city}
                onClick={() => setSelectedCity(cityGroup.city)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedCity === cityGroup.city
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cityGroup.city}
              </button>
            ))}
          </div>

          {/* Format Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400 text-xs font-semibold mr-1">Format:</span>
            {(['All', 'IMAX 70mm', 'Dolby Cinema'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selector Row */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          {dates.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                selectedDate === d
                  ? 'border border-cyan-400 text-cyan-300 bg-cyan-950/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{d}</span>
            </button>
          ))}
        </div>

        {/* Theaters List */}
        <div className="space-y-4 pt-2">
          {filteredTheaters.length > 0 ? (
            filteredTheaters.map((theater) => (
              <div
                key={theater.id}
                className="bg-[#17171e] border border-white/5 p-5 md:p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-base font-bold text-white font-display">
                      {theater.name}
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        theater.format === 'IMAX 70mm'
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                          : 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                      }`}
                    >
                      {theater.format}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>{theater.address}</span>
                  </p>
                </div>

                {/* Showtimes Pill Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {theater.times.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleOpenBooking(theater, time)}
                      className="px-3.5 py-2 bg-neutral-900 hover:bg-cyan-400 hover:text-black text-white text-xs font-bold rounded-lg border border-neutral-700/80 hover:border-cyan-400 transition-all transform hover:scale-105 active:scale-95"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-neutral-400">
              No theaters found matching "{selectedFormat}" in {selectedCity}. Try selecting "All" formats.
            </div>
          )}
        </div>
      </div>

      {/* Interactive Seat Reservation Modal */}
      {bookingShowtime && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-white/10 rounded-2xl max-w-xl w-full p-6 md:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setBookingShowtime(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isBooked ? (
              <>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                    Seat Reservation
                  </span>
                  <h3 className="text-xl font-bold text-white font-display mt-0.5">
                    {bookingShowtime.theater}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {selectedDate} · {bookingShowtime.time} · {bookingShowtime.format}
                  </p>
                </div>

                {/* Cinema Screen Curve Visualizer */}
                <div className="py-2 text-center space-y-2">
                  <div className="w-4/5 mx-auto h-2 bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20 rounded-full shadow-lg shadow-cyan-500/40" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                    IMAX 1.43:1 Giant Screen
                  </span>
                </div>

                {/* Seat Map Grid */}
                <div className="space-y-2 py-2">
                  {['A', 'B', 'C', 'D'].map((row) => (
                    <div key={row} className="flex items-center justify-center gap-2">
                      <span className="text-[11px] font-mono text-neutral-500 w-4 text-center">
                        {row}
                      </span>
                      {Array.from({ length: 8 }, (_, i) => {
                        const seatId = `${row}${i + 1}`;
                        const isSelected = selectedSeats.includes(seatId);
                        const isOccupied = row === 'B' && (i === 3 || i === 4);
                        return (
                          <button
                            key={seatId}
                            disabled={isOccupied}
                            onClick={() => toggleSeat(seatId)}
                            className={`w-7 h-7 rounded text-[10px] font-mono transition-all flex items-center justify-center ${
                              isOccupied
                                ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                                : isSelected
                                ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/40'
                                : 'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-white'
                            }`}
                            title={`Seat ${seatId}`}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Seat Legend */}
                <div className="flex items-center justify-center gap-6 text-[11px] text-neutral-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-neutral-900 border border-neutral-700" />
                    <span>Available</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-cyan-400" />
                    <span>Selected ({selectedSeats.length})</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-neutral-800" />
                    <span>Reserved</span>
                  </span>
                </div>

                {/* Pricing & Checkout Confirmation */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-neutral-400">Total ({selectedSeats.length} seats):</p>
                    <p className="text-xl font-black text-white font-mono">
                      ${(selectedSeats.length * 24.5).toFixed(2)}
                    </p>
                  </div>

                  <button
                    disabled={selectedSeats.length === 0}
                    onClick={() => setIsBooked(true)}
                    className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </>
            ) : (
              /* Confirmed Digital Ticket Stub */
              <div className="text-center space-y-5 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Your digital IMAX 70mm pass is ready. Please arrive 15 minutes prior to showtime.
                  </p>
                </div>

                {/* Digital Ticket Pass Card */}
                <div className="bg-[#1a1a22] border border-cyan-500/30 p-5 rounded-xl text-left space-y-3 relative shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-display font-black text-xs uppercase tracking-wider text-cyan-400">
                      IMAX 70mm Pass
                    </span>
                    <span className="font-mono text-xs text-neutral-400">#AST-84920</span>
                  </div>

                  <h4 className="font-bold text-base text-white font-display">{movieTitle}</h4>

                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 font-mono">
                    <div>
                      <span className="text-neutral-500 text-[10px] block">THEATER</span>
                      <span>{bookingShowtime.theater}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] block">DATE & TIME</span>
                      <span>{selectedDate} · {bookingShowtime.time}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] block">SEATS</span>
                      <span className="text-cyan-300 font-bold">{selectedSeats.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] block">FORMAT</span>
                      <span>{bookingShowtime.format}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-center border-t border-white/10 text-neutral-400">
                    <QrCode className="w-12 h-12 text-white/80" />
                  </div>
                </div>

                <button
                  onClick={() => setBookingShowtime(null)}
                  className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded transition-colors"
                >
                  Close & Return to Film Site
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
