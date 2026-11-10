import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Heart, Sparkles, Calendar, Users, Utensils } from 'lucide-react';
import { WEDDING_EVENTS } from '../data/weddingData';
import { RSVPData } from '../types/wedding';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRSVPSubmitted?: (rsvp: RSVPData) => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  onClose,
  onRSVPSubmitted,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guestsCount: 2,
    eventsAttending: ['haldi', 'mehendi', 'sangeet', 'wedding'],
    dietaryPreference: 'Pure Vegetarian (Sattvic & Royal Cuisine)',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<RSVPData | null>(null);

  if (!isOpen) return null;

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => {
      const exists = prev.eventsAttending.includes(eventId);
      return {
        ...prev,
        eventsAttending: exists
          ? prev.eventsAttending.filter((id) => id !== eventId)
          : [...prev.eventsAttending, eventId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newRSVP: RSVPData = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
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

    setSubmittedData(newRSVP);
    setIsSubmitted(true);
    if (onRSVPSubmitted) {
      onRSVPSubmitted(newRSVP);
    }

    // Trigger joyous confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#821c21', '#d4af37', '#e26d85', '#ffd700', '#f59e0b'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#faf3e3] rounded-3xl border-2 border-[#d2aa53] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
        />

        {/* Modal Header */}
        <div className="relative z-10 px-6 pt-5 pb-3 border-b border-[#e2cca3] flex items-center justify-between text-center bg-[#fdfaf2]/80">
          <div>
            <p className="font-devanagari text-[#881c22] text-[12px] font-semibold tracking-wider">
              || जय श्री सीताराम ||
            </p>
            <h2 className="font-display italic text-[#821c21] text-2xl font-bold">
              {isSubmitted ? 'Attendance Confirmed' : 'Confirm Your Presence'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6c4328] hover:text-[#881c22] hover:bg-[#f1e3c8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 px-6 py-5 overflow-y-auto space-y-4">
          {isSubmitted && submittedData ? (
            /* Confirmation Pass Card */
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#821c21]/10 border-2 border-[#821c21] flex items-center justify-center text-[#821c21] animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="p-5 rounded-2xl bg-[#fdfbf6] border border-[#d2aa53] shadow-md text-left relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[#821c21]/20">
                  <Sparkles className="w-12 h-12" />
                </div>

                <p className="text-xs uppercase tracking-widest text-[#821c21] font-semibold mb-1">
                  Royal Guest Pass
                </p>
                <h3 className="font-marcellus text-[#3c2314] text-xl font-bold mb-2">
                  {submittedData.name}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#52331f] border-t border-[#eddcb8] pt-2.5">
                  <div>
                    <span className="font-semibold block text-[#821c21]">Number of Guests:</span>
                    <span>{submittedData.guestsCount} Person(s)</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-[#821c21]">Events Confirmed:</span>
                    <span>{submittedData.eventsAttending.length} Functions</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold block text-[#821c21]">Venue:</span>
                    <span>Ayodhya Grand Palace, Agra</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold block text-[#821c21]">Dates:</span>
                    <span>14th, 15th &amp; 16th December 2026</span>
                  </div>
                </div>

                {submittedData.message && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#faf4e6] border border-[#e8d2a8] text-xs italic text-[#5a3821]">
                    &ldquo;{submittedData.message}&rdquo;
                  </div>
                )}
              </div>

              <p className="font-body text-[#4a2e1b] text-sm leading-relaxed">
                Thank you for confirming your presence! Anirudh, Vaidehi, and both families are overjoyed to have you celebrate this sacred union in Agra.
              </p>

              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-medium rounded-full shadow-md transition-colors cursor-pointer text-sm"
              >
                Close &amp; Return to Invitation
              </button>
            </div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block font-marcellus text-[#3f2516] text-xs font-semibold uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#fdfbf6] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none focus:ring-2 focus:ring-[#821c21]/40"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-marcellus text-[#3f2516] text-xs font-semibold uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#fdfbf6] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none focus:ring-2 focus:ring-[#821c21]/40"
                  />
                </div>
                <div>
                  <label className="block font-marcellus text-[#3f2516] text-xs font-semibold uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="guest@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#fdfbf6] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none focus:ring-2 focus:ring-[#821c21]/40"
                  />
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block font-marcellus text-[#3f2516] text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Number of Guests Attending</span>
                  <span className="text-[#821c21] font-bold">{formData.guestsCount} Person(s)</span>
                </label>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#821c21] shrink-0" />
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={formData.guestsCount}
                    onChange={(e) =>
                      setFormData({ ...formData, guestsCount: parseInt(e.target.value) || 1 })
                    }
                    className="w-full accent-[#821c21] cursor-pointer"
                  />
                </div>
              </div>

              {/* Attending Events Checkboxes */}
              <div>
                <label className="block font-marcellus text-[#3f2516] text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#821c21]" />
                  <span>Select Functions You Will Attend</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
                  {WEDDING_EVENTS.map((event) => {
                    const isChecked = formData.eventsAttending.includes(event.id);
                    return (
                      <button
                        type="button"
                        key={event.id}
                        onClick={() => handleEventToggle(event.id)}
                        className={`p-2 rounded-xl text-left border transition-all text-xs flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-[#821c21]/10 border-[#821c21] text-[#821c21] font-semibold'
                            : 'bg-[#fdfbf6] border-[#d2aa53]/60 text-[#5c3c26]'
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{event.name}</p>
                          <p className="text-[10px] opacity-80">{event.date}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-[#821c21] border-[#821c21] text-white'
                              : 'border-[#b88c42]'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block font-marcellus text-[#3f2516] text-xs font-semibold uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#821c21]" />
                  <span>Meal Preference</span>
                </label>
                <select
                  value={formData.dietaryPreference}
                  onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#fdfbf6] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none focus:ring-2 focus:ring-[#821c21]/40"
                >
                  <option value="Pure Vegetarian (Sattvic & Royal Cuisine)">
                    Pure Vegetarian (Royal North &amp; South Specialties)
                  </option>
                  <option value="Jain (No Onion, No Garlic, No Root Veggies)">
                    Jain Special (No Onion, Garlic or Root Vegetables)
                  </option>
                  <option value="Traditional Rajasthani & Awadhi Thali">
                    Traditional Rajasthani &amp; Awadhi Feast
                  </option>
                  <option value="Kids Friendly Mild Meal">
                    Kids Friendly / Mild Spices
                  </option>
                </select>
              </div>

              {/* Message / Blessings */}
              <div>
                <label className="block font-marcellus text-[#3f2516] text-xs font-semibold uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#821c21]" />
                  <span>Blessings &amp; Wishes for Anirudh &amp; Vaidehi</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Send your heartfelt love, blessings and wishes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#fdfbf6] rounded-xl border border-[#d2aa53] text-[#3f2516] focus:outline-none focus:ring-2 focus:ring-[#821c21]/40"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#821c21] hover:bg-[#6c1419] active:scale-95 text-[#fbf6ec] font-semibold tracking-wide rounded-full shadow-lg transition-all duration-200 border border-[#b8860b]/40 cursor-pointer text-sm flex items-center justify-center space-x-2"
              >
                <span>Confirm Your Presence</span>
                <Sparkles className="w-4 h-4 text-[#ffd885]" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
