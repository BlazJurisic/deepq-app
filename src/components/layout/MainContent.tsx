import React from 'react';
import DashboardView from '../../views/DashboardView';
import IntegrationView from '../../views/IntegrationView';
import StatisticsView from '../../views/StatisticsView';
import BillingView from '../../views/BillingView';
import UsersView from '../../views/UsersView';
import SettingsView from '../../views/SettingsView';
import HelpSupportView from '../../views/HelpSupportView';

interface MainContentProps {
  currentView: string;
}

export default function MainContent({ currentView }: MainContentProps) {
  return (
    <div className="max-w-[1600px] mx-auto">
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'integration' && <IntegrationView />}
      {currentView === 'statistics' && <StatisticsView />}
      {currentView === 'billing' && <BillingView />}
      {currentView === 'users' && <UsersView />}
      {currentView === 'settings' && <SettingsView />}
      {currentView === 'help' && <HelpSupportView />}
    </div>
  );
}