import React, { useState, useRef } from 'react';
import './App.css';
import logo from './assets/images/logo_transparent.png';
import bgImage from './assets/images/background1.jpg';
import ScoreDisplay from './components/Score/ScoreDisplay';
import { fetchJobKeywords } from './services/api';
import { parseFile } from './services/fileParser';
import { calculateScore } from './services/scorer';
import { handleFileUpload } from './services/fileParser';
import { getResumeScore } from './services/scorer';

function App() {
  const [score, setScore] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleRetake = () => {
    setScore(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = async (e) => {
  try {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    const parsedInformation = await handleFileUpload(e);
    const jobId = 'job_shortcode_example';
    const jobKeywords = await fetchJobKeywords(jobId);
   const calculatedScore = await getResumeScore(parsedInformation, jobKeywords);

    setScore(calculatedScore);
  } catch (error) {
    console.error(error);
    // Here you might want to update the UI to inform the user about the error.
    // For example, you could set an 'error' state variable and display an error message.
  }
};


  return (
    <div className='App'>
      <img src={logo} alt='Company Logo' className='logo' />
      <div className='image-container'>
        <img src={bgImage} alt='Background' className='image-background' />
        <div className='file-input-container'>
          <input
            type='file'
            id='file'
            className='file-input'
            accept='.pdf,.doc,.docx'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <label htmlFor='file' className='upload-label'>
            Upload Resume
          </label>
        </div>
        <div className='overlay'></div>
      </div>
      {score && <ScoreDisplay score={score} onRetake={handleRetake} />}
    </div>
  );
}

export default App;
