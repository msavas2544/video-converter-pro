import React from 'react';

export function ProgressBar({ progress, label }) {
  return (
    <div className="progress-container">
      <div className="progress-label">{label}</div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-text">{progress}%</div>
    </div>
  );
}
