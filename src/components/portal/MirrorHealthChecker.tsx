import React, { useState } from 'react';
import { Server, Activity, RefreshCw, CheckCircle2, Zap } from 'lucide-react';
import { CLOUD_MIRRORS, CloudMirror } from '../../lastSunriseData';

export const MirrorHealthChecker: React.FC = () => {
  const [mirrors, setMirrors] = useState<CloudMirror[]>(CLOUD_MIRRORS);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestPings = () => {
    setIsTesting(true);
    setTimeout(() => {
      setMirrors((prev) =>
        prev.map((m) => ({
          ...m,
          pingMs: Math.max(10, Math.floor(m.pingMs + (Math.random() * 8 - 4))),
          speedMbps: Math.floor(m.speedMbps + (Math.random() * 80 - 40)),
        }))
      );
      setIsTesting(false);
    }, 900);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl overflow-hidden border border-neutral-800/80 bg-[#0d0f17] p-6 sm:p-8 space-y-5 shadow-xl text-left select-none">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <span className="font-mono-code text-[11px] uppercase font-bold tracking-widest text-emerald-400">
            Network Telemetry
          </span>
          <h3 className="font-serif-movie text-xl font-bold text-white">
            Global Cloud Mirrors Status
          </h3>
        </div>

        <button
          onClick={handleTestPings}
          disabled={isTesting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-white text-xs font-mono text-neutral-300 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-cyan-400' : ''}`} />
          <span>{isTesting ? 'Testing...' : 'Test Latency'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {mirrors.map((m) => (
          <div
            key={m.id}
            className="p-3.5 rounded-xl bg-[#121522] border border-neutral-800/80 flex items-center justify-between gap-4 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <div>
                <p className="font-bold text-white">{m.name}</p>
                <p className="text-[10px] text-neutral-500">{m.region}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-emerald-400 font-bold block">{m.speedMbps} MB/s</span>
                <span className="text-[10px] text-neutral-400">{m.pingMs}ms ping</span>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
