import React from 'react';
import { DetectionBreakdown } from '../../types/statistics';

interface DetectionPieChartProps {
  data: DetectionBreakdown[];
}

export default function DetectionPieChart({ data }: DetectionPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  let currentAngle = 0;

  const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];

  return (
    <div className="bg-background-card rounded-lg p-6">
      <h3 className="text-lg font-semibold text-content-primary mb-4">Detection Breakdown</h3>
      <div className="flex items-center space-x-8">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {data.map((item, i) => {
              const percentage = (item.count / total) * 100;
              const angle = (percentage / 100) * 360;
              const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
              const largeArc = angle > 180 ? 1 : 0;
              
              const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
              currentAngle += angle;

              return (
                <path
                  key={i}
                  d={pathData}
                  fill={colors[i % colors.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              );
            })}
          </svg>
        </div>
        <div className="flex-1 space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              <span className="text-content-primary">{item.category}</span>
              <span className="text-content-secondary ml-auto">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
