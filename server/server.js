require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const trendRoutes = require('./routes/trends');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

// Basic Route
app.get('/', (req, res) => {
  res.send('Geo Location Trend Tracking API Running');
});

// API Routes
app.use('/api/trends', trendRoutes);

const PORT = process.env.PORT || 5001; // Changed default to 5001 to avoid common conflicts

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));