import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Button } from '../components/ui/Button';

// Import the background image
import backgroundImage from '../assets/quizbackground.jpg';

export const HomePage = () => {
  const navigate = useNavigate();
  const { quizStarted, setQuizStarted, setUser } = useQuiz();

  const handleStart = () => {
    // Set a default user if not already set
    setUser({ id: '1', name: 'Guest User' });
    setQuizStarted(true);
    navigate('/topics');
  };

  if (quizStarted) {
    navigate('/topics');
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="text-center space-y-6 p-8 bg-white bg-opacity-90 rounded-xl shadow-lg max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-blue-800">Welcome to QuizMaster!</h1>
        <p className="text-black-600">Challenge yourself with our interactive quizzes!</p>
        <div className="space-y-4">
        <Button
  onClick={handleStart}
  className="w-full px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition-all transform duration-300 ease-in-out hover:scale-105"
>
  Start Quiz
</Button>

          <div className="space-y-2">
            <p className="text-sm text-black-400">
              ✨ Multiple topics available
            </p>
            <p className="text-sm text-black-400">
              🎯 Test your knowledge
            </p>
            <p className="text-sm text-black-400">
              🏆 Compete for high scores
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
