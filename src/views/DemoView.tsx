import React, { useState } from 'react';
import AudioUploader from '../components/demo/AudioUploader';
import YoutubeInput from '../components/demo/YoutubeInput';
import AnalysisResult from '../components/demo/AnalysisResult';
import { analyzeAudioFile, analyzeYoutubeUrl } from '../services/api/analysis';
import { getErrorMessage } from '../services/api/errors';
import { AnalysisResponse } from '../services/api/types';
import { AudioWaveform } from 'lucide-react';

export default function DemoView() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
    setResult(null);
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
    setError(null);
    setResult(null);
  };

  const handleYoutubeUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setSelectedFile(null);

    try {
      const analysisResult = await analyzeYoutubeUrl(url);
      setResult(analysisResult);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeAudioFile(selectedFile);
      setResult(analysisResult);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <AudioWaveform className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-content-primary">Audio Analysis Demo</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-background-card rounded-lg p-6 border">
            <h3 className="text-lg font-semibold text-content-primary mb-4">Upload Audio File</h3>
            <AudioUploader
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onCancelFile={handleCancelFile}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-background-card rounded-lg p-6 border">
            <h3 className="text-lg font-semibold text-content-primary mb-4">Analyze YouTube Video</h3>
            <YoutubeInput onUrlSubmit={handleYoutubeUrl} isLoading={isLoading} />
          </div>
        </div>

        <div className="bg-background-card rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-content-primary mb-4">Analysis Results</h3>
          <AnalysisResult
            result={result}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}