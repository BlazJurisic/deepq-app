import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useMockNotifications } from '../../utils/mockNotifications';
import { Loader2 } from 'lucide-react';
import Sidebar from '../Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import LoginView from '../../views/LoginView';
import GradientBackground from './GradientBackground';

export default function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  useMockNotifications();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GradientBackground />
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <GradientBackground />
        <LoginView />
      </>
    );
  }

  return (
    <div className="flex min-h-screen">
      <GradientBackground />
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 min-h-screen overflow-auto p-4 lg:p-8">
        <Header />
        <MainContent currentView={currentView} />
      </main>
    </div>
  );
}