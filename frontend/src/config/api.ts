export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL 
export const API_ENDPOINTS = {
  // Auth
  LOGIN: API_BASE_URL + '/auth/login',
  REGISTER: API_BASE_URL + '/auth/register',
  FORGOT_PASSWORD: API_BASE_URL + '/auth/forgot-password',
  RESET_PASSWORD: API_BASE_URL + '/auth/reset-password',

  // Users
  USERS: API_BASE_URL + '/users',
  USER_DETAIL: (id: string) => API_BASE_URL + `/users/${id}`,
  USER_RESET_PASSWORD: (id: string) => API_BASE_URL + `/users/${id}/reset-password`,
  USER_AUDIT_LOG: API_BASE_URL + '/users/audit-log',

  // Analytics
  ANALYTICS_OVERVIEW: API_BASE_URL + '/analytics/overview',

  // Notifications
  ADMIN_NOTIFICATIONS: API_BASE_URL + '/notifications/admin',

  // Settings
  ADMIN_SETTINGS: API_BASE_URL + '/settings/admin',
} as const;
