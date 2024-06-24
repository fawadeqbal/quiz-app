import React, { useEffect, useState } from 'react';
import * as questionService from '../../service/questionService';

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  useEffect(() => {
    questionService.getAllQuestions()
      .then(data => {
        setQuestions(data);
        setFilteredQuestions(data);
      })
      .catch(error => console.error('Error fetching questions:', error));
      
  },[]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setFilteredQuestions(
      questions.filter(question =>
        question.questionTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
        question.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        question.difficultylevel.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [searchTerm, questions]);

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-screen-lg mx-auto">
      <h2 className="text-3xl mb-6 text-center font-bold">View Questions</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Title</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Category</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.map((q, index) => (
              <tr key={q.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="py-4 px-6 border-b border-gray-200">{q.id}</td>
                <td className="py-4 px-6 border-b border-gray-200">{q.questionTitle}</td>
                <td className="py-4 px-6 border-b border-gray-200">{q.category}</td>
                <td className="py-4 px-6 border-b border-gray-200">{q.difficultylevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default ViewQuestions;
