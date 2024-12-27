import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import FilePreview from './FilePreview';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onCancelFile: () => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export default function AudioUploader({ 
  onFileSelect, 
  selectedFile, 
  onCancelFile,
  onAnalyze,
  isLoading 
}: AudioUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/wav': ['.wav'],
      'audio/mp3': ['.mp3'],
      'audio/flac': ['.flac']
    },
    multiple: false,
    disabled: isLoading
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-purple-600 bg-purple-600/10' 
            : 'border-gray-300 hover:border-purple-600'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-content-secondary" />
        <p className="text-content-primary font-medium">
          {isDragActive ? 'Drop the audio file here' : 'Drag & drop an audio file here'}
        </p>
        <p className="text-content-secondary text-sm mt-2">
          Supported formats: WAV, MP3, FLAC (max 10MB)
        </p>
      </div>

      {selectedFile && (
        <FilePreview
          file={selectedFile}
          onCancel={onCancelFile}
          onAnalyze={onAnalyze}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
