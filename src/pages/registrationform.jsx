import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { registerUser } from '../services/authService.js';

export default function RegisterPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    try {
      setIsLoading(true);
      // Calls POST /api/v1/auth/register from authService.js (with offline fallback support)
      const sessionData = await registerUser({
        name: fullName,
        fullName,
        email,
        password
      });

      // Update parent component state if available
      if (onLoginSuccess) {
        onLoginSuccess(sessionData);
      }

      // Redirect user to Profile or Scan page
      navigate('/profile');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBE7] flex flex-col justify-center items-center px-6 py-12 font-sans text-[#0D3006]">
      <div className="max-w-md w-full bg-[#E6F0D5] rounded-3xl p-8 sm:p-10 shadow-xl border border-[#102D05]/10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102D05] mb-2">
            Create Account
          </h1>
          <p className="text-xs sm:text-sm text-[#102D05]/80 font-medium">
            Join CropDoc to start monitoring your crop health with AI
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-100 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102D05]/70 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Ramesh Patel"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#102D05]/20 text-[#102D05] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A30]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102D05]/70 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                name="email"
                placeholder="farmer@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#102D05]/20 text-[#102D05] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A30]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102D05]/70 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#102D05]/20 text-[#102D05] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A30]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#112A09] hover:bg-[#1E4412] disabled:opacity-60 text-white font-bold text-base shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Register Now</span>
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center mt-6 text-xs font-semibold text-[#102D05]/80">
          Already have an account?{' '}
          <Link to="/login" className="text-[#1E9E52] font-bold hover:underline">
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
}