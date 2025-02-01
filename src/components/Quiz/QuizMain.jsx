import React, { useState, useEffect, useCallback } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { calculateScore, fetchQuizData, getQuestionFeedback } from '../../services/quizService';
import Timer from './Timer';

const QuizMain = () => {
  const {
    setQuizData,
    currentQuestion,
    setCurrentQuestion,
    quizData,
    answers,
    updateAnswer,
    setScore,
    setQuizCompleted,
    selectedTopic,
    quizType,
    totalQuestions,
    currentProgress
  } = useQuiz();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentSelections, setCurrentSelections] = useState([]);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  const loadQuiz = useCallback(async () => {
    if (!selectedTopic || !quizType) {
      navigate('/topics');
      return;
    }
    try {
      setIsLoading(true);
      const data = await fetchQuizData(selectedTopic, quizType);
      if (!data.questions?.length) {
        throw new Error('No questions available');
      }
      setQuizData(data);
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
      console.error('Quiz loading error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, quizType, setQuizData, navigate]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  useEffect(() => {
    setCurrentSelections(quizType === 'multiple' ? [] : '');
    setShowFeedback(false);
    setFeedback(null);
  }, [currentQuestion, quizType]);

  const handleTimeWarning = useCallback(() => {
    setShowTimeWarning(true);
    setTimeout(() => setShowTimeWarning(false), 3000);
  }, []);

  const handleTimeUp = useCallback(() => {
    if (!showFeedback) {
      handleSubmitAnswer();
    } else {
      handleNextQuestion();
    }
  }, [showFeedback]);

  const handleAnswerSelect = useCallback((selectedAnswer) => {
    if (quizType === 'single') {
      setCurrentSelections(selectedAnswer);
      updateAnswer(currentQuestion, selectedAnswer);
      setShowFeedback(true);
      const questionData = quizData?.questions[currentQuestion];
      const feedbackData = getQuestionFeedback(selectedAnswer, questionData.correctAnswer, quizType);
      setFeedback(feedbackData);
    } else {
      setCurrentSelections(prev => {
        const newSelections = prev.includes(selectedAnswer)
          ? prev.filter(answer => answer !== selectedAnswer)
          : [...prev, selectedAnswer];
        return newSelections;
      });
    }
  }, [quizType, currentQuestion, updateAnswer, quizData]);

  const handleSubmitAnswer = useCallback(() => {
    if (!currentSelections.length) return;
    
    if (quizType === 'multiple') {
      updateAnswer(currentQuestion, currentSelections);
      const questionData = quizData?.questions[currentQuestion];
      const feedbackData = getQuestionFeedback(currentSelections, questionData.correctAnswers, quizType);
      setFeedback(feedbackData);
    }
    setShowFeedback(true);
  }, [currentSelections, quizType, currentQuestion, updateAnswer, quizData]);

  const handleNextQuestion = useCallback(() => {
    if (!quizData?.questions) return;
    
    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setCurrentSelections(quizType === 'multiple' ? [] : '');
      setFeedback(null);
    } else {
      const finalScore = calculateScore(answers, quizData.questions, quizType);
      setScore(finalScore);
      setQuizCompleted(true);
      navigate('/results');
    }
  }, [quizData, currentQuestion, quizType, answers, navigate, setCurrentQuestion, setScore, setQuizCompleted]);

  const getAnswerFeedbackClass = useCallback((option) => {
    if (!showFeedback) {
      return quizType === 'single'
        ? currentSelections === option ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50 border-gray-200'
        : currentSelections.includes(option) ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50 border-gray-200';
    }

    const currentQuestionData = quizData?.questions[currentQuestion];
    const correctAnswers = quizType === 'multiple' ? currentQuestionData.correctAnswers : [currentQuestionData.correctAnswer];
    const isCorrect = correctAnswers.includes(option);
    const isSelected = quizType === 'multiple' 
      ? currentSelections.includes(option)
      : currentSelections === option;

    if (isCorrect) {
      return 'bg-green-100 border-green-500';
    }
    
    return isSelected ? 'bg-red-100 border-red-500' : 'border-gray-200';
  }, [showFeedback, quizType, currentSelections, currentQuestion, quizData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading quiz questions...</div>
      </div>
    );
  }

  if (error || !quizData?.questions?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-xl text-red-600 mb-4">
          ⚠️ {error || 'No questions available'}
        </div>
        <button
          onClick={() => navigate('/topics')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Return to Topics
        </button>
      </div>
    );
  }

  const currentQuestionData = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {showTimeWarning && (
        <div className="fixed top-4 right-4 bg-yellow-100 border-yellow-400 border text-yellow-700 px-4 py-3 rounded-lg shadow-lg">
          <p className="font-medium">Time is running out!</p>
          <p className="text-sm">Less than 10 seconds remaining.</p>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
            <Timer
              initialTime={30}
              onTimeUp={handleTimeUp}
              onTimeWarning={handleTimeWarning}
              warningThreshold={10}
              className="w-32"
            />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentQuestionData.question}
          </h2>
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`
                  w-full text-left p-3 rounded-lg border 
                  transition-colors flex justify-between items-center
                  ${getAnswerFeedbackClass(option)}
                  ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <span>{option}</span>
                {showFeedback && (
                  <span>
                    {(quizType === 'single' && option === currentQuestionData.correctAnswer) || 
                     (quizType === 'multiple' && currentQuestionData.correctAnswers.includes(option)) 
                      ? '✅' 
                      : (quizType === 'multiple' && currentSelections.includes(option)) ||
                        (quizType === 'single' && currentSelections === option)
                        ? '❌' 
                        : ''}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {feedback && showFeedback && (
          <div className={`mb-4 p-3 rounded-lg ${feedback.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-medium">{feedback.message}</p>
            {!feedback.isCorrect && feedback.details && (
              <p className="text-sm mt-1">
                Score: {feedback.score} / 10 points
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {quizType === 'multiple' ? 'Select all that apply' : 'Select one answer'}
          </div>
          {quizType === 'multiple' && !showFeedback && currentSelections.length > 0 && (
            <button
              onClick={handleSubmitAnswer}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Answers
            </button>
          )}
          {showFeedback && (
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentQuestion + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizMain;