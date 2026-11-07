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
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-[#faf3e3] border-b-3 border-[#d2aa53] overflow-hidden select-none py-8 sm:py-12"
    >
      {/* 1. SCENIC ROYAL AYODHYA PALACE SCENIC BACKDROP (Full Bleed Gateway Atmosphere) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-multiply pointer-events-none scale-105"
        style={{ backgroundImage: `url('/images/save-the-date-palace.jpg')` }}
      />

      {/* 2. WARM GOLDEN TWILIGHT VIGNETTE & PARCHMENT PATINA */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf3e3]/95 via-[#faf3e3]/75 to-[#faf3e3]/95 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
      />

      {/* 3. ROYAL ARCHITECTURAL PALACE ARCHWAY CONTOUR */}
      <div className="absolute inset-2 sm:inset-4 rounded-t-[60px] sm:rounded-t-[80px] rounded-b-[32px] border-2 border-[#d2aa53]/60 pointer-events-none z-10 shadow-[inset_0_0_40px_rgba(210,170,83,0.15)]" />
      <div className="absolute inset-3 sm:inset-5 rounded-t-[54px] sm:rounded-t-[74px] rounded-b-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />

      {/* Antique Gold Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-125 sm:scale-160 top-0 left-0 z-10 opacity-85" />
      <CornerFloralVine position="top-right" className="scale-100 sm:scale-130 top-0 right-0 z-10 opacity-75" />
      <CornerFloralVine position="bottom-right" className="scale-110 sm:scale-130 bottom-0 right-0 z-10 opacity-75" />
      <CornerFloralVine position="bottom-left" className="scale-100 sm:scale-130 bottom-0 left-0 z-10 opacity-75" />

      {/* ============================================================== */}
      {/* MAIN HERO GATEWAY STAGE                                        */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-2 sm:py-4 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Sacred Sanskrit Invocations with Radiant Halo */}
        <div className="flex flex-col items-center space-y-1 mb-2">
          <p className="font-devanagari text-[#881c22] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase drop-shadow-2xs">
            || ॐ श्री गणेशाय नमः ||
          </p>
          <p className="font-devanagari text-[#881c22] font-bold text-base sm:text-lg md:text-xl tracking-[0.3em] uppercase drop-shadow-xs animate-pulse [animation-duration:4s]">
            || जय श्री सीताराम ||
          </p>
        </div>

        {/* Royal Crest Monogram Medallion */}
        <div className="my-1.5 flex items-center justify-center space-x-3">
          <div className="w-14 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d2aa53] to-[#881c22]" />
          <div className="flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#fdfaf3]/95 border-2 border-[#d2aa53] shadow-md backdrop-blur-xs">
            <Crown className="w-3.5 h-3.5 text-[#881c22]" />
            <span className="font-marcellus text-xs sm:text-sm font-bold text-[#881c22] tracking-widest">
              A &amp; V
            </span>
            <Crown className="w-3.5 h-3.5 text-[#881c22]" />
          </div>
          <div className="w-14 sm:w-20 h-0.5 bg-gradient-to-l from-transparent via-[#d2aa53] to-[#881c22]" />
        </div>

        {/* Subtitle */}
        <h2 className="font-marcellus text-[#4a2e1b] text-xs sm:text-sm md:text-base tracking-[0.28em] uppercase font-semibold mt-1">
          The Royal Wedding Celebration Of
        </h2>

        {/* Grand Calligraphy Couple Names */}
        <h1 className="font-script text-[#851b22] text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.06] mt-1 mb-1 tracking-wide font-bold drop-shadow-[0_4px_12px_rgba(210,170,83,0.35)] transition-transform hover:scale-[1.01]">
          Anirudh &amp; Vaidehi
        </h1>

        {/* Royal Flourish Divider */}
        <FloralFlourish className="w-52 sm:w-64 h-4 my-1.5" color="#a37128" />

        {/* Center Divine Gateway: Sita-Ram Grace in Royal Jharokha Arch */}
        <div className="relative my-3 sm:my-5 group flex items-center justify-center">
          
          {/* Left Traditional Brass Diya Stand with Flickering Flame */}
          <div className="hidden sm:flex flex-col items-center mr-5 md:mr-8 select-none pointer-events-none">
            {/* Animated Diya Flame with Warm Radial Halo */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full bg-[#f59e0b]/25 blur-sm animate-pulse" />
              <div className="w-4.5 h-7 rounded-full bg-gradient-to-t from-[#ea580c] via-[#facc15] to-[#fef08a] animate-diya shadow-[0_0_16px_#f59e0b] -mb-1" />
            </div>
            {/* Diya Brass Cup & Pillar */}
            <div className="w-10 h-4 rounded-b-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#b45309] border border-[#78350f] shadow-md" />
            <div className="w-2.5 h-10 bg-gradient-to-b from-[#d97706] to-[#78350f] shadow-inner" />
            <div className="w-9 h-2.5 rounded-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#b45309] border border-[#78350f] shadow-md" />
            <span className="font-devanagari text-[10px] text-[#881c22] mt-1.5 font-bold tracking-wider">
              || शुभ लाभ ||
            </span>
          </div>

          {/* Divine Frame (Clickable for Sacred Temple Bell & Petal Shower) */}
          <div
            onClick={handlePortraitClick}
            className="relative w-[260px] sm:w-[310px] md:w-[340px] aspect-[3/4] rounded-t-[44px] sm:rounded-t-[54px] rounded-b-[24px] overflow-hidden border-3 sm:border-4 border-[#d2aa53] shadow-[0_16px_40px_rgba(74,44,29,0.35)] bg-[#f5e9d0] transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#ffd885] cursor-pointer animate-gold-glow"
            title="Tap to receive divine Sita-Ram blessings & flower shower"
          >
            {/* Inner Scalloped Filigree Border */}
            <div className="absolute inset-1.5 rounded-t-[38px] sm:rounded-t-[48px] rounded-b-[18px] border border-[#ffd885]/60 pointer-events-none z-10" />

            <img
              src="/images/hero-sita-ram.jpg"
              alt="Lord Rama and Mata Sita Divine Grace"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Soft Light Sheen Sweep on Hover */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-sheen" />
            </div>

            {/* Tap Hint Badge */}
            <div className="absolute bottom-2.5 inset-x-4 bg-[#faf3e3]/95 backdrop-blur-xs rounded-full py-1.5 px-3 border border-[#d2aa53] flex items-center justify-center space-x-1.5 shadow-md text-[11px] sm:text-xs font-marcellus text-[#881c22] opacity-95 group-hover:opacity-100 transition-opacity z-20">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin [animation-duration:6s]" />
              <span className="font-bold">Tap for Divine Sita–Ram Blessings</span>
            </div>
          </div>

          {/* Right Traditional Brass Diya Stand with Flickering Flame */}
          <div className="hidden sm:flex flex-col items-center ml-5 md:ml-8 select-none pointer-events-none">
            {/* Animated Diya Flame with Warm Radial Halo */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full bg-[#f59e0b]/25 blur-sm animate-pulse" />
              <div className="w-4.5 h-7 rounded-full bg-gradient-to-t from-[#ea580c] via-[#facc15] to-[#fef08a] animate-diya shadow-[0_0_16px_#f59e0b] -mb-1 [animation-delay:0.35s]" />
            </div>
            {/* Diya Brass Cup & Pillar */}
            <div className="w-10 h-4 rounded-b-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#b45309] border border-[#78350f] shadow-md" />
            <div className="w-2.5 h-10 bg-gradient-to-b from-[#d97706] to-[#78350f] shadow-inner" />
            <div className="w-9 h-2.5 rounded-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#b45309] border border-[#78350f] shadow-md" />
            <span className="font-devanagari text-[10px] text-[#881c22] mt-1.5 font-bold tracking-wider">
              || शुभ विवाह ||
            </span>
          </div>
        </div>

        {/* Date, Muhurat & Royal Venue Plaque in Ornate Sandstone Badge */}
        <div className="bg-[#fdfaf3]/95 rounded-2xl px-5 sm:px-8 py-3 border-2 border-[#d2aa53] shadow-lg my-2 max-w-xl mx-auto space-y-1.5 backdrop-blur-xs">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm font-marcellus font-bold text-[#881c22]">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-[#a37128]" />
              <span>Wednesday, 16th December 2026</span>
            </span>
            <span className="hidden sm:inline text-[#d2aa53]">•</span>
            <span className="flex items-center space-x-1.5 text-[#5a3821]">
              <Clock className="w-4 h-4 text-[#a37128]" />
              <span>Shubh Muhurat: 11:30 AM Onwards</span>
            </span>
          </div>
          <p className="font-marcellus text-[#5a3821] text-xs sm:text-[13px] font-semibold flex items-center justify-center space-x-1.5 pt-0.5 border-t border-[#eedcb8]">
            <MapPin className="w-3.5 h-3.5 text-[#881c22] shrink-0" />
            <span>Ayodhya Grand Palace, Fatehabad Road, Agra</span>
          </p>
        </div>

        {/* Interactive Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3">
          {/* Open Invitation CTA (With Pulsing Gold Aura) */}
          <button
            onClick={onOpenInvitation}
            className="px-7 sm:px-9 py-3 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-marcellus text-xs sm:text-sm font-bold rounded-full shadow-2xl border-2 border-[#ffd885] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2 ring-4 ring-[#881c22]/20 group"
          >
            <span>Open Royal Invitation</span>
            <span className="text-base font-bold text-[#ffd885] group-hover:translate-x-1 transition-transform">›</span>
          </button>

          {/* Shower Flowers Pushpa Vrishti Button */}
          <button
            onClick={handleFlowerShower}
            className="px-5 sm:px-6 py-3 bg-[#faf2df] hover:bg-[#f5e5c4] text-[#821c21] font-marcellus text-xs sm:text-sm font-bold rounded-full shadow-md border-2 border-[#d2aa53] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2 group"
            title="Shower Sacred Flowers & Petals"
          >
            <Flower2 className="w-4 h-4 text-[#e11d48] group-hover:rotate-45 transition-transform" />
            <span>पुष्प वर्षा (Flower Shower)</span>
          </button>

          {/* Save to Calendar Button */}
          <button
            onClick={handleSaveTheDate}
            className="px-4 sm:px-5 py-3 bg-[#faf2df] hover:bg-[#f5e5c4] text-[#821c21] font-marcellus text-xs sm:text-sm font-semibold rounded-full shadow-md border-2 border-[#d2aa53] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-1.5"
            title="Add Wedding to Google Calendar"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#a37128]" />
            <span>Save Date</span>
          </button>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div
          onClick={onOpenInvitation}
          className="mt-5 flex flex-col items-center text-[#881c22]/80 hover:text-[#881c22] cursor-pointer transition-colors group"
        >
          <span className="text-[10px] font-marcellus uppercase tracking-widest font-semibold group-hover:tracking-[0.2em] transition-all">
            Scroll to Explore Ceremonies &amp; Story
          </span>
          <ChevronDown className="w-4.5 h-4.5 animate-bounce mt-1 text-[#881c22]" />
        </div>
      </div>
    </section>
  );
};
