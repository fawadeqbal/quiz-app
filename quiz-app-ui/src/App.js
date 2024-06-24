import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import Quiz from './components/quiz/Quiz';
import CreateQuiz from './components/quiz/CreateQuiz';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ParticipantDashboard from './components/dashboard/ParticipantDashboard';
import Home from './pages/Home';

function App() {
  return (
      <div className="min-h-screen bg-gray-100">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/participate" element={<ParticipantDashboard />} />
        </Routes>
      </div>
  );
}

export default App;
