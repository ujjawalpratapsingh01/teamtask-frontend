import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { getActiveSession, logoutUser } from './services/authService.js';

export default function App() {
  const [session, setSession] = useState(() => getActiveSession());
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setSession(null);
    navigate('/login', { replace: true });
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/" element={<Navigate to={session ? '/dashboard' : '/login'} replace />} />
      <Route path="/login" element={<LoginPage onAuthSuccess={setSession} />} />
      <Route path="/register" element={<RegisterPage onAuthSuccess={setSession} />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={session ? <DashboardPage session={session} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}