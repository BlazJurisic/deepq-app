import React from 'react';
import { X, FileAudio, Loader2 } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  onCancel: () => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export default function FilePreview({ file, onCancel, onAnalyze, isLoading }: FilePreviewProps) {
  return (
    <div className="mt-4 p-4 bg-background-primary rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <FileAudio className="w-5 h-5 text-purple-600" />
          <span className="text-content-primary font-medium truncate max-w-[200px]">
            {file.name}
          </span>
        </div>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-background-card rounded-full text-content-secondary hover:text-content-primary transition-colors"
          disabled={isLoading}
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-content-secondary">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </span>
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Analyze Audio</span>
          )}
        </button>
      </div>
    </div>
  );
}
