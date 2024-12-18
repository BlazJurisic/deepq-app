import { API_ENDPOINTS } from '../../config/api';
import { apiRequest } from './request';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    lastLogin: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    return apiRequest<AuthResponse>(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: formData
    });
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return apiRequest(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    return apiRequest(API_ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ token, password })
    });
  }
};
