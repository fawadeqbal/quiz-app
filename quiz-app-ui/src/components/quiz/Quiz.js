import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as quizService from '../../service/quizService';

const Quiz = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null);

  // Fetch quiz questions based on ID when component mounts
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizData = await quizService.fetchQuizById(id);
        setQuestions(quizData);
        
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [id]);

  // Start timer for current question


  // Handle change in selected option for each question
  const handleChange = (questionId, value) => {
    setResponses(prevResponses => {
      const existingResponseIndex = prevResponses.findIndex(response => response.id === questionId);
      if (existingResponseIndex !== -1) {
        // Update existing response
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex].response = value;
        return updatedResponses;
      } else {
        // Add new response
        return [...prevResponses, { id: questionId, response: value }];
      }
    });
    
    // Update UI to show selected option in green
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          selectedOption: value
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  // Handle submission of quiz responses
  const handleSubmit = () => {
    clearInterval(timerInterval); // Stop timer
    quizService.submitQuizResponses(id, responses)
      .then(response => {
        setScore(response);
        setShowScoreModal(true);
      })
      .catch(error => {
        console.error('Error submitting quiz responses:', error);
        // Handle error if needed
      });
  };

  // Close score modal
  const handleCloseModal = () => {
    setShowScoreModal(false);
    // Optionally, reset responses or navigate to another page
    setResponses([]);
    setCurrentQuestionIndex(0);
    history('/participate'); // Navigate to participant dashboard
  };

  // Move to the next question or submit the quiz if on the last question
  const handleNext = () => {
    clearInterval(timerInterval); // Stop timer for current question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
     
    } else {
      handleSubmit(); // Submit quiz if on the last question
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl text-center mb-8 text-blue-500">Quiz Time!</h1>
      {questions.length > 0 && (
        <div key={questions[currentQuestionIndex].id} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl mb-4">{questions[currentQuestionIndex].questionTitle}</h2>
          <div className="grid grid-cols-2 gap-4">
            {['option1', 'option2', 'option3', 'option4'].map((optionKey, optionIndex) => (
              <label
                key={optionIndex}
                className={`block p-2 rounded-lg border cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 ${
                  questions[currentQuestionIndex].selectedOption === questions[currentQuestionIndex][optionKey] ? 'bg-green-200 shadow-md' : 'hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={questions[currentQuestionIndex][optionKey]}
                  onChange={() => handleChange(questions[currentQuestionIndex].id, questions[currentQuestionIndex][optionKey])}
                  checked={questions[currentQuestionIndex].selectedOption === questions[currentQuestionIndex][optionKey]}
                  className="mr-2 hidden"
                />
                {questions[currentQuestionIndex][optionKey]}
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">Time left: {timer} seconds</p>
              {/* Disable Next button when time runs out */}
              <button onClick={handleNext} disabled={timer === 0} className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 ${timer === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Score Modal */}
      {showScoreModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Quiz Score</h2>
            <p className="text-lg">Correct Answers: {score}</p>
            <button onClick={handleCloseModal} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition-colors duration-300">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
