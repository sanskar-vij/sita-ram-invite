import React from 'react';
import { CardHeader } from './CardHeader';
import { FloralFlourish, CornerFloralVine } from './Ornaments';
import { Heart } from 'lucide-react';

interface CardBlessingsOutroProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onOpenBlessings?: () => void;
}

export const CardBlessingsOutro: React.FC<CardBlessingsOutroProps> = ({
  onNavigate,
  onOpenMenu,
  onOpenBlessings,
}) => {
  return (
    <section
      id="card-8"
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

      {/* Blessings Stage */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 py-6 text-center flex flex-col items-center justify-center my-auto">
        {/* Sacred Sanskrit Shloka */}
        <p className="font-devanagari text-[#881c22] font-semibold text-xl sm:text-2xl md:text-3xl tracking-widest mb-3">
          || जय श्री सीताराम ||
        </p>

        {/* Closing Blessing Text */}
        <p className="font-body text-[#3e2415] text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl font-medium text-balance px-4 mb-2">
          With the divine blessings of Sita–Ram and the unconditional love of our families, we begin a new chapter together.
        </p>

        {/* Flourish */}
        <FloralFlourish className="w-44 sm:w-56 h-4 my-2" color="#a37128" />

        {/* Sacred Diyas & Lotus Sanctum Artwork in natural 4:3 aspect */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] aspect-[4/3] rounded-[32px] overflow-hidden border-3 border-[#d2aa53] shadow-2xl bg-[#f5e9d0] transition-transform duration-500 hover:scale-[1.02] my-4">
          <img
            src="/images/sacred-sita-ram-diyas.jpg"
            alt="Ayodhya Sacred Diyas and Sita Ram Blessings"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf3e3]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Send Blessings CTA */}
        {onOpenBlessings && (
          <button
            onClick={onOpenBlessings}
            className="mt-2 px-8 py-3 bg-[#821c21] hover:bg-[#6e151a] text-[#fbf6ec] rounded-full text-sm font-marcellus font-semibold shadow-xl border border-[#b8860b]/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2"
          >
            <Heart className="w-4 h-4 text-[#ffd885]" />
            <span>Send Your Blessings &amp; Wishes</span>
          </button>
        )}
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
