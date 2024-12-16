import React from 'react';
import StatCard from '../dashboard/StatCard';
import { Shield, Brain, Zap, Clock } from 'lucide-react';

export default function StatisticsOverview() {
  const stats = {
    totalScans: 157892,
    detectionRate: 99.7,
    avgConfidence: 95.2,
    processingTime: 142
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Scans"
        value={stats.totalScans.toLocaleString()}
        icon={Shield}
      />
      <StatCard
        title="Detection Rate"
        value={`${stats.detectionRate}%`}
        icon={Brain}
      />
      <StatCard
        title="Avg. Confidence"
        value={`${stats.avgConfidence}%`}
        icon={Zap}
      />
      <StatCard
        title="Avg. Processing Time"
        value={`${stats.processingTime}ms`}
        icon={Clock}
      />
    </div>
  );
}