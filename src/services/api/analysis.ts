import { API_ENDPOINTS } from './config';
import { ApiError } from './errors';
import { AnalysisResponse } from './types';
import { apiRequest } from './request';
import { validateAudioFile, validateYoutubeUrl } from './validation';

export async function analyzeAudioFile(file: File): Promise<AnalysisResponse> {
  try {
    validateAudioFile(file);
    
    const formData = new FormData();
    formData.append('audio_file', file);

    const response = await apiRequest<AnalysisResponse>(API_ENDPOINTS.predict, {
      method: 'POST',
      body: formData
    });

    return response;
  } catch (error) {
    console.error('Audio analysis error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to analyze audio file. Please ensure the file is in the correct format and try again.'
    );
  }
}

export async function analyzeYoutubeUrl(url: string): Promise<AnalysisResponse> {
  try {
    validateYoutubeUrl(url);
    
    const formData = new FormData();
    formData.append('youtube_url', url);

    const response = await apiRequest<AnalysisResponse>(API_ENDPOINTS.predict, {
      method: 'POST',
      body: formData
    });

    return response;
  } catch (error) {
    console.error('YouTube analysis error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to analyze YouTube video. Please ensure the URL is correct and try again.'
    );
  }
}