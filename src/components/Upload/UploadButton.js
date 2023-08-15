import React from 'react';
import './UploadStyles.css';

function UploadButton({ onUpload }) {
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="upload-button-container">
      <input 
        type="file" 
        id="file" 
        className="file-input" 
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange} 
      />
      <label htmlFor="file" className="upload-label">Upload Resume</label>
    </div>
  );
}

export default UploadButton;
