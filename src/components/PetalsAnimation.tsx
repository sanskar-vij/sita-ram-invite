import React, { useState, useEffect } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
}

export const PetalsAnimation: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) {
      setPetals([]);
      return;
    }

    const colors = [
      '#e0627e', // Rose pink
      '#f59e0b', // Golden Marigold
      '#fbbf24', // Yellow Marigold
      '#f43f5e', // Ruby Rose
      '#fecdd3', // Pastel Pink
    ];

    const generatedPetals: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 10) + 10,
      duration: Math.floor(Math.random() * 8) + 8,
      delay: Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.floor(Math.random() * 360),
    }));

    setPetals(generatedPetals);
  }, [active]);

  if (!active || petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30 select-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal-particle"
          style={{
            left: `${petal.left}vw`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            backgroundColor: petal.color,
            borderRadius: '50% 10% 50% 50%',
            opacity: 0.75,
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
            transform: `rotate(${petal.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};
