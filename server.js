const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

// Create a new Express app instance
const app = express();
const prisma = new PrismaClient();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Importing the API routes
const apiRoutes = require('./api.js');
const loginRoutes = require('./login.js');
const profileRoutes = require('./profile.js');

// Use the routes from the imported files
app.use('/api', apiRoutes);         // API for quizzes
app.use('/auth', loginRoutes);      // Login and signup
app.use('/user', profileRoutes);    // Profile routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
