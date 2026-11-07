import React from 'react';
import { CornerFloralVine, FloralFlourish } from './Ornaments';
import { triggerPushpaVrishti, playTempleBellChime, triggerPetalBurst } from '../utils/interactiveEffects';
import { Sparkles, Flower2, ChevronDown, Calendar, Clock, MapPin, CalendarPlus, Crown } from 'lucide-react';
import { COUPLE_NAMES } from '../data/weddingData';

interface CardHeroProps {
  onOpenInvitation?: () => void;
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
}

export const CardHero: React.FC<CardHeroProps> = ({
  onOpenInvitation,
}) => {
  const handlePortraitClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerPetalBurst(x, y, 40);
    playTempleBellChime();
  };

  const handleFlowerShower = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTempleBellChime();
    triggerPushpaVrishti();
  };

  const handleSaveTheDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTempleBellChime();
    triggerPetalBurst(0.5, 0.5, 25);
    const title = encodeURIComponent(`${COUPLE_NAMES.tagline} Royal Wedding Ceremony`);
    const details = encodeURIComponent(
      `Join us in celebrating the holy wedding union of ${COUPLE_NAMES.groom} & ${COUPLE_NAMES.bride}.\n\nVenue: ${COUPLE_NAMES.venueFullAddress}\nDate: ${COUPLE_NAMES.weddingDateDisplay}\nTime: 11:30 AM Onwards`
    );
    const location = encodeURIComponent(COUPLE_NAMES.venueFullAddress);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261216T060000Z/20261216T183000Z&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank');
  };

  return (
    <section
      id="card-1"
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#faf3e3] border-b-2 border-[#d2aa53] overflow-hidden select-none py-6 sm:py-8"
    >
      {/* Background Parchment Patina Overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
      />

      {/* Antique Gold Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-125 sm:scale-150 top-0 left-0 z-10 opacity-80" />
      <CornerFloralVine position="top-right" className="scale-100 sm:scale-125 top-0 right-0 z-10 opacity-70" />
      <CornerFloralVine position="bottom-right" className="scale-110 sm:scale-125 bottom-0 right-0 z-10 opacity-70" />
      <CornerFloralVine position="bottom-left" className="scale-100 sm:scale-125 bottom-0 left-0 z-10 opacity-70" />

      {/* Main Hero Stage */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Sacred Sanskrit Invocations */}
        <div className="flex flex-col items-center space-y-0.5 mb-1">
          <p className="font-devanagari text-[#881c22] font-semibold text-xs sm:text-sm tracking-widest uppercase drop-shadow-2xs">
            || ॐ श्री गणेशाय नमः ||
          </p>
          <p className="font-devanagari text-[#881c22] font-bold text-sm sm:text-base md:text-lg tracking-widest uppercase drop-shadow-xs animate-pulse [animation-duration:4s]">
            || जय श्री सीताराम ||
          </p>
        </div>

        {/* Royal Crest Monogram Badge */}
        <div className="my-1.5 flex items-center justify-center space-x-2">
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-[#d2aa53]" />
          <div className="flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#faf2df] border border-[#d2aa53] shadow-2xs">
            <Crown className="w-3.5 h-3.5 text-[#881c22]" />
            <span className="font-marcellus text-[11px] sm:text-xs font-bold text-[#881c22] tracking-wider">
              A &amp; V
            </span>
            <Crown className="w-3.5 h-3.5 text-[#881c22]" />
          </div>
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-[#d2aa53]" />
        </div>

        {/* The Wedding Of Subtitle */}
        <h2 className="font-marcellus text-[#4a2e1b] text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase font-semibold mt-1">
          The Royal Wedding Celebration Of
        </h2>

        {/* Grand Calligraphy Couple Names */}
        <h1 className="font-script text-[#851b22] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] mt-1 mb-1 tracking-wide font-bold drop-shadow-sm transition-transform hover:scale-[1.01]">
          Anirudh &amp; Vaidehi
        </h1>

        {/* Royal Flourish Divider */}
        <FloralFlourish className="w-48 sm:w-60 h-4 my-1" color="#a37128" />

        {/* Center Divine Illustration: Lord Rama and Mata Sita in Rajasthani Jharokha */}
        <div className="relative my-3 sm:my-4 group flex items-center justify-center">
          {/* Left Sacred Oil Lamp (Diya) with flickering flame */}
          <div className="hidden sm:flex flex-col items-center mr-5 select-none pointer-events-none">
            {/* Animated Diya Flame */}
            <div className="w-4 h-6 rounded-full bg-gradient-to-t from-[#ea580c] via-[#facc15] to-[#fef08a] animate-diya shadow-[0_0_14px_#f59e0b] -mb-1" />
            {/* Diya Base */}
            <div className="w-9 h-4 rounded-b-full bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#b45309] border border-[#78350f] shadow-md" />
            <span className="font-devanagari text-[10px] text-[#881c22] mt-1 font-bold">शुभ लाभ</span>
          </div>

          {/* Divine Frame (Clickable for Sacred Petals & Chime) */}
          <div
            onClick={handlePortraitClick}
            className="relative w-[250px] sm:w-[300px] md:w-[330px] aspect-[3/4] rounded-[32px] sm:rounded-[38px] overflow-hidden border-3 sm:border-4 border-[#d2aa53] shadow-2xl bg-[#f5e9d0] transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#ffd885] cursor-pointer animate-gold-glow"
            title="Tap to receive divine Sita-Ram blessings & flower shower"
          >
            <img
              src="/images/hero-sita-ram.jpg"
              alt="Lord Rama and Mata Sita Divine Grace"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Soft Light Sheen Sweep on Hover */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-sheen" />
            </div>

            {/* Tap Hint Badge */}
            <div className="absolute bottom-2.5 inset-x-4 bg-[#faf3e3]/95 backdrop-blur-xs rounded-full py-1 px-2 border border-[#d2aa53] flex items-center justify-center space-x-1.5 shadow-sm text-[11px] font-marcellus text-[#881c22] opacity-90 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin [animation-duration:6s]" />
              <span className="font-semibold">Tap for Sacred Blessings</span>
            </div>
          </div>

          {/* Right Sacred Oil Lamp (Diya) with flickering flame */}
          <div className="hidden sm:flex flex-col items-center ml-5 select-none pointer-events-none">
            {/* Animated Diya Flame */}
            <div className="w-4 h-6 rounded-full bg-gradient-to-t from-[#ea580c] via-[#facc15] to-[#fef08a] animate-diya shadow-[0_0_14px_#f59e0b] -mb-1 [animation-delay:0.4s]" />
            {/* Diya Base */}
            <div className="w-9 h-4 rounded-b-full bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#b45309] border border-[#78350f] shadow-md" />
            <span className="font-devanagari text-[10px] text-[#881c22] mt-1 font-bold">शुभ विवाह</span>
          </div>
        </div>

        {/* Date, Muhurat & Royal Venue Plaque */}
        <div className="bg-[#faf2de]/90 rounded-2xl px-4 sm:px-6 py-2.5 border border-[#d2aa53] shadow-md my-2 max-w-lg mx-auto space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm font-marcellus font-bold text-[#881c22]">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#a37128]" />
              <span>Wednesday, 16th December 2026</span>
            </span>
            <span className="hidden sm:inline text-[#d2aa53]">•</span>
            <span className="flex items-center space-x-1 text-[#653e24]">
              <Clock className="w-3.5 h-3.5 text-[#a37128]" />
              <span>Muhurat: 11:30 AM Onwards</span>
            </span>
          </div>
          <p className="font-marcellus text-[#5a3821] text-xs sm:text-[13px] font-semibold flex items-center justify-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-[#881c22] shrink-0" />
            <span>Ayodhya Grand Palace, Fatehabad Road, Agra</span>
          </p>
        </div>

        {/* Interactive Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-2">
          {/* Open Invitation CTA */}
          <button
            onClick={onOpenInvitation}
            className="px-6 sm:px-8 py-2.5 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-marcellus text-xs sm:text-sm font-bold rounded-full shadow-xl border border-[#ffd885]/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2"
          >
            <span>Open Royal Invitation</span>
            <span className="text-base font-bold text-[#ffd885]">›</span>
          </button>

          {/* Shower Flowers Pushpa Vrishti Button */}
          <button
            onClick={handleFlowerShower}
            className="px-5 py-2.5 bg-[#faf2df] hover:bg-[#f5e5c4] text-[#821c21] font-marcellus text-xs sm:text-sm font-bold rounded-full shadow-md border-2 border-[#d2aa53] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-1.5 group"
            title="Shower Sacred Flowers & Petals"
          >
            <Flower2 className="w-4 h-4 text-[#e11d48] group-hover:rotate-45 transition-transform" />
            <span>पुष्प वर्षा (Flower Shower)</span>
          </button>

          {/* Save to Calendar Button */}
          <button
            onClick={handleSaveTheDate}
            className="px-4 py-2.5 bg-[#faf2df] hover:bg-[#f5e5c4] text-[#821c21] font-marcellus text-xs sm:text-sm font-semibold rounded-full shadow-md border border-[#d2aa53] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-1.5"
            title="Add Wedding to Google Calendar"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#a37128]" />
            <span>Save Date</span>
          </button>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div
          onClick={onOpenInvitation}
          className="mt-4 flex flex-col items-center text-[#881c22]/80 hover:text-[#881c22] cursor-pointer transition-colors group"
        >
          <span className="text-[10px] font-marcellus uppercase tracking-widest font-semibold group-hover:tracking-[0.2em] transition-all">
            Scroll to Explore Ceremonies &amp; Story
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce mt-0.5 text-[#881c22]" />
        </div>
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
