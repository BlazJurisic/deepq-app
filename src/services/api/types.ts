export interface ChunkResult {
  chunk: number;
  predicted_classes: string[];
}

export interface AnalysisResponse {
  final_decision: string;
  chunk_results: ChunkResult[];
}

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

export interface ApiRequestOptions extends RequestInit {
  timeout?: number;
}