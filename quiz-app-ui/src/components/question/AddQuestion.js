import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import * as questionService from '../../service/questionService';

const AddQuestion = ({ onQuestionAdded }) => {
  const [question, setQuestion] = useState({
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    difficultyLevel: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
    const fetchCategories = async () => {
      try {
        const categoryData = await questionService.fetchCategories();
        console.log(categoryData)
        setCategories(categoryData);
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (value, name) => {
    setQuestion({
      ...question,
      [name]: value,
    });
  };

  const handleAddQuestion = () => {
    questionService.addQuestion(question)
      .then(response => {
        alert('Question added successfully!');
        onQuestionAdded(response.data);
        // Clear form after successful submission
        setQuestion({
          questionTitle: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          rightAnswer: '',
          difficultyLevel: '',
          category: '',
        });
      })
      .catch(error => console.error('Error adding question:', error));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 font-semibold text-gray-800">Add Single Question</h2>
      <form className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Question Title</label>
          <ReactQuill
            value={question.questionTitle}
            onChange={(value) => handleChange(value, 'questionTitle')}
            className="question-title"
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'size': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']
              ],
            }}
            placeholder="Enter question title"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Option 1</label>
          <input
            type="text"
            name="option1"
            value={question.option1}
            onChange={(e) => handleChange(e.target.value, 'option1')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Option 1"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Option 2</label>
          <input
            type="text"
            name="option2"
            value={question.option2}
            onChange={(e) => handleChange(e.target.value, 'option2')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Option 2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Option 3</label>
          <input
            type="text"
            name="option3"
            value={question.option3}
            onChange={(e) => handleChange(e.target.value, 'option3')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Option 3"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Option 4</label>
          <input
            type="text"
            name="option4"
            value={question.option4}
            onChange={(e) => handleChange(e.target.value, 'option4')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Option 4"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Right Answer</label>
          <input
            type="text"
            name="rightAnswer"
            value={question.rightAnswer}
            onChange={(e) => handleChange(e.target.value, 'rightAnswer')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Right Answer"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Difficulty Level</label>
          <input
            type="text"
            name="difficultyLevel"
            value={question.difficultyLevel}
            onChange={(e) => handleChange(e.target.value, 'difficultyLevel')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Difficulty Level"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={question.category}
            onChange={(e) => handleChange(e.target.value, 'category')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full bg-blue-500 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
