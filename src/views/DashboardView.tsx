import React, { useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import ActivityTable from '../components/dashboard/ActivityTable';
import { CallsChart, SuspiciousCallsChart } from '../components/dashboard/Charts';
import TimeFilter from '../components/dashboard/TimeFilter';
import { BarChart2, AlertTriangle, Bell } from 'lucide-react';
import { TimeRange } from '../types/dashboard';
import { useDashboardData } from '../hooks/useDashboardData';

export default function DashboardView() {
  const [timeRange, setTimeRange] = useState<TimeRange>('today');
  const { stats, callsData, activities, suspiciousCallsData } = useDashboardData(timeRange);

  return (
    <div className="space-y-6">
      {/* Stats and Time Filter */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full sm:w-auto">
          <StatCard
            title="Calls scanned"
            value={stats.callsScanned.toLocaleString()}
            icon={BarChart2}
          />
          <StatCard
            title="Suspicious calls (%)"
            value={`${stats.suspiciousCallsPercent}%`}
            icon={AlertTriangle}
          />
          <StatCard
            title="Notifications sent"
            value={stats.notificationsSent}
            icon={Bell}
          />
        </div>
        <TimeFilter currentRange={timeRange} onChange={setTimeRange} />
      </div>

      {/* Activity Table */}
      <div className="overflow-x-auto">
        <ActivityTable activities={activities} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CallsChart data={callsData} />
        <SuspiciousCallsChart data={suspiciousCallsData} />
      </div>
    </div>
  );
}
