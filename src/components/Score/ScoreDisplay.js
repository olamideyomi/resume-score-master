import React, { useState } from 'react';
import './ScoreStyles.css';

function ScoreDisplay({ score, onRetake }) {
  const [showDetails, setShowDetails] = useState(false);
    
  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  }

  let feedbackMessage = '';
  let feedbackClass = '';

  if (score >= 80) {
    feedbackMessage = 'Great job! Your resume is in great shape!';
    feedbackClass = 'great';
  } else if (score >= 50) {
    feedbackMessage = 'Your resume could use some work.';
    feedbackClass = 'okay';
  } else {
    feedbackMessage = 'Your resume needs a lot of work.';
    feedbackClass = 'bad';
  }

  return (
    <div className={`score-container ${feedbackClass}`}>
      <h2>Your Resume Score</h2>
      <div className="score-value">{score}</div>
      <button className="details-button" onClick={handleDetailsClick}>See Details</button>
      {showDetails && (
        <div className="score-details">
          Mock Breakdown:
          <ul>
            <li>Keywords Match: 70%</li>
            <li>Experience Level: 80%</li>
            <li>Education Match: 90%</li>
          </ul>
        </div>
      )}
      <button className="retake-button" onClick={onRetake}>Upload Another Resume</button>
      <p className="feedback-message">{feedbackMessage}</p>
    </div>
  );
}

export default ScoreDisplay;
