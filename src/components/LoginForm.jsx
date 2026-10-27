import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { validateLogin } from '../utils/validation.js';
import { loginUser, triggerGoogleSignIn } from '../services/authService.js';

export function GoogleGLogo() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const { isValid, errors } = validateLogin({ email, password });
    if (!isValid) { setFieldErrors(errors); return; }
    setIsLoading(true);
    try {
      const session = await loginUser({ email, password });
      onLoginSuccess(session);
    } catch (err) {
      setAuthError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col">
      <div className="mb-2.5">
        <label htmlFor="login-email" className="block text-[11px] font-medium text-black mb-1">Email</label>
        <input id="login-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })); }} placeholder="XXXXXXXX" className={`w-full h-[32px] px-3 rounded-[6px] text-[12px] text-gray-900 placeholder:text-white ${fieldErrors.email ? 'bg-inputErrorBg' : 'bg-inputBg'}`} />
        {fieldErrors.email && <p className="text-[10px] font-semibold text-red-700 mt-0.5">{fieldErrors.email}</p>}
      </div>
      <div className="mb-1">
        <label htmlFor="login-password" className="block text-[11px] font-medium text-black mb-1">Password</label>
        <div className="relative">
          <input id="login-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: '' })); }} placeholder="XXXXXXXX" className={`w-full h-[32px] pl-3 pr-7 rounded-[6px] text-[12px] text-gray-900 placeholder:text-white ${fieldErrors.password ? 'bg-inputErrorBg' : 'bg-inputBg'}`} />
          <button
            type="button"
            onClick={async () => {
              try {
                setAuthError('');
                const session = await triggerGoogleSignIn();
                if (onLoginSuccess && session) {
                  onLoginSuccess(session);
                }
              } catch (err) {
                setAuthError(err.message);
              }
            }}
            className="w-full h-[31px] bg-white hover:bg-gray-50 text-gray-600 text-[11px] font-medium rounded-[6px] border border-gray-200 shadow-googleBtn flex items-center justify-center gap-2 mb-3 cursor-pointer"
          >
            <GoogleGLogo /><span>Sign In with Google</span>
          </button>
        </div>
        {fieldErrors.password && <p className="text-[10px] font-semibold text-red-700 mt-0.5">{fieldErrors.password}</p>}
      </div>
      <div className="flex justify-end mb-3">
        <Link to="/forgot-password" className="text-[10px] text-gray-600 hover:text-loginGreen hover:underline">Forgot Password?</Link>
      </div>
      {authError && <p className="text-[10px] font-medium text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1 mb-2">{authError}</p>}
      <button type="submit" disabled={isLoading} className="w-full h-[31px] bg-loginGreen hover:bg-loginGreenHover text-white text-[11px] font-medium rounded-[6px] flex items-center justify-center gap-1.5 mb-3.5">
        {isLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Signing in...</span></> : <span>Login</span>}
      </button>
      <button type="button" onClick={() => { try { triggerGoogleSignIn(); } catch (err) { setAuthError(err.message); } }} className="w-full h-[31px] bg-white hover:bg-gray-50 text-gray-600 text-[11px] font-medium rounded-[6px] border border-gray-200 shadow-googleBtn flex items-center justify-center gap-2 mb-3">
        <GoogleGLogo /><span>Sign In with Google</span>
      </button>
      <div className="w-full">
        <p className="text-[10.5px] font-medium text-black mb-1">Don&apos;t have&nbsp;&nbsp;account?</p>
        <button type="button" onClick={onSwitchToRegister} className="w-full h-[31px] bg-registerGreen hover:bg-registerGreenHover text-white text-[11px] font-medium rounded-[6px] flex items-center justify-center">Register</button>
      </div>
    </form>
  );
}