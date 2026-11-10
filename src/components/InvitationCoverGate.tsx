import React from 'react';
import { CornerFloralVine, FloralFlourish } from './Ornaments';
import { Crown, Sparkles, Music, Disc3, Heart } from 'lucide-react';
import { COUPLE_NAMES } from '../data/weddingData';
import { triggerPushpaVrishti, playTempleBellChime } from '../utils/interactiveEffects';

interface InvitationCoverGateProps {
  onEnter: () => void;
  isUnveiling?: boolean;
}

export const InvitationCoverGate: React.FC<InvitationCoverGateProps> = ({ onEnter, isUnveiling = false }) => {
  const [localOpening, setLocalOpening] = React.useState(false);

  const handleTapToEnter = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (localOpening || isUnveiling) return;
    setLocalOpening(true);
    playTempleBellChime();
    triggerPushpaVrishti();
    onEnter();
  };

  const isTransitioning = localOpening || isUnveiling;

  return (
    <div
      onClick={handleTapToEnter}
      className={`fixed inset-0 z-50 w-full h-full min-h-screen bg-[#faf3e3] flex flex-col justify-between items-center select-none cursor-pointer overflow-hidden p-4 sm:p-8 transition-all duration-700 ease-out ${
        isTransitioning
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. SCENIC ROYAL PALACE TWILIGHT BACKDROP */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply pointer-events-none scale-105 transition-transform duration-10000"
        style={{ backgroundImage: `url('/images/save-the-date-palace.webp')` }}
      />

      {/* 2. WARM GOLDEN VIGNETTE & PARCHMENT PATINA */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf3e3]/95 via-[#faf3e3]/75 to-[#faf3e3]/95 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
      />

      {/* 3. ROYAL ARCHWAY CONTOUR */}
      <div className="absolute inset-3 sm:inset-5 rounded-t-[60px] sm:rounded-t-[80px] rounded-b-[36px] border-2 sm:border-3 border-[#d2aa53] pointer-events-none z-10 shadow-[inset_0_0_50px_rgba(210,170,83,0.2)]" />
      <div className="absolute inset-4.5 sm:inset-6.5 rounded-t-[52px] sm:rounded-t-[72px] rounded-b-[28px] border border-[#d2aa53]/40 pointer-events-none z-10" />

      {/* Antique Gold Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-125 sm:scale-160 top-0 left-0 z-10 opacity-85" />
      <CornerFloralVine position="top-right" className="scale-100 sm:scale-130 top-0 right-0 z-10 opacity-75" />
      <CornerFloralVine position="bottom-right" className="scale-110 sm:scale-130 bottom-0 right-0 z-10 opacity-75" />
      <CornerFloralVine position="bottom-left" className="scale-100 sm:scale-130 bottom-0 left-0 z-10 opacity-75" />

      {/* ============================================================== */}
      {/* TOP INVOCATION & ROYAL MONOGRAM                                */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-3xl mx-auto pt-4 sm:pt-6 text-center flex flex-col items-center">
        {/* Auspicious Shlokas */}
        <p className="font-devanagari text-[#881c22] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase drop-shadow-2xs">
          || ॐ श्री गणेशाय नमः ||
        </p>
        <p className="font-devanagari text-[#881c22] font-bold text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase drop-shadow-xs animate-pulse [animation-duration:4s] mt-0.5">
          || जय श्री सीताराम ||
        </p>

        {/* Monogram Seal */}
        <div className="my-2 flex items-center justify-center space-x-3">
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-[#d2aa53]" />
          <div className="flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#fdfaf3]/95 border border-[#d2aa53] shadow-xs">
            <Crown className="w-3.5 h-3.5 text-[#881c22]" />
            <span className="font-marcellus text-xs font-bold text-[#881c22] tracking-widest">
              A &amp; V
            </span>
            <Crown className="w-3.5 h-3.5 text-[#881c22]" />
          </div>
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-[#d2aa53]" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* CENTER STAGE: CALLIGRAPHY & ROYAL WAX SEAL                     */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-4xl mx-auto my-auto text-center flex flex-col items-center px-4">
        {/* Lead In Text */}
        <p className="font-marcellus text-[#5c3a21] text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase font-semibold">
          With the divine grace of Almighty God, we invite you to
        </p>

        <h2 className="font-marcellus text-[#4a2e1b] text-sm sm:text-base md:text-lg tracking-[0.28em] uppercase font-bold mt-1">
          The Wedding Celebration Of
        </h2>

        {/* Grand Couple Calligraphy */}
        <h1 className="font-script text-[#851b22] text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.08] my-1 font-bold tracking-wide drop-shadow-[0_4px_16px_rgba(210,170,83,0.45)]">
          Anirudh &amp; Vaidehi
        </h1>

        <FloralFlourish className="w-52 sm:w-64 h-4 my-2" color="#a37128" />

        {/* Grand Interactive Royal Wax Seal Centerpiece */}
        <div className="relative my-4 sm:my-6 group flex items-center justify-center">
          {/* Left Diya Stand with Flickering Flame */}
          <div className="hidden sm:flex flex-col items-center mr-6 select-none pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full bg-[#f59e0b]/30 blur-sm animate-pulse" />
              <div className="w-4.5 h-7 rounded-full bg-gradient-to-t from-[#ea580c] via-[#facc15] to-[#fef08a] animate-diya shadow-[0_0_16px_#f59e0b] -mb-1" />
            </div>
            <div className="w-9 h-3.5 rounded-b-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#b45309] border border-[#78350f] shadow-md" />
            <span className="font-devanagari text-[10px] text-[#881c22] mt-1 font-bold tracking-wider">
              || शुभ लाभ ||
            </span>
          </div>

          {/* Central 3D Embossed Royal Wax Seal (Pulsing Glow) */}
          <div className="relative flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
            {/* Outer Radiant Glow Rings */}
            <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#d2aa53]/20 blur-md animate-pulse" />
            <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-dashed border-[#d2aa53]/60 animate-spin [animation-duration:20s]" />

            {/* Main Wax Seal Disc */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#a7232a] via-[#821c21] to-[#591014] border-3 sm:border-4 border-[#ffd885] shadow-[0_12px_35px_rgba(130,28,33,0.55)] flex flex-col items-center justify-center text-center p-2 ring-4 ring-[#d2aa53]/40">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffd885] drop-shadow-sm mb-0.5 animate-bounce [animation-duration:2.5s]" />
              <span className="font-script text-[#ffd885] text-2xl sm:text-3xl leading-none font-bold drop-shadow-sm">
                A &amp; V
              </span>
              <span className="font-devanagari text-[10px] sm:text-[11px] text-[#fde4aa] font-semibold mt-1 tracking-wider">
                सादर आमंत्रण
              </span>
            </div>

            {/* Wax Seal Ribbon Tails */}
            <div className="flex space-x-1 -mt-2 z-0">
              <div className="w-4 h-7 bg-[#821c21] rotate-12 rounded-b-xs border-r border-b border-[#ffd885]/60 shadow-sm" />
              <div className="w-4 h-7 bg-[#821c21] -rotate-12 rounded-b-xs border-l border-b border-[#ffd885]/60 shadow-sm" />
            </div>
          </div>

          {/* Right Diya Stand with Flickering Flame */}
          <div className="hidden sm:flex flex-col items-center ml-6 select-none pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full bg-[#f59e0b]/30 blur-sm animate-pulse" />
              <div className="w-4.5 h-7 rounded-full bg-gradient-to-t from-[#ea580c] via-[#facc15] to-[#fef08a] animate-diya shadow-[0_0_16px_#f59e0b] -mb-1 [animation-delay:0.35s]" />
            </div>
            <div className="w-9 h-3.5 rounded-b-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#b45309] border border-[#78350f] shadow-md" />
            <span className="font-devanagari text-[10px] text-[#881c22] mt-1 font-bold tracking-wider">
              || शुभ विवाह ||
            </span>
          </div>
        </div>

        {/* Primary Glowing Action Button */}
        <div className="mt-3 flex flex-col items-center space-y-2">
          <button
            onClick={handleTapToEnter}
            className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#821c21] via-[#9e242a] to-[#821c21] text-[#faf2e3] font-marcellus text-sm sm:text-base font-bold shadow-[0_10px_30px_rgba(130,28,33,0.5)] border-2 border-[#ffd885] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2.5 ring-4 ring-[#d2aa53]/30 animate-pulse [animation-duration:3s]"
          >
            <Disc3 className="w-5 h-5 text-[#ffd885] animate-spin [animation-duration:3s]" />
            <span className="tracking-wide">Tap to Open Invitation &amp; Play Music</span>
            <Sparkles className="w-4 h-4 text-[#ffd885]" />
          </button>

          <p className="font-marcellus text-xs text-[#784626] font-medium tracking-wide">
            ♪ मंगल गीत (Wedding Melodies) will play automatically on entry
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM DATE & VENUE BADGE                                      */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-md mx-auto pb-4 sm:pb-6 text-center">
        <div className="bg-[#fdfaf3]/95 rounded-2xl px-5 py-2.5 border border-[#d2aa53] shadow-md backdrop-blur-xs">
          <p className="font-marcellus text-[#881c22] text-xs sm:text-sm font-bold tracking-wider">
            {COUPLE_NAMES.weddingDateDisplay} • {COUPLE_NAMES.venueName}
          </p>
          <p className="font-body text-[#5a3821] text-[11px] sm:text-xs font-semibold mt-0.5">
            {COUPLE_NAMES.venueCity}
          </p>
        </div>
      </div>
    </div>
  );
};