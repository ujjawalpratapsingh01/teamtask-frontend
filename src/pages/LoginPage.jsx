import React from 'react';
import { useNavigate } from 'react-router-dom';
import BotanicalBackground from '../components/BotanicalBackground.jsx';
import AuthCard from '../components/AuthCard.jsx';
import LoginForm from '../components/LoginForm.jsx';

export default function LoginPage({ onAuthSuccess }) {
  const navigate = useNavigate();
  return (
    <BotanicalBackground>
      <AuthCard title="Login" minHeightClass="min-h-[440px]">
        <LoginForm onLoginSuccess={(s) => { onAuthSuccess(s); navigate('/dashboard', { replace: true }); }} onSwitchToRegister={() => navigate('/register')} />
      </AuthCard>
    </BotanicalBackground>
  );
}