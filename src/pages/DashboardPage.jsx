import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Dashboard from '../components/Dashboard.jsx';

export default function DashboardPage({ session, onLogout }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar session={session} onLogout={onLogout} />
      <div className="flex-1"><Dashboard session={session} /></div>
    </div>
  );
}