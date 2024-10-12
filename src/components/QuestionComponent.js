import React from 'react';

const QuestionComponent = ({ question, options, handleOptionClick }) => {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <button 
          key={index} 
          onClick={() => handleOptionClick(option)}
          style={{ display: 'block', margin: '10px 0' }}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuestionComponent;
