const mongoose = require('mongoose');

const CHOICES = ['stone', 'paper', 'scissors'];
const ROUND_RESULTS = ['player1', 'player2', 'tie'];

const RoundSchema = new mongoose.Schema(
  {
    roundNumber: { type: Number, required: true, min: 1, max: 6 },
    player1Choice: { type: String, enum: CHOICES, required: true },
    player2Choice: { type: String, enum: CHOICES, required: true },
    result: { type: String, enum: ROUND_RESULTS, required: true }
  },
  { _id: false }
);

const GameSchema = new mongoose.Schema(
  {
    player1Name: { type: String, required: true, trim: true },
    player2Name: { type: String, required: true, trim: true },
    rounds: {
      type: [RoundSchema],
      validate: {
        validator: (arr) => arr.length <= 6,
        message: 'A game cannot have more than 6 rounds'
      },
      default: []
    },
    finalScore: {
      player1: { type: Number, default: 0 },
      player2: { type: Number, default: 0 },
      ties: { type: Number, default: 0 }
    },
    winner: { type: String, default: null }, 
    status: {
      type: String,
      enum: ['in_progress', 'completed'],
      default: 'in_progress'
    },
    playedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', GameSchema);
module.exports.CHOICES = CHOICES;
