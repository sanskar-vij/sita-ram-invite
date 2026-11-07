import React from 'react';
import { CardHeader } from './CardHeader';
import { FloralFlourish, CornerFloralVine } from './Ornaments';

interface CardOurStoryProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onReadMore?: () => void;
}

export const CardOurStory: React.FC<CardOurStoryProps> = ({
  onNavigate,
  onOpenMenu,
  onReadMore,
}) => {
  return (
    <section
      id="card-2"
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

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-6 text-center flex flex-col items-center justify-center my-auto">
        {/* Title */}
        <h2 className="font-script text-[#851b22] text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wide drop-shadow-xs mb-1">
          Our Story
        </h2>

        {/* Top Flourish */}
        <FloralFlourish className="w-44 sm:w-56 h-4 my-2" color="#a37128" />

        {/* Story Paragraph */}
        <p className="font-body text-[#3e2415] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mt-1 mb-6 font-medium tracking-normal text-balance px-4">
          A journey that began with shared values, grew with understanding, and now blossoms into a lifelong bond blessed by Sita–Ram.
        </p>

        {/* Couple Sketch & River Palace Illustration in natural 2:3 vertical aspect */}
        <div
          onClick={onReadMore}
          className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] aspect-[2/3] rounded-[32px] overflow-hidden border-3 border-[#d2aa53] shadow-2xl bg-[#f5e9d0] transition-transform duration-500 hover:scale-[1.02] cursor-pointer group mb-6"
        >
          <img
            src="/images/story-couple.jpg"
            alt="Anirudh and Vaidehi - Our Story"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Soft parchment vignette transition */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#faf3e3]/70 to-transparent pointer-events-none" />
        </div>

        {/* Action Button */}
        {onReadMore && (
          <button
            onClick={onReadMore}
            className="px-6 py-2.5 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-marcellus text-xs sm:text-sm font-semibold rounded-full shadow-lg border border-[#b8860b]/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2"
          >
            <span>View Wedding Ceremonies</span>
            <span className="text-sm font-bold text-[#ffd885]">›</span>
          </button>
        )}
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
