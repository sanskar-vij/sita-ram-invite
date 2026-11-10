import React from 'react';
import { CardHeader } from './CardHeader';
import { FloralFlourish, CornerFloralVine } from './Ornaments';
import { Sparkles } from 'lucide-react';

interface CardEventsOverviewProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onSelectEventCard?: (targetCardId: string) => void;
  onOpenAllRituals?: () => void;
}

export const CardEventsOverview: React.FC<CardEventsOverviewProps> = ({
  onNavigate,
  onOpenMenu,
  onSelectEventCard,
  onOpenAllRituals,
}) => {
  const events = [
    {
      id: 'card-4',
      name: 'Haldi',
      date: '14th Dec, 2026',
      time: '10:00 AM',
      image: '/images/haldi-urli.webp',
      alt: 'Haldi Ceremony',
    },
    {
      id: 'card-5',
      name: 'Mehendi',
      date: '14th Dec, 2026',
      time: '04:00 PM',
      image: '/images/mehendi-cone.webp',
      alt: 'Mehendi Ceremony',
    },
    {
      id: 'card-6',
      name: 'Sangeet',
      date: '15th Dec, 2026',
      time: '07:00 PM',
      image: '/images/sangeet-dholak.webp',
      alt: 'Sangeet Ceremony',
    },
    {
      id: 'card-7',
      name: 'Wedding',
      date: '16th Dec, 2026',
      time: '11:30 AM',
      image: '/images/wedding-havan.webp',
      alt: 'Sacred Wedding Ceremony',
    },
  ];

  return (
    <div
      id="card-3"
      className="relative w-full max-w-[360px] sm:max-w-[380px] h-[600px] sm:h-[640px] bg-[#faf3e3] rounded-[24px] sm:rounded-[26px] overflow-hidden flex flex-col justify-between shadow-2xl select-none mx-auto border-2 border-[#d2aa53]"
    >
      {/* Background Parchment Patina */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
      />

      {/* Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-100 -top-2 -left-2 z-10" />
      <CornerFloralVine position="top-right" className="scale-75 -top-1 -right-1 opacity-60 z-10" />
      <CornerFloralVine position="bottom-right" className="scale-85 -bottom-2 -right-2 opacity-75 z-10" />
      <CornerFloralVine position="bottom-left" className="scale-75 -bottom-2 -left-2 opacity-50 z-10" />

      {/* Header Bar */}
      <CardHeader onNavigate={onNavigate} onOpenMenu={onOpenMenu} activeItem="Events" />

      {/* Title Area */}
      <div className="relative z-20 px-5 pt-0.5 text-center flex flex-col items-center">
        <h1 className="font-script text-[#851b22] text-[40px] sm:text-[44px] leading-tight tracking-wide drop-shadow-xs font-bold">
          Wedding Events
        </h1>
        <FloralFlourish className="w-36 h-3.5 my-0.5" color="#a37128" />
        <p className="font-marcellus text-[10.5px] sm:text-[11px] text-[#6b4226] font-medium tracking-wide">
          Click any ceremony to view its full card details
        </p>
      </div>

      {/* 2x2 Grid of Mughal Arch Event Cards */}
      <div className="relative z-20 px-4 py-1.5 grid grid-cols-2 gap-3 my-auto">
        {events.map((evt) => (
          <div
            key={evt.id}
            onClick={() => onSelectEventCard && onSelectEventCard(evt.id)}
            className="group relative flex flex-col items-center justify-between p-2.5 pt-3 pb-2 rounded-t-[32px] rounded-b-[14px] bg-[#fdfbf6]/95 border-1.5 border-[#cfa554] shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#881c22] hover:-translate-y-1 cursor-pointer"
          >
            {/* Inner Decorative Arch Contour */}
            <div className="absolute inset-1 rounded-t-[28px] rounded-b-[10px] border border-[#e8d2a8]/70 pointer-events-none" />

            {/* Illustration Icon */}
            <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-[#faf2e1] border border-[#d6af5d] p-0.5 shadow-inner flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
              <img
                src={evt.image}
                alt={evt.alt}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Event Name */}
            <h3 className="font-script font-bold text-[#821c21] text-[22px] sm:text-[24px] leading-tight mb-0.5 text-center group-hover:text-[#6a151a]">
              {evt.name}
            </h3>

            {/* Date & Time */}
            <div className="text-center pt-1 border-t border-[#eedcb8]/80 w-full">
              <p className="font-body font-semibold text-[#3b2313] text-[11px] sm:text-[11.5px] leading-tight">
                {evt.date}
              </p>
              <p className="font-body text-[#7a4c28] text-[10.5px] leading-tight">
                {evt.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Option: View All 15 Ceremonies */}
      <div className="relative z-20 px-5 pb-4 text-center">
        {onOpenAllRituals && (
          <button
            onClick={onOpenAllRituals}
            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#881c22]/10 hover:bg-[#881c22]/20 text-[#881c22] rounded-full text-[11px] font-marcellus font-semibold border border-[#881c22]/30 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#d2aa53]" />
            <span>Explore All 15 Traditional Ceremonies ›</span>
          </button>
        )}
      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-2.5 rounded-[18px] border border-[#d2aa53]/40 pointer-events-none z-10" />
    </div>
  );
};
