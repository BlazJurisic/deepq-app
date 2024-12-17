import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardView from '../../views/DashboardView';
import IntegrationView from '../../views/IntegrationView';
import StatisticsView from '../../views/StatisticsView';
import BillingView from '../../views/BillingView';
import UsersView from '../../views/UsersView';
import SettingsView from '../../views/SettingsView';
import HelpSupportView from '../../views/HelpSupportView';
import DemoView from '../../views/DemoView';

export default function MainContent() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/integration" element={<IntegrationView />} />
        <Route path="/statistics" element={<StatisticsView />} />
        <Route path="/billing" element={<BillingView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/demo" element={<DemoView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/help" element={<HelpSupportView />} />
      </Routes>
    </div>
  );
}