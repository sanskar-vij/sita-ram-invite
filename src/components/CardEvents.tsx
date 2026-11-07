import React, { useState } from 'react';
import { CardHeader } from './CardHeader';
import { FloralFlourish, CornerFloralVine } from './Ornaments';
import { WEDDING_EVENTS } from '../data/weddingData';
import { WeddingEvent } from '../types/wedding';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardEventsProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onSelectEvent?: (event: WeddingEvent) => void;
}

export const CardEvents: React.FC<CardEventsProps> = ({
  onNavigate,
  onOpenMenu,
  onSelectEvent,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 4;
  const totalPages = Math.ceil(WEDDING_EVENTS.length / pageSize);

  const displayedEvents = WEDDING_EVENTS.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <div className="relative w-full max-w-[360px] aspect-[9/16] max-h-[82vh] sm:max-h-[86vh] bg-[#faf3e3] rounded-[24px] overflow-hidden flex flex-col justify-between gold-card-border shadow-xl select-none mx-auto border-2 border-[#d2aa53]">
      {/* Background Parchment Texture */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
      />

      {/* Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-110 -top-2 -left-2" />
      <CornerFloralVine position="top-right" className="scale-75 -top-1 -right-1 opacity-60" />
      <CornerFloralVine position="bottom-right" className="scale-90 -bottom-2 -right-2 opacity-80" />
      <CornerFloralVine position="bottom-left" className="scale-75 -bottom-2 -left-2 opacity-50" />

      {/* Header Bar */}
      <CardHeader onNavigate={onNavigate} onOpenMenu={onOpenMenu} activeItem="Events" />

      {/* Title Area */}
      <div className="relative z-20 px-4 pt-0 text-center flex flex-col items-center">
        <h1 className="font-script text-[#851b22] text-[36px] sm:text-[40px] leading-tight tracking-wide drop-shadow-sm font-bold">
          Our Wedding Events
        </h1>
        <FloralFlourish className="w-32 h-3 my-0.5" color="#a37128" />
        <p className="font-marcellus text-[11px] text-[#6b4226] font-semibold">
          Click any ceremony to view its individual event page
        </p>
      </div>

      {/* 2x2 Grid of Mughal Arch Event Cards */}
      <div className="relative z-20 px-4 py-1 grid grid-cols-2 gap-2.5 my-auto">
        {displayedEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => onSelectEvent && onSelectEvent(event)}
            className="group relative flex flex-col items-center justify-between p-2 pt-2.5 pb-2 rounded-t-[28px] rounded-b-[12px] bg-[#fdfbf6]/90 border border-[#cfa554] shadow-xs hover:shadow-md transition-all duration-300 hover:border-[#881c22] hover:-translate-y-1 cursor-pointer"
          >
            {/* Inner Decorative Arch Border */}
            <div className="absolute inset-1 rounded-t-[24px] rounded-b-[8px] border border-[#e8d2a8]/60 pointer-events-none" />

            {/* Event Number badge */}
            <span className="absolute top-1.5 left-2 px-1.5 py-0.2 text-[9.5px] font-marcellus font-bold text-[#881c22] bg-[#fdf3e2] rounded-full border border-[#d2aa53]/60 shadow-2xs">
              #{event.orderNumber}
            </span>

            {/* Illustration Icon */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#faf2e1] border border-[#d6af5d]/80 p-0.5 shadow-inner flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300 mt-1">
              <img
                src={event.artImage || event.iconImage}
                alt={event.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Event Name */}
            <h3 className="font-display italic font-semibold text-[#821c21] text-[15px] sm:text-[16px] leading-tight mb-0.5 text-center">
              {event.name}
            </h3>

            {/* Event Tagline */}
            <p className="font-body text-[#65432b] text-[10px] leading-tight text-center line-clamp-1 italic px-1">
              {event.tagline}
            </p>

            {/* Event Date & Time */}
            <div className="text-center mt-1 pt-1 border-t border-[#eedcb8] w-full">
              <p className="font-body font-semibold text-[#3b2313] text-[10.5px] leading-tight">
                {event.date}
              </p>
              <p className="font-body text-[#7a4c28] text-[10px] leading-tight">
                {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls between pages of events */}
      <div className="relative z-20 px-4 pb-3 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className={`p-1 rounded-full text-xs flex items-center space-x-1 cursor-pointer transition-colors ${
            currentPage === 0
              ? 'opacity-30 cursor-not-allowed text-[#9c7d61]'
              : 'text-[#881c22] hover:bg-[#ebd5ab]'
          }`}
          title="Previous ceremonies"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-[10.5px] font-marcellus font-semibold">Prev</span>
        </button>

        {/* Page Dots & Label */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1.5 mb-0.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentPage
                    ? 'bg-[#881c22] w-4'
                    : 'bg-[#d2aa53]/60 hover:bg-[#d2aa53]'
                }`}
                title={`Ceremonies page ${idx + 1}`}
              />
            ))}
          </div>
          <span className="font-marcellus text-[10px] text-[#7a4c28] font-bold">
            Events {currentPage * pageSize + 1}–{Math.min((currentPage + 1) * pageSize, WEDDING_EVENTS.length)} of {WEDDING_EVENTS.length}
          </span>
        </div>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
          disabled={currentPage === totalPages - 1}
          className={`p-1 rounded-full text-xs flex items-center space-x-1 cursor-pointer transition-colors ${
            currentPage === totalPages - 1
              ? 'opacity-30 cursor-not-allowed text-[#9c7d61]'
              : 'text-[#881c22] hover:bg-[#ebd5ab]'
          }`}
          title="Next ceremonies"
        >
          <span className="text-[10.5px] font-marcellus font-semibold">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Gold Accent Inner Border */}
      <div className="absolute inset-2.5 rounded-[18px] border border-[#d2aa53]/40 pointer-events-none" />
    </div>
  );
};
