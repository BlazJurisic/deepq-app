export interface DeepfakeStats {
  totalScans: number;
  detectionRate: number;
  avgConfidence: number;
  processingTime: number;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export interface DetectionBreakdown {
  category: string;
  count: number;
  percentage: number;
}

export interface ModelPerformance {
  model: string;
  accuracy: number;
  speed: number;
  load: number;
}
