import { API_ENDPOINTS } from '../../config/api';
import { apiRequest } from './request';
import { User } from '../../types/user';

export interface CreateUserData {
  name: string;
  email: string;
  role: string;
  sendEmail?: boolean;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  status?: 'active' | 'inactive';
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    return apiRequest(API_ENDPOINTS.USERS);
  },

  create: async (userData: CreateUserData) => {
    return apiRequest(API_ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  update: async (userId: string, userData: UpdateUserData) => {
    return apiRequest(API_ENDPOINTS.USER_DETAIL(userId), {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },

  delete: async (userId: string) => {
    return apiRequest(API_ENDPOINTS.USER_DETAIL(userId), {
      method: 'DELETE'
    });
  },

  resetPassword: async (userId: string, sendEmail: boolean) => {
    return apiRequest(API_ENDPOINTS.USER_RESET_PASSWORD(userId), {
      method: 'POST',
      body: JSON.stringify({ sendEmail })
    });
  }
};
