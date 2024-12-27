export type TimeRange = 'today' | 'week' | 'month';

export interface DashboardStats {
  callsScanned: number;
  suspiciousCallsPercent: number;
  notificationsSent: number;
}

export interface CallData {
  timestamp: string;
  count: number;
}

export interface Activity {
  channel: string;
  branch: string;
  dateTime: string;
  duration: string;
  callId: string;
  status: 'Safe' | 'Suspicious';
}
