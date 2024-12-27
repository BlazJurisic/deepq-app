import React from 'react';
import { ModelPerformance } from '../../types/statistics';

interface PerformanceChartProps {
  data: ModelPerformance[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const maxAccuracy = Math.max(...data.map(d => d.accuracy));
  
  return (
    <div className="bg-background-card rounded-lg p-6">
      <h3 className="text-lg font-semibold text-content-primary mb-4">Model Performance</h3>
      <div className="space-y-4">
        {data.map((model, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-content-primary">{model.model}</span>
              <span className="text-content-secondary">{model.accuracy}% accuracy</span>
            </div>
            <div className="h-2 bg-background-primary rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${(model.accuracy / maxAccuracy) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-content-secondary">
              <span>{model.speed}ms avg. speed</span>
              <span>{model.load}% CPU load</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
