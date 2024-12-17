export async function analyzeAudioFile(file: File) {
  const formData = new FormData();
  formData.append('audio_file', file);

  try {
    const response = await fetch('https://ohio-homes-bryan-demonstrates.trycloudflare.com/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze audio file');
    }

    return response.json();
  } catch (error) {
    console.error('Audio analysis error:', error);
    throw new Error('Failed to analyze audio file. Please try again.');
  }
}

export async function analyzeYoutubeUrl(url: string) {
  const formData = new FormData();
  formData.append('youtube_url', url);

  try {
    const response = await fetch('https://ohio-homes-bryan-demonstrates.trycloudflare.com/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze YouTube video');
    }

    return response.json();
  } catch (error) {
    console.error('YouTube analysis error:', error);
    throw new Error('Failed to analyze YouTube video. Please try again.');
  }
}