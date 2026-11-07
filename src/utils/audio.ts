/**
 * Audio synthesis utility for StreamFlix
 * Includes the iconic "Ta-dum" sound and ambient trailer audio via Web Audio API
 */

let audioCtx: AudioContext | null = null;
let ambientOscillators: { stop: () => void } | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes the iconic Netflix "Ta-Dum" intro chime:
 * 1. Deep low-frequency resonant punch (ta)
 * 2. Majestic resonant metallic boom chord with cinematic decay (dum)
 */
export function playNetflixTudum(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // --- Part 1: Initial "Ta" (Short resonant percussive pulse) ---
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(95, now);
    osc1.frequency.exponentialRampToValueAtTime(45, now + 0.18);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.7, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // --- Part 2: The Deep Majestic "Dum" (Chord with deep bass + shimmering high harmonics) ---
    const dumTime = now + 0.12;

    // Sub-bass fundamental (D2: ~73.4Hz down to 55Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(73.4, dumTime);
    subOsc.frequency.exponentialRampToValueAtTime(55, dumTime + 1.8);

    subGain.gain.setValueAtTime(0.001, dumTime);
    subGain.gain.linearRampToValueAtTime(0.85, dumTime + 0.06);
    subGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 2.4);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(dumTime);
    subOsc.stop(dumTime + 2.5);

    // Mid resonant body (Anvil / brass character: ~146.8Hz & ~220Hz)
    const midOsc = ctx.createOscillator();
    const midGain = ctx.createGain();
    midOsc.type = 'sawtooth';
    midOsc.frequency.setValueAtTime(146.8, dumTime);

    // Low-pass filter for smooth cinematic warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, dumTime);
    filter.frequency.exponentialRampToValueAtTime(180, dumTime + 2.0);

    midGain.gain.setValueAtTime(0.001, dumTime);
    midGain.gain.linearRampToValueAtTime(0.4, dumTime + 0.08);
    midGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 2.2);

    midOsc.connect(filter);
    filter.connect(midGain);
    midGain.connect(ctx.destination);
    midOsc.start(dumTime);
    midOsc.stop(dumTime + 2.3);

    // Shimmer harmonic (Ethereal Netflix bloom: ~440Hz & 880Hz)
    const shimmerOsc = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(440, dumTime + 0.05);
    shimmerOsc.frequency.linearRampToValueAtTime(436, dumTime + 2.0);

    shimmerGain.gain.setValueAtTime(0.001, dumTime + 0.05);
    shimmerGain.gain.linearRampToValueAtTime(0.18, dumTime + 0.15);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 2.5);

    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    shimmerOsc.start(dumTime + 0.05);
    shimmerOsc.stop(dumTime + 2.6);
  } catch {
    // Non-blocking in case audio context is prohibited
  }
}

/**
 * Ambient background trailer synthesizer when user unmutes audio in Hero billboard
 */
export function startAmbientTrailerSound(): void {
  try {
    stopAmbientTrailerSound();
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);

    // Cinematic deep chord (D minor drone)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(73.4, ctx.currentTime); // D2

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2

    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    ambientOscillators = {
      stop: () => {
        try {
          const now = ctx.currentTime;
          gainNode.gain.linearRampToValueAtTime(0.001, now + 0.4);
          setTimeout(() => {
            try {
              osc1.stop();
              osc2.stop();
              osc1.disconnect();
              osc2.disconnect();
            } catch {
              // ignore
            }
          }, 450);
        } catch {
          // ignore
        }
      },
    };
  } catch {
    // Non-blocking
  }
}

export function stopAmbientTrailerSound(): void {
  if (ambientOscillators) {
    ambientOscillators.stop();
    ambientOscillators = null;
  }
}

let currentScoreOscs: { stop: () => void } | null = null;

/**
 * Plays a real ambient cinematic theme chord based on the track's fundamental frequency
 * Synthesizes deep analog synth / organ chords with warm filter sweeps
 */
export function playScoreTrack(fundamentalFreq: number = 65.4): void {
  try {
    stopScoreTrack();
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator(); // Sub fundamental
    const osc2 = ctx.createOscillator(); // Fifth (+7 semitones)
    const osc3 = ctx.createOscillator(); // Octave shimmer (+12 semitones)
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    // Warm analog low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(750, now + 3.0);
    filter.frequency.exponentialRampToValueAtTime(280, now + 8.0);

    // Warm saws & sines
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(fundamentalFreq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(fundamentalFreq * 1.498, now); // Fifth

    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(fundamentalFreq * 2, now); // Octave

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 1.5);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    currentScoreOscs = {
      stop: () => {
        try {
          const stopTime = ctx.currentTime;
          gainNode.gain.linearRampToValueAtTime(0.001, stopTime + 0.6);
          setTimeout(() => {
            try {
              osc1.stop();
              osc2.stop();
              osc3.stop();
              osc1.disconnect();
              osc2.disconnect();
              osc3.disconnect();
            } catch {
              // ignore
            }
          }, 650);
        } catch {
          // ignore
        }
      },
    };
  } catch {
    // Non-blocking
  }
}

export function stopScoreTrack(): void {
  if (currentScoreOscs) {
    currentScoreOscs.stop();
    currentScoreOscs = null;
  }
}
