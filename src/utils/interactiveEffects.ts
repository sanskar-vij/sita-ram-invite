import confetti from 'canvas-confetti';

// Auspicious Indian Wedding Color Palette for Petals & Sparkles
const WEDDING_CONFETTI_COLORS = [
  '#9f1239', // Velvet Rose Red
  '#e11d48', // Sindoor Crimson
  '#ea580c', // Sacred Saffron
  '#f59e0b', // Radiant Marigold
  '#fbbf24', // Golden Turmeric
  '#d4af37', // Royal Gold
  '#f43f5e', // Ruby Rose
  '#fecdd3', // Blush Petal Pink
  '#ffffff', // Fragrant Mogra / Jasmine
];

// Authentic Botanical Petal Shapes for realistic Pushpa Vrishti
let petalShape: confetti.Shape | null = null;
try {
  petalShape = confetti.shapeFromPath({
    path: 'M 12,2 C 18,3 24,10 23,20 C 22,27 16,33 12,35 C 8,33 2,27 1,20 C 0,10 6,3 12,2 Z',
  });
} catch {
  petalShape = null;
}

/**
 * Triggers a localized burst of sacred rose & marigold petals
 */
export function triggerPetalBurst(originX = 0.5, originY = 0.5, count = 35) {
  try {
    const shapes: (string | confetti.Shape)[] = petalShape ? [petalShape, 'circle'] : ['circle'];
    confetti({
      particleCount: count,
      spread: 75,
      origin: { x: originX, y: originY },
      colors: WEDDING_CONFETTI_COLORS,
      ticks: 240,
      gravity: 0.65,
      scalar: 1.25,
      shapes: shapes as confetti.Shape[],
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
    const shapes: (string | confetti.Shape)[] = petalShape ? [petalShape, 'circle'] : ['circle'];

    // Left burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.08, y: 0.75 },
      colors: WEDDING_CONFETTI_COLORS,
      scalar: 1.3,
      gravity: 0.7,
      ticks: 260,
      shapes: shapes as confetti.Shape[],
    });

    // Right burst
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.92, y: 0.75 },
      colors: WEDDING_CONFETTI_COLORS,
      scalar: 1.3,
      gravity: 0.7,
      ticks: 260,
      shapes: shapes as confetti.Shape[],
    });

    // Center cascade
    setTimeout(() => {
      confetti({
        particleCount: 75,
        spread: 110,
        origin: { x: 0.5, y: 0.25 },
        colors: WEDDING_CONFETTI_COLORS,
        scalar: 1.35,
        gravity: 0.55,
        ticks: 280,
        shapes: shapes as confetti.Shape[],
      });
    }, 220);
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
