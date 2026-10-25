import React from 'react';
import { Leaf, LogOut, User, ShieldAlert } from 'lucide-react';

export default function Navbar({ session, onLogout }) {
  return (
    <header className="w-full bg-white/95 border-b border-leafDark/15 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-loginGreen flex items-center justify-center text-white">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-semibold text-loginGreen block leading-none">CropCare</span>
            <span className="text-[11px] text-gray-600 block mt-0.5">Local Crop Disease Detector</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-100 text-amber-900 border border-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" /> Demo Mode
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream border border-black/10 text-xs font-medium">
            <User className="w-3.5 h-3.5 text-leafDark" />
            <span>{session?.user?.name || 'Farmer'}</span>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-loginGreen hover:bg-loginGreenHover text-white text-xs font-medium">
            <LogOut className="w-3.5 h-3.5" /><span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}