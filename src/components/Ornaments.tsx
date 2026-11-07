import React from 'react';

/**
 * Traditional Indian Royal Floral Flourish Divider
 * Matches the decorative flourish beneath titles in the design
 */
export const FloralFlourish: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-48 h-5 my-1.5',
  color = '#a37128',
}) => {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mx-auto opacity-90 ${className}`}
    >
      {/* Central Diamond & Lotus Motif */}
      <path
        d="M120 4L125 12L120 20L115 12Z"
        fill={color}
      />
      <circle cx="120" cy="12" r="2.5" fill="#fdfbf7" />
      <circle cx="112" cy="12" r="1.8" fill={color} />
      <circle cx="128" cy="12" r="1.8" fill={color} />

      {/* Left Filigree Vine */}
      <path
        d="M108 12C95 12 90 7 78 8C66 9 60 14 45 12C32 10 22 13 10 12"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M85 9.5C88 6.5 93 7 94 9.5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="88" cy="6" r="1.5" fill={color} />
      <circle cx="55" cy="14" r="1.5" fill={color} />
      <path
        d="M52 13C48 16 43 14 44 11.5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Right Filigree Vine */}
      <path
        d="M132 12C145 12 150 7 162 8C174 9 180 14 195 12C208 10 218 13 230 12"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M155 9.5C152 6.5 147 7 146 9.5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="152" cy="6" r="1.5" fill={color} />
      <circle cx="185" cy="14" r="1.5" fill={color} />
      <path
        d="M188 13C192 16 197 14 196 11.5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Royal Corner Floral Vine (for framing mobile cards)
 */
export const CornerFloralVine: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scale-x-[-1]';
      case 'bottom-left':
        return 'scale-y-[-1]';
      case 'bottom-right':
        return 'scale-x-[-1] scale-y-[-1]';
      default:
        return '';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-10 ${
        position.includes('top') ? 'top-0' : 'bottom-0'
      } ${position.includes('left') ? 'left-0' : 'right-0'} ${getTransform()} ${className}`}
    >
      <svg
        width="90"
        height="90"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        <path
          d="M0 0C25 5 45 15 55 35C62 49 58 68 75 80C82 86 92 88 100 90"
          stroke="#4a6b22"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M15 10C25 22 18 35 28 42"
          stroke="#557c2a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Pink blossoms */}
        <circle cx="28" cy="14" r="6" fill="#e26d85" opacity="0.9" />
        <circle cx="28" cy="14" r="3" fill="#ffd1dc" />
        <circle cx="50" cy="30" r="7.5" fill="#e26d85" opacity="0.95" />
        <circle cx="50" cy="30" r="3.5" fill="#ffd1dc" />
        <circle cx="48" cy="30" r="1.5" fill="#ffe066" />
        <circle cx="68" cy="62" r="6" fill="#de5d77" opacity="0.9" />
        <circle cx="68" cy="62" r="2.8" fill="#ffd1dc" />
        {/* Golden leaves */}
        <ellipse cx="38" cy="22" rx="4" ry="2" fill="#88a834" transform="rotate(-30 38 22)" />
        <ellipse cx="60" cy="48" rx="4" ry="2" fill="#88a834" transform="rotate(40 60 48)" />
      </svg>
    </div>
  );
};

/**
 * Royal Jharokha Arch Frame for Event Card
 */
export const JharokhaArchSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full absolute inset-0 pointer-events-none ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M8 132V38C8 38 18 32 30 20C42 8 54 4 60 4C66 4 78 8 90 20C102 32 112 38 112 38V132C112 135 109 137 106 137H14C11 137 8 135 8 132Z"
        stroke="#c99c4a"
        strokeWidth="1.5"
        fill="rgba(255, 252, 245, 0.75)"
      />
      <path
        d="M11 129V40C11 40 20 34 32 23C43 12 54 8 60 8C66 8 77 12 88 23C100 34 109 40 109 40V129"
        stroke="#e5caa0"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
    </svg>
  );
};
