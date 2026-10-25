import React from 'react';
import { useNavigate } from 'react-router-dom';
import BotanicalBackground from '../components/BotanicalBackground.jsx';
import AuthCard from '../components/AuthCard.jsx';
import ForgotPasswordForm from '../components/ForgotPasswordForm.jsx';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  return (
    <BotanicalBackground>
      <AuthCard title="Reset" minHeightClass="min-h-[410px]">
        <ForgotPasswordForm onBackToLogin={() => navigate('/login')} />
      </AuthCard>
    </BotanicalBackground>
  );
}