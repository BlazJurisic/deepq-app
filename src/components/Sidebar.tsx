import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Puzzle, BarChart2, Users, CreditCard, Settings, HelpCircle, ChevronLeft, ChevronRight, AudioWaveform } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Set collapsed by default on mobile/tablet
  useEffect(() => {
    const checkWidth = () => {
      setIsCollapsed(window.innerWidth < 1024);
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'integration', icon: Puzzle, label: 'Integration' },
    { id: 'statistics', icon: BarChart2, label: 'Statistics' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
    { id: 'demo', icon: AudioWaveform, label: 'Demo' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support' }
  ];

  return (
    <div 
      className={`bg-purple-950 border-r border-white/10 min-h-screen h-full sticky top-0 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-background-card border rounded-full flex items-center justify-center text-content-secondary hover:text-content-primary transition-colors"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="h-full flex flex-col p-4">
        <div className={`mb-8 transition-all duration-300 ${isCollapsed ? 'px-2' : ''}`}>
          <Logo />
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'} px-4 py-3 rounded-lg w-full transition-colors ${
                currentView === item.id
                  ? 'bg-purple-600 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}