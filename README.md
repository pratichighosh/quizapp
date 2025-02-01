# Quiz Master - Interactive Quiz Application

## 📝 Project Overview

Quiz Master is an interactive web application that allows users to test their knowledge across various topics through engaging single and multiple-choice quizzes. The app offers a dynamic and user-friendly interface for learning and challenging yourself.

## ✨ Features

- **Multiple Quiz Topics**:
  - General Knowledge
  - Science
  - History
  - Geography
  - Sports

- **Quiz Types**:
  - Single Choice Questions
  - Multiple Choice Questions

- **Comprehensive Functionality**:
  - Real-time score tracking
  - Detailed question feedback
  - Adaptive question navigation
  - Error handling and fallback mechanisms

## 🚀 Technologies Used

- React
- JavaScript
- Axios (for API requests)
- Custom React Hooks
- Tailwind CSS (optional, depending on your styling)

## 🔧 Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/pratichighosh/quizapp.git
```

2. Navigate to the project directory
```bash
cd quizapp
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

## 📦 Project Structure

```
quiz-app/
│
├── src/
│   ├── components/
│   │   └── QuizComponent.jsx
│   ├── services/
│   │   └── quizService.js
│   ├── App.jsx
│   └── main.jsx
│
├── public/
│   └── index.html
│
├── package.json
└── README.md
```

## 🎮 How to Use

1. Select a quiz topic from the dropdown
2. Choose between single or multiple-choice questions
3. Answer questions by clicking on options
4. Navigate through questions using 'Next' and 'Previous' buttons
5. Submit the quiz to see your score and detailed feedback

## 🔍 Key Components

- `QuizComponent`: Main quiz interface
- `useQuizData`: Custom hook for fetching quiz data
- `calculateScore`: Score calculation logic
- `getQuestionFeedback`: Detailed answer feedback

## 🌐 API Integration

The app uses a flexible API integration with:
- Fallback to local quiz data
- Error handling
- Dynamic data fetching

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Pratichi Ghosh - pratichighosh2003@gmail.com

Project Link: [https://github.com/pratichighosh/quizapp](https://github.com/pratichighosh/quizapp)

---

**Happy Quizzing!** 🏆📚



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
