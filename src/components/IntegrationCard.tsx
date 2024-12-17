import React from 'react';

interface IntegrationCardProps {
  name: string;
  logo: string;
  active?: boolean;
}

export default function IntegrationCard({ name, logo, active = false }: IntegrationCardProps) {
  return (
    <div className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-all
      ${active ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
      <img src={logo} alt={name} className="w-6 h-6" />
      <span className="text-white">{name}</span>
    </div>
  );
}
