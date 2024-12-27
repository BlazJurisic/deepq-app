export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Users
  USERS: '/users',
  USER_DETAIL: (id: string) => `/users/${id}`,
  USER_RESET_PASSWORD: (id: string) => `/users/${id}/reset-password`,
  USER_AUDIT_LOG: '/users/audit-log',

  // Analytics
  ANALYTICS_OVERVIEW: '/analytics/overview',

  // Notifications
  ADMIN_NOTIFICATIONS: '/notifications/admin',

  // Settings
  ADMIN_SETTINGS: '/settings/admin',
} as const;
