import React, { useState, useEffect, useCallback } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { Clock } from 'lucide-react';

// Timer custom hook
export const useQuizTimer = (initialTime = 30, onTimeUp) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);

  const resetTimer = useCallback(() => {
    setTime(initialTime);
    setIsActive(true);
  }, [initialTime]);

  useEffect(() => {
    let intervalId;

    if (isActive && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            onTimeUp?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, time, onTimeUp]);

  return {
    time,
    isActive,
    resetTimer,
  };
};

// Timer display component
export const Timer = ({ initialTime = 30 }) => {
  const { currentQuestion, setCurrentQuestion, quizData, setQuizCompleted, navigate } = useQuiz();

  const handleTimeUp = useCallback(() => {
    if (!quizData?.questions) return;
    
    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      navigate('/results');
    }
  }, [currentQuestion, quizData?.questions, setCurrentQuestion, setQuizCompleted, navigate]);

  const { time, isActive, resetTimer } = useQuizTimer(initialTime, handleTimeUp);

  // Reset timer when question changes
  useEffect(() => {
    resetTimer();
  }, [currentQuestion, resetTimer]);

  // Format time to display minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate the progress percentage
  const progressPercentage = (time / initialTime) * 100;
  
  // Determine the color based on remaining time
  const getColorClass = () => {
    if (time > initialTime * 0.6) return 'text-green-600';
    if (time > initialTime * 0.3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-3">
      <Clock className={`w-5 h-5 ${getColorClass()}`} />
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${
            time > initialTime * 0.6
              ? 'bg-green-500'
              : time > initialTime * 0.3
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className={`font-mono font-medium ${getColorClass()}`}>
        {formatTime(time)}
      </div>
    </div>
  );
};