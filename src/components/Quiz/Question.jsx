import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { Button } from '../ui/Button';

export const Question = () => {
  const { quizData, currentQuestion, setAnswers, answers, quizType } = useQuiz();
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset feedback when question changes
  useEffect(() => {
    setShowFeedback(false);
  }, [currentQuestion]);

  if (!quizData?.questions?.[currentQuestion]) return null;

  const question = quizData.questions[currentQuestion];

  const handleAnswer = (answer) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      if (quizType === 'multiple') {
        // Initialize array for multiple choice if doesn't exist
        newAnswers[currentQuestion] = newAnswers[currentQuestion] || [];
        const index = newAnswers[currentQuestion].indexOf(answer);
        
        if (index === -1) {
          newAnswers[currentQuestion].push(answer);
        } else {
          newAnswers[currentQuestion].splice(index, 1);
        }
      } else {
        // Single choice just sets the answer
        newAnswers[currentQuestion] = answer;
      }
      return newAnswers;
    });
    setShowFeedback(true);
  };

  const isAnswerSelected = (option) => {
    if (quizType === 'multiple') {
      return answers[currentQuestion]?.includes(option);
    }
    return answers[currentQuestion] === option;
  };

  const isAnswerCorrect = (option) => {
    if (quizType === 'multiple') {
      return question.correctAnswers?.includes(option);
    }
    return option === question.correctAnswer;
  };

  const getOptionClasses = (option) => {
    const baseClasses = "w-full p-4 text-left rounded-lg border transition-all duration-200";

    if (!showFeedback || !answers[currentQuestion]) {
      return `${baseClasses} hover:bg-blue-50 border-gray-300`;
    }

    if (isAnswerCorrect(option)) {
      return `${baseClasses} bg-green-100 border-green-500`;
    }

    if (isAnswerSelected(option) && !isAnswerCorrect(option)) {
      return `${baseClasses} bg-red-100 border-red-500`;
    }

    return `${baseClasses} opacity-50`;
  };

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  const getFeedbackMessage = () => {
    if (quizType === 'multiple') {
      const selectedAnswers = answers[currentQuestion] || [];
      const correctAnswers = question.correctAnswers;
      const allCorrect = selectedAnswers.every(ans => correctAnswers.includes(ans)) 
        && selectedAnswers.length === correctAnswers.length;
      
      return allCorrect
        ? '✨ Excellent! All answers are correct!'
        : `❌ Not quite right. The correct answers are: ${correctAnswers.join(', ')}`;
    } else {
      return answers[currentQuestion] === question.correctAnswer
        ? '✨ Excellent! That\'s the correct answer!'
        : `❌ Not quite right. The correct answer is: ${question.correctAnswer}`;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={getOptionClasses(option)}
              disabled={quizType === 'single' && answers[currentQuestion] !== undefined}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && (
                  <span className="ml-2">
                    {isAnswerCorrect(option) && (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isAnswerSelected(option) && !isAnswerCorrect(option) && (
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && answers[currentQuestion] && (
          <div className={`mt-4 p-4 rounded-lg ${
            isAnswerCorrect(answers[currentQuestion]) 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {getFeedbackMessage()}
          </div>
        )}
      </div>
    </div>
  );
};