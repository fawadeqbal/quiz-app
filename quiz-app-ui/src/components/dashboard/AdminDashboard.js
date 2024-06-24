import React, { useState } from 'react';
import AddQuestion from '../question/AddQuestion';
import ViewQuestions from '../question/ViewQuestions';
import UploadQuestions from '../question/UploadQuestions';
import CreateQuizForm from '../quiz/CreateQuiz';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('addQuestion');

  const handleQuestionAdded = (newQuestion) => {
    // Handle actions after adding a question
  };

  const handleQuestionsUploaded = (newQuestions) => {
    // Handle actions after uploading questions
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl text-center mb-8">Admin Dashboard</h1>

      {/* Navigation Bar */}
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setActiveView('addQuestion')}
          className={`py-2 px-4 rounded ${activeView === 'addQuestion' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
        >
          Add Question
        </button>
        <button
          onClick={() => setActiveView('viewQuestions')}
          className={`py-2 px-4 rounded ${activeView === 'viewQuestions' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
        >
          View Questions
        </button>
        <button
          onClick={() => setActiveView('uploadQuestions')}
          className={`py-2 px-4 rounded ${activeView === 'uploadQuestions' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
        >
          Upload Questions
        </button>
        <button
          onClick={() => setActiveView('createQuiz')}
          className={`py-2 px-4 rounded ${activeView === 'createQuiz' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
        >
          Create Quiz
        </button>
      </div>

      {/* Conditional Rendering of Panels */}
      {activeView === 'addQuestion' && <AddQuestion onQuestionAdded={handleQuestionAdded} />}
      {activeView === 'viewQuestions' && <ViewQuestions />}
      {activeView === 'uploadQuestions' && <UploadQuestions onQuestionsUploaded={handleQuestionsUploaded} />}
      {activeView === 'createQuiz' && <CreateQuizForm />}
    </div>
  );
};

export default AdminDashboard;
