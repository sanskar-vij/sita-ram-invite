import React, { useState } from 'react';
import { X, Calendar, Copy, Check, MessageCircle, Download } from 'lucide-react';
import { COUPLE_NAMES } from '../data/weddingData';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`The Wedding of Anirudh & Vaidehi`);
    const details = encodeURIComponent(
      `You are cordially invited to celebrate the sacred union of Anirudh & Vaidehi at Ayodhya Grand Palace, Agra.\n|| जय श्री सीताराम ||`
    );
    const location = encodeURIComponent(COUPLE_NAMES.venueFullAddress);
    // 16 Dec 2026, 11:30 AM to 5:00 PM IST (06:00 to 11:30 UTC)
    const dates = '20261216T060000Z/20261216T113000Z';

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(url, '_blank');
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//Anirudh and Vaidehi//EN
BEGIN:VEVENT
SUMMARY:The Wedding of Anirudh & Vaidehi
DESCRIPTION:Sacred union of Anirudh & Vaidehi at Ayodhya Grand Palace, Agra. || जय श्री सीताराम ||
LOCATION:${COUPLE_NAMES.venueFullAddress}
DTSTART:20261216T060000Z
DTEND:20261216T113000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Anirudh_Vaidehi_Wedding_16Dec2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌸 *The Wedding of Anirudh & Vaidehi* 🌸\n|| जय श्री सीताराम ||\n\nSave the Date: 16th December 2026\nVenue: Ayodhya Grand Palace, Agra\n\nKindly view our digital wedding invitation and RSVP: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#faf3e3] rounded-3xl border-2 border-[#d2aa53] shadow-2xl overflow-hidden flex flex-col">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        {/* Modal Header */}
        <div className="relative z-10 px-6 pt-5 pb-3 border-b border-[#e2cca3] flex items-center justify-between text-center bg-[#fdfaf2]/80">
          <div>
            <p className="font-devanagari text-[#881c22] text-[12px] font-semibold tracking-wider">
              || तिथि स्मरण ||
            </p>
            <h2 className="font-display italic text-[#821c21] text-2xl font-bold">
              Save the Date &amp; Share
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
          <div className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#d2aa53] text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#821c21] font-semibold">
              Sacred Vivah Muhurat
            </span>
            <div className="flex items-center justify-center space-x-3">
              <span className="font-display font-bold text-[#821c21] text-4xl">16</span>
              <div className="text-left font-marcellus text-[#3c2314] leading-tight font-bold">
                <span className="block text-sm">DECEMBER</span>
                <span className="block text-sm">2026</span>
              </div>
            </div>
            <p className="font-body text-xs text-[#52331f]">
              11:30 AM Onwards • Ayodhya Grand Palace, Agra
            </p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={handleGoogleCalendar}
              className="w-full py-2.5 px-4 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-semibold rounded-full shadow-md transition-colors text-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#ffd885]" />
              <span>Add to Google Calendar</span>
            </button>

            <button
              onClick={handleDownloadICS}
              className="w-full py-2.5 px-4 bg-[#fdfbf6] hover:bg-[#f5e8cf] text-[#821c21] font-semibold border border-[#d2aa53] rounded-full shadow-sm transition-colors text-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#821c21]" />
              <span>Download iCal Calendar (.ics for Apple/Outlook)</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1ebd59] text-white font-semibold rounded-full shadow-md transition-colors text-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share Invitation on WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 bg-[#fdfbf6] hover:bg-[#f5e8cf] text-[#3c2314] font-medium border border-[#d2aa53] rounded-full shadow-sm transition-colors text-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#821c21]" />
                  <span>Copy Invitation Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
