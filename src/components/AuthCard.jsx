import React from 'react';
import { FlatMonsteraSVG, LightFernSVG, PaleBananaLeafSVG } from './BotanicalBackground.jsx';

export default function AuthCard({ title, minHeightClass = 'min-h-[440px]', children }) {
  return (
    <div className={`relative bg-white w-full max-w-[548px] ${minHeightClass} rounded-[10px] shadow-authCard overflow-hidden flex flex-col items-center px-6 py-7 sm:py-8`}>
      <FlatMonsteraSVG className="pointer-events-none select-none absolute -top-10 -left-5 w-[148px] sm:w-[168px] rotate-[10deg] z-0 opacity-95" />
      <LightFernSVG className="pointer-events-none select-none absolute -bottom-10 -left-8 w-[150px] sm:w-[175px] -rotate-[8deg] z-0 opacity-95" />
      <PaleBananaLeafSVG className="pointer-events-none select-none absolute -bottom-6 -right-4 w-[105px] sm:w-[125px] z-0 opacity-95" />
      <div className="relative z-10 text-center w-full mt-1 mb-4">
        <h1 className="text-[32px] sm:text-[36px] leading-tight font-medium text-black">{title}</h1>
        <div className="w-[210px] sm:w-[232px] h-[1px] bg-black/75 mx-auto mt-2" />
      </div>
      <div className="relative z-10 w-full max-w-[205px] flex flex-col">{children}</div>
    </div>
  );
}