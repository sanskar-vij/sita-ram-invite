import React, { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_15_EVENTS } from '../data/weddingData';
import { WeddingEvent } from '../types/wedding';

interface AllRitualsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: WeddingEvent) => void;
}

export const AllRitualsModal: React.FC<AllRitualsModalProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');

  if (!isOpen) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#faf3e3] rounded-[26px] border-2 sm:border-3 border-[#d2aa53] shadow-2xl flex flex-col overflow-hidden">
        {/* Subtle background parchment */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        {/* Top Header */}
        <div className="relative z-10 px-4 sm:px-6 pt-4 pb-2 border-b border-[#e2cca3] flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-devanagari text-[#881c22] text-xs font-semibold">
                || शुभ मांगलिक प्रसंग ||
              </span>
              <span className="px-2 py-0.2 bg-[#881c22]/10 text-[#881c22] rounded-full text-[10px] font-bold">
                15 Ceremonies
              </span>
            </div>
            <h2 className="font-script text-[#851b22] text-2xl sm:text-3xl font-bold">
              Our 15 Traditional Wedding Ceremonies
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-[#f0e0c0] rounded-full p-0.5 text-xs font-marcellus">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-[#881c22] text-[#faf2e3] font-bold shadow-xs'
                    : 'text-[#633e24] hover:text-[#881c22]'
                }`}
              >
                Scrollable
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#881c22] text-[#faf2e3] font-bold shadow-xs'
                    : 'text-[#633e24] hover:text-[#881c22]'
                }`}
              >
                All 15 Grid
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#6c4328] hover:text-[#881c22] hover:bg-[#ebd5ab] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subtitle instructions */}
        <div className="relative z-10 px-4 sm:px-6 py-1.5 bg-[#f5e9d0]/60 flex items-center justify-between text-xs font-marcellus text-[#633e24]">
          <span>Click any card below to open its dedicated individual card details</span>
          {viewMode === 'carousel' && (
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => scroll('left')}
                className="p-1 rounded-full bg-[#faf3e3] hover:bg-[#881c22] hover:text-[#faf2e3] border border-[#d2aa53] transition-colors cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-1 rounded-full bg-[#faf3e3] hover:bg-[#881c22] hover:text-[#faf2e3] border border-[#d2aa53] transition-colors cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content Body: Carousel or Grid */}
        <div className="relative z-10 p-3 sm:p-5 overflow-y-auto flex-1">
          {viewMode === 'carousel' ? (
            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-thin"
            >
              {ALL_15_EVENTS.map((event) => (
                <div
                  key={event.id}
                  onClick={() => {
                    onSelectEvent(event);
                    onClose();
                  }}
                  className="snap-center shrink-0 w-[200px] sm:w-[220px] aspect-[9/16] bg-[#faf3e3] rounded-[22px] overflow-hidden flex flex-col justify-between border-2 border-[#d2aa53] shadow-md hover:shadow-2xl hover:border-[#881c22] hover:-translate-y-1 transition-all duration-300 cursor-pointer group select-none"
                >
                  {/* Top Bar */}
                  <div className="px-3 pt-2 pb-0.5 flex items-center justify-between text-[10px] text-[#633e24] font-marcellus font-bold border-b border-[#ebd7b2]/60">
                    <span className="text-[#881c22]">#{event.orderNumber}</span>
                    <span>Our Wedding Events</span>
                    <span>≡</span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="px-2 pt-1 text-center">
                    <h3 className="font-script text-[#851b22] text-[22px] sm:text-[24px] leading-tight font-bold group-hover:scale-105 transition-transform">
                      {event.orderNumber}. {event.name}
                    </h3>
                    <p className="font-body text-[#5a3821] text-[11px] leading-tight line-clamp-1 italic">
                      {event.tagline}
                    </p>
                  </div>

                  {/* Artwork Image */}
                  <div className="flex-1 px-2 py-1 flex items-end overflow-hidden">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-[#faf2de] border border-[#d2aa53]/70 relative">
                      <img
                        src={event.artImage || event.cardImage}
                        alt={event.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#881c22]/0 group-hover:bg-[#881c22]/15 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 bg-[#faf3e3]/95 text-[#881c22] font-marcellus text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm transition-opacity">
                          View Details ›
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Date/Time */}
                  <div className="px-2 py-1 bg-[#f5e9d0]/80 border-t border-[#d2aa53]/40 flex items-center justify-between text-[10px] text-[#5c371e] font-marcellus">
                    <span className="font-semibold">{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
              {ALL_15_EVENTS.map((event) => (
                <div
                  key={event.id}
                  onClick={() => {
                    onSelectEvent(event);
                    onClose();
                  }}
                  className="aspect-[9/16] bg-[#faf3e3] rounded-[18px] overflow-hidden flex flex-col justify-between border-1.5 border-[#d2aa53] shadow-xs hover:shadow-lg hover:border-[#881c22] hover:-translate-y-1 transition-all duration-300 cursor-pointer group select-none"
                >
                  {/* Top Bar */}
                  <div className="px-2 pt-1.5 pb-0.5 flex items-center justify-between text-[9px] text-[#633e24] font-marcellus font-bold">
                    <span className="text-[#881c22]">#{event.orderNumber}</span>
                    <span>≡</span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="px-1.5 text-center">
                    <h3 className="font-script text-[#851b22] text-[18px] leading-tight font-bold">
                      {event.orderNumber}. {event.name}
                    </h3>
                    <p className="font-body text-[#5a3821] text-[9.5px] leading-tight line-clamp-1 italic">
                      {event.tagline}
                    </p>
                  </div>

                  {/* Artwork Image */}
                  <div className="flex-1 px-1.5 py-1 flex items-end overflow-hidden">
                    <div className="w-full h-full rounded-lg overflow-hidden bg-[#faf2de] border border-[#d2aa53]/60 relative">
                      <img
                        src={event.artImage || event.cardImage}
                        alt={event.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Footer Date/Time */}
                  <div className="px-1.5 py-0.5 bg-[#f5e9d0]/80 border-t border-[#d2aa53]/40 text-center text-[9px] text-[#5c371e] font-marcellus">
                    <span className="font-semibold">{event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
