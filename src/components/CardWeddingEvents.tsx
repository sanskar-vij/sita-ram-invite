import React, { useState, useRef } from 'react';
import { CardHeader } from './CardHeader';
import { FloralFlourish, CornerFloralVine } from './Ornaments';
import { ALL_15_EVENTS } from '../data/weddingData';
import { WeddingEvent } from '../types/wedding';
import {
  triggerPetalBurst,
  playCardTurnSound,
  playTempleBellChime,
  triggerPushpaVrishti,
} from '../utils/interactiveEffects';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Columns,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  RotateCw,
  CalendarPlus,
  Check,
  Shirt,
  Flame,
} from 'lucide-react';

interface CardWeddingEventsProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onSelectEvent?: (event: WeddingEvent) => void;
}

export const CardWeddingEvents: React.FC<CardWeddingEventsProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all');
  const [flippedCardIds, setFlippedCardIds] = useState<Record<string, boolean>>({});
  const [addedCalendarIds, setAddedCalendarIds] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Toggle 3D flip card with sound and flower petal burst
  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      triggerPetalBurst(x, y, 18);
    }
    playCardTurnSound();

    setFlippedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Google Calendar helper with celebration animation
  const handleAddToCalendar = (evt: WeddingEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    playTempleBellChime();
    triggerPetalBurst(x, y, 28);

    setAddedCalendarIds((prev) => ({ ...prev, [evt.id]: true }));
    setTimeout(() => {
      setAddedCalendarIds((prev) => ({ ...prev, [evt.id]: false }));
    }, 4000);

    const title = encodeURIComponent(`${evt.name} Ceremony | Anirudh & Vaidehi Wedding`);
    const details = encodeURIComponent(
      `${evt.description}\n\nDress Code: ${evt.dressCode}\nVenue: ${evt.venue}\nTime: ${evt.time}`
    );
    const location = encodeURIComponent(`${evt.venue}, Ayodhya Grand Palace, Agra`);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank');
  };

  // Day Filter options in natural chronological order
  const filterOptions = [
    { id: 'all', label: 'All 15 Ceremonies' },
    { id: '12', label: '12 Dec • Day 1 (Roka)' },
    { id: '13', label: '13 Dec • Day 2 (Tilak & Sagai)' },
    { id: '14', label: '14 Dec • Day 3 (Haldi & Mehndi)' },
    { id: '15', label: '15 Dec • Day 4 (Sangeet & Mayra)' },
    { id: '16', label: '16 Dec • Day 5 (Vivah & Reception)' },
  ];

  const filteredEvents = ALL_15_EVENTS.filter((evt) => {
    if (selectedDayFilter === 'all') return true;
    if (selectedDayFilter === '12') return evt.date.includes('12th');
    if (selectedDayFilter === '13') return evt.date.includes('13th');
    if (selectedDayFilter === '14') return evt.date.includes('14th');
    if (selectedDayFilter === '15') return evt.date.includes('15th');
    if (selectedDayFilter === '16') return evt.date.includes('16th');
    return true;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -290 : 290;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="card-3"
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

      {/* Header & Title Section */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-2 text-center flex flex-col items-center">
        <p className="font-devanagari text-[#881c22] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-0.5">
          || शुभ मांगलिक प्रसंग ||
        </p>

        <h2 className="font-script text-[#851b22] text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wide drop-shadow-xs font-bold">
          Wedding Events
        </h2>

        <FloralFlourish className="w-44 sm:w-56 h-4 my-1" color="#a37128" />

        <p className="font-marcellus text-xs sm:text-sm md:text-base text-[#6b4226] font-medium tracking-wide">
          Click any card to turn it around &amp; view Muhurat, dress code &amp; rituals
        </p>

        {/* View Toggle & Day Filter Bar */}
        <div className="w-full max-w-4xl mt-3 flex flex-wrap items-center justify-between gap-2 px-2">
          {/* Day Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDayFilter(opt.id)}
                className={`px-3 py-1 rounded-full text-xs font-marcellus border transition-all whitespace-nowrap cursor-pointer ${
                  selectedDayFilter === opt.id
                    ? 'bg-[#881c22] text-[#faf2e3] border-[#881c22] font-bold shadow-md scale-105'
                    : 'bg-[#faf2df] text-[#653e24] border-[#d2aa53]/70 hover:border-[#881c22]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Toggle Grid / Carousel */}
          <div className="flex items-center space-x-1 bg-[#faf2df] p-0.5 rounded-full border border-[#d2aa53]">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1 rounded-full text-xs font-marcellus transition-colors cursor-pointer flex items-center space-x-1 ${
                viewMode === 'carousel'
                  ? 'bg-[#881c22] text-[#faf2e3] font-bold shadow-xs'
                  : 'text-[#653e24] hover:text-[#881c22]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Carousel</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-full text-xs font-marcellus transition-colors cursor-pointer flex items-center space-x-1 ${
                viewMode === 'grid'
                  ? 'bg-[#881c22] text-[#faf2e3] font-bold shadow-xs'
                  : 'text-[#653e24] hover:text-[#881c22]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Events Display Area: 3D ROTATE FLIP CARDS */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center my-auto overflow-hidden">
        {viewMode === 'carousel' ? (
          /* ============================================================== */
          /* EXPANSIVE 3D FLIP CAROUSEL                                     */
          /* ============================================================== */
          <div className="relative w-full">
            {/* Scroll navigation arrows */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-[#faf3e3]/95 text-[#881c22] border-2 border-[#d2aa53] shadow-xl hover:bg-[#881c22] hover:text-[#faf2e3] transition-all cursor-pointer"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-[#faf3e3]/95 text-[#881c22] border-2 border-[#d2aa53] shadow-xl hover:bg-[#881c22] hover:text-[#faf2e3] transition-all cursor-pointer"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Horizontal Track of 3D Flip Cards */}
            <div
              ref={scrollContainerRef}
              className="flex space-x-4 sm:space-x-6 overflow-x-auto py-6 px-6 sm:px-12 snap-x snap-mandatory scrollbar-thin scroll-smooth"
            >
              {filteredEvents.map((evt) => {
                const isFlipped = !!flippedCardIds[evt.id];

                return (
                  <div
                    key={evt.id}
                    onClick={(e) => toggleFlip(evt.id, e)}
                    className="snap-center shrink-0 w-[240px] sm:w-[270px] md:w-[290px] h-[410px] sm:h-[440px] perspective-1000 select-none cursor-pointer group"
                    title={isFlipped ? 'Click to flip back to painting' : 'Click to flip and view details'}
                  >
                    {/* Inner 3D Flip Container */}
                    <div
                      className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-in-out ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* ==================================================== */}
                      {/* FRONT FACE: Authentic Painting & Only Event Name    */}
                      {/* ==================================================== */}
                      <div className="absolute inset-0 w-full h-full backface-hidden bg-[#fdfbf7] rounded-t-[36px] rounded-b-[20px] overflow-hidden flex flex-col justify-between border-2 border-[#d2aa53] shadow-lg group-hover:shadow-[0_16px_35px_rgba(136,28,34,0.25)] group-hover:border-[#881c22] transition-all duration-300">
                        {/* Inner Arch Contour */}
                        <div className="absolute inset-1.5 rounded-t-[32px] rounded-b-[16px] border border-[#ecdcb8] pointer-events-none" />

                        {/* Top Bar: Ceremony Number Badge & Day indicator */}
                        <div className="relative z-10 px-4 pt-3.5 flex items-center justify-between">
                          <span className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-marcellus font-bold text-[#881c22] bg-[#fbf3e2] rounded-full border border-[#d2aa53]/70 shadow-2xs">
                            #{evt.orderNumber < 10 ? `0${evt.orderNumber}` : evt.orderNumber}
                          </span>
                          {evt.hindiName && (
                            <span className="font-devanagari text-xs text-[#881c22] font-semibold tracking-wide">
                              {evt.hindiName}
                            </span>
                          )}
                        </div>

                        {/* Prominent Event Name */}
                        <div className="relative z-10 px-3 pt-0.5 text-center">
                          <h3 className="font-script text-[#851b22] text-3xl sm:text-4xl leading-tight font-bold tracking-wide drop-shadow-2xs">
                            {evt.name}
                          </h3>
                        </div>

                        {/* Authentic Recreated Artwork in Mughal Arched Frame */}
                        <div className="relative z-10 flex-1 px-3 pt-1 pb-1.5 flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full max-h-[250px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#faf2de] border border-[#d2aa53] shadow-inner relative group/art">
                            <img
                              src={evt.artImage || evt.cardImage}
                              alt={evt.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            {/* Subtle Light Sheen on Hover */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-sheen" />
                            </div>

                            {/* Turn Hint Icon Badge */}
                            <div className="absolute bottom-2 right-2 bg-[#faf3e3]/95 backdrop-blur-xs text-[#881c22] p-1.5 rounded-full border border-[#d2aa53] shadow-md group-hover:scale-110 transition-transform">
                              <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-700" />
                            </div>
                          </div>
                        </div>

                        {/* Clean Bottom Date & Interactive Turn Prompt */}
                        <div className="relative z-10 px-4 py-2.5 bg-[#f7efe0]/90 border-t border-[#eedcb8] flex items-center justify-between text-xs font-marcellus text-[#5c371e]">
                          <span className="font-bold text-[#881c22]">{evt.date.split(',')[0]}</span>
                          <span className="text-[#881c22] font-semibold flex items-center space-x-1 group-hover:text-[#6a151a]">
                            <span>Tap to Turn</span>
                            <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                          </span>
                        </div>
                      </div>

                      {/* ==================================================== */}
                      {/* BACK FACE: Turned Over with Sacred Ceremony Details */}
                      {/* ==================================================== */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#fdfaf3] rounded-t-[36px] rounded-b-[20px] overflow-hidden flex flex-col justify-between border-2 border-[#881c22] shadow-2xl p-4 text-[#4a2e1b]">
                        {/* Background Parchment Patina */}
                        <div
                          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center"
                          style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
                        />

                        {/* Inner gold border */}
                        <div className="absolute inset-1.5 rounded-t-[32px] rounded-b-[16px] border border-[#d2aa53]/50 pointer-events-none" />

                        {/* Back Top: Number & Hindi Header */}
                        <div className="relative z-10 flex items-center justify-between border-b border-[#ecdcb8] pb-1.5">
                          <span className="text-[10px] font-marcellus font-bold text-[#881c22] bg-[#faf2df] px-2.5 py-0.5 rounded-full border border-[#d2aa53]/60">
                            #{evt.orderNumber} • {evt.hindiName || 'मांगलिक'}
                          </span>
                          <button
                            onClick={(e) => toggleFlip(evt.id, e)}
                            className="p-1 rounded-full text-[#881c22] hover:bg-[#881c22]/10 transition-colors cursor-pointer"
                            title="Flip back to painting"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Back Center: Ceremony Name, Tagline & Details */}
                        <div className="relative z-10 text-center my-auto space-y-2 px-1">
                          <div>
                            <h4 className="font-script text-[#851b22] text-3xl leading-tight font-bold">
                              {evt.name}
                            </h4>
                            <p className="font-marcellus text-[11px] text-[#7a4b2a] italic">
                              "{evt.tagline}"
                            </p>
                          </div>

                          {/* Muhurat Timing & Date Box */}
                          <div className="bg-[#faf2de] rounded-xl p-2.5 border border-[#d2aa53]/70 space-y-1.5 text-left text-xs font-marcellus shadow-2xs">
                            <div className="flex items-center space-x-1.5 text-[#881c22] font-bold">
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              <span>{evt.date}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 text-[#5a361e] font-semibold">
                              <Clock className="w-3.5 h-3.5 shrink-0 text-[#881c22]" />
                              <span>{evt.time}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 text-[#633f25] text-[11px]">
                              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#881c22]" />
                              <span className="truncate">{evt.venue}</span>
                            </div>
                            {evt.dressCode && (
                              <div className="flex items-center space-x-1.5 text-[#633f25] text-[11px] pt-1 border-t border-[#ecdcb8]">
                                <Shirt className="w-3.5 h-3.5 shrink-0 text-[#881c22]" />
                                <span className="truncate">Attire: {evt.dressCode}</span>
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          <p className="font-body text-xs text-[#4d2f1d] leading-relaxed line-clamp-3 px-1 text-balance">
                            {evt.description}
                          </p>
                        </div>

                        {/* Back Bottom Actions: Calendar & Flip Back */}
                        <div className="relative z-10 pt-2 border-t border-[#ecdcb8] flex items-center justify-between text-xs font-marcellus">
                          <button
                            onClick={(e) => handleAddToCalendar(evt, e)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center space-x-1.5 transition-all duration-300 active:scale-95 cursor-pointer shadow-xs ${
                              addedCalendarIds[evt.id]
                                ? 'bg-[#2e7d32] text-white ring-2 ring-[#81c784]'
                                : 'bg-[#881c22] hover:bg-[#6c1419] text-[#faf2e3]'
                            }`}
                          >
                            {addedCalendarIds[evt.id] ? (
                              <>
                                <Check className="w-3 h-3 text-white" />
                                <span>Added!</span>
                              </>
                            ) : (
                              <>
                                <CalendarPlus className="w-3 h-3 text-[#ffd885]" />
                                <span>Add to Calendar</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => toggleFlip(evt.id, e)}
                            className="px-2.5 py-1.5 bg-[#faf2df] hover:bg-[#ebd5ab] text-[#881c22] border border-[#d2aa53] rounded-full text-[11px] font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                          >
                            <span>Back ↺</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* RESPONSIVE MULTI-COLUMN 3D FLIP GRID                           */
          /* ============================================================== */
          <div className="max-h-[600px] overflow-y-auto px-2 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5 scrollbar-thin">
            {filteredEvents.map((evt) => {
              const isFlipped = !!flippedCardIds[evt.id];

              return (
                <div
                  key={evt.id}
                  onClick={(e) => toggleFlip(evt.id, e)}
                  className="perspective-1000 select-none cursor-pointer h-[290px] sm:h-[310px] group"
                  title={isFlipped ? 'Click to flip back' : 'Click to flip and view details'}
                >
                  <div
                    className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-in-out ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front Face Grid Card */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-[#fdfbf7] rounded-t-[28px] rounded-b-[16px] overflow-hidden border-2 border-[#d2aa53] shadow-sm hover:shadow-xl hover:border-[#881c22] transition-all flex flex-col justify-between p-2.5">
                      {/* Number & Name */}
                      <div className="flex items-center justify-between px-1 pt-0.5">
                        <span className="text-[9.5px] font-marcellus font-bold text-[#881c22] bg-[#faf3e3] px-2 py-0.2 rounded-full border border-[#d2aa53]/60">
                          #{evt.orderNumber}
                        </span>
                        {evt.hindiName && (
                          <span className="font-devanagari text-[10px] text-[#881c22] font-semibold">
                            {evt.hindiName}
                          </span>
                        )}
                      </div>

                      {/* Event Name Only */}
                      <h4 className="font-script text-[#851b22] text-2xl sm:text-[26px] leading-tight font-bold text-center mt-0.5 mb-0.5">
                        {evt.name}
                      </h4>

                      {/* Artwork Window */}
                      <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#faf2de] border border-[#d2aa53]/70 relative mb-1">
                        <img
                          src={evt.artImage || evt.cardImage}
                          alt={evt.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-1 right-1 bg-[#faf3e3]/90 text-[#881c22] p-1 rounded-full border border-[#d2aa53] shadow-xs">
                          <RotateCw className="w-2.5 h-2.5" />
                        </div>
                      </div>

                      {/* Date & Flip Hint Bar */}
                      <div className="pt-1.5 border-t border-[#eedcb8] flex items-center justify-between text-[10px] font-marcellus text-[#5c371e] px-1">
                        <span className="font-bold text-[#881c22]">{evt.date.split(',')[0]}</span>
                        <span className="text-[#881c22] font-semibold flex items-center space-x-0.5">
                          <span>Details</span>
                          <RotateCw className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>

                    {/* Back Face Grid Card */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#fdfaf3] rounded-t-[28px] rounded-b-[16px] overflow-hidden border-2 border-[#881c22] shadow-xl p-2.5 flex flex-col justify-between text-[#4a2e1b]">
                      <div className="flex items-center justify-between border-b border-[#ecdcb8] pb-1">
                        <span className="text-[9px] font-marcellus font-bold text-[#881c22] bg-[#faf2df] px-1.5 py-0.2 rounded-full border border-[#d2aa53]/60">
                          #{evt.orderNumber}
                        </span>
                        <span className="font-devanagari text-[9.5px] text-[#881c22] font-semibold">
                          {evt.hindiName}
                        </span>
                      </div>

                      <div className="text-center my-auto space-y-1 px-0.5">
                        <h4 className="font-script text-[#851b22] text-xl leading-tight font-bold">
                          {evt.name}
                        </h4>
                        <div className="bg-[#faf2de] rounded-lg p-1.5 border border-[#d2aa53]/60 text-[9.5px] font-marcellus space-y-0.5 text-left">
                          <p className="font-bold text-[#881c22] truncate">{evt.date}</p>
                          <p className="font-semibold text-[#5a361e] truncate">{evt.time}</p>
                          <p className="text-[#633f25] truncate">{evt.venue}</p>
                        </div>
                        <p className="font-body text-[10px] text-[#4d2f1d] leading-snug line-clamp-3">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-1 border-t border-[#ecdcb8] flex items-center justify-between text-[10px] font-marcellus">
                        <button
                          onClick={(e) => handleAddToCalendar(evt, e)}
                          className={`px-2 py-0.5 rounded-full text-[9px] font-semibold transition-all cursor-pointer ${
                            addedCalendarIds[evt.id]
                              ? 'bg-[#2e7d32] text-white'
                              : 'bg-[#881c22] text-[#faf2e3]'
                          }`}
                        >
                          {addedCalendarIds[evt.id] ? '✓ Added' : '+ Cal'}
                        </button>
                        <span className="text-[#881c22] font-bold">Flip ↺</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Hint Area */}
      <div className="relative z-20 px-4 pb-4 text-center flex items-center justify-center space-x-1.5 text-xs sm:text-sm font-marcellus text-[#7a4c28]">
        <Sparkles className="w-3.5 h-3.5 text-[#d2aa53]" />
        <span>Tap any ceremony card above to flip and reveal full Muhurat &amp; rituals</span>
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
