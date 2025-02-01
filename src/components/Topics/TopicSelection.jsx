import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import quizBackground from '../../assets/quizbackground.jpg'; // Import the background image

export const TopicSelection = () => {
  const { setQuizType, setSelectedTopic } = useQuiz();
  const navigate = useNavigate();
  const [activeTopic, setActiveTopic] = useState(null); // Track the active topic

  const topics = [
    { id: 'general', name: 'General Knowledge', icon: '🎯' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'history', name: 'History', icon: '📚' },
    { id: 'geography', name: 'Geography', icon: '🌍' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
  ];

  const handleTopicSelect = (topicId, type) => {
    setSelectedTopic(topicId);
    setQuizType(type);
    setActiveTopic(topicId); // Set the active topic to apply styles when clicked
    navigate('/quiz');
  };

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundImage: `url(${quizBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold italic text-center mb-8 text-white">
          Choose Your Quiz Topic
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div 
              key={topic.id} 
              className={`bg-white p-6 rounded-xl shadow-md transition-all transform duration-300 ease-in-out ${
                activeTopic === topic.id ? 'scale-105' : 'scale-100'
              } hover:scale-105`}
            >
              <div className="text-center mb-4">
                <span className="text-4xl">{topic.icon}</span>
                <h3 className="text-xl font-semibold mt-2 text-gray-800">
                  {topic.name}
                </h3>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleTopicSelect(topic.id, 'single')}
                  className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                >
                  Single Choice Quiz
                </button>
                
                <button
                  onClick={() => handleTopicSelect(topic.id, 'multiple')}
                  className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                >
                  Multiple Choice Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
