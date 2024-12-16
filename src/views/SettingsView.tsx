import React from 'react';
import { Save, Bell, Lock, Globe, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsView() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-content-primary mb-8">Settings</h2>

      <div className="space-y-6">
        {/* Account Settings */}
        <div className="bg-background-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-content-primary mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-content-secondary mb-2">Email Address</label>
              <input
                type="email"
                value="john.doe@company.com"
                className="w-full px-3 py-2 bg-background-primary border rounded-lg text-content-primary"
                readOnly
              />
            </div>
            <div>
              <label className="block text-content-secondary mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 bg-background-primary border rounded-lg text-content-primary"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-background-card rounded-lg border p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-content-primary mr-2" />
            <h3 className="text-lg font-semibold text-content-primary">Notification Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-content-primary">Email Notifications</p>
                <p className="text-content-secondary text-sm">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-background-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-content-primary">Push Notifications</p>
                <p className="text-content-secondary text-sm">Receive browser notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-background-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-background-card rounded-lg border p-6">
          <div className="flex items-center mb-4">
            <Lock className="w-5 h-5 text-content-primary mr-2" />
            <h3 className="text-lg font-semibold text-content-primary">Security</h3>
          </div>
          <div className="space-y-4">
            <button className="text-content-primary hover:text-purple-600">
              Change Password
            </button>
            <button className="text-content-primary hover:text-purple-600">
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-background-card rounded-lg border p-6">
          <div className="flex items-center mb-4">
            <Moon className="w-5 h-5 text-content-primary mr-2" />
            <h3 className="text-lg font-semibold text-content-primary">Appearance</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-content-primary">Dark Mode</p>
              <p className="text-content-secondary text-sm">Toggle dark/light theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-background-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}