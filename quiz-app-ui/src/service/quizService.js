import axios from 'axios';

const baseURL = 'http://localhost:8085/quiz';

export const createQuiz = async (quizData) => {
    try {
      const response = await axios.post(`${baseURL}/create`, quizData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Function to fetch quiz questions by ID
export const fetchQuizById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
};

// Function to submit quiz responses
export const submitQuizResponses = async (id, responses) => {
  try {
    const response = await axios.post(`${baseURL}/submit/${id}`, responses);
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz responses:', error);
    throw error;
  }
};


export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${baseURL}/get`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

