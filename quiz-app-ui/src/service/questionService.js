import axios from 'axios';

const baseURL = 'http://localhost:8085/question';

// Function to fetch categories from the server
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${baseURL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const uploadQuestions = async (jsonData) => {
    try {
        const response = await axios.post(`${baseURL}/addQuestions`, jsonData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllQuestions = async () => {
    try {
      const response = await axios.get(`${baseURL}/allQuestions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Function to add a new question
export const addQuestion = async (question) => {
    try {
        const response = await axios.post(`${baseURL}/add`, question);
        return response.data;
    } catch (error) {
        console.error('Error adding question:', error);
        throw error;
    }
};
