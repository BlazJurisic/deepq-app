import React from 'react';
import { ModelPerformance as ModelData } from '../../types/statistics';

export default function ModelPerformance() {
  const modelData: ModelData[] = [
    { model: 'DeepDetect v2', accuracy: 99.7, speed: 142, load: 45 },
    { model: 'VoiceGuard', accuracy: 98.2, speed: 156, load: 38 },
    { model: 'AudioSentry', accuracy: 97.5, speed: 128, load: 42 }
  ];

  return (
    <div className="bg-background-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold text-content-primary mb-4">Model Performance</h3>
      <div className="space-y-6">
        {modelData.map((model) => (
          <div key={model.model} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-content-primary font-medium">{model.model}</span>
              <span className="text-content-secondary">{model.accuracy}% accuracy</span>
            </div>
            <div className="h-2 bg-background-primary rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${model.accuracy}%` }}
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