import React from 'react';
import { TimeSeriesChart } from './TimeSeriesChart';

export default function DetectionMetrics() {
  const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
    value: Math.random() * 100 + 50
  }));

  return (
    <div className="bg-background-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold text-content-primary mb-4">Detection Rate Over Time</h3>
      <div className="relative">
        <TimeSeriesChart
          data={timeSeriesData}
          color="rgb(139, 92, 246)"
          yAxisLabel="Detection Rate"
          tooltipLabel="Detection Rate"
        />
      </div>
    </div>
  );
}