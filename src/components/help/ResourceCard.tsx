import React from 'react';
import { LucideIcon, ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export default function ResourceCard({ title, description, icon: Icon, link }: ResourceCardProps) {
  return (
    <div className="bg-background-card rounded-lg border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-purple-600 flex-shrink-0" />
        <h3 className="text-lg font-semibold text-content-primary">{title}</h3>
      </div>
      <p className="text-content-secondary mb-4">{description}</p>
      <a
        href={link}
        className="text-purple-600 hover:text-purple-700 flex items-center space-x-2"
      >
        <span>Learn more</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
