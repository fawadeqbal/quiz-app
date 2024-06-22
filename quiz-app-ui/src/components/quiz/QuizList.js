// src/components/quiz/QuizList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizes, createQuiz } from '../../service/quiz-service'; // Assuming you have service functions for API calls
import './QuizList.css'
const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizData, setNewQuizData] = useState({ categoryName: '', numQuestions: 0, title: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllQuizes();
    setQuizzes(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuizData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      await createQuiz(newQuizData);
      setNewQuizData({ categoryName: '', numQuestions: 0, title: '' }); // Reset form data
      fetchData(); // Refresh quiz list after creating new quiz
    } catch (error) {
      console.error('Error creating quiz:', error);
      // Handle error
    }
  };

  return (
    <div className="quiz-list">
      <h2>Quiz List</h2>
      <div className="quiz-list-items">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="quiz-item">
            <Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link>
          </div>
        ))}
      </div>

      <h2>Add New Quiz</h2>
      <form onSubmit={handleCreateQuiz} className="add-quiz-form">
        <div className="form-group">
          <label>Category Name:</label>
          <input type="text" name="categoryName" value={newQuizData.categoryName} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Number of Questions:</label>
          <input type="number" name="numQuestions" value={newQuizData.numQuestions} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Quiz Title:</label>
          <input type="text" name="title" value={newQuizData.title} onChange={handleInputChange} required />
        </div>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizList;
