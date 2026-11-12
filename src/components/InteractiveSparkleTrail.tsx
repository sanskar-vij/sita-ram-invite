import React, { useEffect, useState } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  size: number;
  angle: number;
  distance: number;
}

const SPARKLE_SYMBOLS = ['✦', '✧', '⋆', '🌸', '✨', '•'];
const SPARKLE_COLORS = ['#d4af37', '#ffd885', '#ea580c', '#e11d48', '#f59e0b', '#fffbeb'];

export const InteractiveSparkleTrail: React.FC = () => {
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }

      // Generate 7-9 radiating sparkles
      const count = 7;
      const newParticles: SparkleParticle[] = [];

      for (let i = 0; i < count; i++) {
        const id = ++idCounter;
        const angle = (i * (360 / count) + Math.random() * 30) * (Math.PI / 180);
        const distance = 25 + Math.random() * 45;
        const symbol = SPARKLE_SYMBOLS[Math.floor(Math.random() * SPARKLE_SYMBOLS.length)];
        const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
        const size = symbol === '🌸' ? 14 : 10 + Math.random() * 8;

        newParticles.push({
          id,
          x: clientX,
          y: clientY,
          symbol,
          color,
          size,
          angle,
          distance,
        });
      }

      setSparkles((prev) => [...prev.slice(-30), ...newParticles]);

      // Auto clear after animation completes
      setTimeout(() => {
        setSparkles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 900);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {sparkles.map((sparkle) => {
        const targetX = Math.cos(sparkle.angle) * sparkle.distance;
        const targetY = Math.sin(sparkle.angle) * sparkle.distance - 20;

        return (
          <span
            key={sparkle.id}
            className="absolute transition-all ease-out duration-700 font-bold"
            style={{
              left: `${sparkle.x}px`,
              top: `${sparkle.y}px`,
              color: sparkle.color,
              fontSize: `${sparkle.size}px`,
              transform: `translate(${targetX}px, ${targetY}px) scale(0)`,
              opacity: 0,
              textShadow: `0 0 8px ${sparkle.color}`,
              animation: 'sparkleFloat 0.85s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            }}
          >
            {sparkle.symbol}
          </span>
        );
      })}
      <style>{`
        @keyframes sparkleFloat {
          0% {
            transform: translate(0, 0) scale(0.4) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
          100% {
            transform: translate(var(--tx, 0px), var(--ty, -35px)) scale(1.3) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
