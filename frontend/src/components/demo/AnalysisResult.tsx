import React from 'react';
import { CheckCircle, AlertTriangle, Loader2, Wand2, AlertOctagon } from 'lucide-react';

interface ChunkResult {
  chunk: number;
  predicted_classes: string[];
  confidence_scores: number[];
}

interface AnalysisResult {
  final_decision: string;
  chunk_results: ChunkResult[];
}

interface AnalysisResultProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

function formatConfidence(score: number): string {
  return (score * 100).toFixed(2) + '%';
}

function ChunkResultCard({ chunk, predicted_classes, confidence_scores }: ChunkResult) {
  return (
    <div className="bg-background-primary rounded p-3 border">
      <div className="flex justify-between items-center mb-2">
        <span className="text-content-primary font-medium">Chunk {chunk}</span>
        <span className="text-xs text-content-secondary">
          {predicted_classes.length} predictions
        </span>
      </div>
      <div className="space-y-1">
        {predicted_classes.map((prediction, index) => {
          // Determine color based on prediction type
          let bgColor = '';
          let textColor = '';
          
          if (prediction.includes('Spoofed')) {
            bgColor = 'bg-red-500/10';
            textColor = 'text-red-500';
          } else if (prediction.includes('Non-spoofed')) {
            bgColor = 'bg-yellow-500/10';
            textColor = 'text-yellow-500';
          } else {
            bgColor = 'bg-yellow-500/10';
            textColor = 'text-yellow-500';
          }

          const confidence = confidence_scores[index];

          return (
            <div
              key={index}
              className={`flex items-center justify-between text-sm px-2 py-1 rounded ${bgColor}`}
            >
              <span className={textColor}>{prediction}</span>
              <span className={`ml-2 font-medium ${textColor}`}>
                {formatConfidence(confidence)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AnalysisResult({ result, isLoading, error }: AnalysisResultProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <p className="text-content-secondary">Analyzing audio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center text-content-secondary p-8">
        <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Upload an audio file or provide a YouTube URL to start analysis</p>
      </div>
    );
  }

  // Determine the type of result
  const decision = result.final_decision.toLowerCase();
  let statusColor = '';
  let statusBg = '';
  let Icon;
  let statusText = result.final_decision;

  if (decision.includes('deepfake') || decision.includes('spoofed')) {
    // Deepfake detected - Red with alert octagon
    statusColor = 'text-red-500';
    statusBg = 'bg-red-500/10 border-red-500/20';
    Icon = AlertOctagon;
  } else if (decision.includes('suspicious') || decision.includes('sussy')) {
    // Suspicious - Yellow with alert triangle
    statusColor = 'text-yellow-500';
    statusBg = 'bg-yellow-500/10 border-yellow-500/20';
    Icon = AlertTriangle;
  } else if (decision.includes('clean') || decision.includes('real')) {
    // Clean - Green with checkmark
    statusColor = 'text-green-500';
    statusBg = 'bg-green-500/10 border-green-500/20';
    Icon = CheckCircle;
  } else {
    // Default to suspicious if we can't determine the state
    statusColor = 'text-yellow-500';
    statusBg = 'bg-yellow-500/10 border-yellow-500/20';
    Icon = AlertTriangle;
  }

  return (
    <div className="space-y-6">
      {/* Final Decision */}
      <div className={`p-6 rounded-lg border ${statusBg}`}>
        <div className="flex items-center space-x-3">
          <Icon className={`w-8 h-8 ${statusColor} flex-shrink-0`} />
          <div>
            <h3 className={`text-lg font-semibold ${statusColor}`}>
              {statusText}
            </h3>
            <p className="text-content-secondary">
              Analysis completed across {result.chunk_results.length} audio chunks
            </p>
          </div>
        </div>
      </div>

      {/* Chunk Results */}
      <div>
        <h4 className="text-content-primary font-medium mb-4">Detailed Analysis</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.chunk_results.map((chunkResult) => (
            <ChunkResultCard key={chunkResult.chunk} {...chunkResult} />
          ))}
        </div>
      </div>
    </div>
  );
}
