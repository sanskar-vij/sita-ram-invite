import React from 'react';
import { X, MapPin, Navigation, Car, Plane, Train, ExternalLink, Calendar } from 'lucide-react';
import { COUPLE_NAMES } from '../data/weddingData';

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRSVP?: () => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({
  isOpen,
  onClose,
  onOpenRSVP,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#faf3e3] rounded-3xl border-2 border-[#d2aa53] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        {/* Modal Header */}
        <div className="relative z-10 px-6 pt-5 pb-3 border-b border-[#e2cca3] flex items-center justify-between text-center bg-[#fdfaf2]/80">
          <div>
            <p className="font-devanagari text-[#881c22] text-[12px] font-semibold tracking-wider">
              || पवित्र विवाह स्थल ||
            </p>
            <h2 className="font-display italic text-[#821c21] text-2xl font-bold">
              Ayodhya Grand Palace, Agra
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
          {/* Venue Image */}
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-[#d2aa53] relative shadow-md">
            <img
              src="/images/mandap-big-day.jpg"
              alt="Ayodhya Grand Palace Agra Wedding Mandap"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3.5">
              <div className="text-white">
                <p className="text-xs uppercase tracking-widest text-[#ffd885] font-semibold">
                  Royal Wedding Destination
                </p>
                <h3 className="font-marcellus text-lg font-bold">
                  {COUPLE_NAMES.venueName}
                </h3>
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div className="p-3.5 rounded-xl bg-[#fdfbf6] border border-[#d2aa53]/80 flex items-start space-x-3 text-[#3e2415]">
            <MapPin className="w-5 h-5 text-[#881c22] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#881c22] uppercase tracking-wider">
                Full Address
              </p>
              <p className="text-sm font-medium leading-relaxed">
                {COUPLE_NAMES.venueFullAddress}
              </p>
            </div>
          </div>

          {/* Transportation & Transit Guide */}
          <div className="space-y-2">
            <h4 className="font-marcellus text-xs uppercase tracking-wider text-[#821c21] font-bold">
              Guest Travel &amp; Connectivity Guide
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-[#4b2d1a]">
              {/* Flight */}
              <div className="p-2.5 rounded-xl bg-[#fdfbf6] border border-[#eddcb8] flex flex-col items-center text-center">
                <Plane className="w-4 h-4 text-[#881c22] mb-1" />
                <span className="font-semibold text-[#881c22]">By Air</span>
                <span className="text-[11px] mt-0.5">
                  Agra Airport (AGR) – 22 km. Delhi IGI (DEL) – 210 km via Yamuna Expressway.
                </span>
              </div>

              {/* Train */}
              <div className="p-2.5 rounded-xl bg-[#fdfbf6] border border-[#eddcb8] flex flex-col items-center text-center">
                <Train className="w-4 h-4 text-[#881c22] mb-1" />
                <span className="font-semibold text-[#881c22]">By Train</span>
                <span className="text-[11px] mt-0.5">
                  Agra Cantt (AGC) – 12 km. Gatimaan &amp; Vande Bharat Express available.
                </span>
              </div>

              {/* Road */}
              <div className="p-2.5 rounded-xl bg-[#fdfbf6] border border-[#eddcb8] flex flex-col items-center text-center">
                <Car className="w-4 h-4 text-[#881c22] mb-1" />
                <span className="font-semibold text-[#881c22]">By Road</span>
                <span className="text-[11px] mt-0.5">
                  Seamless drive via Yamuna Expressway &amp; Taj Ring Road. Valet parking on site.
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <a
              href="https://maps.google.com/?q=Agra+Palace+Fatehabad+Road+Agra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-medium rounded-full shadow-md transition-colors text-xs flex items-center justify-center space-x-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>

            {onOpenRSVP && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRSVP();
                }}
                className="py-2.5 px-5 bg-[#faf2e3] hover:bg-[#f3e5ca] text-[#821c21] font-semibold border border-[#821c21] rounded-full shadow-sm transition-colors text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Confirm RSVP Presence</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
