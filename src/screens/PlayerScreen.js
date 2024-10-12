import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/PlayerScreen.css'; // Importing the CSS

const PlayerScreen = () => {
  const [name, setName] = useState('');        // Player's name
  const [answer, setAnswer] = useState('');    // Player's answer
  const [question, setQuestion] = useState(null);  // Current question
  const [message, setMessage] = useState('');  // To display messages
  const [gameStarted, setGameStarted] = useState(false); // Flag to start the game

  // Fetch the current question from the backend
  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/question/${name}`);
      if (response.data.message) {
        setMessage(response.data.message); // All questions answered or game over
        setQuestion(null);
      } else {
        setQuestion(response.data); // Set the fetched question
        setMessage(''); // Clear any previous messages when fetching a new question
      }
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  // Start the game once the player enters their name and clicks the button
  const startGame = () => {
    if (name) {
      setGameStarted(true);  // Set flag to true
      fetchQuestion();       // Fetch the first question
    } else {
      setMessage('Please enter your name to start the game.');
    }
  };

  // Handle form submission for the answer
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload on form submit

    if (!answer) {
      setMessage('Please enter your answer.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/submit-answer', { name, answer });
      if (response.data.correct) {
        setMessage(`Congratulations ${name}! Correct answer.`);
        if (response.data.nextQuestion) {
          setTimeout(() => {
            setMessage(''); // Clear the congratulations message before the next question
            setQuestion(response.data.nextQuestion); // Load the next question
          }, 1500); // Delay for 1.5 seconds before showing the next question
        } else {
          setMessage(response.data.message); // All questions answered
          setQuestion(null);
        }
      } else {
        setMessage(response.data.message); // Wrong answer message
        setName(''); // Reset the name to start over
        setGameStarted(false); // End the game, player needs to restart
        setQuestion(null); // Clear the question
      }
      setAnswer(''); // Clear the answer field
    } catch (error) {
      console.error('Error submitting answer:', error);
      setMessage('Error submitting your answer. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Welcome to the Game, {name ? name : 'Player'}!</h1>

      {/* Display any message */}
      {message && <p>{message}</p>}

      {/* Input for player's name, only show if the game has not started */}
      {!gameStarted && (
        <>
          <input
            type="text"
            placeholder="Enter your name to start"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button onClick={startGame}>Start Game</button>
        </>
      )}

      {/* Display the current question and answer input only if the game has started */}
      {gameStarted && question && (
        <div>
          <h2>{question.question}</h2>
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>

          {/* Form for submitting answer */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button type="submit">Submit Answer</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlayerScreen;
