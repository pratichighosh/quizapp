import React from 'react';
import { useQuiz } from '../../context/QuizContext';

export const UserMenu = () => {
  const { user, logout } = useQuiz();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">
        Welcome, {user.name}
      </span>
      <button
        onClick={logout}
        className="text-sm px-4 py-2 text-red-600 hover:text-red-800"
      >
        Logout
      </button>
    </div>
  );
};
