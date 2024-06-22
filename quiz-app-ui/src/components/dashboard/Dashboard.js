// src/components/dashboard/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Create a CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/add-quiz">Add New Quiz</Link>
        </li>
        <li>
          <Link to="/quiz">View All Quizzes</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Dashboard;
