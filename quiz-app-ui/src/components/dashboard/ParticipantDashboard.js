import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from '../chatbot/Chatbot';
import * as quizService from '../../service/quizService';

const ParticipantDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    quizService.fetchQuizzes()
      .then(data => setQuizzes(data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl text-center mb-8">Participant Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
            <Link to={`/quiz/${quiz.id}`} className="text-blue-500">Join Quiz</Link>
          </div>
        ))}
      </div>
      <Chatbot />

      {/* Back to Home Button */}
      <div className="mt-8 text-center">
        <Link to="/" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
