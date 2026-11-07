import React, { useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Heart,
  Compass,
  CalendarCheck,
  Home,
} from 'lucide-react';
import { WeddingEvent } from '../types/wedding';
import { ALL_15_EVENTS } from '../data/weddingData';
import { FloralFlourish, CornerFloralVine } from './Ornaments';

interface IndividualEventPageProps {
  event: WeddingEvent | null;
  onClose: () => void;
  onSelectEvent: (event: WeddingEvent) => void;
  onOpenRSVP: () => void;
  onOpenVenue: () => void;
  onOpenMenu?: () => void;
}

export const IndividualEventPage: React.FC<IndividualEventPageProps> = ({
  event,
  onClose,
  onSelectEvent,
  onOpenRSVP,
  onOpenVenue,
}) => {
  const touchStartX = useRef<number | null>(null);

  if (!event) return null;

  const eventList = ALL_15_EVENTS;
  const currentIndex = eventList.findIndex((e) => e.id === event.id || e.orderNumber === event.orderNumber);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentEventNumber = event.orderNumber || safeIndex + 1;

  const handlePrev = () => {
    const prevIndex = (safeIndex - 1 + eventList.length) % eventList.length;
    onSelectEvent(eventList[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (safeIndex + 1) % eventList.length;
    onSelectEvent(eventList[nextIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex]);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${event.name} Ceremony | Anirudh & Vaidehi Wedding`);
    const details = encodeURIComponent(
      `${event.description}\n\nTagline: ${event.tagline}\nDress Code: ${event.dressCode}\nVenue: ${event.venue}\nTime: ${event.time}`
    );
    const location = encodeURIComponent(`${event.venue}, Ayodhya Grand Palace, Agra`);

    let startTime = '20261214T100000Z';
    let endTime = '20261214T130000Z';

    if (event.id.includes('mehndi')) {
      startTime = '20261214T103000Z';
      endTime = '20261214T143000Z';
    } else if (event.id.includes('haldi')) {
      startTime = '20261214T043000Z';
      endTime = '20261214T073000Z';
    } else if (event.id.includes('sangeet')) {
      startTime = '20261215T133000Z';
      endTime = '20261215T180000Z';
    } else if (event.id.includes('wedding') || event.id.includes('pheras') || event.id.includes('varmala')) {
      startTime = '20261216T060000Z';
      endTime = '20261216T110000Z';
    }

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startTime}/${endTime}`;
    window.open(gcalUrl, '_blank');
  };

  const prevEvent = eventList[(safeIndex - 1 + eventList.length) % eventList.length];
  const nextEvent = eventList[(safeIndex + 1) % eventList.length];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative flex items-center justify-center gap-2 sm:gap-4 w-full max-w-[480px]">
        {/* Desktop Left Flip Button */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex p-2.5 rounded-full bg-[#faf3e3] hover:bg-[#881c22] text-[#881c22] hover:text-[#faf2e3] border border-[#d2aa53] shadow-xl transition-all active:scale-95 cursor-pointer shrink-0"
          title={`Previous: ${prevEvent.name}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* ============================================================== */}
        {/* THE ROYAL EVENT CARD (STANDALONE CARD - NOT A FULL WEBPAGE)   */}
        {/* ============================================================== */}
        <div className="relative w-full max-w-[360px] sm:max-w-[380px] max-h-[90vh] bg-[#faf3e3] rounded-[26px] overflow-hidden shadow-2xl border-2 sm:border-3 border-[#d2aa53] flex flex-col justify-between">
          
          {/* Subtle Background Parchment Patina */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
            style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
          />

          {/* Corner Floral Vines */}
          <CornerFloralVine position="top-left" className="scale-90 -top-2 -left-2 z-10 pointer-events-none" />
          <CornerFloralVine position="top-right" className="scale-90 -top-2 -right-2 z-10 pointer-events-none" />

          {/* 1. CARD TOP BAR (Home / "Our Wedding Events" / Close X) */}
          <header className="relative z-20 px-3.5 pt-3 pb-1.5 flex items-center justify-between text-[#4a2e1b] border-b border-[#e2cca3]/70 bg-[#faf3e3]/95">
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#5a3821] hover:text-[#881c22] hover:bg-[#ebd5ab]/60 transition-colors cursor-pointer"
              title="Return to Events"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center">
              <span className="font-marcellus text-[12px] sm:text-[13px] text-[#4d2f1c] font-bold tracking-wide">
                Our Wedding Events
              </span>
              <FloralFlourish className="w-20 h-2 mt-0.5" color="#a37128" />
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#5a3821] hover:text-[#881c22] hover:bg-[#ebd5ab]/60 transition-colors cursor-pointer"
              title="Close Card"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          {/* 2. SCROLLABLE CARD BODY (Title, Painting, and Ceremony Details) */}
          <div className="relative z-10 overflow-y-auto px-4 pt-2 pb-3 space-y-2.5 scrollbar-thin text-[#4a2e1b]">
            {/* Title: ONLY EVENT NAME */}
            <div className="text-center">
              <span className="text-[10px] font-marcellus font-bold uppercase tracking-wider text-[#881c22] bg-[#fbf5e7] px-2.5 py-0.5 rounded-full border border-[#d2aa53]/60 shadow-2xs">
                Ceremony #{currentEventNumber} of {eventList.length}
              </span>

              <h1 className="font-script text-[#851b22] text-3xl sm:text-[36px] leading-tight font-bold mt-1 mb-0.5">
                {event.orderNumber}. {event.name}
              </h1>

              {event.hindiName && (
                <p className="font-devanagari text-[#881c22] text-xs font-semibold">
                  || {event.hindiName} ||
                </p>
              )}
            </div>

            {/* Authentic Painted Artwork from Design Image in natural 3:4 aspect */}
            <div className="w-full max-w-[240px] aspect-[3/4] mx-auto rounded-2xl overflow-hidden shadow-inner border border-[#d2aa53] bg-[#faf2de]">
              <img
                src={event.artImage || event.cardImage}
                alt={`${event.name} Ceremony`}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Cultural Description */}
            <p className="font-body text-xs text-[#52331f] text-center leading-relaxed font-medium px-1">
              {event.description}
            </p>

            {/* Integrated Card Details Box */}
            <div className="p-3 rounded-2xl bg-[#fdfbf6] border border-[#d2aa53]/80 space-y-2 text-xs text-[#3f2516] shadow-2xs">
              {/* Date & Time */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#881c22] shrink-0" />
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[#881c22]">{event.date}</span>
                  <span className="font-semibold text-[#55341f]">{event.time}</span>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start space-x-2 border-t border-[#eddcb8] pt-1.5">
                <MapPin className="w-4 h-4 text-[#881c22] shrink-0 mt-0.5" />
                <div className="w-full">
                  <span className="font-medium block leading-snug">{event.venue}</span>
                  <button
                    onClick={onOpenVenue}
                    className="text-[10px] text-[#881c22] font-semibold underline hover:text-[#6a151a] mt-0.5 cursor-pointer flex items-center space-x-1"
                  >
                    <Compass className="w-2.5 h-2.5 inline" />
                    <span>View Palace Map &amp; Directions</span>
                  </button>
                </div>
              </div>

              {/* Dress Code */}
              {event.dressCode && (
                <div className="flex items-start space-x-2 border-t border-[#eddcb8] pt-1.5">
                  <Sparkles className="w-4 h-4 text-[#881c22] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#881c22] block uppercase tracking-wider">
                      Dress Code: {event.dressCode}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleAddToCalendar}
                className="py-2 px-2.5 bg-[#faf3e3] hover:bg-[#f3e5ca] text-[#881c22] text-[11px] font-marcellus font-bold rounded-xl border border-[#d2aa53] shadow-xs flex items-center justify-center space-x-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenRSVP();
                }}
                className="py-2 px-2.5 bg-[#881c22] hover:bg-[#6c1419] text-[#faf2e3] text-[11px] font-marcellus font-bold rounded-xl border border-[#b8860b]/40 shadow-xs flex items-center justify-center space-x-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-[#ffd885]" />
                <span>Confirm RSVP</span>
              </button>
            </div>

            {/* Mobile Previous / Next Arrows */}
            <div className="flex items-center justify-between pt-1 border-t border-[#eedcb8] text-[11px] font-marcellus text-[#7a4c28]">
              <button
                onClick={handlePrev}
                className="flex items-center space-x-1 hover:text-[#881c22] cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>#{prevEvent.orderNumber} {prevEvent.name}</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center space-x-1 hover:text-[#881c22] cursor-pointer"
              >
                <span>#{nextEvent.orderNumber} {nextEvent.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Gold Inner Accent Border */}
          <div className="absolute inset-2 rounded-[20px] border border-[#d2aa53]/40 pointer-events-none z-10" />
        </div>

        {/* Desktop Right Flip Button */}
        <button
          onClick={handleNext}
          className="hidden sm:flex p-2.5 rounded-full bg-[#faf3e3] hover:bg-[#881c22] text-[#881c22] hover:text-[#faf2e3] border border-[#d2aa53] shadow-xl transition-all active:scale-95 cursor-pointer shrink-0"
          title={`Next: ${nextEvent.name}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
