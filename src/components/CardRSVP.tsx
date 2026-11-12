import React, { useState } from 'react';
import { CornerFloralVine, FloralFlourish } from './Ornaments';
import {
  Sparkles,
  Users,
  Utensils,
  CheckCircle2,
  Phone,
  MessageSquare,
  Crown,
  Heart,
  Share2,
  CalendarCheck,
  Check,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react';
import { triggerPushpaVrishti, playTempleBellChime, triggerPetalBurst } from '../utils/interactiveEffects';
import { COUPLE_NAMES } from '../data/weddingData';
import { RSVPData } from '../types/wedding';

interface CardRSVPProps {
  onNavigate?: (section: string) => void;
  onOpenMenu?: () => void;
  onConfirmPresence?: () => void;
}

const CEREMONY_OPTIONS = [
  { id: 'roka', label: '12 Dec • Shubh Roka' },
  { id: 'tilak-sagai', label: '13 Dec • Tilak & Sagai' },
  { id: 'haldi-mehendi', label: '14 Dec • Haldi & Mehendi' },
  { id: 'sangeet-mayra', label: '15 Dec • Sangeet & Mayra' },
  { id: 'vivah-reception', label: '16 Dec • Vivah & Reception' },
];

export const CardRSVP: React.FC<CardRSVPProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guestsCount: 2,
    eventsAttending: ['roka', 'tilak-sagai', 'haldi-mehendi', 'sangeet-mayra', 'vivah-reception'],
    dietaryPreference: 'Royal Vegetarian Feast (Rajasthani & Awadhi Cuisine)',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<RSVPData | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const toggleEvent = (id: string) => {
    setFormData((prev) => {
      const exists = prev.eventsAttending.includes(id);
      return {
        ...prev,
        eventsAttending: exists
          ? prev.eventsAttending.filter((e) => e !== id)
          : [...prev.eventsAttending, id],
      };
    });
  };

  const selectAllEvents = () => {
    setFormData((prev) => ({
      ...prev,
      eventsAttending: CEREMONY_OPTIONS.map((c) => c.id),
    }));
  };

  const handleGuestChange = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      guestsCount: Math.max(1, Math.min(12, prev.guestsCount + delta)),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    playTempleBellChime();
    triggerPushpaVrishti();

    const rsvp: RSVPData = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: '',
      guestsCount: formData.guestsCount,
      eventsAttending: formData.eventsAttending,
      dietaryPreference: formData.dietaryPreference,
      message: formData.message,
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setSubmittedData(rsvp);
    setIsSubmitted(true);
  };

  const handleSharePass = () => {
    const text = `Royal Wedding RSVP Pass for ${formData.name} - Celebrating the wedding of ${COUPLE_NAMES.groom} & ${COUPLE_NAMES.bride} on 16th December 2026 at Ayodhya Grand Palace, Agra.`;
    if (navigator.share) {
      navigator.share({ title: 'Royal Wedding Guest Pass', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section
      id="card-6"
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#faf3e3] border-b-3 border-[#d2aa53] overflow-hidden select-none py-10 sm:py-14"
    >
      {/* Background Parchment Patina */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
      />

      {/* Antique Corner Floral Foliage */}
      <CornerFloralVine position="top-left" className="scale-110 sm:scale-130 top-0 left-0 z-10 opacity-70" />
      <CornerFloralVine position="top-right" className="scale-90 sm:scale-110 top-0 right-0 z-10 opacity-60" />
      <CornerFloralVine position="bottom-right" className="scale-100 sm:scale-120 bottom-0 right-0 z-10 opacity-70" />
      <CornerFloralVine position="bottom-left" className="scale-90 sm:scale-110 bottom-0 left-0 z-10 opacity-60" />

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Sacred Invocation */}
        <p className="font-devanagari text-[#881c22] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase drop-shadow-2xs mb-1">
          || अतिथि देवो भव • सस्नेह निमंत्रण ||
        </p>

        {/* Grand Title */}
        <h2 className="font-cinzel-dec font-bold text-[#851b22] text-4xl sm:text-5xl md:text-6xl tracking-wider drop-shadow-xs mb-1">
          RSVP &amp; Guest Pass
        </h2>

        {/* Flourish */}
        <FloralFlourish className="w-48 sm:w-60 h-4 my-2" color="#a37128" />

        {/* Subtitle */}
        <p className="font-body text-[#3e2415] text-base sm:text-lg leading-relaxed max-w-xl font-medium mb-6 text-balance px-4">
          Your auspicious presence and heartfelt blessings will sanctify our celebrations. Kindly confirm your family's arrival by 1st December 2026.
        </p>

        {/* ============================================================== */}
        {/* ROYAL RSVP INTERACTIVE SCROLL CONTAINER                         */}
        {/* ============================================================== */}
        <div className="w-full max-w-2xl bg-[#fdfbf7]/95 rounded-[32px] border-2 sm:border-3 border-[#d2aa53] shadow-[0_16px_45px_rgba(130,28,33,0.18)] p-6 sm:p-9 relative overflow-hidden backdrop-blur-xs">
          
          {/* Inner Filigree Accent Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-[26px] border border-[#d2aa53]/40 pointer-events-none" />

          {!isSubmitted ? (
            /* RSVP INPUT FORM */
            <form onSubmit={handleSubmit} className="relative z-10 space-y-5 text-left">
              {/* Top Banner Seal */}
              <div className="text-center pb-2 border-b border-[#ecdcb8]">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#faf2df] border border-[#d2aa53] text-[#881c22] text-xs font-marcellus font-bold tracking-wider">
                  <Crown className="w-3.5 h-3.5 text-[#881c22]" />
                  <span>विवाह आमंत्रण स्वीकृति पत्र</span>
                </div>
              </div>

              {/* Guest / Family Full Name */}
              <div>
                <label className="block font-marcellus text-xs sm:text-sm font-bold text-[#821c21] mb-1.5 tracking-wide">
                  Guest or Family Name / अतिथि या परिवार का नाम *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Shri Rajesh Sharma &amp; Family"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf4e6] border-2 border-[#d2aa53]/70 focus:border-[#821c21] focus:ring-2 focus:ring-[#821c21]/20 outline-none font-body text-[#3a2213] text-sm sm:text-base transition-all shadow-inner placeholder-[#9b7858]/60"
                  />
                  <Users className="w-4.5 h-4.5 text-[#a37128] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Mobile / WhatsApp Number */}
              <div>
                <label className="block font-marcellus text-xs sm:text-sm font-bold text-[#821c21] mb-1.5 tracking-wide">
                  WhatsApp or Contact Number / सम्पर्क सूत्र
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf4e6] border-2 border-[#d2aa53]/70 focus:border-[#821c21] focus:ring-2 focus:ring-[#821c21]/20 outline-none font-body text-[#3a2213] text-sm sm:text-base transition-all shadow-inner placeholder-[#9b7858]/60"
                  />
                  <Phone className="w-4 h-4 text-[#a37128] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Number of Attendees with Plus/Minus Selector */}
              <div>
                <label className="block font-marcellus text-xs sm:text-sm font-bold text-[#821c21] mb-1.5 tracking-wide">
                  Number of Attendees / सम्मिलित होने वाले सदस्यों की संख्या
                </label>
                <div className="flex items-center space-x-3 bg-[#faf4e6] p-2 rounded-2xl border-2 border-[#d2aa53]/70">
                  <button
                    type="button"
                    onClick={() => handleGuestChange(-1)}
                    className="w-10 h-10 rounded-xl bg-[#f5e7c8] hover:bg-[#edd4a6] text-[#821c21] flex items-center justify-center font-bold text-lg transition-transform active:scale-90 cursor-pointer shadow-xs"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center font-marcellus font-bold text-lg text-[#821c21]">
                    {formData.guestsCount} {formData.guestsCount === 1 ? 'Guest' : 'Guests (सदस्य)'}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGuestChange(1)}
                    className="w-10 h-10 rounded-xl bg-[#f5e7c8] hover:bg-[#edd4a6] text-[#821c21] flex items-center justify-center font-bold text-lg transition-transform active:scale-90 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Ceremonies Attending Interactive Chips */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-marcellus text-xs sm:text-sm font-bold text-[#821c21] tracking-wide">
                    Ceremonies You Will Grace / उत्सव उपस्थिति
                  </label>
                  <button
                    type="button"
                    onClick={selectAllEvents}
                    className="text-[11px] font-marcellus text-[#881c22] underline hover:text-[#5a1015] cursor-pointer"
                  >
                    Select All (सभी उत्सव)
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CEREMONY_OPTIONS.map((item) => {
                    const selected = formData.eventsAttending.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleEvent(item.id)}
                        className={`px-3 py-2.5 rounded-xl border-2 text-xs font-marcellus font-semibold text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                          selected
                            ? 'bg-[#821c21] text-[#faf2df] border-[#821c21] shadow-xs'
                            : 'bg-[#faf4e6] text-[#553018] border-[#d2aa53]/60 hover:border-[#821c21]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-[#ffd885] shrink-0 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Royal Bhojan Preference */}
              <div>
                <label className="block font-marcellus text-xs sm:text-sm font-bold text-[#821c21] mb-1.5 tracking-wide">
                  Cuisine &amp; Prasad Preference / भोजन व्यवस्था
                </label>
                <div className="relative">
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf4e6] border-2 border-[#d2aa53]/70 focus:border-[#821c21] focus:ring-2 focus:ring-[#821c21]/20 outline-none font-body text-[#3a2213] text-xs sm:text-sm font-medium transition-all shadow-inner"
                  >
                    <option value="Royal Vegetarian Feast (Rajasthani & Awadhi Cuisine)">
                      Royal Vegetarian Feast (Rajasthani &amp; Awadhi Cuisine)
                    </option>
                    <option value="Traditional Jain & Sattvic Cuisine (Without Onion/Garlic)">
                      Traditional Jain &amp; Sattvic Cuisine (बिना प्याज़-लहसुन)
                    </option>
                    <option value="Special Diabetic / Mild Cuisine">Special Diabetic / Mild Cuisine</option>
                  </select>
                  <Utensils className="w-4 h-4 text-[#a37128] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Heartfelt Blessing Note */}
              <div>
                <label className="block font-marcellus text-xs sm:text-sm font-bold text-[#821c21] mb-1.5 tracking-wide">
                  Blessings for the Couple / शुभाशीर्वाद एवं संदेश
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write a sweet blessing for Anirudh &amp; Vaidehi..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#faf4e6] border-2 border-[#d2aa53]/70 focus:border-[#821c21] focus:ring-2 focus:ring-[#821c21]/20 outline-none font-body text-[#3a2213] text-xs sm:text-sm transition-all shadow-inner resize-none placeholder-[#9b7858]/60"
                  />
                  <MessageSquare className="w-4 h-4 text-[#a37128] absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#821c21] via-[#9e242a] to-[#821c21] text-[#faf2e3] font-marcellus text-sm sm:text-base font-bold shadow-[0_10px_30px_rgba(130,28,33,0.45)] border-2 border-[#ffd885] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2.5 mx-auto ring-4 ring-[#d2aa53]/30"
                >
                  <Crown className="w-4.5 h-4.5 text-[#ffd885]" />
                  <span>Confirm RSVP &amp; Seal Royal Pass</span>
                  <Sparkles className="w-4 h-4 text-[#ffd885]" />
                </button>
              </div>
            </form>
          ) : (
            /* ============================================================== */
            /* ISSUED ROYAL GUEST PASS (Post-Submission)                       */
            /* ============================================================== */
            <div className="relative z-10 space-y-6 text-center py-2 animate-in fade-in zoom-in-95 duration-500">
              {/* Success Badge */}
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#821c21] to-[#601217] border-3 border-[#ffd885] shadow-lg flex items-center justify-center text-[#ffd885] animate-bounce [animation-duration:2s]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <p className="font-devanagari text-[#881c22] text-xs font-bold tracking-widest uppercase">
                  || आमंत्रण सहर्ष स्वीकृत ||
                </p>
                <h3 className="font-cinzel-dec font-bold text-[#821c21] text-2xl sm:text-3xl mt-0.5">
                  Royal Guest Pass Issued
                </h3>
                <p className="font-body text-[#52331f] text-sm mt-1">
                  We look forward with immense joy to welcoming your family at Ayodhya Grand Palace!
                </p>
              </div>

              {/* The Ornate Pass Ticket */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#fdfbf6] via-[#faf4e6] to-[#fdfbf6] border-2 border-[#d2aa53] shadow-md text-left relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#eedcb8] pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-marcellus font-bold uppercase tracking-widest text-[#881c22]">
                      Royal Wedding of
                    </span>
                    <h4 className="font-script text-[#821c21] text-2xl font-bold leading-tight">
                      Anirudh &amp; Vaidehi
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-marcellus text-[#784626] block">Ceremony Date</span>
                    <span className="font-marcellus font-bold text-xs text-[#821c21]">16th Dec 2026</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#452815]">
                  <div>
                    <span className="text-[#881c22] font-semibold block text-[11px]">Guest Honor:</span>
                    <span className="font-marcellus font-bold text-base text-[#3a2012]">
                      {submittedData?.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#eedcb8]">
                    <div>
                      <span className="text-[#881c22] font-semibold block">Total Attendees:</span>
                      <span className="font-medium">{submittedData?.guestsCount} Person(s)</span>
                    </div>
                    <div>
                      <span className="text-[#881c22] font-semibold block">Functions:</span>
                      <span className="font-medium">{submittedData?.eventsAttending.length} Celebrations</span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-[#eedcb8]">
                    <span className="text-[#881c22] font-semibold block">Venue:</span>
                    <span className="font-medium">{COUPLE_NAMES.venueFullAddress}</span>
                  </div>
                </div>

                {/* Decorative Bottom Stamp */}
                <div className="mt-4 pt-3 border-t border-dashed border-[#d2aa53] flex items-center justify-between text-[11px] text-[#784626]">
                  <span className="font-devanagari font-semibold">|| शुभ विवाह • अयोध्या ग्रैण्ड पैलेस ||</span>
                  <span className="font-mono text-[10px] text-[#881c22]">PASS-#{Date.now().toString().slice(-6)}</span>
                </div>
              </div>

              {/* Action Buttons: Share & Edit */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  onClick={handleSharePass}
                  className="px-6 py-2.5 rounded-full bg-[#821c21] hover:bg-[#6e151a] text-[#fbf6ec] text-xs font-marcellus font-semibold shadow-md border border-[#ffd885] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#ffd885]" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Pass on WhatsApp'}</span>
                </button>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-[#faf4e6] hover:bg-[#f3e6ca] text-[#821c21] text-xs font-marcellus font-semibold border border-[#d2aa53] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#821c21]" />
                  <span>Edit RSVP Details</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* ROYAL HOSPITALITY & CONCIERGE HELP DESK                       */}
        {/* ============================================================== */}
        <div className="mt-8 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
          {/* Sharma Family Coordinator */}
          <div className="p-4 rounded-2xl bg-[#fdfaf3]/95 border border-[#d2aa53] shadow-sm flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#faf2df] border border-[#d2aa53] flex items-center justify-center text-[#821c21] shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-devanagari text-[11px] text-[#881c22] font-bold block">
                वर पक्ष आतिथ्य (Groom Side)
              </span>
              <p className="font-marcellus font-bold text-xs text-[#3a2012]">
                Shri Rajesh Sharma
              </p>
              <a href="tel:+919876543210" className="text-[11px] text-[#784626] hover:underline">
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Mishra Family Coordinator */}
          <div className="p-4 rounded-2xl bg-[#fdfaf3]/95 border border-[#d2aa53] shadow-sm flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#faf2df] border border-[#d2aa53] flex items-center justify-center text-[#821c21] shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-devanagari text-[11px] text-[#881c22] font-bold block">
                वधू पक्ष आतिथ्य (Bride Side)
              </span>
              <p className="font-marcellus font-bold text-xs text-[#3a2012]">
                Shri Alok Mishra
              </p>
              <a href="tel:+919876543211" className="text-[11px] text-[#784626] hover:underline">
                +91 98765 43211
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Gold Inner Accent Border */}
      <div className="absolute inset-3 sm:inset-4 rounded-[28px] border border-[#d2aa53]/30 pointer-events-none z-10" />
    </section>
  );
};
