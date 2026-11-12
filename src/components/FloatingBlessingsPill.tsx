import React, { useState } from 'react';
import { Flower2, Sparkles, Heart } from 'lucide-react';
import { triggerPushpaVrishti, playTempleBellChime } from '../utils/interactiveEffects';

interface FloatingBlessingsPillProps {
  visible?: boolean;
}

export const FloatingBlessingsPill: React.FC<FloatingBlessingsPillProps> = ({ visible = true }) => {
  const [blessingCount, setBlessingCount] = useState<number>(1428);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const BLESSING_MESSAGES = [
    '|| सीता-राम जी की कृपा आप पर सदा बनी रहे ||',
    '🌸 पुष्प वर्षा अर्पित! (Flowers Offered with Devotion)',
    '✨ आपका शुभाशीर्वाद नवदम्पति तक पहुँच गया!',
    '🪔 सुख, समृद्धि एवं अखंड सौभाग्य का वरदान!',
  ];

  if (!visible) return null;

  const handleOfferFlowers = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTempleBellChime();
    triggerPushpaVrishti();
    setBlessingCount((prev) => prev + 1);

    const randomMsg = BLESSING_MESSAGES[Math.floor(Math.random() * BLESSING_MESSAGES.length)];
    setToastMessage(randomMsg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 inset-x-4 max-w-sm mx-auto z-50 pointer-events-none animate-in fade-in slide-in-from-top duration-500">
          <div className="bg-[#821c21]/95 text-[#fdfaf3] px-4 py-2.5 rounded-full border-2 border-[#ffd885] shadow-[0_10px_30px_rgba(130,28,33,0.5)] flex items-center justify-center space-x-2 text-center backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#ffd885] animate-pulse shrink-0" />
            <span className="font-devanagari text-xs sm:text-sm font-semibold tracking-wide">
              {toastMessage}
            </span>
          </div>
        </div>
      )}

      {/* Floating Pushpanjali Button */}
      <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 select-none">
        <button
          onClick={handleOfferFlowers}
          className="group relative px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#faf2df] via-[#fffaf0] to-[#faf2df] text-[#821c21] font-marcellus text-xs sm:text-sm font-bold shadow-[0_8px_25px_rgba(210,170,83,0.35)] border-2 border-[#d2aa53] hover:border-[#821c21] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center space-x-2 backdrop-blur-md ring-2 ring-[#d2aa53]/30"
          title="Offer Sacred Flowers (पुष्पांजलि) to Anirudh & Vaidehi"
        >
          {/* Flower Icon with Rotation on Hover */}
          <div className="relative flex items-center justify-center">
            <Flower2 className="w-4.5 h-4.5 text-[#e11d48] group-hover:rotate-90 transition-transform duration-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
          </div>

          {/* Text & Counter */}
          <div className="flex flex-col text-left leading-tight">
            <span className="font-bold text-[11px] sm:text-xs tracking-wider flex items-center space-x-1">
              <span>पुष्पांजलि</span>
              <span className="text-[10px] text-[#b45309] hidden sm:inline">• Bless</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#784626] font-semibold">
              {blessingCount.toLocaleString()} offered
            </span>
          </div>

          <Sparkles className="w-3.5 h-3.5 text-[#d2aa53] group-hover:animate-spin [animation-duration:3s]" />
        </button>
      </div>
    </>
  );
};
