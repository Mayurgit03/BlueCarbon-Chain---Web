import React, { useState } from 'react';
import LandingHero from '@/components/LandingHero';
import Dashboard from '@/components/Dashboard';
import LoginPage from '@/components/LoginPage';

interface LoginCredentials {
  name: string;
  mobile: string;
  id: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [userRole, setUserRole] = useState<'admin' | 'ngo' | 'verifier' | 'buyer'>('admin');
  const [userCredentials, setUserCredentials] = useState<LoginCredentials | null>(null);

  const handleRoleSelect = (role: 'admin' | 'ngo' | 'verifier' | 'buyer') => {
    setUserRole(role);
    setCurrentView('login');
  };

  const handleLogin = (credentials: LoginCredentials) => {
    setUserCredentials(credentials);
    setCurrentView('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setUserCredentials(null);
  };

  if (currentView === 'dashboard') {
    return <Dashboard userRole={userRole} />;
  }

  if (currentView === 'login') {
    return (
      <LoginPage 
        role={userRole} 
        onLogin={handleLogin} 
        onBack={handleBackToLanding}
      />
    );
  }

  return <LandingHero onRoleSelect={handleRoleSelect} />;
};

export default Index;
