import React from 'react';
import { CardHero } from './CardHero';
import { CardOurStory } from './CardOurStory';
import { CardEvents } from './CardEvents';
import { CardTheBigDay } from './CardTheBigDay';
import { CardCountdown } from './CardCountdown';
import { CardRSVP } from './CardRSVP';
import { CardSaveTheDate } from './CardSaveTheDate';
import { WeddingEvent } from '../types/wedding';
import { WEDDING_EVENTS } from '../data/weddingData';

interface CardShowcaseGridProps {
  onOpenInvitation: () => void;
  onNavigate: (section: string) => void;
  onOpenMenu: () => void;
  onSelectEvent: (event: WeddingEvent) => void;
  onOpenVenue: () => void;
  onOpenRSVP: () => void;
  onSaveToCalendar: () => void;
}

export const CardShowcaseGrid: React.FC<CardShowcaseGridProps> = ({
  onOpenInvitation,
  onNavigate,
  onOpenMenu,
  onSelectEvent,
  onOpenVenue,
  onOpenRSVP,
  onSaveToCalendar,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-8 select-none">
      {/* Top Banner introducing the multi-screen wedding invitation */}
      <div className="text-center max-w-2xl mx-auto pt-2 pb-4">
        <p className="font-devanagari text-[#881c22] font-semibold text-sm sm:text-base tracking-widest uppercase mb-1">
          || श्री गणेशाय नमः • जय श्री सीताराम ||
        </p>
        <h2 className="font-script text-[#851b22] text-4xl sm:text-5xl leading-tight">
          Anirudh &amp; Vaidehi
        </h2>
        <p className="font-marcellus text-[#4c2f1c] text-xs sm:text-sm tracking-wider mt-1 uppercase font-semibold">
          Digital Wedding Invitation Suite • 16th December 2026
        </p>
        <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-2" />
      </div>

      {/* ROW 1: 3 CARDS SIDE BY SIDE (Card 1: Home/Hero, Card 2: Our Story, Card 3: Wedding Events) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-[#821c21] font-marcellus text-xs uppercase tracking-widest font-semibold border-b border-[#e2cca3] pb-1">
          <span>Part 1 • Invitation, Story &amp; Functions</span>
          <span className="text-[11px] text-[#7a4c28]">Screens 1 – 3</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center pt-2">
          {/* Card 1: Home / Hero */}
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-marcellus text-[#881c22] uppercase tracking-wider mb-2 font-bold bg-[#faf3e3] px-3 py-0.5 rounded-full border border-[#d2aa53]/60 shadow-xs">
              Screen 1: Welcome &amp; Hero
            </span>
            <CardHero
              onOpenInvitation={onOpenInvitation}
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
            />
          </div>

          {/* Card 2: Our Story */}
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-marcellus text-[#881c22] uppercase tracking-wider mb-2 font-bold bg-[#faf3e3] px-3 py-0.5 rounded-full border border-[#d2aa53]/60 shadow-xs">
              Screen 2: Our Story
            </span>
            <CardOurStory
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onReadMore={onOpenInvitation}
            />
          </div>

          {/* Card 3: Wedding Events */}
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-marcellus text-[#881c22] uppercase tracking-wider mb-2 font-bold bg-[#faf3e3] px-3 py-0.5 rounded-full border border-[#d2aa53]/60 shadow-xs">
              Screen 3: Wedding Events
            </span>
            <CardEvents
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onSelectEvent={onSelectEvent}
            />
          </div>
        </div>
      </div>

      {/* ROW 2: 2 CARDS SIDE BY SIDE (Card 4: The Big Day, Card 5: Countdown) */}
      <div className="space-y-2 pt-4">
        <div className="flex items-center justify-between px-2 text-[#821c21] font-marcellus text-xs uppercase tracking-widest font-semibold border-b border-[#e2cca3] pb-1">
          <span>Part 2 • Muhurat &amp; Countdown</span>
          <span className="text-[11px] text-[#7a4c28]">Screens 4 – 5</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 justify-items-center max-w-4xl mx-auto pt-2">
          {/* Card 4: The Big Day */}
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-marcellus text-[#881c22] uppercase tracking-wider mb-2 font-bold bg-[#faf3e3] px-3 py-0.5 rounded-full border border-[#d2aa53]/60 shadow-xs">
              Screen 4: The Big Day
            </span>
            <CardTheBigDay
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onOpenVenue={onOpenVenue}
            />
          </div>

          {/* Card 5: Countdown */}
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-marcellus text-[#881c22] uppercase tracking-wider mb-2 font-bold bg-[#faf3e3] px-3 py-0.5 rounded-full border border-[#d2aa53]/60 shadow-xs">
              Screen 5: Countdown
            </span>
            <CardCountdown
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
            />
          </div>
        </div>
      </div>

      {/* ROW 3: 2 CARDS SIDE BY SIDE (Card 6: RSVP, Card 7: Save the Date) */}
      <div className="space-y-2 pt-4">
        <div className="flex items-center justify-between px-2 text-[#821c21] font-marcellus text-xs uppercase tracking-widest font-semibold border-b border-[#e2cca3] pb-1">
          <span>Part 3 • Confirmation &amp; Save the Date</span>
          <span className="text-[11px] text-[#7a4c28]">Screens 6 – 7</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 justify-items-center max-w-4xl mx-auto pt-2">
          {/* Card 6: RSVP */}
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-marcellus text-[#881c22] uppercase tracking-wider mb-2 font-bold bg-[#faf3e3] px-3 py-0.5 rounded-full border border-[#d2aa53]/60 shadow-xs">
              Screen 6: RSVP
            </span>
            <CardRSVP
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onConfirmPresence={onOpenRSVP}
            />
          </div>

          {/* Card 7: Save the Date */}
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-marcellus text-[#881c22] uppercase tracking-wider mb-2 font-bold bg-[#faf3e3] px-3 py-0.5 rounded-full border border-[#d2aa53]/60 shadow-xs">
              Screen 7: Save the Date
            </span>
            <CardSaveTheDate
              onNavigate={onNavigate}
              onOpenMenu={onOpenMenu}
              onSaveToCalendar={onSaveToCalendar}
            />
          </div>
        </div>
      </div>

      {/* ROW 4: ALL 15 WEDDING EVENTS IN 5-COLUMN GRID (AS IN USER'S DESIGN IMAGE) */}
      <div className="space-y-4 pt-6 border-t-2 border-[#d2aa53]/50">
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 text-[#821c21] font-marcellus pb-1 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm uppercase tracking-widest font-bold">
                Part 4 • Complete Suite of 15 Wedding Event Cards
              </span>
              <span className="px-2 py-0.5 bg-[#881c22] text-[#faf2e3] text-[10px] rounded-full font-bold">
                Design Suite
              </span>
            </div>
            <p className="text-xs text-[#6b4226] font-normal mt-0.5">
              Click any card below to open its dedicated individual event page with Muhurat, venue map &amp; calendar
            </p>
          </div>
          <span className="text-xs font-semibold text-[#881c22] bg-[#fbf5e7] px-3 py-1 rounded-full border border-[#d2aa53]">
            15 Sacred Ceremonies
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 justify-items-center">
          {WEDDING_EVENTS.map((event) => (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className="group relative w-full aspect-[9/16] bg-[#faf3e3] rounded-[18px] sm:rounded-[22px] overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-[#d2aa53] hover:border-[#881c22] hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Subtle background parchment */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
                style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
              />

              {/* Top Header line of the card */}
              <div className="relative z-10 px-2.5 pt-2 pb-0.5 flex items-center justify-between text-[#55341f]">
                <span className="text-[10px] opacity-80">⌂</span>
                <span className="font-marcellus text-[9px] sm:text-[10px] font-bold tracking-tight text-[#4d2f1c]">
                  Our Wedding Events
                </span>
                <span className="text-[10px] opacity-80">≡</span>
              </div>

              {/* Event Title & Tagline */}
              <div className="relative z-10 px-2 text-center">
                <h4 className="font-script text-[#851b22] text-[18px] sm:text-[21px] leading-tight font-bold group-hover:scale-105 transition-transform">
                  {event.orderNumber}. {event.name}
                </h4>
                <p className="font-marcellus text-[#5a3821] text-[9.5px] sm:text-[10.5px] leading-tight line-clamp-1 italic">
                  {event.tagline}
                </p>
              </div>

              {/* Event Artwork */}
              <div className="relative z-10 flex-1 px-1.5 pt-1 pb-1.5 flex items-end">
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#faf2de] border border-[#d2aa53]/60 relative">
                  <img
                    src={event.artImage || event.cardImage}
                    alt={event.name}
                    className="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-[#881c22]/0 group-hover:bg-[#881c22]/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-[#faf3e3]/95 text-[#881c22] font-marcellus text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-sm transition-opacity">
                      Open Page →
                    </span>
                  </div>
                </div>
              </div>

              {/* Date & Time pill at base */}
              <div className="relative z-10 px-2 py-1 bg-[#f5e9d0]/80 border-t border-[#d2aa53]/40 flex items-center justify-between text-[9px] text-[#633e24]">
                <span className="font-semibold">{event.date}</span>
                <span>{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
