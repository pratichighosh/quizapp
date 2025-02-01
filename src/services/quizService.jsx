import { useState, useEffect } from 'react';

// Configuration
const QUIZ_API_URL = import.meta.env.VITE_QUIZ_API_URL || "https://api.jsonserve.com/Uw5CrX";

export const QUIZ_DATA = {
  general: {
    single: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
      },
      {
        id: 2,
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mars", "Mercury", "Jupiter"],
        correctAnswer: "Mercury"
      },
      {
        id: 3,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
      },
      {
        id: 4,
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean"
      },
      {
        id: 5,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
      },
      {
        id: 6,
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: "Au"
      },
      {
        id: 7,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Korea", "Japan", "Thailand"],
        correctAnswer: "Japan"
      },
      {
        id: 8,
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: "Blue Whale"
      },
      {
        id: 9,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945"
      },
      {
        id: 10,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: "Diamond"
      }
    ],
    multiple: [
      {
        id: 1,
        question: "Which of these are primary colors?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correctAnswers: ["Red", "Blue", "Yellow"]
      },
      {
        id: 2,
        question: "Which of these countries are in Europe?",
        options: ["France", "Egypt", "Germany", "Spain"],
        correctAnswers: ["France", "Germany", "Spain"]
      },
      {
        id: 3,
        question: "Which of these are mammals?",
        options: ["Dolphin", "Shark", "Bat", "Snake"],
        correctAnswers: ["Dolphin", "Bat"]
      },
      {
        id: 4,
        question: "Which of these elements are noble gases?",
        options: ["Helium", "Oxygen", "Neon", "Nitrogen"],
        correctAnswers: ["Helium", "Neon"]
      },
      {
        id: 5,
        question: "Which of these are programming languages?",
        options: ["Python", "Cobra", "Java", "Rust"],
        correctAnswers: ["Python", "Java", "Rust"]
      },
      {
        id: 6,
        question: "Which of these cities are capitals?",
        options: ["Paris", "New York", "Tokyo", "Sydney"],
        correctAnswers: ["Paris", "Tokyo"]
      },
      {
        id: 7,
        question: "Which of these are renewable energy sources?",
        options: ["Solar", "Coal", "Wind", "Nuclear"],
        correctAnswers: ["Solar", "Wind"]
      },
      {
        id: 8,
        question: "Which of these instruments are string instruments?",
        options: ["Guitar", "Drum", "Violin", "Flute"],
        correctAnswers: ["Guitar", "Violin"]
      },
      {
        id: 9,
        question: "Which of these are citrus fruits?",
        options: ["Orange", "Apple", "Lemon", "Lime"],
        correctAnswers: ["Orange", "Lemon", "Lime"]
      },
      {
        id: 10,
        question: "Which of these sports use a ball?",
        options: ["Football", "Swimming", "Basketball", "Tennis"],
        correctAnswers: ["Football", "Basketball", "Tennis"]
      }
    ]
  },
  science: {
    single: [
      {
        id: 1,
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        correctAnswer: "H2O"
      },
      {
        id: 2,
        question: "What is the speed of light?",
        options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
        correctAnswer: "299,792 km/s"
      },
      {
        id: 3,
        question: "What is the boiling point of water?",
        options: ["100°C", "90°C", "110°C", "120°C"],
        correctAnswer: "100°C"
      },
      {
        id: 4,
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Nitrogen"
      },
      {
        id: 5,
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
      },
      {
        id: 6,
        question: "Which element is represented by the symbol 'O'?",
        options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
        correctAnswer: "Oxygen"
      },
      {
        id: 7,
        question: "What is the main source of energy for the Earth?",
        options: ["The Moon", "The Sun", "The Earth itself", "Stars"],
        correctAnswer: "The Sun"
      },
      {
        id: 8,
        question: "What is the atomic number of carbon?",
        options: ["6", "12", "8", "14"],
        correctAnswer: "6"
      },
      {
        id: 9,
        question: "Which is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Earth", "Neptune"],
        correctAnswer: "Jupiter"
      },
      {
        id: 10,
        question: "What gas do plants absorb from the atmosphere during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
      }
    ],
    multiple: [
      {
        id: 1,
        question: "Which of these are types of electromagnetic waves?",
        options: ["Radio waves", "X-rays", "Gamma rays", "Sound waves"],
        correctAnswers: ["Radio waves", "X-rays", "Gamma rays"]
      },
      {
        id: 2,
        question: "Which of these are types of renewable energy?",
        options: ["Solar", "Wind", "Natural Gas", "Hydroelectric"],
        correctAnswers: ["Solar", "Wind", "Hydroelectric"]
      },
      {
        id: 3,
        question: "Which of these are considered noble gases?",
        options: ["Neon", "Oxygen", "Argon", "Hydrogen"],
        correctAnswers: ["Neon", "Argon"]
      },
      {
        id: 4,
        question: "Which of the following are types of rock?",
        options: ["Igneous", "Sedimentary", "Metamorphic", "Plastic"],
        correctAnswers: ["Igneous", "Sedimentary", "Metamorphic"]
      },
      {
        id: 5,
        question: "Which of these are parts of the human digestive system?",
        options: ["Esophagus", "Lungs", "Stomach", "Kidneys"],
        correctAnswers: ["Esophagus", "Stomach"]
      },
      {
        id: 6,
        question: "Which of these are forms of matter?",
        options: ["Solid", "Liquid", "Gas", "Light"],
        correctAnswers: ["Solid", "Liquid", "Gas"]
      },
      {
        id: 7,
        question: "Which of the following are famous scientists who contributed to the theory of evolution?",
        options: ["Charles Darwin", "Isaac Newton", "Albert Einstein", "Gregor Mendel"],
        correctAnswers: ["Charles Darwin", "Gregor Mendel"]
      },
      {
        id: 8,
        question: "Which of these are part of the human circulatory system?",
        options: ["Heart", "Lungs", "Blood vessels", "Stomach"],
        correctAnswers: ["Heart", "Blood vessels"]
      },
      {
        id: 9,
        question: "Which of these are planets in our solar system?",
        options: ["Venus", "Pluto", "Mars", "The Sun"],
        correctAnswers: ["Venus", "Mars"]
      },
      {
        id: 10,
        question: "Which of the following are states of matter?",
        options: ["Solid", "Plasma", "Liquid", "Gaseous"],
        correctAnswers: ["Solid", "Plasma", "Liquid", "Gaseous"]
      }
    ]
  },
  history: {
    single: [
      {
        id: 1,
        question: "In which year did Christopher Columbus first reach the Americas?",
        options: ["1492", "1498", "1500", "1488"],
        correctAnswer: "1492"
      },
      // Add 9 more single-choice history questions
      {
        id: 2,
        question: "Who was the first President of the United States?",
        options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
        correctAnswer: "George Washington"
      },
      {
        id: 3,
        question: "In which year did World War I begin?",
        options: ["1912", "1914", "1916", "1918"],
        correctAnswer: "1914"
      },
      {
        id: 4,
        question: "Who was the first emperor of China?",
        options: ["Qin Shi Huang", "Li Shi", "Emperor Wu", "Zhao Kuangyin"],
        correctAnswer: "Qin Shi Huang"
      },
      {
        id: 5,
        question: "Which country did the United States fight in the Revolutionary War?",
        options: ["France", "Britain", "Spain", "Germany"],
        correctAnswer: "Britain"
      },
      {
        id: 6,
        question: "In which year did the Titanic sink?",
        options: ["1909", "1912", "1915", "1920"],
        correctAnswer: "1912"
      },
      {
        id: 7,
        question: "Who was the leader of Nazi Germany during World War II?",
        options: ["Joseph Stalin", "Winston Churchill", "Adolf Hitler", "Benito Mussolini"],
        correctAnswer: "Adolf Hitler"
      },
      {
        id: 8,
        question: "Which ancient empire was ruled by Julius Caesar?",
        options: ["Roman Empire", "Ottoman Empire", "Persian Empire", "Mongol Empire"],
        correctAnswer: "Roman Empire"
      },
      {
        id: 9,
        question: "What was the name of the ship that carried the Pilgrims to America in 1620?",
        options: ["Mayflower", "Endeavour", "Santa Maria", "Titanic"],
        correctAnswer: "Mayflower"
      },
      {
        id: 10,
        question: "Which civilization built the pyramids of Egypt?",
        options: ["Mesopotamians", "Egyptians", "Romans", "Mayans"],
        correctAnswer: "Egyptians"
      }
    
    ],
    multiple: [
      {
        id: 1,
        question: "Which of these ancient civilizations existed in Mesopotamia?",
        options: ["Sumerians", "Romans", "Babylonians", "Greeks"],
        correctAnswers: ["Sumerians", "Babylonians"]
      },
      // Add 9 more multiple-choice history questions
      {
        id: 2,
        question: "Which of these were ancient wonders of the world?",
        options: ["Great Pyramid of Giza", "Colossus of Rhodes", "Eiffel Tower", "Hanging Gardens of Babylon"],
        correctAnswers: ["Great Pyramid of Giza", "Colossus of Rhodes", "Hanging Gardens of Babylon"]
      },
      {
        id: 3,
        question: "Which countries were part of the Axis Powers in World War II?",
        options: ["Germany", "Italy", "Japan", "France"],
        correctAnswers: ["Germany", "Italy", "Japan"]
      },
      {
        id: 4,
        question: "Which of these leaders were associated with the Cold War?",
        options: ["Winston Churchill", "Joseph Stalin", "John F. Kennedy", "Napoleon Bonaparte"],
        correctAnswers: ["Winston Churchill", "Joseph Stalin", "John F. Kennedy"]
      },
      {
        id: 5,
        question: "Which empires existed in Africa before colonialism?",
        options: ["Mali Empire", "Roman Empire", "Kingdom of Aksum", "Aztec Empire"],
        correctAnswers: ["Mali Empire", "Kingdom of Aksum"]
      },
      {
        id: 6,
        question: "Which of these events were major milestones in the Civil Rights Movement?",
        options: ["Martin Luther King Jr.'s 'I Have a Dream' speech", "End of World War II", "Rosa Parks' arrest", "The signing of the U.S. Constitution"],
        correctAnswers: ["Martin Luther King Jr.'s 'I Have a Dream' speech", "Rosa Parks' arrest"]
      },
      {
        id: 7,
        question: "Which of these were ancient Greek philosophers?",
        options: ["Socrates", "Plato", "Aristotle", "Julius Caesar"],
        correctAnswers: ["Socrates", "Plato", "Aristotle"]
      },
      {
        id: 8,
        question: "Which battles were pivotal in the Napoleonic Wars?",
        options: ["Battle of Waterloo", "Battle of Gettysburg", "Battle of Leipzig", "Battle of Trafalgar"],
        correctAnswers: ["Battle of Waterloo", "Battle of Leipzig", "Battle of Trafalgar"]
      },
      {
        id: 9,
        question: "Which of these countries were involved in the Cold War?",
        options: ["United States", "Soviet Union", "China", "Canada"],
        correctAnswers: ["United States", "Soviet Union", "China"]
      },
      {
        id: 10,
        question: "Which were major civilizations of Mesoamerica?",
        options: ["Maya", "Aztec", "Inca", "Olmec"],
        correctAnswers: ["Maya", "Aztec", "Olmec"]
      }
    ]
  },
  geography: {
    single: [
      {
        id: 1,
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correctAnswer: "Nile"
      },
      // Add 9 more single-choice geography questions
      {
        id: 2,
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: "Tokyo"
      },
      {
        id: 3,
        question: "Which of these countries is landlocked?",
        options: ["Canada", "Switzerland", "Australia", "United States"],
        correctAnswer: "Switzerland"
      },
      {
        id: 4,
        question: "Which continent is the Sahara Desert located on?",
        options: ["Africa", "Asia", "North America", "Australia"],
        correctAnswer: "Africa"
      },
      {
        id: 5,
        question: "Which ocean is the largest?",
        options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean"
      },
      {
        id: 6,
        question: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: "Canberra"
      },
      {
        id: 7,
        question: "Which mountain range is the longest in the world?",
        options: ["Rocky Mountains", "Andes", "Himalayas", "Alps"],
        correctAnswer: "Andes"
      },
      {
        id: 8,
        question: "Which of these is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "Nauru", "San Marino"],
        correctAnswer: "Vatican City"
      },
      {
        id: 9,
        question: "Which river is the longest in the United States?",
        options: ["Missouri River", "Mississippi River", "Colorado River", "Rio Grande"],
        correctAnswer: "Missouri River"
      },
      {
        id: 10,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "South Korea", "Japan", "Vietnam"],
        correctAnswer: "Japan"
      }
    ],
    multiple: [
      {
        id: 1,
        question: "Which of these countries are in South America?",
        options: ["Brazil", "Spain", "Peru", "Mexico"],
        correctAnswers: ["Brazil", "Peru"]
      },
      // Add 9 more multiple-choice geography questions
      {
        id: 2,
        question: "Which of these countries are part of the African continent?",
        options: ["Nigeria", "Egypt", "India", "Kenya"],
        correctAnswers: ["Nigeria", "Egypt", "Kenya"]
      },
      {
        id: 3,
        question: "Which of these countries are located in Europe?",
        options: ["Germany", "France", "Brazil", "Spain"],
        correctAnswers: ["Germany", "France", "Spain"]
      },
      {
        id: 4,
        question: "Which of these cities are located in the United States?",
        options: ["New York", "Los Angeles", "Toronto", "Chicago"],
        correctAnswers: ["New York", "Los Angeles", "Chicago"]
      },
      {
        id: 5,
        question: "Which of these countries share a border with Russia?",
        options: ["China", "India", "Ukraine", "Poland"],
        correctAnswers: ["China", "Ukraine"]
      },
      {
        id: 6,
        question: "Which of these are island nations?",
        options: ["Malta", "Australia", "Japan", "Germany"],
        correctAnswers: ["Malta", "Japan"]
      },
      {
        id: 7,
        question: "Which of these mountain ranges are located in Asia?",
        options: ["Himalayas", "Andes", "Rocky Mountains", "Tian Shan"],
        correctAnswers: ["Himalayas", "Tian Shan"]
      },
      {
        id: 8,
        question: "Which of these seas are located in the Mediterranean region?",
        options: ["Aegean Sea", "Dead Sea", "Caspian Sea", "Black Sea"],
        correctAnswers: ["Aegean Sea", "Black Sea"]
      },
      {
        id: 9,
        question: "Which of these rivers flow through multiple countries?",
        options: ["Amazon", "Danube", "Nile", "Mississippi"],
        correctAnswers: ["Danube", "Nile"]
      },
      {
        id: 10,
        question: "Which of these countries are located in South America?",
        options: ["Argentina", "Colombia", "Canada", "Peru"],
        correctAnswers: ["Argentina", "Colombia", "Peru"]
      }
    ]
  },
  sports: {
    single: [
      {
        id: 1,
        question: "Which country won the first FIFA World Cup?",
        options: ["Brazil", "Uruguay", "Argentina", "Germany"],
        correctAnswer: "Uruguay"
      },
      // Add 9 more single-choice sports questions
      {
        id: 2,
        question: "Who holds the record for the most goals in World Cup history?",
        options: ["Cristiano Ronaldo", "Pele", "Marta", "Miroslav Klose"],
        correctAnswer: "Miroslav Klose"
      },
      {
        id: 3,
        question: "Which country won the 2008 Summer Olympics?",
        options: ["United States", "China", "Russia", "Germany"],
        correctAnswer: "China"
      },
      {
        id: 4,
        question: "What sport does Usain Bolt compete in?",
        options: ["Football", "Basketball", "Tennis", "Athletics"],
        correctAnswer: "Athletics"
      },
      {
        id: 5,
        question: "Which country is known for originating sumo wrestling?",
        options: ["China", "Japan", "Korea", "India"],
        correctAnswer: "Japan"
      },
      {
        id: 6,
        question: "Which tennis player has won the most Grand Slam singles titles?",
        options: ["Roger Federer", "Rafael Nadal", "Serena Williams", "Novak Djokovic"],
        correctAnswer: "Margaret Court"
      },
      {
        id: 7,
        question: "Which sport is known as the 'king of sports'?",
        options: ["Football", "Cricket", "Rugby", "Tennis"],
        correctAnswer: "Football"
      },
      {
        id: 8,
        question: "Who is known as the 'Great One' in ice hockey?",
        options: ["Sidney Crosby", "Wayne Gretzky", "Mario Lemieux", "Bobby Orr"],
        correctAnswer: "Wayne Gretzky"
      },
      {
        id: 9,
        question: "What sport did Michael Jordan famously play?",
        options: ["Baseball", "Football", "Basketball", "Tennis"],
        correctAnswer: "Basketball"
      },
      {
        id: 10,
        question: "In which country did the 2016 Summer Olympics take place?",
        options: ["United States", "Brazil", "China", "Canada"],
        correctAnswer: "Brazil"
      }
    ],
    multiple: [
      {
        id: 1,
        question: "Which of these sports are played in the Olympics?",
        options: ["Swimming", "Cricket", "Basketball", "Rugby"],
        correctAnswers: ["Swimming", "Basketball"]
      },
      // Add 9 more multiple-choice sports questions
      {
        id: 2,
        question: "Which of these are considered 'team sports'?",
        options: ["Football", "Tennis", "Basketball", "Boxing"],
        correctAnswers: ["Football", "Basketball"]
      },
      {
        id: 3,
        question: "Which of these athletes are considered the greatest of all time in their respective sports?",
        options: ["Michael Jordan", "Tom Brady", "Serena Williams", "Tiger Woods"],
        correctAnswers: ["Michael Jordan", "Serena Williams", "Tiger Woods"]
      },
      {
        id: 4,
        question: "Which of these are Olympic sports?",
        options: ["Rugby", "Golf", "Baseball", "Cricket"],
        correctAnswers: ["Rugby", "Golf", "Baseball"]
      },
      {
        id: 5,
        question: "Which of these countries have hosted the FIFA World Cup?",
        options: ["Brazil", "Germany", "Japan", "United States"],
        correctAnswers: ["Brazil", "Germany", "Japan"]
      },
      {
        id: 6,
        question: "Which of these are tennis Grand Slam tournaments?",
        options: ["US Open", "French Open", "Wimbledon", "Australian Open"],
        correctAnswers: ["US Open", "French Open", "Wimbledon", "Australian Open"]
      },
      {
        id: 7,
        question: "Which of these sports require a net?",
        options: ["Tennis", "Volleyball", "Badminton", "Basketball"],
        correctAnswers: ["Tennis", "Volleyball", "Badminton"]
      },
      {
        id: 8,
        question: "Which of these sports have professional leagues in the United States?",
        options: ["Football", "Basketball", "Cricket", "Ice Hockey"],
        correctAnswers: ["Football", "Basketball", "Ice Hockey"]
      },
      {
        id: 9,
        question: "Which of these countries are known for their strong cricket teams?",
        options: ["India", "Australia", "New Zealand", "Argentina"],
        correctAnswers: ["India", "Australia", "New Zealand"]
      },
      {
        id: 10,
        question: "Which of these Olympic events are held in the Summer Olympics?",
        options: ["Basketball", "Skiing", "Swimming", "Gymnastics"],
        correctAnswers: ["Basketball", "Swimming", "Gymnastics"]
      }
    ]
  }
};

export const calculateScore = (answers, questions, quizType) => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return 0;
  }

  return questions.reduce((totalScore, question, index) => {
    const userAnswer = answers[index];
    
    if (!userAnswer) {
      return totalScore;
    }

    if (quizType === 'multiple') {
      if (!Array.isArray(userAnswer)) {
        return totalScore;
      }

      const correctAnswers = question.correctAnswers;
      
      // Count correct and incorrect selections
      const correctSelections = userAnswer.filter(ans => correctAnswers.includes(ans)).length;
      const incorrectSelections = userAnswer.filter(ans => !correctAnswers.includes(ans)).length;
      
      // Calculate points for correct answers
      const pointsPerCorrect = 10 / correctAnswers.length;
      let score = correctSelections * pointsPerCorrect;
      
      // Apply penalty for incorrect selections
      const penaltyPerWrong = pointsPerCorrect * 0.5; // 50% penalty
      score = Math.max(0, score - (incorrectSelections * penaltyPerWrong));
      
      // Round to one decimal place
      return totalScore + Math.round(score * 10) / 10;
    } else {
      return totalScore + (userAnswer === question.correctAnswer ? 10 : 0);
    }
  }, 0);
};

// Fetch quiz data function
export const fetchQuizData = async (topic, type) => {
  try {
    if (!QUIZ_DATA[topic]) {
      throw new Error(`Topic "${topic}" not found`);
    }

    const questions = QUIZ_DATA[topic][type];
    if (!questions) {
      throw new Error(`Question type "${type}" not found for topic "${topic}"`);
    }

    return {
      questions: questions,
      topic: topic,
      type: type
    };
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};

// Question feedback function
export const getQuestionFeedback = (userAnswer, correctAnswer, quizType) => {
  if (!userAnswer) {
    return { 
      isCorrect: false, 
      message: 'No answer provided',
      score: 0,
      details: {
        correctSelections: 0,
        incorrectSelections: 0,
        totalPossible: quizType === 'multiple' ? correctAnswer.length : 1
      }
    };
  }

  if (quizType === 'multiple') {
    if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) {
      return { 
        isCorrect: false, 
        message: 'Invalid answer format',
        score: 0,
        details: null
      };
    }

    const correctSelections = userAnswer.filter(ans => correctAnswer.includes(ans)).length;
    const incorrectSelections = userAnswer.filter(ans => !correctAnswer.includes(ans)).length;
    
    const pointsPerCorrect = 10 / correctAnswer.length;
    let score = correctSelections * pointsPerCorrect;
    
    const penaltyPerWrong = pointsPerCorrect * 0.5;
    score = Math.max(0, score - (incorrectSelections * penaltyPerWrong));
    score = Math.round(score * 10) / 10;

    let message;
    if (score === 10) {
      message = 'Perfect! All answers are correct!';
    } else if (score > 0) {
      message = `Partially correct! You got ${correctSelections} out of ${correctAnswer.length} correct.`;
      if (incorrectSelections > 0) {
        message += ` (${incorrectSelections} incorrect selection${incorrectSelections > 1 ? 's' : ''})`;
      }
    } else {
      message = `Incorrect. The correct answers are: ${correctAnswer.join(', ')}`;
    }

    return {
      isCorrect: score === 10,
      message,
      score,
      details: {
        correctSelections,
        incorrectSelections,
        totalPossible: correctAnswer.length,
        pointsPerCorrect,
        penalty: penaltyPerWrong
      }
    };
  }

  // For single choice questions
  const isCorrect = userAnswer === correctAnswer;
  return {
    isCorrect,
    message: isCorrect ? 'Correct! Full 10 points!' : `Incorrect. The right answer is: ${correctAnswer}`,
    score: isCorrect ? 10 : 0,
    details: {
      correctSelections: isCorrect ? 1 : 0,
      incorrectSelections: isCorrect ? 0 : 1,
      totalPossible: 1
    }
  };
};