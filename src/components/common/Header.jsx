import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { Link } from 'react-router-dom';
import logo from '../../assets/quiz.jpg';
import { AuthModal } from '../auth/AuthModal';

export const Header = () => {
  const { quizStarted, user, logout } = useQuiz(); // Changed to use logout from context
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');

  // Use the logout function from context instead of just setting user to null
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="QuizMaster Logo" className="h-10 mr-2" />
            <h1 className="text-2xl font-bold text-blue-600">Quiz_Master</h1>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-bold italic">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:text-blue-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setAuthType('login');
                    setShowAuthModal(true);
                  }}
                  className="px-4 py-2 text-sm text-red-600 hover:text-blue-800"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthType('signup');
                    setShowAuthModal(true);
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
        {quizStarted && (
          <p className="text-gray-900 font-italic">Test your knowledge!</p>
        )}
      </div>
      {showAuthModal && (
        <AuthModal
          type={authType}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </header>
  );
};