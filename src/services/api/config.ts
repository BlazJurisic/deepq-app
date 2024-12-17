// API Configuration
export const API_BASE_URL = 'https://ohio-homes-bryan-demonstrates.trycloudflare.com';

export const API_ENDPOINTS = {
  predict: `${API_BASE_URL}/predict`
} as const;

// Request Configuration
export const API_TIMEOUT = 30000; // 30 seconds

// File Validation
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const SUPPORTED_AUDIO_FORMATS = ['audio/wav', 'audio/mp3', 'audio/flac'];

// URL Validation
export const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;