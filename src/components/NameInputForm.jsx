'use client'

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import bg from '../public/bg.webp'

const NameInputForm = () => {
  const [formData, setFormData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const questions = [
    {
      id: 1,
      question: "What's your name?",
      type: 'text',
      key: 'name'
    },
    {
      id: 2,
      question: 'Gender',
      type: 'radio',
      options: ['Male', 'Female', 'Other'],
      key: 'gender'
    },
    {
      id: 3,
      question: 'Tell us about yourself',
      type: 'textarea',
      key: 'about'
    },
    {
      id: 4,
      question: 'What are your interests?',
      type: 'checkbox',
      options: ['Sports', 'Music', 'Art', 'Technology'],
      key: 'interests'
    },
    {
      id: 5,
      question: 'How old are you?',
      type: 'number',
      key: 'age'
    }
  ];

  useEffect(() => {
    validateCurrentQuestion();
  }, [formData, currentQuestionIndex]);

  const validateCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = formData[currentQuestion.key];

    switch (currentQuestion.type) {
      case 'text':
      case 'textarea':
        setIsNextDisabled(!currentAnswer || currentAnswer.trim() === '');
        break;
      case 'radio':
      case 'number':
        setIsNextDisabled(!currentAnswer);
        break;
      case 'checkbox':
        setIsNextDisabled(!currentAnswer || currentAnswer.length === 0);
        break;
      default:
        setIsNextDisabled(true);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log('Form submitted:', formData);
        // Here you would typically send the data to a server
      }
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    switch (currentQuestion.type) {
      case 'text':
        return (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            <input
              type="text"
              value={formData[currentQuestion.key] || ''}
              onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder={`Enter your ${currentQuestion.key}`}
            />
          </>
        );
      case 'radio':
        return (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="radio"
                  id={option}
                  name={currentQuestion.key}
                  value={option}
                  checked={formData[currentQuestion.key] === option}
                  onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </>
        );
      case 'textarea':
        return (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            <textarea
              value={formData[currentQuestion.key] || ''}
              onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              rows="4"
              placeholder={`Enter your ${currentQuestion.key}`}
            />
          </>
        );
      case 'checkbox':
        return (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="checkbox"
                  id={option}
                  name={currentQuestion.key}
                  value={option}
                  checked={(formData[currentQuestion.key] || []).includes(option)}
                  onChange={(e) => {
                    const updatedInterests = formData[currentQuestion.key] || [];
                    if (e.target.checked) {
                      updatedInterests.push(option);
                    } else {
                      const index = updatedInterests.indexOf(option);
                      if (index > -1) updatedInterests.splice(index, 1);
                    }
                    handleInputChange(currentQuestion.key, updatedInterests);
                  }}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </>
        );
      case 'number':
        return (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            <input
              type="number"
              value={formData[currentQuestion.key] || ''}
              onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder={`Enter your ${currentQuestion.key}`}
            />
          </>
        );
      default:
        return null;
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full max-w-full bg-white p-8">
        <div className="flex items-center mb-6">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="#4285F4"/>
            <path d="M7 7H17V9H7V7Z" fill="white"/>
            <path d="M7 11H17V13H7V11Z" fill="white"/>
            <path d="M7 15H13V17H7V15Z" fill="white"/>
          </svg>
          <span className="text-xl font-bold text-gray-800">Research</span>
        </div>
        
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{width: `${progressPercentage}%`}}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>

        {renderQuestion()}
        
        <div className="flex justify-between items-center mt-6">
          <button className="text-blue-500 hover:underline">Skip</button>
          <button
            onClick={handleNext}
            className={`${isNextDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded flex items-center transition-colors duration-300`}
            disabled={isNextDisabled}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        
      </div>
      
      <div className="hidden lg:block lg:w-1/2 bg-blue-50">
        <div className="h-full flex items-center justify-center">
          <Image src={bg} width={200} height={200} alt='bg' />
        </div>
      </div>
    </div>
  );
};

export default NameInputForm;