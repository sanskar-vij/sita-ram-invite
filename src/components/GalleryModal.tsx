import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/weddingData';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentPhoto = GALLERY_PHOTOS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#faf3e3] rounded-3xl border-2 border-[#d2aa53] shadow-2xl overflow-hidden flex flex-col">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.jpg')` }}
        />

        {/* Modal Header */}
        <div className="relative z-10 px-6 pt-5 pb-3 border-b border-[#e2cca3] flex items-center justify-between text-center bg-[#fdfaf2]/80">
          <div>
            <p className="font-devanagari text-[#881c22] text-[12px] font-semibold tracking-wider">
              || मधुर स्मृतियाँ ||
            </p>
            <h2 className="font-display italic text-[#821c21] text-2xl font-bold">
              Wedding Gallery
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6c4328] hover:text-[#881c22] hover:bg-[#f1e3c8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Photo Display */}
        <div className="relative z-10 p-5 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#d2aa53] shadow-lg bg-black/10">
            <img
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Prev & Next Floating Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/65 text-white transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/65 text-white transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Tag Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#821c21]/80 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase">
              {currentPhoto.tag}
            </div>
          </div>

          {/* Caption */}
          <div className="text-center mt-3.5 mb-2">
            <h3 className="font-marcellus text-[#3c2314] text-lg font-bold">
              {currentPhoto.title}
            </h3>
            <p className="font-body italic text-sm text-[#5a3821] mt-0.5">
              {currentPhoto.subtitle}
            </p>
          </div>

          {/* Thumbnails Row */}
          <div className="flex space-x-2 mt-2 overflow-x-auto max-w-full pb-1">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'border-[#821c21] scale-105 shadow-md'
                    : 'border-[#d2aa53]/50 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
