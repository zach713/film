import React, { useState, useEffect } from 'react';
import { X, Download, Server, Check, Copy, Wifi, Play } from 'lucide-react';
import { LAST_SUNRISE_PACKAGES, CLOUD_MIRRORS, DownloadPackage, CloudMirror } from '../../lastSunriseData';
import { ThemePalette } from '../../themePalettes';

interface DownloadModalProps {
  onClose: () => void;
  onOpenStream: () => void;
  theme: ThemePalette;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ onClose, onOpenStream, theme }) => {
  const [selectedPackage, setSelectedPackage] = useState<DownloadPackage>(LAST_SUNRISE_PACKAGES[0]);
  const [selectedMirror, setSelectedMirror] = useState<CloudMirror>(CLOUD_MIRRORS[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(78.5);
  const [isCopied, setIsCopied] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Simulated download progress ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDownloading && downloadProgress < 100) {
      interval = setInterval(() => {
        setDownloadProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 8) + 4;
          if (next >= 100) {
            setIsDownloading(false);
            setIsFinished(true);
            return 100;
          }
          return next;
        });
        setDownloadSpeed((prev) => +(prev + (Math.random() * 6 - 3)).toFixed(1));
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isDownloading, downloadProgress]);

  const handleStartDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(2);
    setIsFinished(false);

    // Also trigger actual mock file download blob in browser so it behaves genuinely!
    const blob = new Blob(
      [
        `THE LAST SUNRISE (2019) - 4K UHD Master\nPackage: ${selectedPackage.name}\nResolution: ${selectedPackage.resolution}\nMirror: ${selectedMirror.name} (${selectedMirror.region})\nSHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069\nDirect Stream URL: https://stream.thelastsunrise.film/watch/master_4k_hdr.m3u8\nEnjoy the film!`,
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `The_Last_Sunrise_2019_${selectedPackage.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(
      `magnet:?xt=urn:btih:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f&dn=The.Last.Sunrise.2019.2160p.UHD.HDR.HEVC&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-neutral-700 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 text-white my-auto max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF007A] to-[#FF5E00] flex items-center justify-center text-white shadow-lg shadow-[#FF007A]/40">
              <Download className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-serif-movie text-lg sm:text-xl font-bold">
                Download The Last Sunrise (2019)
              </h3>
              <p className="font-mono-code text-[11px] text-neutral-400">
                Direct Cloud Mirror Access · SSL Encrypted
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Choose Quality Package */}
        <div className="space-y-3">
          <p className="font-mono-code text-xs uppercase font-bold tracking-wider text-[#FF007A] flex items-center justify-between">
            <span>Step 1: Choose Format & Quality</span>
            <span className="text-[10px] text-neutral-500 font-normal">All masters verified</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LAST_SUNRISE_PACKAGES.map((pkg) => {
              const isSelected = selectedPackage.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#151927] border-[#FF007A] shadow-lg shadow-[#FF007A]/20'
                      : 'bg-[#10131e] border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-white">{pkg.name}</h4>
                      {pkg.recommended && (
                        <span className="text-[9px] font-mono uppercase font-bold bg-[#FF007A] text-white px-1.5 py-0.2 rounded">
                          Best
                        </span>
                      )}
                    </div>
                    <p className="font-mono-code text-[11px] text-cyan-400">{pkg.resolution}</p>
                    <p className="text-[10px] text-neutral-400">{pkg.codec} · {pkg.audio}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 mt-2 text-[11px] font-mono">
                    <span className="text-white font-bold">{pkg.size}</span>
                    <span className="text-neutral-500">{pkg.bitrate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Choose Cloud Mirror */}
        <div className="space-y-3">
          <p className="font-mono-code text-xs uppercase font-bold tracking-wider text-[#FF007A] flex items-center justify-between">
            <span>Step 2: Select High-Speed Cloud Mirror</span>
            <span className="text-[10px] text-emerald-400 font-bold">● All 4 Mirrors Online</span>
          </p>

          <div className="space-y-2">
            {CLOUD_MIRRORS.map((m) => {
              const isSelected = selectedMirror.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMirror(m)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#151927] border-cyan-400 shadow-md shadow-cyan-500/10'
                      : 'bg-[#10131e] border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{m.name}</p>
                      <p className="text-[10px] text-neutral-500">{m.region} · {m.protocol}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold block">{m.speedMbps} MB/s</span>
                      <span className="text-[10px] text-neutral-500">{m.pingMs}ms latency</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-cyan-400 bg-cyan-400 text-black' : 'border-neutral-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Download Status Simulation */}
        {isDownloading || isFinished ? (
          <div className="bg-[#121522] border border-neutral-700/80 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>{isFinished ? 'Download Complete!' : `Streaming from ${selectedMirror.name}...`}</span>
              </span>
              <span className="text-cyan-400 font-bold">{downloadSpeed} MB/s</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF007A] via-[#FF2A6D] to-[#FF5E00] transition-all duration-300 rounded-full"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Progress: {downloadProgress}%</span>
              <span>
                {((parseFloat(selectedPackage.size) * downloadProgress) / 100).toFixed(1)} / {selectedPackage.size}
              </span>
            </div>
          </div>
        ) : null}

        {/* Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleStartDownload}
            disabled={isDownloading}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF007A] via-[#FF2A6D] to-[#FF5E00] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 neon-btn-glow transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>{isDownloading ? 'Transferring Files...' : isFinished ? 'Download Again' : 'Start Instant Download'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-neutral-700 hover:border-white text-xs font-mono font-semibold text-neutral-300 hover:text-white transition-colors flex items-center justify-center gap-2"
            title="Copy magnet link"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{isCopied ? 'Magnet Copied!' : 'Copy Magnet'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenStream();
            }}
            className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-cyan-800/80 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Online</span>
          </button>
        </div>
      </div>
    </div>
  );
};
