import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  useMockNotifications();

  // Handle view changes through navigation
  const handleViewChange = (view: string) => {
    navigate(`/${view}`);
  };

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

  // Get current view from path
  const currentView = location.pathname.substring(1) || 'dashboard';

  return (
    <div className="flex min-h-screen">
      <GradientBackground />
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      <main className="flex-1 min-h-screen overflow-auto p-4 lg:p-8">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/*" element={<MainContent />} />
        </Routes>
      </main>
    </div>
  );
}