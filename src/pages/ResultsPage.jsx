import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { calculatePercentage } from '../services/quizService';

export const ResultsPage = () => {
  const {
    score,
    quizData,
    setQuizStarted,
    setCurrentQuestion,
    setAnswers,
    setScore,
    setQuizCompleted,
    user
  } = useQuiz();
  
  const navigate = useNavigate();
  
  // Ensure we have quiz data before calculating
  const totalQuestions = quizData?.questions?.length || 0;
  const percentage = calculatePercentage(score, totalQuestions);
  
  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizCompleted(false);
    navigate('/topics');
  };

  const handleNewQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizCompleted(false);
    navigate('/topics');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-blue-600">Quiz Complete!</h1>
        
        <div className="space-y-4">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '📝'}
          </div>
          
          <p className="text-2xl font-semibold">
            Score: {score} / {totalQuestions * 10}
          </p>
          
          <p className="text-xl text-gray-600">
            Percentage: {percentage.toFixed(1)}%
          </p>
          
          <div className="text-gray-600">
            {percentage >= 80 && (
              <p className="text-green-500">Outstanding performance! 🌟</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-blue-500">Good job! Keep it up! 👏</p>
            )}
            {percentage < 60 && (
              <p className="text-orange-500">Keep practicing! You can do better! 💪</p>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={handleRetakeQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Try Same Quiz Again
          </Button>
          
          <Button
            onClick={handleNewQuiz}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Start New Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
