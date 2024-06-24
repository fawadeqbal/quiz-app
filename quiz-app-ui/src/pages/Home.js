// Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Quiz App</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/admin" className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg block text-xl font-semibold">
          Admin Dashboard
        </Link>
        <Link to="/participate" className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg block text-xl font-semibold">
        Participant
        </Link>
      </div>
    </div>
  );
};

export default Home;
