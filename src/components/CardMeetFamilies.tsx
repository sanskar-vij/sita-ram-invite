import React from 'react';
import { FloralFlourish, CornerFloralVine } from './Ornaments';
import { COUPLE_NAMES } from '../data/weddingData';
import { Crown, Sparkles, Heart } from 'lucide-react';
import { triggerPetalBurst, playTempleBellChime } from '../utils/interactiveEffects';

interface CardMeetFamiliesProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
}

export const CardMeetFamilies: React.FC<CardMeetFamiliesProps> = () => {
  const handlePortraitTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerPetalBurst(x, y, 25);
    playTempleBellChime();
  };

  return (
    <section
      id="card-5"
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#faf3e3] border-b-2 border-[#d2aa53] overflow-hidden select-none py-6 sm:py-8"
    >
      {/* Background Parchment Texture */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
      />

      {/* Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-110 sm:scale-130 top-0 left-0 z-10 opacity-70" />
      <CornerFloralVine position="top-right" className="scale-90 sm:scale-110 top-0 right-0 z-10 opacity-60" />
      <CornerFloralVine position="bottom-right" className="scale-100 sm:scale-120 bottom-0 right-0 z-10 opacity-70" />
      <CornerFloralVine position="bottom-left" className="scale-90 sm:scale-110 bottom-0 left-0 z-10 opacity-60" />

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-4 text-center flex flex-col items-center justify-center my-auto">
        {/* Sacred Sanskrit Invocation */}
        <p className="font-devanagari text-[#881c22] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-1">
          || कुल परंपरा एवं शुभाशीर्वाद ||
        </p>

        {/* Title */}
        <h2 className="font-script text-[#851b22] text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wide drop-shadow-xs mb-1 font-bold">
          Meet Our Families
        </h2>

        {/* Flourish */}
        <FloralFlourish className="w-44 sm:w-56 h-4 my-2" color="#a37128" />

        {/* Two Grand Royal Family Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 w-full max-w-2xl my-4 text-center">
          {/* Groom's Family: The Sharma Family (वर पक्ष) */}
          <div className="relative p-5 sm:p-6 rounded-[28px] bg-[#fdfbf7]/95 border-2 border-[#d2aa53] shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:border-[#881c22] group">
            {/* Top Arched Accent Tag */}
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#faf2df] border border-[#d2aa53] mb-3">
              <Crown className="w-3.5 h-3.5 text-[#881c22]" />
              <span className="font-devanagari text-xs text-[#881c22] font-bold tracking-wider">
                वर पक्ष
              </span>
            </div>

            {/* Groom's Family Miniature Portrait Artwork */}
            <div
              onClick={handlePortraitTap}
              className="relative w-36 sm:w-40 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#d2aa53] shadow-md my-1 bg-[#faf2de] cursor-pointer group/img transition-transform duration-300 hover:scale-105 active:scale-95"
              title="Tap for family blessings"
            >
              <img
                src="/images/family-sharma.jpg"
                alt="The Sharma Family Elders - वर पक्ष"
                className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/img:opacity-100 transition-opacity">
                <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-sheen" />
              </div>
            </div>

            {/* Family Name */}
            <h3 className="font-marcellus font-bold text-[#821c21] text-2xl sm:text-3xl mt-3 mb-1 tracking-wide">
              {COUPLE_NAMES.groomFamily}
            </h3>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-[#d2aa53]/60 rounded-full my-1.5" />

            {/* Parents' Names */}
            <p className="font-body text-[#3a2213] text-base sm:text-lg leading-relaxed font-semibold">
              {COUPLE_NAMES.groomFather}
              <br />
              &amp; {COUPLE_NAMES.groomMother}
            </p>

            <span className="font-devanagari text-[11px] text-[#881c22]/80 mt-2 font-medium">
              || सस्नेह निमन्त्रण ||
            </span>
          </div>

          {/* Bride's Family: The Mishra Family (वधू पक्ष) */}
          <div className="relative p-5 sm:p-6 rounded-[28px] bg-[#fdfbf7]/95 border-2 border-[#d2aa53] shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:border-[#881c22] group">
            {/* Top Arched Accent Tag */}
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#faf2df] border border-[#d2aa53] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#881c22]" />
              <span className="font-devanagari text-xs text-[#881c22] font-bold tracking-wider">
                वधू पक्ष
              </span>
            </div>

            {/* Bride's Family Miniature Portrait Artwork */}
            <div
              onClick={handlePortraitTap}
              className="relative w-36 sm:w-40 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#d2aa53] shadow-md my-1 bg-[#faf2de] cursor-pointer group/img transition-transform duration-300 hover:scale-105 active:scale-95"
              title="Tap for family blessings"
            >
              <img
                src="/images/family-mishra.jpg"
                alt="The Mishra Family Elders - वधू पक्ष"
                className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/img:opacity-100 transition-opacity">
                <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-sheen" />
              </div>
            </div>

            {/* Family Name */}
            <h3 className="font-marcellus font-bold text-[#821c21] text-2xl sm:text-3xl mt-3 mb-1 tracking-wide">
              {COUPLE_NAMES.brideFamily}
            </h3>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-[#d2aa53]/60 rounded-full my-1.5" />

            {/* Parents' Names */}
            <p className="font-body text-[#3a2213] text-base sm:text-lg leading-relaxed font-semibold">
              {COUPLE_NAMES.brideFather}
              <br />
              &amp; {COUPLE_NAMES.brideMother}
            </p>

            <span className="font-devanagari text-[11px] text-[#881c22]/80 mt-2 font-medium">
              || सहर्ष स्वागतम् ||
            </span>
          </div>
        </div>

        {/* Grand Royal Palace Courtyard & Festive Gardens Painting in Arched Frame */}
        <div className="relative w-full max-w-md sm:max-w-xl aspect-[16/10] rounded-[26px] overflow-hidden border-2 sm:border-3 border-[#d2aa53] shadow-2xl bg-[#faf2de] transition-transform duration-500 hover:scale-[1.01] my-3 group/palace cursor-pointer">
          <img
            src="/images/ayodhya-palace-courtyard.jpg"
            alt="Ayodhya Grand Palace Courtyard & Royal Celebration"
            className="w-full h-full object-cover object-center group-hover/palace:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/palace:opacity-100 transition-opacity">
            <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-sheen" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf3e3]/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
