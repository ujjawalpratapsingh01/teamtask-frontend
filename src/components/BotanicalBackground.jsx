import React from 'react';

export function FlatMonsteraSVG({ className = '' }) {
  return (
    <img
      src="/monstera-leaf.svg"
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}

export function LightFernSVG({ className = '' }) {
  return (
    <img
      src="/fern-leaf.svg"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
    />
  );
}

export function PaleBananaLeafSVG({ className = '' }) {
  return (
    <img
      src="/pale-leaf.svg"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
    />
  );
}

export function RealisticMonsteraRightSVG({ className = '' }) {
  return (
    <svg viewBox="0 0 420 750" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="realLeafTop" cx="60%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3B7A28" />
          <stop offset="45%" stopColor="#1A4714" />
          <stop offset="100%" stopColor="#0B2408" />
        </radialGradient>
        <radialGradient id="realLeafBottom" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#2E6920" />
          <stop offset="50%" stopColor="#12360E" />
          <stop offset="100%" stopColor="#071A05" />
        </radialGradient>
        <linearGradient id="veinHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#76B843" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#26531B" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M365 120 C 390 310, 405 510, 418 745" stroke="#1E4615" strokeWidth="14" strokeLinecap="round" />
      <path d="M235 420 C 300 545, 360 650, 412 748" stroke="#16380F" strokeWidth="12" strokeLinecap="round" />
      <g transform="translate(95, -25)">
        <path d="M210 15 C 120 5, 35 60, 20 140 C 55 125, 98 130, 128 148 C 75 142, 22 162, 12 215 C 62 215, 110 210, 145 198 C 95 225, 58 265, 68 310 C 118 298, 165 260, 195 215 C 185 268, 192 315, 228 332 C 258 295, 265 240, 255 190 C 282 235, 315 275, 350 270 C 365 215, 345 145, 315 95 C 285 45, 250 20, 210 15 Z" fill="url(#realLeafTop)" />
        <path d="M250 135 L 95 245" stroke="url(#veinHighlight)" strokeWidth="4" strokeLinecap="round" />
        <path d="M250 135 L 65 135" stroke="url(#veinHighlight)" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(5, 240)">
        <path d="M215 65 C 145 15, 65 25, 18 85 C 62 88, 108 108, 138 135 C 78 118, 22 128, 5 182 C 58 186, 112 195, 148 212 C 92 208, 42 235, 38 288 C 88 288, 138 272, 178 242 C 145 285, 128 335, 152 375 C 192 355, 222 305, 235 252 C 245 308, 272 358, 315 365 C 345 322, 345 255, 318 205 C 352 225, 385 225, 405 185 C 395 120, 345 65, 285 52 C 260 48, 232 95, 215 65 Z" fill="url(#realLeafBottom)" />
        <path d="M225 185 L 75 140" stroke="url(#veinHighlight)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M225 185 L 68 235" stroke="url(#veinHighlight)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M225 185 L 165 320" stroke="url(#veinHighlight)" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function BotanicalBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-cream flex items-center justify-center overflow-hidden px-4 py-6">
      <FlatMonsteraSVG className="pointer-events-none select-none fixed -top-12 left-[4%] w-[155px] md:w-[175px] z-0 opacity-95 rotate-[12deg]" />
      <LightFernSVG className="pointer-events-none select-none fixed -bottom-12 -left-6 w-[180px] md:w-[220px] z-0 opacity-95 -rotate-[12deg]" />
      <FlatMonsteraSVG className="pointer-events-none select-none fixed -bottom-20 left-[34%] w-[150px] md:w-[170px] z-0 opacity-95 -rotate-[15deg] hidden sm:block" />
      <img
        src="/right-leaf.png"
        alt=""
        className="pointer-events-none select-none fixed top-0 right-0 h-screen w-auto object-contain z-20 hidden md:block"
      />
      <div className="relative z-10 w-full flex items-center justify-center">{children}</div>
    </div>
  );
}