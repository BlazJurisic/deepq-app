import React from 'react';
import { CallData } from '../../types/dashboard';

interface ChartProps {
  data: CallData[];
}

export function CallsChart({ data }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.count));
  
  return (
    <div className="bg-background-card rounded-lg p-6 border">
      <h2 className="text-xl font-semibold text-content-primary mb-4">Number of calls</h2>
      <div className="h-48 flex items-end space-x-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1"
            style={{ height: `${(item.count / maxValue) * 100}%` }}
          >
            <div
              className={`w-full h-full rounded-t ${
                index === Math.floor(data.length / 2) 
                  ? 'bg-purple-600' 
                  : 'bg-background-primary'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SuspiciousCallsChart({ data }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.count));
  const points = data.map((d, i) => [
    (i / (data.length - 1)) * 300,
    100 - (d.count / maxValue) * 100
  ]).join(' L ');

  return (
    <div className="bg-background-card rounded-lg p-6 border">
      <h2 className="text-xl font-semibold text-content-primary mb-4">
        Suspicious calls
        <span className="text-green-400 text-sm ml-2">+5.43%</span>
      </h2>
      <div className="h-48 relative">
        <svg className="w-full h-full" viewBox="0 0 300 100">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M 0 100 L 0 ${points.split(' ')[0].split(',')[1]} L ${points} L 300 100 Z`}
            fill="url(#gradient)"
            className="transition-colors"
          />
          <path
            d={`M ${points}`}
            fill="none"
            stroke="rgb(139, 92, 246)"
            strokeWidth="2"
            className="transition-colors"
          />
        </svg>
      </div>
    </div>
  );
}