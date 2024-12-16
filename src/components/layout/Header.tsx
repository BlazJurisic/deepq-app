import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import NotificationPopover from '../notifications/NotificationPopover';
import UserMenu from './UserMenu';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-content-primary">
          Welcome, John
        </h1>
        <p className="text-content-secondary text-sm">
          Manage your deepfake detection settings
        </p>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-4">
        <NotificationPopover />
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-background-card border text-content-secondary hover:text-content-primary transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <UserMenu userName="John Doe" />
      </div>
    </div>
  );
}