import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User as UserIcon, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface UserMenuProps {
  userName: string;
}

export default function UserMenu({ userName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors"
      >
        <UserIcon size={16} className="text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background-card rounded-lg shadow-lg border py-1 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-content-primary font-medium">{userName}</p>
            <p className="text-content-secondary text-sm">Admin</p>
          </div>

          <div className="py-1">
            <button
              onClick={() => handleNavigation('/settings')}
              className="w-full px-4 py-2 text-left text-content-secondary hover:bg-background-primary flex items-center space-x-2"
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>

            <button
              onClick={() => handleNavigation('/help')}
              className="w-full px-4 py-2 text-left text-content-secondary hover:bg-background-primary flex items-center space-x-2"
            >
              <HelpCircle size={16} />
              <span>Help & Support</span>
            </button>
          </div>

          <div className="border-t py-1">
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-left text-red-500 hover:bg-background-primary flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
