import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';

const PlayerAnswerComponent = ({ question, options, onSubmitAnswer }) => {
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAnswerClick = (option) => {
    setAnswer(option);
  };

  const handleSubmit = () => {
    if (name && answer) {
      onSubmitAnswer({ name, answer });
    } else {
      alert("Please enter your name and select an answer.");
    }
  };

  return (
    <div>
      <h1>Welcome to KBC Game!</h1>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        style={{ marginBottom: '20px' }} 
      />
      <QuestionComponent 
        question={question} 
        options={options} 
        handleOptionClick={handleAnswerClick} 
      />
      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
};

export default PlayerAnswerComponent;
