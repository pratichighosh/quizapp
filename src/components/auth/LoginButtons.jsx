import React from 'react';

export const LoginButtons = ({ onLoginClick, onSignupClick }) => {
  return (
    <>
      <button
        onClick={onLoginClick}
        className="text-sm px-4 py-2 text-blue-600 hover:text-blue-800"
      >
        Login
      </button>
      <button
        onClick={onSignupClick}
        className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Sign Up
      </button>
    </>
  );
};