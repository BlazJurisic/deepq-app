import { MAX_FILE_SIZE, SUPPORTED_AUDIO_FORMATS, YOUTUBE_URL_REGEX } from './config';
import { ApiError } from './errors';
import { AnalysisResponse } from './types';

export function validateAudioFile(file: File): void {
  if (!file) {
    throw new ApiError('No file provided');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ApiError('File size too large. Maximum size is 10MB.');
  }

  const fileType = file.type.toLowerCase();
  if (!SUPPORTED_AUDIO_FORMATS.includes(fileType)) {
    throw new ApiError(
      `Unsupported file format: ${fileType}. Please use WAV, MP3, or FLAC files only.`
    );
  }
}

export function validateYoutubeUrl(url: string): void {
  if (!url?.trim()) {
    throw new ApiError('No URL provided');
  }

  if (!YOUTUBE_URL_REGEX.test(url)) {
    throw new ApiError('Invalid YouTube URL. Please provide a valid YouTube video URL.');
  }
}

export function validateAnalysisResponse(response: unknown): asserts response is AnalysisResponse {
  if (!response || typeof response !== 'object') {
    throw new ApiError('Invalid response format: expected an object');
  }

  const typedResponse = response as Partial<AnalysisResponse>;

  if (typeof typedResponse.final_decision !== 'string') {
    throw new ApiError('Invalid response format: missing or invalid final_decision');
  }

  if (!Array.isArray(typedResponse.chunk_results)) {
    throw new ApiError('Invalid response format: missing or invalid chunk_results');
  }

  for (const chunk of typedResponse.chunk_results) {
    if (!chunk || typeof chunk !== 'object') {
      throw new ApiError('Invalid response format: invalid chunk result');
    }
    
    if (typeof chunk.chunk !== 'number') {
      throw new ApiError('Invalid response format: chunk number must be a number');
    }
    
    if (!Array.isArray(chunk.predicted_classes)) {
      throw new ApiError('Invalid response format: predicted_classes must be an array');
    }
    
    if (!chunk.predicted_classes.every(c => typeof c === 'string')) {
      throw new ApiError('Invalid response format: predicted_classes must contain only strings');
    }
  }
}
