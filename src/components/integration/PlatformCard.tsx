import React from 'react';
import { Platform } from '../../types/integration';

interface PlatformCardProps {
  platform: Platform;
  isActive: boolean;
  onClick: () => void;
}

export default function PlatformCard({ platform, isActive, onClick }: PlatformCardProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-all w-full
        ${isActive 
          ? 'bg-purple-600 text-white' 
          : 'bg-background-card border text-content-primary hover:bg-background-primary'}`}
    >
      <img src={platform.logo} alt={platform.name} className="w-6 h-6" />
      <span>{platform.name}</span>
    </button>
  );
}