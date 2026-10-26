import React from 'react';
import ScanNavbar from '../components/ScanNavbar.jsx';
import ScanFooter from '../components/ScanFooter.jsx';
import { Info, Target, Eye } from 'lucide-react';

export default function AboutPage({ session, onLogout }) {
  return (
    <div className="min-h-screen bg-[#FFFBE7] flex flex-col font-sans overflow-x-hidden">
      
      {/* Top Navigation Bar */}
      <ScanNavbar session={session} onLogout={onLogout} />

      {/* ================= SECTION 1: ABOUT CROPCARE (Light Green BG) ================= */}
      <section className="relative w-full bg-[#A3D99E] py-16 sm:py-24 px-6 sm:px-12 overflow-hidden border-b border-[#1E7E48]/20">
        
        {/* Botanical Monstera leaf top-left */}
        <div className="absolute top-4 left-0 w-36 sm:w-48 opacity-90 pointer-events-none z-0">
          <svg viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M110 8C80 12 42 35 24 72C48 64 78 72 92 86C62 78 28 84 10 115C38 110 72 118 88 134C54 128 24 140 12 170C42 162 74 168 92 184C65 182 38 198 30 222C58 214 85 224 108 252C132 224 158 214 186 222C178 198 152 182 125 184C142 168 174 162 204 170C192 140 162 128 128 134C144 118 178 110 206 115C188 84 154 78 124 86C138 72 168 64 192 72C174 35 136 12 110 8Z" fill="#1E7E48" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left: Organic Blob Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-[45%_55%_50%_50%/48%_44%_56%_52%] overflow-hidden shadow-2xl border-4 border-white/40">
              <img
                src="https://images.unsplash.com/photo-1592417817098-8f3d6eb26b63?auto=format&fit=crop&w=800&q=80"
                alt="Farmer carrying crate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Heading & Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#0D3006] text-white flex items-center justify-center font-bold text-xl">
                i
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3006]">About Cropcare</h2>
            </div>
            <p className="text-sm sm:text-base text-[#0D3006]/90 leading-relaxed font-medium">
              We believe healthier crops begin with better information. We use AI-powered crop disease detection to help farmers identify potential plant health issues, understand their crops, and make more informed farming decisions. Our goal is to make crop care simpler, smarter, and more accessible.
            </p>
          </div>

        </div>

        {/* Bottom-right leaves */}
        <div className="absolute bottom-0 right-0 w-64 sm:w-80 opacity-90 pointer-events-none z-0">
          <svg viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M190 310C140 230 95 140 60 15" stroke="#1E7E48" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* ================= SECTION 2: OUR MISSION (Cream BG) ================= */}
      <section className="relative w-full bg-[#FFFBE7] py-16 sm:py-24 px-6 sm:px-12 overflow-hidden border-b border-[#1E7E48]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left: Heading & Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-8 h-8 text-[#0D3006]" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3006]">Our Mission</h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0D3006] mb-4">
              Empowering Farmers with AI-Driven Insights
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              Our mission is to make crop health monitoring simple and accessible to every farmer. By turning leaf images into useful insights, Cropcare aims to help farmers recognize potential diseases earlier, explore suitable care guidance, and take informed steps toward protecting their crops.
            </p>
          </div>

          {/* Right: Organic Blob Image (Tree / Sun) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-[52%_48%_55%_45%/50%_52%_48%_50%] overflow-hidden shadow-2xl border-4 border-[#A3D99E]/50">
              <img
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80"
                alt="Sun through tree canopy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 3: OUR VISION (Light Green BG) ================= */}
      <section className="relative w-full bg-[#A3D99E] py-16 sm:py-24 px-6 sm:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left: Organic Blob Image (Soil in hands) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-[48%_52%_45%_55%/53%_47%_53%_47%] overflow-hidden shadow-2xl border-4 border-white/40">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                alt="Hands holding soil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Heading & Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-8 h-8 text-[#0D3006]" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3006]">Our Vision</h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0D3006] mb-4">
              A Future Where Every Crop Thrives
            </h3>
            <p className="text-sm sm:text-base text-[#0D3006]/90 leading-relaxed font-medium">
              We envision a future where technology and agriculture work together to build healthier farms and more sustainable food systems. We want to put practical crop health insights within reach of farmers, helping them approach everyday farming challenges with greater confidence.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <ScanFooter />
    </div>
  );
}