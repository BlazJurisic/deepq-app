import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-background-card rounded-lg p-4 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-content-secondary text-sm">{title}</p>
          <p className="text-2xl font-bold text-content-primary mt-1">{value}</p>
        </div>
        {Icon && <Icon className="text-content-secondary" size={24} />}
      </div>
    </div>
  );
}
