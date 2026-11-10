import React from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, Check } from 'lucide-react';
import { WeddingEvent } from '../types/wedding';

interface EventDetailModalProps {
  event: WeddingEvent | null;
  onClose: () => void;
  onOpenRSVP: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onOpenRSVP,
}) => {
  if (!event) return null;

  const handleAddToCalendar = () => {
    // Generate Google Calendar Link
    const title = encodeURIComponent(`${event.name} Ceremony | Anirudh & Vaidehi Wedding`);
    const details = encodeURIComponent(`${event.description}\nDress Code: ${event.dressCode}`);
    const location = encodeURIComponent(`${event.venue}, Ayodhya Grand Palace, Agra`);

    // Sample ISO dates for Dec 2026 events
    let startTime = '20261214T100000Z';
    let endTime = '20261214T130000Z';

    if (event.id === 'haldi') {
      startTime = '20261214T043000Z'; // 10:00 AM IST
      endTime = '20261214T073000Z';
    } else if (event.id === 'mehendi') {
      startTime = '20261214T103000Z'; // 04:00 PM IST
      endTime = '20261214T143000Z';
    } else if (event.id === 'sangeet') {
      startTime = '20261215T133000Z'; // 07:00 PM IST
      endTime = '20261215T183000Z';
    } else if (event.id === 'wedding') {
      startTime = '20261216T060000Z'; // 11:30 AM IST
      endTime = '20261216T120000Z';
    }

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startTime}/${endTime}`;
    window.open(gcalUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#faf3e3] rounded-3xl border-2 border-[#d2aa53] shadow-2xl overflow-hidden flex flex-col">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
        />

        {/* Modal Header */}
        <div className="relative z-10 px-6 pt-5 pb-3 border-b border-[#e2cca3] flex items-center justify-between text-center bg-[#fdfaf2]/80">
          <div>
            <p className="font-devanagari text-[#881c22] text-[12px] font-semibold tracking-wider">
              {event.hindiName || '|| मांगलिक उत्सव ||'}
            </p>
            <h2 className="font-display italic text-[#821c21] text-2xl font-bold">
              {event.name} Ceremony
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
          {/* Centered Icon & Banner */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#d2aa53] shadow-md bg-[#faf2df] p-1.5 mb-2">
              <img
                src={event.iconImage}
                alt={event.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="font-body text-xs text-[#52331f] leading-relaxed max-w-xs font-medium">
              {event.description}
            </p>
          </div>

          {/* Schedule Info Box */}
          <div className="p-3.5 rounded-2xl bg-[#fdfbf6] border border-[#d2aa53]/80 space-y-2 text-xs text-[#3f2516]">
            <div className="flex items-center space-x-2.5">
              <Calendar className="w-4 h-4 text-[#881c22] shrink-0" />
              <span className="font-semibold text-sm">{event.date}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Clock className="w-4 h-4 text-[#881c22] shrink-0" />
              <span className="font-semibold text-sm">{event.time}</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-[#881c22] shrink-0 mt-0.5" />
              <span className="font-medium">{event.venue}</span>
            </div>
            <div className="flex items-start space-x-2.5 border-t border-[#eddcb8] pt-2">
              <Sparkles className="w-4 h-4 text-[#881c22] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#881c22]">Dress Code &amp; Palette:</span>
                <span>{event.dressCode}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <button
              onClick={handleAddToCalendar}
              className="flex-1 py-2.5 px-3 bg-[#faf2e3] hover:bg-[#f3e5ca] text-[#821c21] font-semibold border border-[#821c21] rounded-full shadow-sm transition-colors text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenRSVP();
              }}
              className="flex-1 py-2.5 px-3 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-semibold rounded-full shadow-md transition-colors text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>RSVP Attending</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
