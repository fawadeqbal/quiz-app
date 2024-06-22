// src/components/quiz/QuizPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../../service/quiz-service';
import axios from 'axios'; // Import Axios for making HTTP requests
import './QuizPage.css';

const QuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null); // State to store the score
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(quizId);
        setQuiz(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionId, response) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: response
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8085/quiz/submit/${quizId}`, 
       Object.keys(answers).map(questionId => ({
          id: questionId,
          response: answers[questionId]
        }))
      );

      // Assuming backend returns the score in response.data
      setScore(response.data);
      setShowModal(true); // Show modal after receiving score

      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Handle errors as needed
    }
  };

  const handleModalClose = () => {
    setShowModal(false); // Close modal
    setScore(null); // Reset score state
  };

  if (loading) return <div className="quiz-page-loading">Loading...</div>;
  if (error) return <div className="quiz-page-error">Error: {error}</div>;
  if (!quiz) return <div className="quiz-page-not-found">Quiz not found</div>;

  return (
    <div className="quiz-page">
      <h1 className="quiz-page-title">{quiz.title}</h1>
      <form onSubmit={handleSubmit} className="quiz-form">
        {quiz.map(question => (
          <div key={question.id} className="quiz-question">
            <h2 className="quiz-question-title">{question.questionTitle}</h2>
            <ul className="quiz-options">
              {['option1', 'option2', 'option3', 'option4'].map(option => (
                <li key={option} className="quiz-option">
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={question[option]}
                      checked={answers[question.id] === question[option]}
                      onChange={() => handleOptionChange(question.id, question[option])}
                    />
                    <span className="quiz-option-text">{question[option]}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit" className="quiz-submit-button">Submit Quiz</button>
      </form>

      {showModal && (
        <div className="quiz-score-modal">
          <div className="quiz-score-modal-content">
            <span className="quiz-score-modal-close" onClick={handleModalClose}>&times;</span>
            <h2 className="quiz-score-modal-title">Quiz Score</h2>
            <p className="quiz-score-modal-text">You scored: {score}</p>
            <button className="quiz-score-modal-close-button" onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
