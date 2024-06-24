import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as questionService from '../../service/questionService';

const UploadQuestions = ({ onQuestionsUploaded }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    uploadFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.json' });

  const uploadFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        await questionService.uploadQuestions(jsonData);
        alert('Questions added successfully!');
        onQuestionsUploaded(jsonData); // Optional: Pass back uploaded data for display/update
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-3xl mb-6 font-bold">Upload Questions from JSON File</h2>

      {/* Dropzone */}
      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 mb-6 ${isDragActive ? 'bg-gray-100' : 'bg-white'}`}>
        <input {...getInputProps()} />
        <p className="text-lg text-gray-600">Drag 'n' drop a JSON file here, or click to select file</p>
      </div>

      {/* Upload Button */}
      <button
        type="button"
        className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition duration-300"
        onClick={() => document.getElementById('fileInput').click()} // Optional: If you have a hidden file input
      >
        Upload File
      </button>
    </div>
  );
};

export default UploadQuestions;
