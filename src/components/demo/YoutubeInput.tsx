import React, { useState } from 'react';
import { Youtube, Loader2 } from 'lucide-react';

interface YoutubeInputProps {
  onUrlSubmit: (url: string) => void;
  isLoading?: boolean;
}

export default function YoutubeInput({ onUrlSubmit, isLoading }: YoutubeInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Youtube className="w-6 h-6 text-content-secondary" />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="flex-1 px-4 py-2 bg-background-primary border rounded-lg text-content-primary focus:ring-2 focus:ring-purple-500/30 focus:outline-none"
        />
      </div>
      
      {url.trim() && (
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Analyze YouTube Video</span>
          )}
        </button>
      )}
    </form>
  );
}