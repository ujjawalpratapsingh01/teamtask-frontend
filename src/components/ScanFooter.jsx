import React from 'react';
import { Link } from 'react-router-dom';

export default function ScanFooter() {
  return (
    <footer className="w-full bg-[#0D3006] text-[#FFFBE7] py-8 sm:py-10 mt-auto border-t border-[#1E7E48]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm">
        
        {/* Column 1 */}
        <div className="flex items-center gap-6 sm:gap-10">
          <Link to="/contact" className="hover:text-[#A7DD91] transition flex items-center gap-1">
            <span>Contact Us</span> &gt;
          </Link>
          <Link to="/about" className="hover:text-[#A7DD91] transition flex items-center gap-1">
            <span>About Us</span> &gt;
          </Link>
        </div>

        {/* Column 2 */}
        <div className="flex items-center gap-6 sm:gap-10">
          <Link to="/terms" className="hover:text-[#A7DD91] transition flex items-center gap-1">
            <span>Terms & Policy</span> &gt;
          </Link>
          <Link to="/learn" className="hover:text-[#A7DD91] transition flex items-center gap-1">
            <span>Learn More</span> &gt;
          </Link>
        </div>

        {/* Column 3 */}
        <div>
          <Link to="/how-it-works" className="hover:text-[#A7DD91] transition flex items-center gap-1">
            <span>How it works?</span> &gt;
          </Link>
        </div>
      </div>
    </footer>
  );
}