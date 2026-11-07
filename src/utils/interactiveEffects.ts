import confetti from 'canvas-confetti';

// Auspicious Indian Wedding Color Palette for Petals & Sparkles
const WEDDING_CONFETTI_COLORS = [
  '#f59e0b', // Saffron Marigold
  '#fbbf24', // Golden Turmeric
  '#f43f5e', // Sacred Ruby Rose
  '#e11d48', // Sindoor Crimson
  '#d4af37', // Royal Gold
  '#fef08a', // Champak Yellow
  '#ffe4e6', // Soft Petal Pink
];

/**
 * Triggers a localized burst of sacred rose & marigold petals
 */
export function triggerPetalBurst(originX = 0.5, originY = 0.5, count = 30) {
  try {
    confetti({
      particleCount: count,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: WEDDING_CONFETTI_COLORS,
      ticks: 200,
      gravity: 0.75,
      scalar: 1.15,
      shapes: ['circle'],
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback if canvas is unavailable
  }
}

/**
 * Grand Pushpa Vrishti (Flower Shower Celebration)
 */
export function triggerPushpaVrishti() {
  try {
    // Left burst
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 },
      colors: WEDDING_CONFETTI_COLORS,
      scalar: 1.2,
      gravity: 0.8,
    });

    // Right burst
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 },
      colors: WEDDING_CONFETTI_COLORS,
      scalar: 1.2,
      gravity: 0.8,
    });

    // Center cascade
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors: WEDDING_CONFETTI_COLORS,
        scalar: 1.3,
        gravity: 0.6,
      });
    }, 250);
  } catch {
    // Graceful fallback
  }
}

/**
 * Plays a gentle, auspicious Vedic temple bell sound on interaction
 */
export function playTempleBellChime() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Dual chime for rich resonant silver ghanti harmonic (Sa & Pa in high octave)
    const freqs = [1174.66, 1760.0, 2349.32]; // D6, A6, D7

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const initialGain = idx === 0 ? 0.04 : 0.02 / (idx + 1);
      gain.gain.setValueAtTime(initialGain, now);
      // Gentle exponential decay like a singing bell
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    });

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1300);
  } catch {
    // Audio autoplay restrictions or unsupported
  }
}

/**
 * Subtle parchment turn paper rustle / chime sound on 3D card flip
 */
export function playCardTurnSound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 300);
  } catch {
    // Safe fallback
  }
}
