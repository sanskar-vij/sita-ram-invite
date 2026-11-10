import React from 'react';
import { CardHeader } from './CardHeader';
import { CornerFloralVine, FloralFlourish } from './Ornaments';

interface CardRSVPProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onConfirmPresence?: () => void;
}

export const CardRSVP: React.FC<CardRSVPProps> = ({
  onNavigate,
  onOpenMenu,
  onConfirmPresence,
}) => {
  return (
    <section
      id="card-6"
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#faf3e3] border-b-2 border-[#d2aa53] overflow-hidden select-none py-4 sm:py-6"
    >
      {/* Background Parchment Patina */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
      />

      {/* Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-110 sm:scale-130 top-0 left-0 z-10 opacity-70" />
      <CornerFloralVine position="top-right" className="scale-90 sm:scale-110 top-0 right-0 z-10 opacity-60" />
      <CornerFloralVine position="bottom-right" className="scale-100 sm:scale-120 bottom-0 right-0 z-10 opacity-70" />
      <CornerFloralVine position="bottom-left" className="scale-90 sm:scale-110 bottom-0 left-0 z-10 opacity-60" />

      {/* RSVP Stage */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 py-6 text-center flex flex-col items-center justify-center my-auto">
        {/* RSVP Title */}
        <h2 className="font-display italic font-bold text-[#851b22] text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wider drop-shadow-xs mb-1">
          RSVP
        </h2>

        <FloralFlourish className="w-44 sm:w-56 h-4 my-2" color="#a37128" />

        {/* Subtitle */}
        <p className="font-body text-[#3e2415] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl font-medium mb-6 text-balance px-4">
          Kindly confirm your presence and be an auspicious part of our sacred wedding celebration.
        </p>

        {/* Royal RSVP Scroll Artwork in natural 4:3 aspect */}
        <div
          onClick={onConfirmPresence}
          className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] aspect-[4/3] rounded-[32px] overflow-hidden border-3 border-[#d2aa53] shadow-2xl bg-[#f5e9d0] transition-transform duration-500 hover:scale-[1.02] cursor-pointer group mb-6"
        >
          <img
            src="/images/rsvp-royal-scroll.webp"
            alt="Royal Wedding RSVP Scroll and Mogra Flowers"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf3e3]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Confirm Your Presence Button */}
        <button
          onClick={onConfirmPresence}
          className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-[#821c21] hover:bg-[#6e151a] active:scale-95 text-[#fbf6ec] text-sm sm:text-base font-marcellus font-semibold tracking-wide rounded-full shadow-xl transition-all duration-300 hover:scale-105 border border-[#b8860b]/50 cursor-pointer"
        >
          <span>Confirm Your Presence</span>
          <span className="text-base font-bold text-[#ffd885] ml-2 transition-transform duration-200 group-hover:translate-x-1">
            ›
          </span>
        </button>
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
