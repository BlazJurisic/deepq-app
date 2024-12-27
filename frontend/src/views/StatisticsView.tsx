import React, { useState } from 'react';
import TimeFilter from '../components/dashboard/TimeFilter';
import { TimeRange } from '../types/dashboard';
import StatisticsOverview from '../components/statistics/StatisticsOverview';
import DetectionMetrics from '../components/statistics/DetectionMetrics';
import ModelPerformance from '../components/statistics/ModelPerformance';
import DetectionBreakdown from '../components/statistics/DetectionBreakdown';

export default function StatisticsView() {
  const [timeRange, setTimeRange] = useState<TimeRange>('today');

  return (
    <div className="space-y-6">
      {/* Header and Time Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-content-primary">Statistics</h2>
        <TimeFilter currentRange={timeRange} onChange={setTimeRange} />
      </div>

      {/* Overview Statistics */}
      <StatisticsOverview />

      {/* Detection Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DetectionMetrics />
        <ModelPerformance />
      </div>

      {/* Detection Breakdown */}
      <DetectionBreakdown />
    </div>
  );
}
