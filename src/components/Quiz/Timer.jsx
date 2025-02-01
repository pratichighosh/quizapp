import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TOTAL_TIME = 120; // Force 120 seconds
const WARNING_TIME = 30; // Warning at 30 seconds remaining

const Timer = ({ onTimeUp, onTimeWarning, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // Handle warning at 30 seconds
        if (prevTime === WARNING_TIME) {
          onTimeWarning?.();
        }
        
        // Handle time up
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [onTimeUp, onTimeWarning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    if (timeLeft > 60) return 'text-green-600';
    if (timeLeft > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const progressPercentage = (timeLeft / TOTAL_TIME) * 100;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Clock className={`w-5 h-5 ${getColorClass()}`} />
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${
            timeLeft > 60
              ? 'bg-green-500'
              : timeLeft > 30
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className={`font-mono font-medium ${getColorClass()}`}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;