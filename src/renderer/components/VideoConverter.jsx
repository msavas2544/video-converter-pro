import React, { useState, useRef } from 'react';

export function VideoConverter({ onConversionStart, onConversionProgress, onConversionComplete, isConverting }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [quality, setQuality] = useState('medium');
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { value: 'mp4', label: 'MP4 (H.264)' },
    { value: 'avi', label: 'AVI' },
    { value: 'mkv', label: 'MKV' },
    { value: 'mov', label: 'MOV' },
    { value: 'flv', label: 'FLV' },
    { value: 'wmv', label: 'WMV' },
    { value: 'webm', label: 'WebM' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Düşük Kalite (Küçük boyut)' },
    { value: 'medium', label: 'Orta Kalite' },
    { value: 'high', label: 'Yüksek Kalite' },
    { value: 'ultra', label: 'Ultra Kalite (Büyük boyut)' }
  ];

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    setSelectedFiles(videoFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) return;
    
    onConversionStart();
    
    // Simulated conversion process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      onConversionProgress(i);
    }
    
    onConversionComplete();
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="video-converter">
      <div className="file-drop-zone" 
           onDrop={handleDrop}
           onDragOver={handleDragOver}
           onClick={() => fileInputRef.current?.click()}>
        <div className="drop-content">
          <div className="drop-icon">📁</div>
          <p>Video dosyalarını buraya sürükleyin veya tıklayın</p>
          <small>Desteklenen formatlar: MP4, AVI, MKV, MOV, FLV, WMV, WebM</small>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="video/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <h3>Seçilen Dosyalar ({selectedFiles.length})</h3>
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-item">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              <button onClick={() => removeFile(index)} className="remove-btn">✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="conversion-settings">
        <div className="setting-group">
          <label>Çıkış Formatı:</label>
          <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
            {supportedFormats.map(format => (
              <option key={format.value} value={format.value}>{format.label}</option>
            ))}
          </select>
        </div>

        <div className="setting-group">
          <label>Kalite:</label>
          <select value={quality} onChange={(e) => setQuality(e.target.value)}>
            {qualityOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        className="convert-btn"
        onClick={handleConvert}
        disabled={selectedFiles.length === 0 || isConverting}
      >
        {isConverting ? 'Dönüştürülüyor...' : `${selectedFiles.length} Dosyayı Dönüştür`}
      </button>
    </div>
  );
}
