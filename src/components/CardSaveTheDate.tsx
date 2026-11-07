import React from 'react';
import { CardHeader } from './CardHeader';
import { FloralFlourish, CornerFloralVine } from './Ornaments';
import { Calendar } from 'lucide-react';

interface CardSaveTheDateProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onSaveToCalendar?: () => void;
}

export const CardSaveTheDate: React.FC<CardSaveTheDateProps> = ({
  onNavigate,
  onOpenMenu,
  onSaveToCalendar,
}) => {
  return (
    <section
      id="card-7"
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

      {/* Save The Date Stage */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 py-6 text-center flex flex-col items-center justify-center my-auto">
        {/* Title */}
        <h2 className="font-script text-[#851b22] text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wide drop-shadow-xs mb-1">
          Save the Date
        </h2>

        {/* Flourish */}
        <FloralFlourish className="w-44 sm:w-56 h-4 my-2" color="#a37128" />

        {/* Calendar Badge */}
        <div
          onClick={onSaveToCalendar}
          className="flex items-center justify-center space-x-4 my-4 px-8 py-3 rounded-2xl bg-[#fcf8ef]/95 border-2 border-[#d2aa53] shadow-lg hover:border-[#881c22] transition-all duration-300 hover:scale-105 cursor-pointer group"
          title="Click to Add to Calendar"
        >
          {/* Calendar Icon */}
          <div className="p-2 rounded-xl bg-[#faf2df] text-[#851b22] group-hover:scale-110 transition-transform">
            <Calendar className="w-9 h-9 stroke-[1.8]" />
          </div>

          {/* Number 16 */}
          <span className="font-display font-bold text-[#821c21] text-5xl sm:text-6xl leading-none tracking-tight">
            16
          </span>

          {/* Stacked DEC 2026 */}
          <div className="flex flex-col text-left font-marcellus text-[#3c2314] leading-tight font-bold tracking-widest text-base sm:text-lg">
            <span>DEC</span>
            <span>2026</span>
          </div>
        </div>

        {/* Names */}
        <h3 className="font-marcellus text-[#3b2314] text-xl sm:text-2xl font-semibold tracking-wider mt-1 mb-4">
          Anirudh &amp; Vaidehi
        </h3>

        {/* Palace Pavilion Artwork in natural 4:3 aspect */}
        <div
          onClick={onSaveToCalendar}
          className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] aspect-[4/3] rounded-[32px] overflow-hidden border-3 border-[#d2aa53] shadow-2xl bg-[#f5e9d0] transition-transform duration-500 hover:scale-[1.02] cursor-pointer group mb-6"
        >
          <img
            src="/images/save-the-date-palace.jpg"
            alt="Save the Date - Ayodhya Grand Palace Courtyard"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf3e3]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Add to Calendar Button */}
        {onSaveToCalendar && (
          <button
            onClick={onSaveToCalendar}
            className="px-8 py-3 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-marcellus text-sm font-semibold rounded-full shadow-xl border border-[#b8860b]/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2"
          >
            <span>Add to Your Calendar</span>
            <span className="text-base font-bold text-[#ffd885]">›</span>
          </button>
        )}
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
