import { API_ENDPOINTS } from '@/config/api';
import { apiRequest } from './request';

export interface AdminSettings {
  userManagement: {
    allowPublicRegistration: boolean;
    requireEmailVerification: boolean;
    passwordPolicy: {
      minLength: number;
      requireSpecialChars: boolean;
      requireNumbers: boolean;
      requireUppercase: boolean;
    };
    defaultUserRole: string;
    autoSendCredentials: boolean;
  };
  security: {
    maxLoginAttempts: number;
    sessionTimeout: number;
    ipWhitelist: string[];
  };
}

export const settingsApi = {
  getAdminSettings: async (): Promise<AdminSettings> => {
    return apiRequest(API_ENDPOINTS.ADMIN_SETTINGS);
  },

  updateAdminSettings: async (settings: AdminSettings): Promise<{ success: boolean; message: string }> => {
    return apiRequest(API_ENDPOINTS.ADMIN_SETTINGS, {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }
};
