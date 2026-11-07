import React, { useState, useRef, useEffect } from 'react';
import { VolumeX, Disc3 } from 'lucide-react';

export interface AudioPlayerProps {
  isPlaying?: boolean;
  onToggleMusic?: (e?: React.MouseEvent) => void;
  visible?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying: externalPlaying,
  onToggleMusic,
  visible = true,
}) => {
  const [internalPlaying, setInternalPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isControlled = typeof externalPlaying === 'boolean';
  const isMusicPlaying = isControlled ? externalPlaying : internalPlaying;

  useEffect(() => {
    // Only manage internal audio if not controlled from parent
    if (isControlled) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;

    const handlePlay = () => setInternalPlaying(true);
    const handlePause = () => setInternalPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Auto-start music smoothly upon the first user interaction anywhere on the screen
    const handleFirstGesture = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => setInternalPlaying(true))
          .catch(() => {
            // Autoplay restricted until direct tap
          });
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };
  }, [isControlled]);

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (onToggleMusic) {
      onToggleMusic(e);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (internalPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .then(() => setInternalPlaying(true))
        .catch((err) => {
          console.warn('Playback prevented:', err);
        });
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Native HTML5 Audio Element (Only active when uncontrolled) */}
      {!isControlled && (
        <audio
          ref={audioRef}
          src="/audio/wedding-song.mp3"
          loop
          preload="auto"
        />
      )}

      {/* Floating Royal Audio Icon Button (ONLY LOGO, NO TEXT) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none">
        <button
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? 'Mute wedding music' : 'Play wedding music'}
          title={isMusicPlaying ? 'Mute wedding music' : 'Play wedding music'}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all duration-300 active:scale-90 cursor-pointer backdrop-blur-md ${
            isMusicPlaying
              ? 'bg-[#821c21] text-[#ffd885] border-[#ffd885] ring-4 ring-[#d2aa53]/40 shadow-[#821c21]/50'
              : 'bg-[#faf3e3]/95 text-[#821c21] border-[#d2aa53] hover:border-[#821c21] hover:scale-110 shadow-lg'
          }`}
        >
          {isMusicPlaying ? (
            <div className="relative flex items-center justify-center">
              {/* Spinning Disc / Vinyl */}
              <Disc3 className="w-6 h-6 sm:w-7 sm:h-7 animate-spin [animation-duration:3.5s] text-[#ffd885]" />
              {/* Center Soundwave Dot */}
              <span className="absolute w-2 h-2 rounded-full bg-[#821c21] border border-[#ffd885]" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform">
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-[#821c21]" />
            </div>
          )}
        </button>
      </div>
    </>
  );
};
