const express = require('express');
const router = express.Router();
const LocationTrend = require('../models/LocationTrend');

// @route   POST api/trends
// @desc    Create a new location trend
// @access  Public (Consider adding authentication later)
router.post('/', async (req, res) => {
  const { latitude, longitude, trendName, description } = req.body;

  try {
    const newTrend = new LocationTrend({
      latitude,
      longitude,
      trendName,
      description,
    });

    const trend = await newTrend.save();
    res.status(201).json(trend);
  } catch (err) {
    console.error('Error creating trend:', err.message);
    if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: err.errors });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/trends
// @desc    Get all location trends
// @access  Public
router.get('/', async (req, res) => {
  try {
    const trends = await LocationTrend.find().sort({ reportedAt: -1 }); // Newest first
    res.json(trends);
  } catch (err) {
    console.error('Error fetching trends:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/trends/:id
// @desc    Get a specific location trend by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const trend = await LocationTrend.findById(req.params.id);
    if (!trend) return res.status(404).json({ msg: 'Trend not found' });
    res.json(trend);
  } catch (err) {
    console.error('Error fetching trend by ID:', err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Trend not found (invalid ID format)' });
    res.status(500).send('Server Error');
  }
});

module.exports = router;
