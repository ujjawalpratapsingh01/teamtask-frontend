import React, { useState } from 'react';
import { loginUser } from '../services/cropdocService';

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Backend API Call
      const response = await loginUser({ email, password });
      
      // 2. Token Save Karna
      const token = response.data?.token || response.data?.access_token;
      if (token) {
        localStorage.setItem('token', token);
      }

      // 3. Success hone par LoginPage ko batana (jo aapko /scan par bhej dega)
      onLoginSuccess(response.data);
      
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Login fail ho gaya. Kripya apne email aur password check karein.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          placeholder="Enter your email"
          className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-green-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          placeholder="Enter your password"
          className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-green-600 focus:outline-none"
        />
      </div>
      
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-green-700 text-white font-bold p-2.5 rounded mt-2 hover:bg-green-800 disabled:opacity-70"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-sm text-center text-gray-600 mt-2">
        Don't have an account?{' '}
        <button 
          type="button" 
          onClick={onSwitchToRegister} 
          className="text-green-700 font-bold hover:underline"
        >
          Register here
        </button>
      </p>
    </form>
  );
}