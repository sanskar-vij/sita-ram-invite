import React, { useState, useEffect } from 'react';
import { CardHeader } from './CardHeader';
import { FloralFlourish, CornerFloralVine } from './Ornaments';
import { COUPLE_NAMES } from '../data/weddingData';

interface CardCountdownProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
}

export const CardCountdown: React.FC<CardCountdownProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  // Target date: Dec 16, 2026 11:30:00 AM IST
  const targetDate = new Date(COUPLE_NAMES.targetDateTime).getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 405,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="card-4"
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#faf3e3] border-b-2 border-[#d2aa53] overflow-hidden select-none py-4 sm:py-6"
    >
      {/* Background Parchment Patina */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
      />

      {/* Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-110 sm:scale-130 top-0 left-0 z-10 opacity-70" />
      <CornerFloralVine position="top-right" className="scale-90 sm:scale-110 top-0 right-0 z-10 opacity-60" />
      <CornerFloralVine position="bottom-right" className="scale-100 sm:scale-120 bottom-0 right-0 z-10 opacity-70" />
      <CornerFloralVine position="bottom-left" className="scale-90 sm:scale-110 bottom-0 left-0 z-10 opacity-60" />

      {/* Countdown Stage */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 py-6 text-center flex flex-col items-center justify-center my-auto">
        {/* Title */}
        <h2 className="font-script text-[#851b22] text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wide drop-shadow-xs mb-1">
          Countdown
        </h2>

        {/* Subtitle */}
        <p className="font-marcellus text-[#402616] text-sm sm:text-base md:text-lg tracking-widest uppercase font-semibold mt-1 mb-2">
          To Our Sacred Wedding
        </p>

        {/* Flourish */}
        <FloralFlourish className="w-44 sm:w-56 h-4 my-1" color="#a37128" />

        {/* 4 Arched Countdown Boxes */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-xl my-6">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center py-4 sm:py-6 px-2 sm:px-4 rounded-t-[32px] rounded-b-[18px] bg-[#fbf6ec] border-2 border-[#d2aa53] shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <span className="font-display font-bold text-[#821c21] text-3xl sm:text-5xl md:text-6xl leading-none tracking-tight">
                {unit.value < 10 ? `0${unit.value}` : unit.value}
              </span>
              <span className="font-marcellus text-[#633e24] text-xs sm:text-sm font-bold uppercase tracking-widest mt-2 sm:mt-3">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Riverfront Palace Artwork */}
        <div className="relative w-full max-w-2xl sm:max-w-3xl aspect-[16/9] rounded-[28px] overflow-hidden border-3 border-[#d2aa53] shadow-2xl bg-[#f5e9d0] transition-transform duration-500 hover:scale-[1.01] my-2">
          <img
            src="/images/palace-river-ghats.jpg"
            alt="Ancient Ayodhya Ghats along Holy Sarayu River"
            className="w-full h-full object-cover object-center"
          />
          {/* Soft vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf3e3]/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
