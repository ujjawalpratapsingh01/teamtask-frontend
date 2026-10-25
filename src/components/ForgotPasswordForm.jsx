import React, { useState } from 'react';
import { isValidEmail } from '../utils/validation.js';
import { requestPasswordReset } from '../services/authService.js';

export default function ForgotPasswordForm({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) { setError('Enter a valid email address'); return; }
    const res = await requestPasswordReset(email);
    setStatusMsg(res.message);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col">
      <p className="text-[11px] text-gray-700 mb-3 text-center">Enter your email to receive a password reset link.</p>
      <div className="mb-3">
        <label className="block text-[11px] font-medium text-black mb-1">Email</label>
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="XXXXXXXX" className="w-full h-[32px] px-3 rounded-[6px] text-[12px] bg-inputBg" />
        {error && <p className="text-[10px] font-semibold text-red-700 mt-1">{error}</p>}
      </div>
      {statusMsg && <p className="text-[10.5px] text-loginGreen bg-leafLight/30 rounded px-2.5 py-2 mb-3">{statusMsg}</p>}
      <button type="submit" className="w-full h-[31px] bg-loginGreen text-white text-[11px] font-medium rounded-[6px] mb-2.5">Send Reset Link</button>
      <button type="button" onClick={onBackToLogin} className="w-full h-[31px] bg-registerGreen text-white text-[11px] font-medium rounded-[6px]">Back to Login</button>
    </form>
  );
}