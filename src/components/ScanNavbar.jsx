import React from 'react';
import { Link } from 'react-router-dom';

export default function ScanNavbar() {
  return (
    <header className="w-full bg-[#FFFBE7] border-b border-[#1E7E48]/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        
        {/* Left: CROPDOC Brand */}
        <Link to="/home" className="text-2xl sm:text-3xl font-extrabold text-[#113008] tracking-tight">
          CROPDOC
        </Link>

        {/* Right Corner Group: Home, Scan, About, and Profile Button */}
        <div className="flex items-center gap-8 sm:gap-12">
          <nav className="hidden md:flex items-center gap-8 text-base font-semibold text-[#113008]">
            <Link to="/home" className="hover:text-[#1E7E48] transition">
              Home
            </Link>
            <Link to="/scan" className="hover:text-[#1E7E48] transition">
              Scan
            </Link>
            <Link to="/about" className="hover:text-[#1E7E48] transition">
              About
            </Link>
          </nav>

          <Link
            to="/profile"
            className="px-6 py-2.5 rounded-xl bg-[#2D6A30] hover:bg-[#235325] text-white text-sm font-bold shadow-md transition inline-flex items-center justify-center"
          >
            Profile
          </Link>
        </div>

      </div>
    </header>
  );
}