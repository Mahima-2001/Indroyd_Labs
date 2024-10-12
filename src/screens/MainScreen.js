import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import QRCodeComponent from '../components/QRCodeComponent';
import QuestionComponent from '../components/QuestionComponent';
import '../assets/css/MainScreen.css'

const socket = io('http://localhost:5000');

const MainScreen = () => {
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    socket.on('newQuestion', (question) => {
      setQuestionData(question);
    });

    socket.on('correctAnswer', ({ name }) => {
      alert(`Congratulations ${name}! You got the correct answer.`);
    });

    socket.on('gameOver', () => {
      alert('Game Over!');
    });
  }, []);

  return (
    <div>
      <h1 className="main-screen-title">Welcome to KBC Game</h1>
      <QRCodeComponent />
      {questionData && (
        <QuestionComponent
          question={questionData.question}
          options={questionData.options}
        />
      )}
    </div>
  );
};

export default MainScreen;

