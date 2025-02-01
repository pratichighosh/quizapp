import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { useNavigate } from 'react-router-dom';

const ResultsDisplay = () => {
  const navigate = useNavigate();
  const { 
    quizData, 
    answers,
    quizType,
    setQuizStarted, 
    setCurrentQuestion, 
    setAnswers, 
    setScore, 
    setQuizCompleted 
  } = useQuiz();

  // Calculate score function
  const calculateScore = () => {
    if (!quizData?.questions) return 0;
    let totalScore = 0;

    quizData.questions.forEach((question, index) => {
      const userAnswer = answers[index] || [];
      const correctAnswers = question.correctAnswers;

      if (Array.isArray(correctAnswers)) { // Multiple choice
        const isFullyCorrect = 
          userAnswer.length === correctAnswers.length &&
          userAnswer.every(ans => correctAnswers.includes(ans)) &&
          correctAnswers.every(ans => userAnswer.includes(ans));

        if (isFullyCorrect) totalScore += 10;
      } else { // Single choice
        if (userAnswer === question.correctAnswer) totalScore += 10;
      }
    });

    return totalScore;
  };

  const score = calculateScore();
  const percentage = (score / (quizData?.questions?.length * 10)) * 100;

  const getEmoji = (percentage) => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '🎉';
    return '📝';
  };

  const getFeedback = (percentage) => {
    if (percentage >= 80) return 'Excellent work! Keep it up! 🌟';
    if (percentage >= 60) return 'Good job! Keep learning! 👏';
    return 'Keep practicing! You can do better! 💪';
  };

  // Check if answer is correct
  const isAnswerCorrect = (userAnswer, correctAnswer) => {
    if (Array.isArray(correctAnswer)) {
      return (
        Array.isArray(userAnswer) &&
        userAnswer.length === correctAnswer.length &&
        userAnswer.every(ans => correctAnswer.includes(ans)) &&
        correctAnswer.every(ans => userAnswer.includes(ans))
      );
    }
    return userAnswer === correctAnswer;
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizCompleted(false);
    navigate('/quiz');
  };

  const handleNewQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizCompleted(false);
    navigate('/topics');
  };

  if (!quizData?.questions) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <div className="text-4xl font-bold text-center text-blue-600 mb-6">
          Quiz Complete! {getEmoji(percentage)}
        </div>
        
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-2xl font-semibold">
              Score: {score} / {quizData.questions.length * 10}
            </p>
            <p className="text-xl text-gray-600">
              Percentage: {percentage.toFixed(1)}%
            </p>
            <p className="text-gray-600">
              {getFeedback(percentage)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Answer Review</h3>
            {quizData.questions.map((question, index) => {
              const userAnswer = answers[index] || [];
              const correctAnswer = question.correctAnswers || question.correctAnswer;
              const correct = isAnswerCorrect(userAnswer, correctAnswer);

              return (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <p className="font-medium">{question.question}</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-blue-600">Your answer:</p>
                      <p className={correct ? "text-green-600" : "text-red-600"}>
                        {Array.isArray(userAnswer) 
                          ? userAnswer.join(', ') || 'No answer selected'
                          : userAnswer || 'No answer selected'} 
                        {correct ? ' ✅' : ' ❌'}
                      </p>
                    </div>
                    {!correct && (
                      <div>
                        <p className="text-green-600">Correct answer:</p>
                        <p className="text-green-600">
                          {Array.isArray(correctAnswer) 
                            ? correctAnswer.join(', ')
                            : correctAnswer} ✅
                        </p>
                      </div>
                    )}
                    <p className="text-gray-600 text-sm mt-1">
                      Points: {correct ? '10' : '0'} / 10
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleRetakeQuiz}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Try Same Quiz Again
            </button>
            <button
              onClick={handleNewQuiz}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Start New Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;