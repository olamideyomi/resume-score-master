// services/api.js

import axios from 'axios';

// Retrieve these values from a .env file or environment variable for security
const WORKABLE_API_TOKEN = process.env.REACT_APP_WORKABLE_API_TOKEN;
const WORKABLE_SUBDOMAIN = process.env.REACT_APP_WORKABLE_SUBDOMAIN;

const apiClient = axios.create({
  baseURL: `https://${WORKABLE_SUBDOMAIN}.workable.com/spi/v3/`,
  headers: {
    'Authorization': `Bearer ${WORKABLE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const fetchJobDetails = async (shortcode) => {
  try {
    const response = await apiClient.get(`jobs/${shortcode}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching the details for job shortcode ${shortcode}:`, error);
    throw error;
  }
};

export const fetchJobKeywords = async (shortcode) => {
  try {
    const response = await apiClient.get(`jobs/${shortcode}`);
    return response.data.keywords;
  } catch (error) {
    console.error(`There was an error fetching the keywords for job shortcode ${shortcode}:`, error);
    throw error;
  }
};

// Add more API calls here as needed

// Example: Fetching a list of all jobs
export const fetchAllJobs = async () => {
  try {
    const response = await apiClient.get('jobs');
    return response.data.jobs;
  } catch (error) {
    console.error('There was an error fetching the list of all jobs:', error);
    throw error;
  }
};

