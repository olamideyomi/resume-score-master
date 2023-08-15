// services/scorer.js

export const calculateKeywordMatchScore = (resumeText, keywords) => {
  const totalKeywords = keywords.length;
  let matchedKeywords = 0;

  keywords.forEach(keyword => {
    const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
    if (resumeText.match(regex)) {
      matchedKeywords += 1;
    }
  });

  return (matchedKeywords / totalKeywords) * 100;
};

export const calculateEducationScore = (resumeText, requiredEducation) => {
  const regex = new RegExp('\\b' + requiredEducation + '\\b', 'gi');
  return resumeText.match(regex) ? 20 : 0;
};

export const calculateExperienceScore = (resumeText, yearsOfExperience) => {
  const experienceWords = ['experience', 'worked', 'job', 'career'];
  let experienceScore = 0;

  experienceWords.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    if (resumeText.match(regex)) {
      experienceScore += 5;
    }
  });

  return Math.min(experienceScore, yearsOfExperience * 5);
};

export const calculateSkillsScore = (resumeText, requiredSkills) => {
  let skillsScore = 0;
  requiredSkills.forEach(skill => {
    const regex = new RegExp('\\b' + skill + '\\b', 'gi');
    if (resumeText.match(regex)) {
      skillsScore += 10;
    }
  });

  return skillsScore;
};

export const calculateOverallScore = (keywordMatchScore, educationScore, experienceScore, skillsScore) => {
  const keywordWeight = 0.4;
  const educationWeight = 0.2;
  const experienceWeight = 0.3;
  const skillsWeight = 0.1;

  const overallScore =
    (keywordMatchScore * keywordWeight) +
    (educationScore * educationWeight) +
    (experienceScore * experienceWeight) +
    (skillsScore * skillsWeight);

  return overallScore;
};

export const getResumeScore = async (resumeText, jobKeywords, requiredEducation, yearsOfExperience, requiredSkills) => {
  try {
    const keywordMatchScore = calculateKeywordMatchScore(resumeText, jobKeywords);
    const educationScore = calculateEducationScore(resumeText, requiredEducation);
    const experienceScore = calculateExperienceScore(resumeText, yearsOfExperience);
    const skillsScore = calculateSkillsScore(resumeText, requiredSkills);

    const overallScore = calculateOverallScore(keywordMatchScore, educationScore, experienceScore, skillsScore);
  
    return {
      overallScore: overallScore.toFixed(2),
      keywordMatchScore: keywordMatchScore.toFixed(2),
      educationScore: educationScore.toFixed(2),
      experienceScore: experienceScore.toFixed(2),
      skillsScore: skillsScore.toFixed(2),
    };
  } catch (error) {
    throw error;
  }
};
