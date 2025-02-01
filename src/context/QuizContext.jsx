import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

// Helper function for score calculation
const calculateFinalScore = (answers, questions, quizType) => {
  if (!questions || questions.length === 0) return 0;

  return questions.reduce((total, question, index) => {
    const userAnswer = answers[index];
    if (!userAnswer) return total;

    if (quizType === 'multiple') {
      const correctAnswers = question.correctAnswers;
      if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswers)) {
        return total;
      }

      // Count correct selections
      const correctSelections = userAnswer.filter(ans => correctAnswers.includes(ans)).length;
      // Count incorrect selections
      const incorrectSelections = userAnswer.filter(ans => !correctAnswers.includes(ans)).length;
      
      // Calculate points based on correct answers
      const pointsPerCorrect = 10 / correctAnswers.length;
      let score = correctSelections * pointsPerCorrect;
      
      // Apply penalty for incorrect selections
      const penaltyPerWrong = pointsPerCorrect * 0.5; // 50% penalty for wrong answers
      score = Math.max(0, score - (incorrectSelections * penaltyPerWrong));
      
      // Round to one decimal place
      return total + Math.round(score * 10) / 10;
    } else {
      return total + (userAnswer === question.correctAnswer ? 10 : 0);
    }
  }, 0);
};

export const QuizProvider = ({ children }) => {
  // User state with localStorage persistence
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quizUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [quizType, setQuizType] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);

  // Enhanced auth functions
  const login = async (credentials) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = {
        name: credentials.email.split('@')[0],
        email: credentials.email,
      };
      
      setUser(userData);
      localStorage.setItem('quizUser', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser = {
        name: userData.name,
        email: userData.email,
      };
      
      setUser(newUser);
      localStorage.setItem('quizUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizUser');
    resetQuiz();
  };

  // Answer management
  const updateAnswer = (questionIndex, answer) => {
    setAnswers(prevAnswers => {
      if (quizType === 'single') {
        return {
          ...prevAnswers,
          [questionIndex]: answer
        };
      } else {
        const currentAnswers = prevAnswers[questionIndex] || [];
        const updatedAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer];
        
        return {
          ...prevAnswers,
          [questionIndex]: updatedAnswers
        };
      }
    });
  };

  // Quiz management
  const startQuiz = (topic, type) => {
    setQuizStarted(true);
    setSelectedTopic(topic);
    setQuizType(type);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizCompleted(false);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedTopic('');
    setQuizType('');
    setQuizData(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizCompleted(false);
  };

  const completeQuiz = () => {
    const finalScore = calculateFinalScore(answers, quizData?.questions, quizType);
    setScore(finalScore);
    setQuizCompleted(true);
    
    if (user) {
      const quizResult = {
        topic: selectedTopic,
        type: quizType,
        score: finalScore,
        date: new Date().toISOString(),
        totalQuestions: quizData?.questions?.length || 0,
        answers: answers
      };
      
      setQuizHistory(prev => [...prev, quizResult]);
    }
  };

  // Navigation
  const nextQuestion = () => {
    if (currentQuestion < (quizData?.questions?.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
      return true;
    }
    return false;
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      return true;
    }
    return false;
  };

  const checkAnswer = (questionIndex) => {
    const question = quizData?.questions[questionIndex];
    const userAnswer = answers[questionIndex];

    if (!question || !userAnswer) return false;

    if (quizType === 'multiple') {
      const correctAnswers = question.correctAnswers;
      if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswers)) {
        return false;
      }

      // Calculate score for this answer
      const correctSelections = userAnswer.filter(ans => correctAnswers.includes(ans)).length;
      const incorrectSelections = userAnswer.filter(ans => !correctAnswers.includes(ans)).length;
      
      const pointsPerCorrect = 10 / correctAnswers.length;
      let score = correctSelections * pointsPerCorrect;
      
      const penaltyPerWrong = pointsPerCorrect * 0.5;
      score = Math.max(0, score - (incorrectSelections * penaltyPerWrong));
      
      // Consider it correct if score is at least 75% of maximum
      return score >= 7.5;
    }

    return userAnswer === question.correctAnswer;
  };

  return (
    <QuizContext.Provider
      value={{
        // User state
        user,
        setUser,
        login,
        signup,
        logout,

        // Quiz state
        quizStarted,
        setQuizStarted,
        selectedTopic,
        setSelectedTopic,
        quizType,
        setQuizType,
        quizData,
        setQuizData,
        currentQuestion,
        setCurrentQuestion,
        answers,
        setAnswers,
        score,
        setScore,
        quizCompleted,
        setQuizCompleted,
        quizHistory,

        // Quiz functions
        updateAnswer,
        startQuiz,
        resetQuiz,
        completeQuiz,
        nextQuestion,
        previousQuestion,
        checkAnswer,

        // Helper getters
        isFirstQuestion: currentQuestion === 0,
        isLastQuestion: currentQuestion === (quizData?.questions?.length || 0) - 1,
        totalQuestions: quizData?.questions?.length || 0,
        currentProgress: ((currentQuestion + 1) / (quizData?.questions?.length || 1)) * 100,
        calculateFinalScore: (answers, questions, type) => calculateFinalScore(answers, questions, type)
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export default QuizContext;