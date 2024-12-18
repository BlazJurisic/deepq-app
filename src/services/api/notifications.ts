import { API_ENDPOINTS } from '@/config/api';
import { apiRequest } from './request';
import { Notification } from '@/types/notification';

export const notificationsApi = {
  getAdminNotifications: async (): Promise<Notification[]> => {
    return apiRequest(API_ENDPOINTS.ADMIN_NOTIFICATIONS);
  }
};
