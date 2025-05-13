const mongoose = require('mongoose');

const LocationTrendSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, 'Latitude is required.'],
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required.'],
  },
  trendName: {
    type: String,
    required: [true, 'Trend name is required.'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
  // Example: Link to a user if you implement user accounts
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('LocationTrend', LocationTrendSchema);