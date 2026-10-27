import React from 'react';
import { useNavigate } from 'react-router-dom';
import BotanicalBackground from '../components/BotanicalBackground.jsx';
import AuthCard from '../components/AuthCard.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

export default function RegisterPage({ onAuthSuccess }) {
  const navigate = useNavigate();

  return (
    <BotanicalBackground>
      <AuthCard title="Register" minHeightClass="min-h-[478px]">
        <RegisterForm
          onRegisterSuccess={(session) => {
            if (onAuthSuccess) onAuthSuccess(session);
            navigate('/profile', { replace: true });
          }}
          onSwitchToLogin={() => navigate('/login')}
        />
      </AuthCard>
    </BotanicalBackground>
  );
}