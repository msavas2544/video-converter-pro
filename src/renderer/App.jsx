import React, { useState, useCallback } from 'react';
import { VideoConverter } from './components/VideoConverter';
import { ProgressBar } from './components/ProgressBar';

export default function App() {
  const [conversionProgress, setConversionProgress] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleConversionStart = useCallback(() => {
    setIsConverting(true);
    setConversionProgress(0);
  }, []);

  const handleConversionProgress = useCallback((progress) => {
    setConversionProgress(progress);
  }, []);

  const handleConversionComplete = useCallback(() => {
    setIsConverting(false);
    setConversionProgress(null);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 Video Converter</h1>
        <p>Gelişmiş video dönüştürücü - Çoklu format desteği</p>
      </header>

      <VideoConverter
        onConversionStart={handleConversionStart}
        onConversionProgress={handleConversionProgress}
        onConversionComplete={handleConversionComplete}
        isConverting={isConverting}
      />

      {isConverting && (
        <ProgressBar 
          progress={conversionProgress} 
          label="Video dönüştürülüyor..."
        />
      )}
    </div>
  );
}
