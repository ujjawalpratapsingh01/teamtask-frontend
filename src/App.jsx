import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import LandingPage from './pages/LandingPage.jsx'; // Aapka Landing page
import ScanPage from './pages/ScanPage.jsx';
import { getActiveSession, logoutUser } from './services/authService.js';
import AboutPage from './pages/AboutPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

export default function App() {
  const [session, setSession] = useState(() => getActiveSession());
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setSession(null);
    navigate('/landing', { replace: true });
  };

  return (
    <Routes>
      {/* Sabse pehle Landing Page open hoga */}
      <Route path="/" element={<LandingPage session={session} />} />
      <Route path="/landing" element={<LandingPage session={session} />} />
      <Route
        path="/about"
        element={<AboutPage session={session} onLogout={handleLogout} />}
      />
      <Route
        path="/profile"
        element={<ProfilePage session={session} onLogout={handleLogout} />}
      />

      <Route
        path="/login"
        element={<LoginPage onAuthSuccess={(s) => { setSession(s); navigate('/scan', { replace: true }); }} />}
      />
      <Route
        path="/register"
        element={<RegisterPage onAuthSuccess={(s) => { setSession(s); navigate('/scan', { replace: true }); }} />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Video wala Scan Page */}
      <Route
        path="/scan"
        element={<ScanPage session={session} onLogout={handleLogout} />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
      
    </Routes>
    
    
  );
}