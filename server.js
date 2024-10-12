const express = require('express');
const qrcode = require('qrcode');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

const PORT = process.env.PORT || 5000;

// Array of questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
    correctAnswer: "C"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["A) Earth", "B) Jupiter", "C) Saturn", "D) Mars"],
    correctAnswer: "B"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["A) Charles Dickens", "B) William Shakespeare", "C) Mark Twain", "D) Jane Austen"],
    correctAnswer: "B"
  },
  {
    question: "What is the boiling point of water?",
    options: ["A) 50°C", "B) 100°C", "C) 150°C", "D) 200°C"],
    correctAnswer: "B"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["A) Gold", "B) Oxygen", "C) Silver", "D) Hydrogen"],
    correctAnswer: "B"
  },
  {
    question: "Who discovered penicillin?",
    options:["A) Marie Curie","B) Alexander Fleming","C) Isaac Newton","D) Albert Einstein"],
    correctAnswer: "B",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options:["A) Venus","B) Mars","C) Mercury","D) Jupiter"],
    correctAnswer: "B",
  },
  {
    question: "What is the smallest prime number?",
    options:["A) 1","B) 2","C) 3","D) 4"],
    correctAnswer: "B",
  },

];

// Store player progress
const playerSessions = {};

app.get('/qrcode', async (req, res) => {
  try { 
    const ip = '192.168.198.92'; // Replace with your local IP address
    const url = `http://${ip}:3000/player`;  // URL for QR code
    const qrCode = await qrcode.toDataURL(url);
    res.json({ url: qrCode });
  } catch (err) {
    res.status(500).send('Error generating QR code');
  }
});



// Endpoint to send the current question to player
app.get('/question/:name', (req, res) => {
  const { name } = req.params;

  if (!playerSessions[name]) {
    // Initialize player's session if it doesn't exist
    playerSessions[name] = {
      currentQuestion: 0
    };
  }

  const questionIndex = playerSessions[name].currentQuestion;

  if (questionIndex < questions.length) {
    res.json(questions[questionIndex]);
  } else {
    res.json({ message: 'You have answered all the questions!' });
  }
});

// Submit answer and check if correct
app.post('/submit-answer', (req, res) => {
  const { name, answer } = req.body;

  if (!name || !answer) {
    return res.status(400).json({ error: 'Name and answer are required' });
  }

  if (!playerSessions[name]) {
    return res.status(400).json({ error: 'Player session not found' });
  }

  const questionIndex = playerSessions[name].currentQuestion;
  const currentQuestion = questions[questionIndex];

  // Check if the answer is correct
  if (answer.toUpperCase() === currentQuestion.correctAnswer) {
    playerSessions[name].currentQuestion++;

    if (playerSessions[name].currentQuestion < questions.length) {
      res.json({ correct: true, nextQuestion: questions[playerSessions[name].currentQuestion] });
    } else {
      res.json({ correct: true, message: 'Congratulations! You have completed all the questions.' });
    }
  } else {
    // If the answer is wrong, reset the player's progress
    playerSessions[name].currentQuestion = 0;
    res.json({ correct: false, message: 'Wrong answer. You have lost. Please start again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
