import React, { useState, useEffect, useRef } from 'react';
import { CardHero } from './CardHero';
import { CardOurStory } from './CardOurStory';
import { CardEvents } from './CardEvents';
import { CardTheBigDay } from './CardTheBigDay';
import { CardCountdown } from './CardCountdown';
import { CardRSVP } from './CardRSVP';
import { CardSaveTheDate } from './CardSaveTheDate';
import { ChevronLeft, ChevronRight, Play, Pause, Smartphone } from 'lucide-react';
import { WeddingEvent } from '../types/wedding';

interface PhoneStoryViewProps {
  onOpenInvitation: () => void;
  onNavigate: (section: string) => void;
  onOpenMenu: () => void;
  onSelectEvent: (event: WeddingEvent) => void;
  onOpenVenue: () => void;
  onOpenRSVP: () => void;
  onSaveToCalendar: () => void;
}

export const PhoneStoryView: React.FC<PhoneStoryViewProps> = ({
  onOpenInvitation,
  onNavigate,
  onOpenMenu,
  onSelectEvent,
  onOpenVenue,
  onOpenRSVP,
  onSaveToCalendar,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  // Swipe support on mobile
  const touchStartX = useRef<number | null>(null);

  const totalSlides = 7;

  const slideTitles = [
    'Screen 1 • Welcome & Hero',
    'Screen 2 • Our Story',
    'Screen 3 • Wedding Events',
    'Screen 4 • The Big Day',
    'Screen 5 • Wedding Countdown',
    'Screen 6 • Confirm Presence (RSVP)',
    'Screen 7 • Save the Date',
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext(); // Swiped left -> next
    } else if (diff < -45) {
      handlePrev(); // Swiped right -> prev
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Title & Progress Bar (Compact & non-stretching) */}
      <div className="w-full max-w-[380px] sm:max-w-xl flex items-center justify-between gap-2 mb-3 bg-[#faf3e3] p-2.5 sm:p-3 rounded-2xl border border-[#d2aa53] shadow-xs">
        <div className="flex items-center space-x-1.5 text-[#821c21] truncate">
          <Smartphone className="w-4 h-4 shrink-0" />
          <span className="font-marcellus text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
            {slideTitles[currentSlide]}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center space-x-1 transition-colors cursor-pointer border ${
              isAutoPlay
                ? 'bg-[#821c21] text-white border-[#821c21]'
                : 'bg-[#fdfbf6] text-[#821c21] border-[#d2aa53]'
            }`}
          >
            {isAutoPlay ? (
              <>
                <Pause className="w-3 h-3" />
                <span className="hidden sm:inline">Auto</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span className="hidden sm:inline">Play</span>
              </>
            )}
          </button>

          <span className="text-[11px] font-marcellus font-bold text-[#821c21] px-2 py-0.5 bg-[#fbf6ec] rounded-full border border-[#d2aa53]">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>

      {/* Story Progress Bars (Instagram / WhatsApp story indicator style) */}
      <div className="flex items-center space-x-1.5 w-full max-w-[360px] mb-3 px-1">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
              idx === currentSlide
                ? 'bg-[#821c21] shadow-xs'
                : idx < currentSlide
                ? 'bg-[#d2aa53]'
                : 'bg-[#e5d4b5]'
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Mobile Device Presentation with Perfectly Centered Prev/Next Arrows */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 w-full my-auto">
        {/* Desktop Left Button (Right next to the card) */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex p-3 rounded-full bg-[#faf3e3] hover:bg-[#821c21] text-[#821c21] hover:text-[#faf3e3] border border-[#d2aa53] shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
          aria-label="Previous card"
          title="Previous (or swipe right)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Card Viewport Container: Ratio strictly locked to 9:16, NO STRETCH */}
        <div className="w-full max-w-[360px] transition-all duration-300 transform flex items-center justify-center">
          {currentSlide === 0 && (
            <CardHero
              onOpenInvitation={onOpenInvitation}
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
            />
          )}
          {currentSlide === 1 && (
            <CardOurStory
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onReadMore={onOpenInvitation}
            />
          )}
          {currentSlide === 2 && (
            <CardEvents
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onSelectEvent={onSelectEvent}
            />
          )}
          {currentSlide === 3 && (
            <CardTheBigDay
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onOpenVenue={onOpenVenue}
            />
          )}
          {currentSlide === 4 && (
            <CardCountdown
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
            />
          )}
          {currentSlide === 5 && (
            <CardRSVP
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onConfirmPresence={onOpenRSVP}
            />
          )}
          {currentSlide === 6 && (
            <CardSaveTheDate
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onSaveToCalendar={onSaveToCalendar}
            />
          )}
        </div>

        {/* Desktop Right Button (Right next to the card) */}
        <button
          onClick={handleNext}
          className="hidden sm:flex p-3 rounded-full bg-[#faf3e3] hover:bg-[#821c21] text-[#821c21] hover:text-[#faf3e3] border border-[#d2aa53] shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
          aria-label="Next card"
          title="Next (or swipe left)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Floating Bottom Navigation (Swipe hint & buttons) */}
      <div className="flex sm:hidden items-center justify-between w-full max-w-[360px] mt-3 px-3 py-1.5 bg-[#faf3e3]/95 backdrop-blur-md rounded-2xl border border-[#d2aa53] shadow-md">
        <button
          onClick={handlePrev}
          className="flex items-center space-x-1 text-[#881c22] font-semibold text-xs py-1 px-2 rounded-full hover:bg-[#ebd5ab] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        <span className="text-[11px] font-marcellus font-bold text-[#623c21]">
          Swipe ← / → to flip
        </span>

        <button
          onClick={handleNext}
          className="flex items-center space-x-1 text-[#881c22] font-semibold text-xs py-1 px-2 rounded-full hover:bg-[#ebd5ab] cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Screen quick thumbnails bar */}
      <div className="flex items-center space-x-1.5 mt-4 overflow-x-auto max-w-full pb-1 px-2 scrollbar-thin">
        {[
          '1. Welcome',
          '2. Story',
          '3. Events',
          '4. Big Day',
          '5. Muhurat',
          '6. RSVP',
          '7. Date',
        ].map((title, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-marcellus transition-all cursor-pointer border ${
              idx === currentSlide
                ? 'bg-[#821c21] text-white font-bold border-[#821c21] shadow-2xs scale-105'
                : 'bg-[#faf2df] text-[#55341f] border-[#d2aa53]/70 hover:bg-[#ebd5ab]'
            }`}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};
