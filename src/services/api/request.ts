import { API_TIMEOUT } from './config';
import { ApiError } from './errors';
import { ApiRequestOptions } from './types';
import { validateAnalysisResponse } from './validation';

export async function apiRequest<T>(
  url: string, 
  options: ApiRequestOptions = {}
): Promise<T> {
  const { timeout = API_TIMEOUT, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'accept': 'application/json',
        ...fetchOptions.headers,
      }
    });

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new ApiError('Invalid response format: not JSON');
      }
    }

    if (!response.ok) {
      throw new ApiError(
        data.detail || data.message || data.error || 'Request failed',
        response.status,
        data
      );
    }

    // Validate response format for analysis endpoints
    if (url.includes('/predict')) {
      validateAnalysisResponse(data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timed out');
      }
      if (error instanceof SyntaxError) {
        throw new ApiError('Invalid response format');
      }
      throw new ApiError(error.message);
    }
    
    throw new ApiError('An unexpected error occurred');
  } finally {
    clearTimeout(timeoutId);
  }
}
