'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Question, questions } from './questions';

interface FormData {
  [key: string]: string | string[] | number;
}

const NameInputForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    validateCurrentQuestion();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [formData, currentQuestionIndex]);

  const validateCurrentQuestion = (): void => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = formData[currentQuestion.key];

    switch (currentQuestion.type) {
      case 'text':
      case 'textarea':
        setIsNextDisabled(!currentAnswer || (typeof currentAnswer === 'string' && currentAnswer.trim() === ''));
        break;
      case 'radio':
      case 'number':
        setIsNextDisabled(!currentAnswer);
        break;
      case 'checkbox':
        setIsNextDisabled(!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0));
        break;
      default:
        setIsNextDisabled(true);
    }
  };

  const handleInputChange = (key: string, value: string | string[] | number): void => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleNext = (): void => {
    if (!isNextDisabled) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log('Form submitted:', formData);
        const encodedData = encodeURIComponent(JSON.stringify(formData));
        router.push(`/results?data=${encodedData}`);
      }
    }
  };

  const handlePrevious = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestion = (): JSX.Element | null => {
    const currentQuestion = questions[currentQuestionIndex];
    switch (currentQuestion.type) {
      case 'text':
        return (
          <>
            {currentQuestion.title && <h1 className='text-4xl font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent leading-normal'>{currentQuestion.title}</h1>}
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            <input
              type="text"
              value={formData[currentQuestion.key] as string || ''}
              onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder={currentQuestion.placeholder}
              ref={inputRef as React.RefObject<HTMLInputElement>}
            />
          </>
        );
      case 'radio':
        return (
          <>
            {currentQuestion.title && <h1 className='text-4xl font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent leading-normal'>{currentQuestion.title}</h1>}
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            {currentQuestion.options?.map((option, index) => (
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
            {currentQuestion.title && <h1 className='text-4xl font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent leading-normal'>{currentQuestion.title}</h1>}
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            <textarea
              value={formData[currentQuestion.key] as string || ''}
              onChange={(e) => handleInputChange(currentQuestion.key, e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              rows={4}
              placeholder={currentQuestion.placeholder}
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            />
          </>
        );
      case 'checkbox':
        return (
          <>
            {currentQuestion.title && <h1 className='text-4xl font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent leading-normal'>{currentQuestion.title}</h1>}
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="checkbox"
                  id={option}
                  name={currentQuestion.key}
                  value={option}
                  checked={(formData[currentQuestion.key] as string[] || []).includes(option)}
                  onChange={(e) => {
                    const updatedInterests = [...(formData[currentQuestion.key] as string[] || [])];
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
            {currentQuestion.title && <h1 className='text-4xl font-extrabold bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent leading-normal'>{currentQuestion.title}</h1>}
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentQuestion.question}</h2>
            <input
              type="number"
              value={formData[currentQuestion.key] as number || ''}
              onChange={(e) => handleInputChange(currentQuestion.key, parseInt(e.target.value, 10))}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder={currentQuestion.placeholder}
              ref={inputRef as React.RefObject<HTMLInputElement>}
            />
          </>
        );
      default:
        return null;
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="">
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
        <button
          onClick={handlePrevious}
          className={`${currentQuestionIndex === 0 ? 'invisible' : 'visible'} bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center transition-colors duration-300`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </button>
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
  );
};

export default NameInputForm;