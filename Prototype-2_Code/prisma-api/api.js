const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Function to shuffle the questions
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Route to get quizzes from external API
app.get('/v2/quiz', async (req, res) => {
  const level = req.query.level;

  try {
    // Make a GET request to the external API
    const response = await axios.get(`https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=${level}`);

    // Shuffle the questions before returning them
    const shuffledQuestions = shuffleArray(response.data);

    // Return the randomized quiz data
    res.json(shuffledQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from external API' });
  }
});

module.exports = app;
