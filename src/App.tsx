import { useState, useRef, useEffect } from 'react';
import { CardHero } from './components/CardHero';
import { CardOurStory } from './components/CardOurStory';
import { CardWeddingEvents } from './components/CardWeddingEvents';
import { CardCountdown } from './components/CardCountdown';
import { CardMeetFamilies } from './components/CardMeetFamilies';
import { CardRSVP } from './components/CardRSVP';
import { CardSaveTheDate } from './components/CardSaveTheDate';
import { CardBlessingsOutro } from './components/CardBlessingsOutro';
import { InvitationCoverGate } from './components/InvitationCoverGate';

import { RSVPModal } from './components/RSVPModal';
import { VenueModal } from './components/VenueModal';
import { CalendarModal } from './components/CalendarModal';
import { GalleryModal } from './components/GalleryModal';
import { BlessingsModal } from './components/BlessingsModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { IndividualEventPage } from './components/IndividualEventPage';
import { AudioPlayer } from './components/AudioPlayer';
import { PetalsAnimation } from './components/PetalsAnimation';

import { WeddingEvent } from './types/wedding';
import { Heart } from 'lucide-react';

export function App() {
  // Gate Entrance & Audio Synchronous State
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isUnveiling, setIsUnveiling] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Modals & Navigation State
  const [isRSVPOpen, setIsRSVPOpen] = useState<boolean>(false);
  const [isVenueOpen, setIsVenueOpen] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isBlessingsOpen, setIsBlessingsOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(null);

  // Floating Falling Petals Toggle
  const [petalsActive, setPetalsActive] = useState<boolean>(true);

  // Synchronize audio state with HTML5 audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsMusicPlaying(true);
    const handlePause = () => setIsMusicPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Entrance Handler: Triggered by user tap on Cover Gate
  const handleEnterInvitation = () => {
    // 1. Play audio synchronously inside the click gesture to satisfy browser autoplay policy
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => {
          console.warn('Playback prevented by browser policy:', err);
        });
    }

    // 2. Trigger unveiling transition
    setIsUnveiling(true);

    // 3. Complete transition after animation
    setTimeout(() => {
      setHasEntered(true);
    }, 700);
  };

  // Toggle Music Play/Pause from the floating FAB
  const handleToggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => {
          console.warn('Playback prevented:', err);
        });
    }
  };

  // Smooth Scroll to Card Handler
  const scrollToCard = (targetId: string) => {
    if (targetId === 'gallery') {
      setIsGalleryOpen(true);
      return;
    }
    if (targetId === 'rsvp') {
      setIsRSVPOpen(true);
      return;
    }
    if (targetId === 'venue' || targetId === 'venue-modal') {
      setIsVenueOpen(true);
      return;
    }
    if (targetId === 'calendar') {
      setIsCalendarOpen(true);
      return;
    }
    if (targetId === 'blessings') {
      setIsBlessingsOpen(true);
      return;
    }
    if (targetId === 'home') {
      const el = document.getElementById('card-1');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetId === 'story') {
      const el = document.getElementById('card-2');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (targetId === 'events') {
      const el = document.getElementById('card-3');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6eedf] text-[#4a2c1d] relative font-body selection:bg-[#821c21] selection:text-[#faf2e3] overflow-x-hidden">
      {/* Wedding Song Audio Tag */}
      <audio
        ref={audioRef}
        src="/audio/wedding-song.mp3"
        loop
        preload="auto"
      />

      {/* Background Parchment Patina Overlay */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-repeat bg-[length:400px_400px]"
        style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
      />

      {/* Floating Rose & Marigold Petals */}
      <PetalsAnimation active={petalsActive} />

      {/* Royal Cover Gate: Full screen Entrance where tap starts music and enters invite */}
      {!hasEntered && (
        <InvitationCoverGate
          onEnter={handleEnterInvitation}
          isUnveiling={isUnveiling}
        />
      )}

      {/* Floating Wedding Song Music Player Button (Only Logo Icon, Visible once entered) */}
      <AudioPlayer
        isPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        visible={hasEntered}
      />

      {/* ============================================================== */}
      {/* MAIN VERTICAL FEED: FULL SCREEN IMMERSIVE SECTIONS             */}
      {/* ============================================================== */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Card 1: Home / Hero */}
        <CardHero
          onOpenInvitation={() => scrollToCard('card-2')}
          onNavigate={(id) => scrollToCard(id)}
          onOpenMenu={() => setIsDrawerOpen(true)}
        />

        {/* Card 2: Our Story */}
        <CardOurStory
          onNavigate={(id) => scrollToCard(id)}
          onOpenMenu={() => setIsDrawerOpen(true)}
          onReadMore={() => scrollToCard('card-3')}
        />

        {/* Card 3: Our Wedding Events (ALL 15 CEREMONIES IN ONE EVENT CARD!) */}
        <CardWeddingEvents
          onNavigate={(id) => scrollToCard(id)}
          onOpenMenu={() => setIsDrawerOpen(true)}
        />

        {/* Card 4: Countdown */}
        <CardCountdown
          onNavigate={(id) => scrollToCard(id)}
          onOpenMenu={() => setIsDrawerOpen(true)}
        />

        {/* Card 5: Meet Our Families */}
        <CardMeetFamilies
          onNavigate={(id) => scrollToCard(id)}
          onOpenMenu={() => setIsDrawerOpen(true)}
        />

        {/* Card 6: RSVP Confirmation */}
        <CardRSVP
          onNavigate={(id) => scrollToCard(id)}
          onOpenMenu={() => setIsDrawerOpen(true)}
          onConfirmPresence={() => setIsRSVPOpen(true)}
        />

        {/* Card 7: Save the Date */}
        <CardSaveTheDate
          onNavigate={(id) => scrollToCard(id)}
          onOpenMenu={() => setIsDrawerOpen(true)}
          onSaveToCalendar={() => setIsCalendarOpen(true)}
        />

        {/* Card 8: Sacred Sita-Ram Blessings Outro */}
        <CardBlessingsOutro
          onNavigate={(id) => scrollToCard(id)}
          onOpenMenu={() => setIsDrawerOpen(true)}
          onOpenBlessings={() => setIsBlessingsOpen(true)}
        />
      </main>

      {/* Auspicious Royal Footer */}
      <footer className="relative z-10 bg-[#faf2e1] border-t-2 border-[#d2aa53] py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-devanagari text-[#881c22] font-semibold text-sm sm:text-base tracking-wider">
            || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ • निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ||
          </p>

          <h2 className="font-script text-[#851b22] text-5xl sm:text-6xl">
            Anirudh &amp; Vaidehi
          </h2>

          <p className="font-marcellus text-[#3c2314] text-sm uppercase tracking-widest font-semibold">
            16th December, 2026 • Ayodhya Grand Palace, Agra
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-[#821c21]">
            <button
              onClick={() => setIsRSVPOpen(true)}
              className="hover:underline cursor-pointer"
            >
              RSVP Presence
            </button>
            <span className="text-[#c89d53]">•</span>
            <button
              onClick={() => setIsVenueOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Venue &amp; Map
            </button>
            <span className="text-[#c89d53]">•</span>
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Add to Calendar
            </button>
            <span className="text-[#c89d53]">•</span>
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Photo Gallery
            </button>
            <span className="text-[#c89d53]">•</span>
            <button
              onClick={() => setIsBlessingsOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Blessings
            </button>
          </div>

          <p className="text-[11px] text-[#6c4328] pt-2">
            With boundless love, regards &amp; blessings from the Sharma and Mishra Families.
          </p>
        </div>
      </footer>

      {/* Interactive Individual Event Detail Modal (Card-style popup) */}
      <IndividualEventPage
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSelectEvent={(event) => setSelectedEvent(event)}
        onOpenRSVP={() => setIsRSVPOpen(true)}
        onOpenVenue={() => setIsVenueOpen(true)}
        onOpenMenu={() => setIsDrawerOpen(true)}
      />

      {/* Interactive RSVP Modal */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
      />

      {/* Venue Map & Location Modal */}
      <VenueModal
        isOpen={isVenueOpen}
        onClose={() => setIsVenueOpen(false)}
        onOpenRSVP={() => setIsRSVPOpen(true)}
      />

      {/* Photo Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Guestbook & Blessings Modal */}
      <BlessingsModal
        isOpen={isBlessingsOpen}
        onClose={() => setIsBlessingsOpen(false)}
      />

      {/* Save to Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={(section) => {
          setIsDrawerOpen(false);
          scrollToCard(section);
        }}
        onOpenRSVP={() => setIsRSVPOpen(true)}
        onOpenVenue={() => setIsVenueOpen(true)}
        onOpenGallery={() => setIsGalleryOpen(true)}
        onOpenBlessings={() => setIsBlessingsOpen(true)}
      />
    </div>
  );
}

export default App;
