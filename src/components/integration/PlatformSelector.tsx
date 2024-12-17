import React from 'react';
import { Platform } from '../../types/integration';

interface PlatformSelectorProps {
  platforms: Platform[];
  selectedPlatform: string;
  onSelect: (id: Platform['id']) => void;
}

export default function PlatformSelector({ platforms, selectedPlatform, onSelect }: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {platforms.map(platform => (
        <button
          key={platform.id}
          onClick={() => onSelect(platform.id)}
          className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-all w-full border
            ${selectedPlatform === platform.id
              ? 'bg-purple-600 border-purple-600 text-white'
              : 'bg-background-card border-border hover:border-purple-600/50 text-content-primary'
            }`}
        >
          <img src={platform.logo} alt={platform.name} className="w-6 h-6" />
          <span className="truncate">{platform.name}</span>
        </button>
      ))}
    </div>
  );
}
