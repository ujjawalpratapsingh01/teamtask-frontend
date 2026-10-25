import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { validateRegistration } from '../utils/validation.js';
import { registerUser, triggerGoogleSignIn } from '../services/authService.js';
import { GoogleGLogo } from './LoginForm.jsx';

export default function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmChange = (val) => {
    setConfirmPassword(val);
    if (password && val && password !== val) {
      setFieldErrors((p) => ({ ...p, confirmPassword: "Password doesn't match" }));
    } else {
      setFieldErrors((p) => ({ ...p, confirmPassword: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const { isValid, errors } = validateRegistration({ name, email, password, confirmPassword });
    if (!isValid) { setFieldErrors(errors); return; }
    setIsLoading(true);
    try {
      const session = await registerUser({ name, email, password });
      onRegisterSuccess(session);
    } catch (err) {
      setAuthError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const hasMismatchError = Boolean(fieldErrors.confirmPassword);

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col">
      <div className="mb-2">
        <label className="block text-[11px] font-medium text-black mb-0.5">Name</label>
        <input type="text" value={name} onChange={(e) => { setName(e.target.value); setFieldErrors((p) => ({ ...p, name: '' })); }} placeholder="XXXXXXXX" className={`w-full h-[31px] px-3 rounded-[6px] text-[12px] text-gray-900 placeholder:text-white ${fieldErrors.name ? 'bg-inputErrorBg' : 'bg-inputBg'}`} />
        {fieldErrors.name && <p className="text-[10px] font-semibold text-[#D32F2F] mt-0.5">{fieldErrors.name}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-[11px] font-medium text-black mb-0.5">Email</label>
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })); }} placeholder="XXXXXXXX" className={`w-full h-[31px] px-3 rounded-[6px] text-[12px] text-gray-900 placeholder:text-white ${fieldErrors.email ? 'bg-inputErrorBg' : 'bg-inputBg'}`} />
        {fieldErrors.email && <p className="text-[10px] font-semibold text-[#D32F2F] mt-0.5">{fieldErrors.email}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-[11px] font-medium text-black mb-0.5">Password</label>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: '' })); }} placeholder="XXXXXXXX" className={`w-full h-[31px] pl-3 pr-7 rounded-[6px] text-[12px] text-gray-900 placeholder:text-white ${fieldErrors.password ? 'bg-inputErrorBg' : 'bg-inputBg'}`} />
          <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
        {fieldErrors.password && <p className="text-[10px] font-semibold text-[#D32F2F] mt-0.5">{fieldErrors.password}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-[11px] font-medium text-black mb-0.5">Confirm Password</label>
        <div className="relative">
          <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={(e) => handleConfirmChange(e.target.value)} placeholder="XXXXXXXX" className={`w-full h-[31px] pl-3 pr-7 rounded-[6px] text-[12px] text-gray-900 placeholder:text-white ${hasMismatchError ? 'bg-inputErrorBg' : 'bg-inputBg'}`} />
          <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600">
            {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
        {hasMismatchError && <p className="text-[10.5px] font-semibold text-[#C62828] mt-1">{fieldErrors.confirmPassword}</p>}
      </div>
      {authError && <p className="text-[10px] font-medium text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1 mb-2">{authError}</p>}
      <button type="submit" disabled={isLoading} className="w-full h-[31px] bg-registerGreen hover:bg-registerGreenHover text-white text-[11px] font-medium rounded-[6px] flex items-center justify-center gap-1.5 mt-0.5 mb-2.5">
        {isLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Registering...</span></> : <span>Register</span>}
      </button>
      <div className="w-full">
        <p className="text-[10.5px] font-medium text-black mb-1">Continue with</p>
        <button type="button" onClick={() => { try { triggerGoogleSignIn(); } catch (err) { setAuthError(err.message); } }} className="w-full h-[31px] bg-white hover:bg-gray-50 text-gray-600 text-[11px] font-medium rounded-[6px] border border-gray-200 shadow-googleBtn flex items-center justify-center gap-2">
          <GoogleGLogo /><span>Sign In with Google</span>
        </button>
      </div>
      <div className="mt-2.5 text-center">
        <button type="button" onClick={onSwitchToLogin} className="text-[10.5px] text-gray-700 hover:text-loginGreen font-medium hover:underline">Already have an account? Login</button>
      </div>
    </form>
  );
}