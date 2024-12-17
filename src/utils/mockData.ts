import { TimeRange, DashboardStats, CallData, Activity } from '../types/dashboard';

export function generateMockData(timeRange: TimeRange) {
  const stats: Record<TimeRange, DashboardStats> = {
    today: {
      callsScanned: 19829,
      suspiciousCallsPercent: 0.8,
      notificationsSent: 25
    },
    week: {
      callsScanned: 138472,
      suspiciousCallsPercent: 1.2,
      notificationsSent: 187
    },
    month: {
      callsScanned: 592847,
      suspiciousCallsPercent: 0.9,
      notificationsSent: 743
    }
  };

  const generateCallsData = (points: number): CallData[] => {
    return Array.from({ length: points }, (_, i) => ({
      timestamp: new Date(Date.now() - (points - i) * 3600000).toISOString(),
      count: Math.floor(Math.random() * 1000) + 500
    }));
  };

  const dataPoints = {
    today: 24,
    week: 7,
    month: 30
  };

  return {
    stats: stats[timeRange],
    callsData: generateCallsData(dataPoints[timeRange]),
    suspiciousCallsData: generateCallsData(dataPoints[timeRange]),
    activities: [
      {
        channel: 'Google Meet',
        branch: 'New York #3',
        dateTime: '24 Sep 2024 • 09:45AM',
        duration: '2h 56min',
        callId: '2429f644-8f13-42fb-903b-db28296e4e4e',
        status: 'Safe'
      },
      {
        channel: 'CISCO',
        branch: 'Toronto #2',
        dateTime: '24 Sep 2024 • 09:43AM',
        duration: '0h 10min',
        callId: '8302ebed-be85-4fbf-b701-fba5405ce8c',
        status: 'Suspicious'
      }
    ]
  };
}
