import React from 'react';
import { CardHeader } from './CardHeader';
import { CornerFloralVine } from './Ornaments';
import { Calendar, Clock, MapPin, CalendarPlus } from 'lucide-react';

interface CardHaldiProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onOpenVenue?: () => void;
  onSaveToCalendar?: () => void;
}

export const CardHaldi: React.FC<CardHaldiProps> = ({
  onNavigate,
  onOpenMenu,
  onOpenVenue,
  onSaveToCalendar,
}) => {
  return (
    <div
      id="card-4"
      className="relative w-full max-w-[360px] sm:max-w-[380px] h-[600px] sm:h-[640px] bg-[#faf3e3] rounded-[24px] sm:rounded-[26px] overflow-hidden flex flex-col justify-between shadow-2xl select-none mx-auto border-2 border-[#d2aa53]"
    >
      {/* Background Parchment Patina */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
      />

      {/* Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-100 -top-2 -left-2 z-10" />
      <CornerFloralVine position="top-right" className="scale-75 -top-1 -right-1 opacity-60 z-10" />

      {/* Top Header Bar */}
      <CardHeader onNavigate={onNavigate} onOpenMenu={onOpenMenu} activeItem="Events" />

      {/* Event Details Section */}
      <div className="relative z-20 px-6 pt-1 text-center flex flex-col items-center">
        {/* Title */}
        <h1 className="font-script text-[#851b22] text-[48px] sm:text-[54px] leading-[1.05] tracking-wide drop-shadow-xs">
          Haldi
        </h1>

        {/* Tagline */}
        <p className="font-body text-[#3e2415] text-[13.5px] sm:text-[14.5px] leading-snug max-w-[260px] font-medium mb-3 text-balance">
          Let the celebrations begin with the golden hues of love.
        </p>

        {/* Details List with Icons */}
        <div className="flex flex-col items-start space-y-1.5 w-full max-w-[245px] text-left mx-auto pt-0.5">
          {/* Date */}
          <div className="flex items-center space-x-2.5 text-[#3a2213]">
            <Calendar className="w-4 h-4 text-[#881c22] shrink-0" />
            <span className="font-body font-semibold text-[14px] sm:text-[15px] tracking-wide">
              14<sup>th</sup> Dec, 2026
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center space-x-2.5 text-[#3a2213]">
            <Clock className="w-4 h-4 text-[#881c22] shrink-0" />
            <span className="font-body font-semibold text-[14px] sm:text-[15px] tracking-wide">
              10:00 AM Onwards
            </span>
          </div>

          {/* Location */}
          <button
            onClick={onOpenVenue}
            className="flex items-start space-x-2.5 text-[#3a2213] group text-left cursor-pointer transition-colors hover:text-[#881c22]"
          >
            <MapPin className="w-4 h-4 text-[#881c22] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="font-body font-semibold text-[14px] sm:text-[15px] leading-tight tracking-wide underline decoration-[#881c22]/40 underline-offset-2 group-hover:decoration-[#881c22]">
              Ayodhya Grand Palace, Agra
            </span>
          </button>
        </div>
      </div>

      {/* Haldi Urli Illustration Artwork */}
      <div
        onClick={onOpenVenue}
        className="relative w-full h-[52%] mt-auto z-10 flex items-end overflow-hidden cursor-pointer group"
      >
        <img
          src="/images/haldi-urli.webp"
          alt="Haldi Ceremony - Golden Turmeric Urli"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft parchment vignette transition */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#faf3e3] via-[#faf3e3]/50 to-transparent pointer-events-none" />

        {/* Quick Action Overlay on Artwork */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center space-x-2">
          {onSaveToCalendar && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveToCalendar();
              }}
              className="px-2.5 py-1 bg-[#faf3e3]/90 hover:bg-[#faf3e3] text-[#881c22] text-[11px] font-marcellus font-semibold rounded-full shadow border border-[#d2aa53] flex items-center space-x-1 transition-transform active:scale-95"
              title="Add Haldi to Calendar"
            >
              <CalendarPlus className="w-3 h-3 text-[#881c22]" />
              <span>Calendar</span>
            </button>
          )}
        </div>
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-2.5 rounded-[18px] border border-[#d2aa53]/40 pointer-events-none z-10" />
    </div>
  );
};
