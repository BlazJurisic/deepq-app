import { useState, useEffect } from 'react';
import { TimeRange, DashboardStats, CallData, Activity } from '../types/dashboard';
import { generateMockData } from '../utils/mockData';

export function useDashboardData(timeRange: TimeRange) {
  const [stats, setStats] = useState<DashboardStats>({
    callsScanned: 0,
    suspiciousCallsPercent: 0,
    notificationsSent: 0
  });
  const [callsData, setCallsData] = useState<CallData[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [suspiciousCallsData, setSuspiciousCallsData] = useState<CallData[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = generateMockData(timeRange);
    setStats(data.stats);
    setCallsData(data.callsData);
    setActivities(data.activities);
    setSuspiciousCallsData(data.suspiciousCallsData);
  }, [timeRange]);

  return {
    stats,
    callsData,
    activities,
    suspiciousCallsData
  };
}