import { API_TIMEOUT } from './config';
import { ApiError } from './errors';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = API_TIMEOUT, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    // Get the response body as text first
    const responseText = await response.text();
    let responseData;
    
    try {
      // Try to parse it as JSON
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch {
      // If it's not JSON, use the text as is
      responseData = responseText;
    }

    if (!response.ok) {
      throw new ApiError(
        responseData?.detail || `Request failed with status ${response.status}`,
        response.status,
        responseData
      );
    }

    // Return parsed response data
    return { 
      ok: response.ok,
      status: response.status,
      json: () => Promise.resolve(responseData)
    } as Response;

  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timed out. Please try again.');
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}
