import React from 'react';
import { X, Heart, Calendar, Image, MapPin, Sparkles, Clock, Users, CalendarCheck, Home } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  onOpenRSVP: () => void;
  onOpenVenue: () => void;
  onOpenGallery: () => void;
  onOpenBlessings: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenRSVP,
  onOpenVenue,
  onOpenGallery,
  onOpenBlessings,
}) => {
  if (!isOpen) return null;

  const navItems = [
    {
      id: 'card-1',
      label: '1. Home & Welcome',
      icon: Home,
      action: () => {
        onNavigate('card-1');
        onClose();
      },
    },
    {
      id: 'card-2',
      label: '2. Our Story',
      icon: Heart,
      action: () => {
        onNavigate('card-2');
        onClose();
      },
    },
    {
      id: 'card-3',
      label: '3. Our 15 Wedding Events',
      icon: Calendar,
      action: () => {
        onNavigate('card-3');
        onClose();
      },
    },
    {
      id: 'card-4',
      label: '4. Wedding Countdown',
      icon: Clock,
      action: () => {
        onNavigate('card-4');
        onClose();
      },
    },
    {
      id: 'card-5',
      label: '5. Meet Our Families',
      icon: Users,
      action: () => {
        onNavigate('card-5');
        onClose();
      },
    },
    {
      id: 'card-6',
      label: '6. RSVP Confirmation',
      icon: Heart,
      action: () => {
        onNavigate('card-6');
        onClose();
      },
    },
    {
      id: 'card-7',
      label: '7. Save the Date',
      icon: CalendarCheck,
      action: () => {
        onNavigate('card-7');
        onClose();
      },
    },
    {
      id: 'card-8',
      label: '8. Sacred Sita–Ram Blessings',
      icon: Sparkles,
      action: () => {
        onNavigate('card-8');
        onClose();
      },
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xs h-full bg-[#faf3e3] border-l-2 border-[#d2aa53] shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#e2cca3]">
          <div>
            <p className="font-devanagari text-[#881c22] text-[11px] font-semibold">
              || जय श्री सीताराम ||
            </p>
            <h3 className="font-script text-[#851b22] text-2xl font-bold">
              Anirudh &amp; Vaidehi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6c4328] hover:text-[#881c22] hover:bg-[#f1e3c8] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links: Invitation Cards */}
        <div className="relative z-10 py-3 space-y-1.5 flex-1 overflow-y-auto pr-1">
          <p className="font-marcellus text-[10px] text-[#7a4c28] uppercase tracking-wider font-bold px-1 pb-1">
            Invitation Sections
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-[#fdfbf6] hover:bg-[#f3e5ca] border border-[#ecdcb8] text-[#3c2314] hover:text-[#881c22] transition-colors text-left text-xs font-semibold tracking-wide cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-[#881c22] shrink-0" />
                <span className="line-clamp-1">{item.label}</span>
              </button>
            );
          })}

          {/* Quick Actions */}
          <div className="pt-2 border-t border-[#e2cca3]/60 space-y-1.5">
            <button
              onClick={() => {
                onClose();
                onOpenVenue();
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-[#fdfbf6] hover:bg-[#f3e5ca] border border-[#ecdcb8] text-[#3c2314] text-left text-xs font-semibold cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#881c22]" />
              <span>Ayodhya Grand Palace Agra</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenGallery();
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-[#fdfbf6] hover:bg-[#f3e5ca] border border-[#ecdcb8] text-[#3c2314] text-left text-xs font-semibold cursor-pointer"
            >
              <Image className="w-3.5 h-3.5 text-[#881c22]" />
              <span>Photo Gallery</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBlessings();
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-[#fdfbf6] hover:bg-[#f3e5ca] border border-[#ecdcb8] text-[#3c2314] text-left text-xs font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#881c22]" />
              <span>Guestbook &amp; Blessings</span>
            </button>
          </div>
        </div>

        {/* Bottom RSVP CTA Button */}
        <div className="relative z-10 pt-3 border-t border-[#e2cca3] space-y-1.5">
          <button
            onClick={() => {
              onClose();
              onOpenRSVP();
            }}
            className="w-full py-2 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-marcellus font-semibold text-xs rounded-full shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>Confirm RSVP Presence</span>
          </button>
          <p className="text-[10px] text-center text-[#7c5332]">
            Ayodhya Grand Palace, Agra • 16 Dec 2026
          </p>
        </div>
      </div>
    </div>
  );
};
