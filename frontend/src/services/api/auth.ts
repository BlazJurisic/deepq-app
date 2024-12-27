import { API_BASE_URL, API_ENDPOINTS } from '../../config/api';
import { apiRequest } from './request';

export interface LoginCredentials {
  username: string;
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
    const formBody = new URLSearchParams();
    formBody.append('grant_type', ''); // Include all expected fields, even if empty
    formBody.append('username', credentials.username);
    formBody.append('password', credentials.password);
    formBody.append('scope', '');
    formBody.append('client_id', '');
    formBody.append('client_secret', '');
    console.log(formBody.toString())
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json', // Match the curl request
      },
      body: formBody.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    return {
      token: data.access_token, // Adjust according to response
      user: {
        // Populate user data if available or adjust response model
      },
    };
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
