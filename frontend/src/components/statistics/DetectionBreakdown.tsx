import React from 'react';
import { DetectionBreakdown as DetectionData } from '../../types/statistics';

export default function DetectionBreakdown() {
  const data: DetectionData[] = [
    { category: 'Voice Deepfake', count: 1245, percentage: 45 },
    { category: 'Audio Manipulation', count: 856, percentage: 31 },
    { category: 'Synthetic Speech', count: 412, percentage: 15 },
    { category: 'Other', count: 247, percentage: 9 }
  ];

  const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];

  return (
    <div className="bg-background-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold text-content-primary mb-6">Detection Breakdown</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="relative w-full aspect-square max-w-[300px] mx-auto">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {data.reduce((elements, item, i) => {
              const previousPercentage = elements.percentage;
              elements.percentage += item.percentage;
              
              const startAngle = (previousPercentage / 100) * Math.PI * 2;
              const endAngle = (elements.percentage / 100) * Math.PI * 2;
              
              const x1 = 50 + 40 * Math.cos(startAngle);
              const y1 = 50 + 40 * Math.sin(startAngle);
              const x2 = 50 + 40 * Math.cos(endAngle);
              const y2 = 50 + 40 * Math.sin(endAngle);
              
              const largeArc = item.percentage > 50 ? 1 : 0;
              
              elements.paths.push(
                <path
                  key={i}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[i]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              );
              
              return elements;
            }, { paths: [], percentage: 0 } as { paths: JSX.Element[], percentage: number }).paths}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col justify-center space-y-4">
          {data.map((item, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: colors[i] }}
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-content-primary">{item.category}</span>
                  <span className="text-content-secondary">{item.percentage}%</span>
                </div>
                <div className="text-content-secondary text-sm">
                  {item.count.toLocaleString()} detections
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
