import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Luxury Lotus & Zen Ring Emblem */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2D6A4F]/20 via-[#52B788]/30 to-[#D4A373]/30 blur-sm transform scale-110" />
        
        {/* Outer Circular Ring */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#081C15] p-2 shadow-md flex items-center justify-center border border-[#52B788]/30">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current" xmlns="http://www.w3.org/2000/svg">
            {/* Center Sacred Lotus Petals */}
            <path
              d="M50 18 C48 32, 38 46, 50 68 C62 46, 52 32, 50 18 Z"
              fill="#E9C46A"
              opacity="0.95"
            />
            {/* Left Lotus Petal */}
            <path
              d="M50 35 C36 40, 24 52, 28 66 C38 72, 48 64, 50 56 Z"
              fill="#D8F3DC"
              opacity="0.9"
            />
            {/* Right Lotus Petal */}
            <path
              d="M50 35 C64 40, 76 52, 72 66 C62 72, 52 64, 50 56 Z"
              fill="#D8F3DC"
              opacity="0.9"
            />
            {/* Far Left Petal */}
            <path
              d="M44 48 C28 52, 16 62, 18 72 C28 76, 40 70, 44 64 Z"
              fill="#74C69D"
              opacity="0.75"
            />
            {/* Far Right Petal */}
            <path
              d="M56 48 C72 52, 84 62, 82 72 C72 76, 60 70, 56 64 Z"
              fill="#74C69D"
              opacity="0.75"
            />
            {/* Base Zen Water Ripple */}
            <ellipse cx="50" cy="78" rx="28" ry="4" fill="#B7E4C7" opacity="0.6" />
            <ellipse cx="50" cy="83" rx="18" ry="2.5" fill="#E9C46A" opacity="0.8" />
            {/* Top Golden Light Bead */}
            <circle cx="50" cy="14" r="3" fill="#FFE6A7" />
          </svg>
        </div>
      </div>

      {/* Brand Name & Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-serif font-bold tracking-tight text-[#1B4332] ${textSizes[size]}`}>
            SPA
          </span>
          <span className={`font-serif font-semibold tracking-wider text-[#2D6A4F] ${textSizes[size]} bg-gradient-to-r from-[#2D6A4F] to-[#52B788] bg-clip-text text-transparent`}>
            HUB
          </span>
          <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded bg-[#2D6A4F]/10 text-[#2D6A4F] border border-[#2D6A4F]/20 ml-1">
            Academy
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] font-medium tracking-wide text-[#556B2F]/80 uppercase mt-0.5">
            Professional Training & Wellness Course
          </span>
        )}
      </div>
    </div>
  );
};
