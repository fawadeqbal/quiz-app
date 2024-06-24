import React, { useEffect, useState } from 'react';
import * as quizService from '../../service/quizService';

import * as questionService from '../../service/questionService';
const CreateQuizForm = () => {
  const [quizData, setQuizData] = useState({
    categoryName: '',
    numQuestions: '',
    title: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    questionService.fetchCategories()
      .then(data => {
        setCategories(data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    quizService.createQuiz(quizData)
      .then(response => {
        alert('Quiz created successfully!');
        // Optionally, redirect or perform another action upon successful creation
      })
      .catch(error => {
        console.error('Error creating quiz:', error);
        alert('Failed to create quiz. Please try again.');
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl text-center mb-8">Create Quiz</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={quizData.categoryName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Number of Questions</label>
            <input
              type="number"
              name="numQuestions"
              value={quizData.numQuestions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2">Quiz Title</label>
            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition-colors duration-300"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuizForm;
