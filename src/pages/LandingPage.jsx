import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="font-sans text-[#0a2a0a] overflow-x-hidden bg-[#fdfbf0]">
      
      {/* SECTION 1 — TOP NAVIGATION BAR */}
      <nav className="bg-[#fdfbf0] px-8 py-5 flex justify-between items-center w-full sticky top-0 z-50 shadow-sm">
        <div className="font-extrabold text-2xl tracking-wider text-[#0a2a0a]">
          CROPDOC
        </div>
        <div className="hidden md:flex items-center space-x-10 text-sm font-bold text-[#0a2a0a]">
          <Link to="/" className="hover:text-[#215024] cursor-pointer">Home</Link>
          <Link to="/scan" className="hover:text-[#215024] cursor-pointer">Scan</Link>
          <a href="#about" className="hover:text-[#215024] cursor-pointer">About</a>
          <Link to="/login" className="bg-[#123916] text-white px-6 py-2.5 rounded-md flex items-center gap-2 hover:bg-[#215024] transition-all">
            Get started <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </nav>

      {/* SECTION 2 — HERO SECTION */}
      <section className="bg-[#0b290a] text-[#fdfbf0] relative min-h-[85vh] flex items-center px-10 py-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row relative z-10">
          
          <div className="md:w-1/2 flex flex-col items-start gap-5 pt-4 relative z-20">
            <span className="text-sm font-bold tracking-widest text-[#fdfbf0] uppercase mt-4">
              Smarter Farming Starts Here
            </span>
            <h1 className="text-5xl md:text-[4rem] font-bold leading-[1.1] tracking-tight">
              Healthy Crops<br/>Better Harvests
            </h1>
            <hr className="w-[80%] border-t-[1px] border-[#215024] my-2" />
            <p className="text-sm leading-relaxed max-w-md text-[#d1d5db]">
              Your personal crop health assistant. Scan a leaf, detect potential diseases with AI, and get actionable guidance to help your crops thrive. Make informed decisions, prevent crop loss, and grow with confidence throughout the season.
            </p>
            <div className="flex gap-4 mt-4">
              <Link to="/scan" className="bg-[#1e562b] text-white px-6 py-3 rounded-md font-bold hover:bg-[#2a7a3c] transition-all flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Scan Plant
              </Link>
              <a href="#how-it-works" className="px-6 py-3 border border-white text-white rounded-md font-bold hover:bg-white hover:text-[#0b290a] transition-all text-sm flex items-center justify-center">
                How it works ?
              </a>
            </div>
            <hr className="w-[80%] border-t-[1px] border-[#215024] mt-6 mb-2" />
            <div className="flex gap-4 text-xs font-bold text-[#fdfbf0] tracking-wide">
              <span>✦ Simple scans</span>
              <span>✦ Smart insights</span>
              <span>✦ Better farming.</span>
            </div>
          </div>
          
          {/* Right Side Monstera Image from Video */}
          <div className="md:w-1/2 absolute top-[-64px] right-[-40px] h-[115%] hidden md:block pointer-events-none z-10">
            <img src="/right-leaf.png" alt="Monstera Leaf" className="w-full h-full object-cover object-right" />
          </div>
        </div>

        {/* Hero Bottom-left Decorations */}
        <img src="/fern-leaf.svg" alt="" className="absolute bottom-10 left-[45%] w-64 opacity-80 z-0 pointer-events-none" />
      </section>

      {/* SECTION 3 — HOW CROPDOC WORKS */}
      <section id="how-it-works" className="bg-[#fdfbf0] py-24 px-8 relative text-center">
        <div className="max-w-5xl mx-auto relative z-20">
          <h2 className="text-[2.5rem] font-bold text-[#0a2a0a] mb-6">How Crop Doc Works</h2>
          <hr className="w-96 mx-auto border-t-[1px] border-[#8a9e86] mb-20" />
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center z-20">
              <div className="text-[#1e562b] mb-6 border-[3px] border-[#1e562b] rounded-xl p-3 bg-[#eef7f0]">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
              </div>
              <h3 className="font-extrabold text-sm mb-3">1. Scan</h3>
              <p className="text-[11px] text-gray-500 font-medium px-2 leading-relaxed">Upload a clear image of the affected leaf.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center z-20">
              <div className="text-[#1e562b] mb-6 border-[3px] border-[#1e562b] rounded-full p-3 bg-[#eef7f0]">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6"></path></svg>
              </div>
              <h3 className="font-extrabold text-sm mb-3">2. Detection</h3>
              <p className="text-[11px] text-gray-500 font-medium px-2 leading-relaxed">Software analyzes the image for possible diseases.</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center z-20">
              <div className="text-[#1e562b] mb-6 border-[3px] border-[#1e562b] rounded-t-full rounded-b-md p-3 bg-[#eef7f0]">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 21a9 9 0 009-9H3a9 9 0 009 9zM12 3v9M12 3c-4.97 0-9 4.03-9 9m9-9c4.97 0 9 4.03 9 9"></path></svg>
              </div>
              <h3 className="font-extrabold text-sm mb-3">3. Care</h3>
              <p className="text-[11px] text-gray-500 font-medium px-2 leading-relaxed">Explore suitable next steps for your crop.</p>
            </div>
          </div>
          
          <hr className="w-[70%] mx-auto border-t-[1px] border-[#8a9e86] mt-20" />
        </div>

        {/* Floating Leaves (Figma Design Match) */}
        <img src="/monstera-leaf.svg" className="absolute top-10 left-[-40px] w-48 opacity-90 pointer-events-none" alt="" />
        <img src="/pale-leaf.svg" className="absolute top-10 right-[-30px] w-64 opacity-80 pointer-events-none rotate-90" alt="" />
        <img src="/monstera-leaf.svg" className="absolute bottom-[-60px] left-[-30px] w-56 opacity-90 pointer-events-none" alt="" />
        <img src="/pale-leaf.svg" className="absolute bottom-[20px] right-[15%] w-72 opacity-90 pointer-events-none rotate-12" alt="" />
      </section>

      {/* SECTION 4 — FEATURES */}
      <section className="bg-[#0b290a] text-[#fdfbf0] py-24 px-8 relative text-center">
        <h2 className="text-[2.5rem] font-bold mb-6 relative z-20">Features</h2>
        <hr className="w-[80%] max-w-5xl mx-auto border-t-[1px] border-[#215024] mb-20 relative z-20" />
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-16 text-center relative z-20">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-[#fdfbf0] mb-8 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"></path></svg>
            <h3 className="font-bold text-base mb-3 max-w-[200px]">01. AI-Powered Disease Detection</h3>
            <p className="text-[11px] text-[#9ca3af] leading-relaxed max-w-[230px] font-medium">Identify potential crop diseases by simply capturing or uploading a leaf image.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-[#fdfbf0] mb-8 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path></svg>
            <h3 className="font-bold text-base mb-3 max-w-[200px]">02. Instant Results</h3>
            <p className="text-[11px] text-[#9ca3af] leading-relaxed max-w-[230px] font-medium">Get quick predictions with clear disease information and confidence indicators.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-[#fdfbf0] mb-8 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <h3 className="font-bold text-base mb-3 max-w-[200px]">03. Smart Crop Care Guidance</h3>
            <p className="text-[11px] text-[#9ca3af] leading-relaxed max-w-[230px] font-medium">Discover practical prevention tips and general care recommendations for healthier crops.</p>
          </div>
        </div>
        
        <hr className="w-[80%] max-w-5xl mx-auto border-t-[1px] border-[#215024] mt-20 relative z-20" />
        
        {/* Background Ferns */}
        <img src="/fern-leaf.svg" className="absolute top-10 left-[-30px] w-48 opacity-40 pointer-events-none" alt="" />
        <img src="/fern-leaf.svg" className="absolute bottom-10 right-[-30px] w-48 opacity-40 pointer-events-none" alt="" />
      </section>

      {/* SECTION 5 — WHY IT MATTERS */}
      <section id="about" className="bg-[#fdfbf0] py-24 px-8 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20 relative z-20">
          
          {/* Farmer Image with exact Blob shape */}
          <div className="md:w-1/2 relative flex justify-center">
             <div 
                className="w-[450px] h-[450px] overflow-hidden relative shadow-lg"
                style={{ borderRadius: "54% 46% 37% 63% / 46% 55% 45% 54%", backgroundImage: "url('/assets/farmer.png')", backgroundSize: "cover", backgroundPosition: "center" }}
             >
                {/* Fallback image incase background image approach is tough */}
                <img src="/assets/farmer.png" alt="Farmer working" className="w-full h-full object-cover opacity-0" />
             </div>
             {/* Overlay Monstera Leaf like in video */}
             <img src="/monstera-leaf.svg" className="absolute -top-10 -left-10 w-40 drop-shadow-xl" alt="" />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-[2.2rem] font-black tracking-wide text-[#0a2a0a] uppercase mb-4">WHY IT MATTERS ?</h2>
            <hr className="w-full border-t-[1px] border-[#8a9e86] mb-8" />
            <p className="text-xs text-gray-700 leading-[2] font-semibold mb-10 max-w-[450px]">
              Early detection helps you take action before crop problems spread. With Crop Doc, get simple, AI-powered insights to help protect your crops, save time, and make informed farming decisions.
            </p>
            <hr className="w-full border-t-[1px] border-[#8a9e86] mb-8" />
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 text-xs font-bold text-[#0a2a0a]">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#1e562b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> 
                Help Prevent Crop Loss
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#1e562b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
                Save Time
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#1e562b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
                Make Informed Decisions
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#1e562b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> 
                Support Healthier Growth
              </div>
            </div>
            <hr className="w-[60%] border-t-[1px] border-[#8a9e86] mt-8" />
          </div>
        </div>

        {/* Bottom Leaves */}
        <img src="/monstera-leaf.svg" className="absolute bottom-[-50px] left-[5%] w-56 opacity-90 pointer-events-none" alt="" />
        <img src="/monstera-leaf.svg" className="absolute bottom-[-50px] right-[5%] w-56 opacity-90 pointer-events-none transform -scale-x-100" alt="" />
      </section>

      {/* SECTION 6 — FOOTER */}
      <footer className="bg-[#0b290a] text-[#fdfbf0] py-10 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-[11px] font-bold gap-8">
          
          <div className="flex flex-col gap-5 text-center md:text-left mt-2">
            <Link to="/contact" className="hover:text-[#a6d993] transition-all tracking-wider">Contact Us &gt;&gt;</Link>
            <Link to="/about" className="hover:text-[#a6d993] transition-all tracking-wider">About us &gt;&gt;</Link>
          </div>
          
          <div className="hidden md:block w-[1px] h-16 bg-[#215024]"></div>
          
          <div className="flex flex-col gap-5 text-center md:text-left mt-2">
            <Link to="/policy" className="hover:text-[#a6d993] transition-all tracking-wider">Terms & Policy &gt;&gt;</Link>
            <Link to="/learn" className="hover:text-[#a6d993] transition-all tracking-wider">Learn More &gt;&gt;</Link>
          </div>

          <div className="hidden md:block w-[1px] h-16 bg-[#215024]"></div>

          <div className="flex flex-col gap-5 text-center md:text-left mt-2">
            <a href="#how-it-works" className="hover:text-[#a6d993] transition-all tracking-wider">How it works ? &gt;&gt;</a>
          </div>

        </div>
      </footer>
    </div>
  );
}