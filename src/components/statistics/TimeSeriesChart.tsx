import React from 'react';
import { TimeSeriesData } from '../../types/statistics';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  color: string;
  yAxisLabel?: string;
  tooltipLabel?: string;
}

export function TimeSeriesChart({ data, color, yAxisLabel, tooltipLabel }: TimeSeriesChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => [
    (i / (data.length - 1)) * 100,
    100 - (d.value / maxValue) * 100
  ]).join(' L ');

  return (
    <div className="h-64 relative">
      {yAxisLabel && (
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-content-secondary text-sm whitespace-nowrap">
          {yAxisLabel}
        </div>
      )}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M 0 100 L 0 ${points.split(' ')[0].split(',')[1]} L ${points} L 100 100 Z`}
          fill="url(#gradient)"
          className="transition-colors"
        />
        <path
          d={`M ${points}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          className="transition-colors"
        />
      </svg>
    </div>
  );
}
