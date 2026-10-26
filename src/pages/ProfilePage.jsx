import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Pencil,
  Mail,
  Phone,
  Settings,
  Bell,
  Languages,
  Check,
  X,
  Camera
} from 'lucide-react';
import ScanNavbar from '../components/ScanNavbar.jsx';
import ScanFooter from '../components/ScanFooter.jsx';

const INITIAL_PROFILE_SCANS = [
  {
    id: 'scan_1',
    crop: 'Tomato leaf',
    time: 'Today at 10:15 a.m.',
    status: 'Disease Detected',
    statusLabel: 'Desease Detected',
    disease: 'Early Blight',
    isHealthy: false,
    image:
      'https://images.unsplash.com/photo-1518977676601-b5ff321008b9?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'scan_2',
    crop: 'Onion leaf',
    time: 'Today at 10:15 a.m.',
    status: 'Disease Detected',
    statusLabel: 'Desease Detected',
    disease: 'Early Blight',
    isHealthy: false,
    image:
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb26b63?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'scan_3',
    crop: 'Potato leaf',
    time: 'Today at 10:10 a.m.',
    status: 'No Disease Detected',
    statusLabel: 'No decease detected',
    disease: 'Leaf healthy',
    isHealthy: true,
    image:
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=300&q=80'
  }
];

export default function ProfilePage({ session, onLogout }) {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  // Load saved profile from localStorage or default to screenshot values
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('cropdoc_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return {
      name: 'Aryansh Singh',
      email: 'aryansh_singh@gmail.com',
      phone: '7505xxxxx',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    };
  });

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [draftProfile, setDraftProfile] = useState(profile);

  // Preferences state
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('cropdoc_user_prefs');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      notifications: false,
      emailUpdates: false,
      language: 'English'
    };
  });

  // Previous scans state
  const [scans, setScans] = useState(INITIAL_PROFILE_SCANS);

  // Persist profile changes
  useEffect(() => {
    try {
      localStorage.setItem('cropdoc_user_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  // Persist preference changes
  useEffect(() => {
    try {
      localStorage.setItem('cropdoc_user_prefs', JSON.stringify(preferences));
    } catch {
      // ignore
    }
  }, [preferences]);

  const handleStartEdit = () => {
    setDraftProfile(profile);
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!draftProfile.name.trim()) return;
    setProfile(draftProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: url }));
    setDraftProfile((prev) => ({ ...prev, avatar: url }));
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const cycleLanguage = () => {
    const langs = ['English', 'Hindi', 'Punjabi'];
    setPreferences((prev) => {
      const nextIndex = (langs.indexOf(prev.language) + 1) % langs.length;
      return { ...prev, language: langs[nextIndex] };
    });
  };

  const handleClearScans = () => {
    if (window.confirm('Are you sure you want to clear all previous scans?')) {
      setScans([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBE7] flex flex-col font-sans text-[#0D3006]">
      {/* Top Navbar */}
      <ScanNavbar session={session} onLogout={onLogout} />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT COLUMN (7 Cols): My Profile + Preferences ================= */}
          <div className="lg:col-span-7">
            
            {/* Header Row: "My Profile" + "Edit Profile" Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#102D05] tracking-tight">
                My Profile
              </h1>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="inline-flex items-center gap-3 px-7 py-3 rounded-xl bg-[#112A09] hover:bg-[#1E4412] text-white text-sm sm:text-base font-semibold shadow-md transition cursor-pointer"
                >
                  <span>Edit Profile</span>
                  <Pencil className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2D6A30] hover:bg-[#235325] text-white text-sm font-semibold shadow transition cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {/* Card 1: User Details Card (#E6F0D5) */}
            <div className="bg-[#E6F0D5] rounded-3xl p-6 sm:p-8 shadow-md border border-[#102D05]/5 mb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                
                {/* Circular Avatar */}
                <div className="relative group shrink-0">
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => avatarInputRef.current?.click()}
                    title="Click to change profile photo"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md border-2 border-white/80 cursor-pointer relative"
                  >
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Name, Email, Phone Details with Dividers */}
                <div className="flex-1 w-full">
                  {!isEditing ? (
                    <>
                      {/* Name Row */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-[#102D05]/30">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102D05]">
                          {profile.name}
                        </h2>
                        <button
                          type="button"
                          onClick={handleStartEdit}
                          aria-label="Edit Name"
                          className="text-[#102D05] hover:text-[#2D6A30] p-1 transition cursor-pointer"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Email Row */}
                      <div className="flex items-center gap-4 py-4 border-b border-[#102D05]/30">
                        <Mail className="w-6 h-6 text-[#3E5F37] shrink-0 stroke-[1.75]" />
                        <a
                          href={`mailto:${profile.email}`}
                          className="text-sm sm:text-base font-bold text-[#102D05] underline break-all"
                        >
                          {profile.email}
                        </a>
                      </div>

                      {/* Phone Row */}
                      <div className="flex items-center gap-4 py-4 border-b border-[#102D05]/30">
                        <Phone className="w-6 h-6 text-[#3E5F37] shrink-0 stroke-[1.75]" />
                        <span className="text-sm sm:text-base font-bold text-[#102D05]">
                          {profile.phone}
                        </span>
                      </div>
                    </>
                  ) : (
                    /* Editable Form Inputs */
                    <form onSubmit={handleSaveEdit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-[#102D05]/70 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={draftProfile.name}
                          onChange={(e) =>
                            setDraftProfile({ ...draftProfile, name: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#102D05]/20 text-[#102D05] font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#2D6A30]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#102D05]/70 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={draftProfile.email}
                          onChange={(e) =>
                            setDraftProfile({ ...draftProfile, email: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#102D05]/20 text-[#102D05] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A30]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#102D05]/70 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={draftProfile.phone}
                          onChange={(e) =>
                            setDraftProfile({ ...draftProfile, phone: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#102D05]/20 text-[#102D05] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A30]"
                        />
                      </div>
                    </form>
                  )}
                </div>

              </div>
            </div>

            {/* Card 2: Preferences Card (#E6F0D5) */}
            <div className="bg-[#E6F0D5] rounded-3xl p-6 sm:p-8 shadow-md border border-[#102D05]/5">
              {/* Preferences Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#102D05]/30">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102D05]">
                  Preferences
                </h2>
                <Settings className="w-7 h-7 text-[#4F6F46] stroke-[1.75]" />
              </div>

              {/* Row 1: Notification Toggle */}
              <div className="flex items-center justify-between py-4 border-b border-[#102D05]/30">
                <div className="flex items-center gap-4">
                  <Bell className="w-6 h-6 text-[#102D05] fill-[#102D05]" />
                  <span className="text-sm sm:text-base font-bold text-[#102D05]">
                    Notification
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.notifications}
                  onClick={() => togglePreference('notifications')}
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer border border-gray-300 ${
                    preferences.notifications ? 'bg-[#2D6A30]' : 'bg-white'
                  }`}
                >
                  <span
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 border border-gray-200 ${
                      preferences.notifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 2: Email Updates Toggle */}
              <div className="flex items-center justify-between py-4 border-b border-[#102D05]/30">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-[#3E5F37] stroke-[1.75]" />
                  <span className="text-sm sm:text-base font-bold text-[#102D05]">
                    Email Updates
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.emailUpdates}
                  onClick={() => togglePreference('emailUpdates')}
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer border border-gray-300 ${
                    preferences.emailUpdates ? 'bg-[#2D6A30]' : 'bg-white'
                  }`}
                >
                  <span
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 border border-gray-200 ${
                      preferences.emailUpdates ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 3: Language */}
              <div
                onClick={cycleLanguage}
                className="flex items-center justify-between py-4 border-b border-[#102D05]/30 cursor-pointer hover:opacity-80 transition"
                title="Click to switch language"
              >
                <div className="flex items-center gap-4">
                  <Languages className="w-6 h-6 text-[#102D05]" />
                  <span className="text-sm sm:text-base font-bold text-[#102D05]">
                    Language
                  </span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 text-[#102D05]">
                  {preferences.language}
                </span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN (5 Cols): Previous Scans Card ================= */}
          <div className="lg:col-span-5 lg:mt-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-black/5">
              
              {/* Header: Previous scans + Clear all */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#102D05]">
                  Previous scans
                </h2>
                <button
                  type="button"
                  onClick={handleClearScans}
                  className="text-sm sm:text-base font-bold text-[#1E9E52] hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {/* Scan Cards List */}
              {scans.length === 0 ? (
                <div className="py-16 text-center text-sm text-gray-500">
                  No previous scans available.
                </div>
              ) : (
                <div className="space-y-4">
                  {scans.map((scan, index) => (
                    <React.Fragment key={scan.id}>
                      <div
                        onClick={() => navigate('/scan')}
                        className="bg-[#EAF5E9] hover:bg-[#dff0de] transition rounded-2xl p-4 shadow-md border border-[#102D05]/5 flex items-center gap-4 cursor-pointer"
                      >
                        <img
                          src={scan.image}
                          alt={scan.crop}
                          className="w-24 h-24 rounded-2xl object-cover shrink-0 bg-white shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-[#102D05] truncate">
                            {scan.crop}
                          </h3>
                          <p className="text-xs text-[#102D05]/80 mb-2">
                            {scan.time}
                          </p>

                          {/* Status Pill */}
                          <span
                            className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-extrabold mb-1.5 ${
                              scan.isHealthy
                                ? 'bg-[#7CC674] text-[#0D3006]'
                                : 'bg-[#F6DFDB] text-[#C81E1E]'
                            }`}
                          >
                            {scan.statusLabel}
                          </span>

                          {/* Disease / Healthy Title */}
                          <p
                            className={`text-base sm:text-lg font-extrabold truncate ${
                              scan.isHealthy ? 'text-[#102D05]' : 'text-[#B91C1C]'
                            }`}
                          >
                            {scan.disease}
                          </p>
                        </div>
                      </div>

                      {/* Subtle Divider Line between cards just like the screenshot */}
                      {index < scans.length - 1 && (
                        <div className="w-4/5 mx-auto border-b border-[#102D05]/40 my-2" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Bottom Dark Green Footer */}
      <ScanFooter />
    </div>
  );
}