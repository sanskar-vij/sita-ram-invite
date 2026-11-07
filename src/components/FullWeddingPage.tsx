import React, { useState, useEffect, useRef } from 'react';
import { FloralFlourish, CornerFloralVine } from './Ornaments';
import { WEDDING_EVENTS, COUPLE_NAMES, INITIAL_BLESSINGS } from '../data/weddingData';
import { WeddingEvent, Blessing } from '../types/wedding';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  CheckCircle2,
  Heart,
  Compass,
  Send,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Columns,
} from 'lucide-react';

interface FullWeddingPageProps {
  onOpenRSVP: () => void;
  onOpenVenue: () => void;
  onSelectEvent: (event: WeddingEvent) => void;
  onSaveToCalendar: () => void;
  onOpenGallery: () => void;
  onOpenBlessings: () => void;
}

export const FullWeddingPage: React.FC<FullWeddingPageProps> = ({
  onOpenRSVP,
  onOpenVenue,
  onSelectEvent,
  onSaveToCalendar,
  onOpenGallery,
  onOpenBlessings,
}) => {
  // Countdown Timer State
  const targetDate = new Date(COUPLE_NAMES.targetDateTime).getTime();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 406,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Embedded RSVP Form State
  const [rsvpName, setRsvpName] = useState<string>('');
  const [rsvpPhone, setRsvpPhone] = useState<string>('');
  const [rsvpGuests, setRsvpGuests] = useState<number>(2);
  const [rsvpDiet, setRsvpDiet] = useState<string>('Pure Vegetarian & Sattvic Cuisine');
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);

  // Horizontal Scrollable Events State
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const eventsScrollRef = useRef<HTMLDivElement>(null);

  const scrollEvents = (direction: 'left' | 'right') => {
    if (eventsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      eventsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleInlineRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
  };

  // Guestbook Blessings State
  const [blessings, setBlessings] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [blessingSubmitted, setBlessingSubmitted] = useState<boolean>(false);

  const handleAddBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;
    const item: Blessing = {
      id: Date.now().toString(),
      author: newAuthor,
      relation: 'Well-Wisher',
      message: newMessage,
      timestamp: 'Just now',
      blessingEmoji: '🌸',
    };
    setBlessings([item, ...blessings]);
    setNewAuthor('');
    setNewMessage('');
    setBlessingSubmitted(true);
    setTimeout(() => setBlessingSubmitted(false), 4000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-16">
      
      {/* ============================================================== */}
      {/* 1. SACRED INVOCATION & ROYAL WEDDING ANNOUNCEMENT (HERO)       */}
      {/* ============================================================== */}
      <section
        id="hero"
        className="relative text-center py-10 sm:py-14 px-4 sm:px-8 rounded-3xl bg-[#faf3e3] border-2 border-[#d2aa53] shadow-xl overflow-hidden"
      >
        {/* Parchment Patina */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        {/* Corner Vines */}
        <CornerFloralVine position="top-left" className="scale-110 -top-2 -left-2" />
        <CornerFloralVine position="top-right" className="scale-110 -top-2 -right-2" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          {/* Auspicious Shloka */}
          <p className="font-devanagari text-[#881c22] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-1">
            || श्री गणेशाय नमः • जय श्री सीताराम ||
          </p>

          <p className="font-marcellus text-[#5a3821] text-xs sm:text-[13px] tracking-widest uppercase font-semibold mt-1">
            With the divine grace of Almighty God &amp; blessings of our elders
          </p>

          <div className="w-20 h-0.5 bg-[#d4af37] my-2" />

          {/* Couple Calligraphy */}
          <h1 className="font-script text-[#851b22] text-5xl sm:text-7xl leading-tight my-1 drop-shadow-sm font-bold">
            Anirudh &amp; Vaidehi
          </h1>

          <FloralFlourish className="w-48 sm:w-60 h-4 my-2" color="#a37128" />

          {/* Date & Palace Venue */}
          <p className="font-marcellus text-[#3c2314] text-sm sm:text-base font-bold tracking-wider uppercase mt-1">
            Wednesday, 16th December 2026
          </p>
          <p className="font-body text-[#653e24] text-xs sm:text-sm font-medium">
            Ayodhya Grand Palace, Fatehabad Road, Agra
          </p>

          {/* Royal Portrait */}
          <div className="w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#d2aa53] shadow-lg my-6 bg-[#f4e7cd]">
            <img
              src="/images/hero-sita-ram.jpg"
              alt="Anirudh & Vaidehi - Blessed by Sita-Ram"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-body text-[#4c2f1c] text-sm sm:text-base leading-relaxed max-w-lg italic mb-6">
            &ldquo;We cordially invite you and your family to grace the auspicious wedding ceremonies and bless our new journey of togetherness.&rdquo;
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenRSVP}
              className="px-6 py-2.5 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-semibold text-xs sm:text-sm rounded-full shadow-md border border-[#b8860b]/40 transition-transform active:scale-95 cursor-pointer flex items-center space-x-2"
            >
              <Heart className="w-4 h-4 text-[#ffd885]" />
              <span>Confirm Presence (RSVP)</span>
            </button>

            <button
              onClick={onSaveToCalendar}
              className="px-5 py-2.5 bg-[#fdfbf6] hover:bg-[#f3e5ca] text-[#821c21] font-semibold text-xs sm:text-sm rounded-full shadow-sm border border-[#d2aa53] transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Save the Date</span>
            </button>
          </div>
        </div>
      </section>


      {/* ============================================================== */}
      {/* 2. OUR STORY (बंधन दो आत्माओं का)                              */}
      {/* ============================================================== */}
      <section
        id="story"
        className="relative text-center py-10 sm:py-14 px-4 sm:px-8 rounded-3xl bg-[#faf3e3] border-2 border-[#d2aa53] shadow-xl overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <p className="font-devanagari text-[#881c22] font-semibold text-xs tracking-wider uppercase mb-1">
            || यदेतद्धृदयं तव तदस्तु हृदयं मम ||
          </p>

          <h2 className="font-script text-[#851b22] text-4xl sm:text-5xl leading-tight font-bold">
            Our Story
          </h2>

          <FloralFlourish className="w-40 h-4 my-2" color="#a37128" />

          <p className="font-body text-[#3e2415] text-base sm:text-lg leading-relaxed max-w-lg font-medium my-3">
            &ldquo;From shared childhood laughter in Agra to a bond rooted in deep mutual respect, our journey was written in the stars and guided by divine blessings.&rdquo;
          </p>

          <div className="w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#d2aa53] shadow-md my-4 bg-[#f4e7cd]">
            <img
              src="/images/story-couple.jpg"
              alt="Anirudh & Vaidehi - Our Story"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-body text-xs sm:text-sm text-[#5a3821] max-w-md leading-relaxed">
            With the grace of our elders and the timeless ideals of Sita and Ram, we step into a sacred partnership of devotion, dharma, and unending joy.
          </p>
        </div>
      </section>


      {/* ============================================================== */}
      {/* 3. THE 15 SACRED CEREMONIES (मांगलिक उत्सव व कार्यक्रम)          */}
      {/* ============================================================== */}
      <section
        id="events"
        className="relative py-10 sm:py-14 px-3 sm:px-6 rounded-3xl bg-[#faf3e3] border-2 border-[#d2aa53] shadow-xl overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
          <p className="font-devanagari text-[#881c22] font-semibold text-xs tracking-widest uppercase mb-1">
            || मांगलिक कार्यक्रम व उत्सव ||
          </p>
          <h2 className="font-script text-[#851b22] text-4xl sm:text-6xl leading-tight font-bold">
            Wedding Ceremonies
          </h2>
          <FloralFlourish className="w-48 h-4 my-2" color="#a37128" />
          <p className="font-marcellus text-xs sm:text-sm text-[#5c371e] font-semibold">
            Scroll through the 15 ceremonies • Tap any card to view its full details &amp; Muhurat
          </p>

          {/* Carousel Controls & Layout Toggle */}
          <div className="flex items-center justify-between mt-4 px-2">
            {/* Scroll Navigation Arrows */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollEvents('left')}
                className="p-2 rounded-full bg-[#faf2de] hover:bg-[#881c22] text-[#881c22] hover:text-[#faf2e3] border border-[#d2aa53] shadow-xs transition-colors cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollEvents('right')}
                className="p-2 rounded-full bg-[#faf2de] hover:bg-[#881c22] text-[#881c22] hover:text-[#faf2e3] border border-[#d2aa53] shadow-xs transition-colors cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-marcellus text-[#7a4c28] pl-1 font-medium hidden sm:inline">
                Swipe / Scroll horizontally
              </span>
            </div>

            {/* View Mode Toggle: Scrollable Row vs Grid */}
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="px-3 py-1 rounded-full bg-[#faf2de] hover:bg-[#ebd5ab] text-[#821c21] border border-[#d2aa53] text-[11px] font-marcellus font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              {isGridView ? (
                <>
                  <Columns className="w-3.5 h-3.5" />
                  <span>Scrollable Row</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>View All 15 Grid</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 15 Ceremonies: Scrollable Row (Default) OR Grid View */}
        {isGridView ? (
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {WEDDING_EVENTS.map((event) => (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="group relative aspect-[197/341] bg-[#fdfbf6] rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-[#cfa554] hover:border-[#881c22] hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Subtle card parchment */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
                  style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
                />

                {/* Card Header line */}
                <div className="relative z-10 px-2 pt-1.5 pb-0.5 flex items-center justify-between text-[#55341f]">
                  <span className="text-[9px] opacity-70">⌂</span>
                  <span className="font-marcellus text-[8.5px] sm:text-[9.5px] font-bold tracking-tight text-[#4d2f1c]">
                    Our Wedding Events
                  </span>
                  <span className="text-[9px] opacity-70">≡</span>
                </div>

                {/* Event Number & Title */}
                <div className="relative z-10 px-1.5 text-center">
                  <h3 className="font-script text-[#851b22] text-[18px] sm:text-[20px] leading-tight font-bold group-hover:scale-105 transition-transform">
                    {event.orderNumber}. {event.name}
                  </h3>
                  <p className="font-marcellus text-[#5a3821] text-[9px] sm:text-[10px] leading-tight line-clamp-1 italic">
                    {event.tagline}
                  </p>
                </div>

                {/* Authentic Painted Artwork */}
                <div className="relative z-10 flex-1 px-1 pt-1 pb-1 flex items-end">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#faf2de] border border-[#d2aa53]/60 relative">
                    <img
                      src={event.artImage || event.cardImage}
                      alt={event.name}
                      className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#881c22]/0 group-hover:bg-[#881c22]/15 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-[#faf3e3]/95 text-[#881c22] font-marcellus text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs transition-opacity">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date, Time, Venue & Dress Details right on the card */}
                <div className="relative z-10 px-2 py-1.5 bg-[#f5e9d0]/95 border-t border-[#d2aa53]/40 space-y-0.5 text-left">
                  <div className="flex items-center justify-between text-[9px] text-[#881c22] font-semibold font-marcellus">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                  <p className="text-[8.5px] text-[#55341f] font-medium truncate">
                    📍 {event.venue.split(',')[0]}
                  </p>
                  <p className="text-[8px] text-[#7a4c28] italic truncate">
                    👗 {event.dressCode.split(',')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={eventsScrollRef}
            className="relative z-10 flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin px-2 scroll-smooth"
          >
            {WEDDING_EVENTS.map((event) => (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="group relative w-[180px] sm:w-[210px] md:w-[225px] shrink-0 snap-center aspect-[197/341] bg-[#fdfbf6] rounded-2xl overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-[#cfa554] hover:border-[#881c22] hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Subtle card parchment */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
                  style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
                />

                {/* Card Header line */}
                <div className="relative z-10 px-2 pt-1.5 pb-0.5 flex items-center justify-between text-[#55341f]">
                  <span className="text-[9px] opacity-70">⌂</span>
                  <span className="font-marcellus text-[8.5px] sm:text-[9.5px] font-bold tracking-tight text-[#4d2f1c]">
                    Our Wedding Events
                  </span>
                  <span className="text-[9px] opacity-70">≡</span>
                </div>

                {/* Event Number & Title */}
                <div className="relative z-10 px-1.5 text-center">
                  <h3 className="font-script text-[#851b22] text-[18px] sm:text-[20px] leading-tight font-bold group-hover:scale-105 transition-transform">
                    {event.orderNumber}. {event.name}
                  </h3>
                  <p className="font-marcellus text-[#5a3821] text-[9px] sm:text-[10px] leading-tight line-clamp-1 italic">
                    {event.tagline}
                  </p>
                </div>

                {/* Authentic Painted Artwork */}
                <div className="relative z-10 flex-1 px-1 pt-1 pb-1 flex items-end">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#faf2de] border border-[#d2aa53]/60 relative">
                    <img
                      src={event.artImage || event.cardImage}
                      alt={event.name}
                      className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#881c22]/0 group-hover:bg-[#881c22]/15 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-[#faf3e3]/95 text-[#881c22] font-marcellus text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs transition-opacity">
                        View Card →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date, Time, Venue & Dress Details right on the card */}
                <div className="relative z-10 px-2 py-1.5 bg-[#f5e9d0]/95 border-t border-[#d2aa53]/40 space-y-0.5 text-left">
                  <div className="flex items-center justify-between text-[9px] text-[#881c22] font-semibold font-marcellus">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                  <p className="text-[8.5px] text-[#55341f] font-medium truncate">
                    📍 {event.venue.split(',')[0]}
                  </p>
                  <p className="text-[8px] text-[#7a4c28] italic truncate">
                    👗 {event.dressCode.split(',')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* ============================================================== */}
      {/* 4. THE BIG DAY & MUHURAT (शुभ विवाह संस्कार)                    */}
      {/* ============================================================== */}
      <section
        id="big-day"
        className="relative py-10 sm:py-14 px-4 sm:px-8 rounded-3xl bg-[#faf3e3] border-2 border-[#d2aa53] shadow-xl overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3.5 text-center md:text-left">
            <p className="font-devanagari text-[#881c22] font-semibold text-xs tracking-wider uppercase">
              || शुभ विवाह संस्कार ||
            </p>
            <h2 className="font-script text-[#851b22] text-4xl sm:text-6xl leading-tight font-bold">
              The Big Day
            </h2>
            <FloralFlourish className="w-40 h-4 my-1 mx-auto md:mx-0" color="#a37128" />

            <p className="font-body text-[#3c2314] text-sm sm:text-base leading-relaxed font-medium">
              The sacred Vedic rites solemnized before the holy Agni under the golden mandap.
            </p>

            {/* Schedule Highlights */}
            <div className="space-y-2.5 pt-2 text-xs text-[#3c2314]">
              <div className="flex items-center space-x-2.5 justify-center md:justify-start">
                <Calendar className="w-4 h-4 text-[#881c22] shrink-0" />
                <span className="font-semibold text-sm">Wednesday, 16th December 2026</span>
              </div>

              <div className="flex items-center space-x-2.5 justify-center md:justify-start">
                <Clock className="w-4 h-4 text-[#881c22] shrink-0" />
                <span className="font-semibold text-sm">Auspicious Vivah Muhurat: 11:30 AM</span>
              </div>

              <div className="flex items-start space-x-2.5 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#881c22] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-sm block">Royal Mandap, Ayodhya Grand Palace</span>
                  <span className="text-[11px] text-[#6c4328]">Fatehabad Road, Agra, UP</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2.5 pt-3 justify-center md:justify-start">
              <button
                onClick={onOpenVenue}
                className="px-4 py-2 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-semibold text-xs rounded-full shadow-md transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Venue Directions</span>
              </button>

              <button
                onClick={onSaveToCalendar}
                className="px-4 py-2 bg-[#fdfbf6] hover:bg-[#f3e5ca] text-[#821c21] font-semibold text-xs rounded-full shadow-xs border border-[#d2aa53] transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>

          {/* Mandap Image */}
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#d2aa53] shadow-lg bg-[#f4e7cd]">
            <img
              src="/images/mandap-big-day.jpg"
              alt="Royal Vivah Mandap"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>


      {/* ============================================================== */}
      {/* 5. COUNTDOWN TO AUSPICIOUS MUHURAT (लग्न मुहूर्त की प्रतीक्षा)    */}
      {/* ============================================================== */}
      <section
        id="countdown"
        className="relative py-10 sm:py-12 px-4 sm:px-8 rounded-3xl bg-[#faf3e3] border-2 border-[#d2aa53] shadow-xl overflow-hidden text-center"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        <div className="relative z-10 max-w-lg mx-auto space-y-3">
          <p className="font-devanagari text-[#881c22] font-semibold text-xs tracking-wider uppercase">
            || लग्न मुहूर्त की शुभ प्रतीक्षा ||
          </p>
          <h2 className="font-script text-[#851b22] text-4xl sm:text-5xl leading-tight font-bold">
            Counting Down The Moments
          </h2>
          <FloralFlourish className="w-40 h-3.5 my-1" color="#a37128" />

          {/* 4 Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto pt-3">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-[#fdfbf6] border border-[#d2aa53] shadow-xs"
              >
                <span className="font-display font-bold text-[#851b22] text-2xl sm:text-3xl leading-none">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-marcellus text-[#5a3821] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="font-body text-xs sm:text-sm text-[#5a3821] pt-2">
            16th December 2026 • 11:30 AM IST • Ayodhya Grand Palace, Agra
          </p>
        </div>
      </section>


      {/* ============================================================== */}
      {/* 6. ROYAL VENUE & HOSPITALITY (सत्कार व स्थान निर्देश)            */}
      {/* ============================================================== */}
      <section
        id="venue"
        className="relative py-10 sm:py-14 px-4 sm:px-8 rounded-3xl bg-[#faf3e3] border-2 border-[#d2aa53] shadow-xl overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#d2aa53] shadow-lg order-2 md:order-1 bg-[#f4e7cd]">
            <img
              src="/images/palace-river-ghats.jpg"
              alt="Ayodhya Grand Palace, Agra"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3.5 text-center md:text-left order-1 md:order-2">
            <p className="font-devanagari text-[#881c22] font-semibold text-xs tracking-wider uppercase">
              || सत्कार व स्थान निर्देश ||
            </p>
            <h2 className="font-script text-[#851b22] text-4xl sm:text-5xl leading-tight font-bold">
              Ayodhya Grand Palace
            </h2>
            <FloralFlourish className="w-40 h-4 my-1 mx-auto md:mx-0" color="#a37128" />

            <p className="font-marcellus text-xs sm:text-sm font-bold text-[#3c2314]">
              Fatehabad Road, Near Taj Heritage Corridor, Agra, UP 282001
            </p>

            <p className="font-body text-xs sm:text-sm text-[#55341f] leading-relaxed">
              Nestled along the serene heritage corridor, the grand palace blends Awadhi grandeur with royal hospitality for an unforgettable celebration.
            </p>

            {/* Travel Guide Notes */}
            <div className="p-3 rounded-xl bg-[#fdfbf6] border border-[#d2aa53]/70 text-[11px] text-[#4d2f1c] space-y-1.5">
              <p>🚆 <strong>Agra Cantt Railway Station:</strong> 15 mins away (chauffeur pickup arranged)</p>
              <p>✈️ <strong>Delhi IGI Airport:</strong> 3.5 hrs via Yamuna Expressway</p>
              <p>🏨 <strong>Guest Stay:</strong> Heritage Palace Suites &amp; Royal Courtyard rooms reserved</p>
            </div>

            <button
              onClick={onOpenVenue}
              className="px-5 py-2.5 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-semibold text-xs rounded-full shadow-md transition-colors flex items-center space-x-1.5 cursor-pointer mx-auto md:mx-0"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Open Palace Map &amp; Directions</span>
            </button>
          </div>
        </div>
      </section>


      {/* ============================================================== */}
      {/* 7. CONFIRM PRESENCE (RSVP FORM - उपस्थिति की पुष्टि)           */}
      {/* ============================================================== */}
      <section
        id="rsvp"
        className="relative py-10 sm:py-12 px-4 sm:px-8 rounded-3xl bg-[#faf3e3] border-2 border-[#d2aa53] shadow-xl overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        <div className="relative z-10 max-w-lg mx-auto text-center">
          <p className="font-devanagari text-[#881c22] font-semibold text-xs tracking-wider uppercase mb-1">
            || उपस्थिति की पुष्टि ||
          </p>
          <h2 className="font-script text-[#851b22] text-4xl sm:text-5xl leading-tight font-bold">
            Confirm Your Presence
          </h2>
          <FloralFlourish className="w-40 h-3.5 my-1" color="#a37128" />

          <p className="font-body text-xs sm:text-sm text-[#4d2f1c] mb-5">
            Your presence is our greatest blessing. Please let us know if you will be able to join us in Agra.
          </p>

          {rsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-[#fdfbf6] border border-[#d2aa53] space-y-2 text-center animate-in fade-in duration-300">
              <CheckCircle2 className="w-10 h-10 text-[#821c21] mx-auto mb-1" />
              <h3 className="font-display italic text-[#821c21] text-xl font-bold">
                Presence Confirmed!
              </h3>
              <p className="font-body text-xs text-[#52331f]">
                Thank you, <strong>{rsvpName}</strong>. The Sharma &amp; Trivedi families eagerly look forward to welcoming your family in Agra!
              </p>
              <button
                onClick={() => setRsvpSubmitted(false)}
                className="text-[11px] text-[#881c22] font-semibold underline pt-2 cursor-pointer"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleInlineRSVP} className="space-y-3.5 text-left bg-[#fdfbf6] p-4 sm:p-6 rounded-2xl border border-[#d2aa53]/80 shadow-xs">
              <div>
                <label className="block font-marcellus text-[#3f2516] text-[11px] font-semibold uppercase tracking-wider mb-1">
                  Full Name / परिवार का नाम *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shri Rajesh &amp; Family"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#faf3e3] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none focus:ring-1 focus:ring-[#821c21]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-marcellus text-[#3f2516] text-[11px] font-semibold uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#faf3e3] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none focus:ring-1 focus:ring-[#821c21]"
                  />
                </div>

                <div>
                  <label className="block font-marcellus text-[#3f2516] text-[11px] font-semibold uppercase tracking-wider mb-1">
                    Number of Guests: {rsvpGuests}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(parseInt(e.target.value) || 1)}
                    className="w-full accent-[#821c21] cursor-pointer mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-marcellus text-[#3f2516] text-[11px] font-semibold uppercase tracking-wider mb-1">
                  Culinary Preference
                </label>
                <select
                  value={rsvpDiet}
                  onChange={(e) => setRsvpDiet(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#faf3e3] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none"
                >
                  <option>Pure Vegetarian &amp; Sattvic Royal Cuisine</option>
                  <option>Jain Royal Cuisine (No Onion, No Garlic)</option>
                  <option>Traditional Awadhi &amp; Rajasthani Feast</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-semibold text-xs rounded-full shadow-md transition-all active:scale-95 cursor-pointer mt-2"
              >
                Confirm Attendance &amp; Send Wishes
              </button>
            </form>
          )}
        </div>
      </section>


      {/* ============================================================== */}
      {/* 8. BLESSINGS & GUESTBOOK (शुभकामनाएं व आशीर्वाद)               */}
      {/* ============================================================== */}
      <section
        id="blessings"
        className="relative py-10 sm:py-12 px-4 sm:px-8 rounded-3xl bg-[#faf3e3] border-2 border-[#d2aa53] shadow-xl overflow-hidden text-center"
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        <div className="relative z-10 max-w-lg mx-auto space-y-3">
          <p className="font-devanagari text-[#881c22] font-semibold text-xs tracking-wider uppercase mb-1">
            || शुभकामनाएं व आशीर्वाद ||
          </p>
          <h2 className="font-script text-[#851b22] text-4xl sm:text-5xl leading-tight font-bold">
            Elders&rsquo; Blessings &amp; Wishes
          </h2>
          <FloralFlourish className="w-40 h-3.5 my-1" color="#a37128" />

          {/* Blessings List */}
          <div className="space-y-2.5 text-left max-h-60 overflow-y-auto pr-1 pt-2 scrollbar-thin">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-xl bg-[#fdfbf6] border border-[#d2aa53]/70 shadow-2xs space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#821c21] font-display">
                    {b.blessingEmoji} {b.author}
                  </span>
                  <span className="text-[10px] text-[#7a4c28]">{b.relation}</span>
                </div>
                <p className="font-body text-xs text-[#4a2e1b] italic">
                  &ldquo;{b.message}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Leave a blessing input */}
          <form onSubmit={handleAddBlessing} className="pt-3 flex gap-2">
            <input
              type="text"
              placeholder="Your Name..."
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="w-1/3 px-3 py-2 text-xs bg-[#fdfbf6] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Write warm blessings for couple..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-[#fdfbf6] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="p-2.5 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] rounded-xl shadow-xs cursor-pointer"
              title="Post Blessing"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {blessingSubmitted && (
            <p className="text-[11px] text-green-800 font-semibold pt-1">
              Thank you! Your heartfelt blessings have been added.
            </p>
          )}
        </div>
      </section>

    </div>
  );
};
