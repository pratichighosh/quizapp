import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { TopicSelection } from './components/Topics/TopicSelection';
import QuizMain from './components/Quiz/QuizMain';  // Changed this line
import ResultsDisplay from './components/Results/ResultsDisplay';
// ... rest of your imports
import { useQuiz } from './context/QuizContext';

// Modified Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useQuiz();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Modified Quiz Route Component
const QuizRoute = ({ children }) => {
  const { selectedTopic, quizType } = useQuiz();
  if (!selectedTopic || !quizType) {
    return <Navigate to="/topics" replace />;
  }
  return children;
};

const AppContent = () => {
  const { user } = useQuiz();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/topics" replace /> : <HomePage />} 
          />
          <Route
            path="/topics"
            element={
              <ProtectedRoute>
                <TopicSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizRoute>
                  <QuizMain />
                </QuizRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <ResultsDisplay />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <AppContent />
      </Router>
    </QuizProvider>
  );
};

export default App;