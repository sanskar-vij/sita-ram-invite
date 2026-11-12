import React, { useMemo } from 'react';

type PetalKind = 'rose' | 'marigold' | 'lotus' | 'jasmine';

interface PetalConfig {
  id: number;
  kind: PetalKind;
  left: number; // percentage (0 - 100)
  size: number; // pixel width
  duration: number; // seconds
  delay: number; // negative to positive for immediate dispersion
  swayClass: string; // 'petal-sway-1' | 'petal-sway-2' | 'petal-sway-3'
  depth: 'bg' | 'mid' | 'fg';
  rotation: number;
}

const PETAL_SVGS: Record<PetalKind, { path: string; gradientId: string; defs: React.ReactNode }> = {
  rose: {
    gradientId: 'roseGrad',
    path: 'M 12,2 C 18,3 24,10 23,20 C 22,27 16,33 12,35 C 8,33 2,27 1,20 C 0,10 6,3 12,2 Z',
    defs: (
      <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9f1239" />
        <stop offset="45%" stopColor="#be123c" />
        <stop offset="85%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#f43f5e" />
      </linearGradient>
    ),
  },
  marigold: {
    gradientId: 'marigoldGrad',
    path: 'M 12,1 C 16,3 22,9 20,22 C 19,29 15,34 12,36 C 9,34 5,29 4,22 C 2,9 8,3 12,1 Z',
    defs: (
      <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#c2410c" />
        <stop offset="50%" stopColor="#ea580c" />
        <stop offset="85%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    ),
  },
  lotus: {
    gradientId: 'lotusGrad',
    path: 'M 12,1 C 19,6 23,17 18,29 C 15,35 12,37 12,37 C 12,37 9,35 6,29 C 1,17 5,6 12,1 Z',
    defs: (
      <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e11d48" />
        <stop offset="55%" stopColor="#fb7185" />
        <stop offset="90%" stopColor="#fda4af" />
        <stop offset="100%" stopColor="#fecdd3" />
      </linearGradient>
    ),
  },
  jasmine: {
    gradientId: 'jasmineGrad',
    path: 'M 12,2 C 17,5 21,14 17,26 C 14,31 12,33 12,33 C 12,33 10,31 7,26 C 3,14 7,5 12,2 Z',
    defs: (
      <linearGradient id="jasmineGrad" x1="20%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#fef9c3" />
        <stop offset="80%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
    ),
  },
};

export const PetalsAnimation: React.FC<{ active?: boolean }> = ({ active = true }) => {
  // Deterministic, beautiful distribution so server & client render smoothly
  const petals = useMemo<PetalConfig[]>(() => {
    const kinds: PetalKind[] = ['rose', 'marigold', 'rose', 'marigold', 'lotus', 'jasmine'];
    const swayClasses = ['petal-sway-1', 'petal-sway-2', 'petal-sway-3'];
    const depths: ('bg' | 'mid' | 'fg')[] = ['bg', 'mid', 'fg', 'mid', 'fg', 'bg'];

    // 24 natural petals scattered across the screen
    return Array.from({ length: 24 }, (_, i) => {
      const depth = depths[i % depths.length];
      const kind = kinds[i % kinds.length];
      const swayClass = swayClasses[i % swayClasses.length];

      let size = 22;
      let duration = 11;
      if (depth === 'bg') {
        size = 14 + (i % 5);
        duration = 14 + (i % 6);
      } else if (depth === 'mid') {
        size = 20 + (i % 7);
        duration = 10 + (i % 4);
      } else {
        size = 28 + (i % 8);
        duration = 7.5 + (i % 3);
      }

      // Staggered delays: negative numbers ensure petals are already mid-flight when page opens
      const delay = -1 * ((i * 1.6) % 12);
      const left = ((i * 4.3 + (i % 3) * 7.5) % 96) + 2;
      const rotation = (i * 47) % 360;

      return {
        id: i,
        kind,
        left,
        size,
        duration,
        delay,
        swayClass,
        depth,
        rotation,
      };
    });
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-30"
      style={{ perspective: '800px' }}
    >
      {/* Shared SVG gradient definitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {Object.values(PETAL_SVGS).map((p, idx) => (
            <React.Fragment key={idx}>{p.defs}</React.Fragment>
          ))}
          {/* Petal Inner Vein Gradient */}
          <linearGradient id="petalVeinGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {petals.map((petal) => {
        const petalMeta = PETAL_SVGS[petal.kind];
        const isFg = petal.depth === 'fg';
        const isBg = petal.depth === 'bg';

        return (
          <div
            key={petal.id}
            className={`petal-particle ${petal.swayClass}`}
            style={{
              left: `${petal.left}vw`,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              zIndex: isFg ? 45 : isBg ? 20 : 35,
              opacity: isBg ? 0.6 : isFg ? 0.95 : 0.82,
              filter: isBg
                ? 'blur(0.5px) drop-shadow(0 1px 2px rgba(0,0,0,0.08))'
                : 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))',
            }}
          >
            <svg
              width={petal.size}
              height={petal.size * 1.45}
              viewBox="0 0 24 38"
              fill="none"
              style={{
                transform: `rotate(${petal.rotation}deg)`,
                display: 'block',
              }}
            >
              {/* Petal Outer Body with Curled Tip */}
              <path
                d={petalMeta.path}
                fill={`url(#${petalMeta.gradientId})`}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="0.5"
              />
              {/* Central Delicate Vein Highlight */}
              <path
                d="M 12,3 Q 12.5,18 12,32"
                stroke="url(#petalVeinGrad)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              {/* Organic Soft Highlight Arc along left curve */}
              <path
                d="M 6,10 C 5,16 7,24 10,29"
                stroke="rgba(255, 255, 255, 0.28)"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
