import { API_ENDPOINTS } from '../../config/api';
import { apiRequest } from './request';

export interface AnalyticsOverview {
  totalScans: number;
  detectionRate: number;
  avgConfidence: number;
  processingTime: number;
  userStats: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  detectionBreakdown: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  modelPerformance: Array<{
    model: string;
    accuracy: number;
    speed: number;
    load: number;
  }>;
}

export const analyticsApi = {
  getOverview: async (): Promise<AnalyticsOverview> => {
    return apiRequest(API_ENDPOINTS.ANALYTICS_OVERVIEW);
  }
};
