'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; 
import { AnimatedBeamDemo } from './AnimatedBeamdemo';
import PulsatingButton from './PulsatingButton';

const WelcomePage = () => {
  const router = useRouter();  
  const handlePredictClick = () => {
    router.push('/questions');  
  };

  return (
    <div className="text-white p-2">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols items-center">
          <div>
            <h3 className="text-5xl text-black font-bold mb-4">
              Welcome to <span className='bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent leading-normal'>Alzheimer&apos;s</span> 
              <br />
              Disease Prediction 
              <span className="inline-block w-12 h-1 bg-blue-500 ml-1"></span>
            </h3>
            <AnimatedBeamDemo />
            <br />
            <PulsatingButton onClick={handlePredictClick}>Start</PulsatingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
