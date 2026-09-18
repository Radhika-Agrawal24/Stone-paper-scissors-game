const Game = require('../models/Game.model');
const { computeFinalOutcome } = require('../utils/gameLogic');


const createGame = async (req, res, next) => {
  try {
    const { player1Name, player2Name } = req.body;

    if (!player1Name || !player2Name) {
      return res.status(400).json({ message: 'Both player names are required' });
    }

    const game = await Game.create({
      player1Name: player1Name.trim(),
      player2Name: player2Name.trim(),
      rounds: [],
      status: 'in_progress'
    });

    return res.status(201).json(game);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/games/:id/complete
// Called once all 6 rounds are played client-side; persists full round data,
// recomputes the authoritative score/winner server-side, and marks the game completed.
const completeGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rounds } = req.body;

    if (!Array.isArray(rounds) || rounds.length !== 6) {
      return res.status(400).json({ message: 'Exactly 6 rounds are required to complete a game' });
    }

    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const validChoices = ['stone', 'paper', 'scissors'];
    const isValid = rounds.every(
      (r, idx) =>
        r.roundNumber === idx + 1 &&
        validChoices.includes(r.player1Choice) &&
        validChoices.includes(r.player2Choice)
    );

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid round data' });
    }

    const { score, winner } = computeFinalOutcome(rounds, game.player1Name, game.player2Name);

    game.rounds = rounds;
    game.finalScore = score;
    game.winner = winner;
    game.status = 'completed';
    game.playedAt = new Date();

    await game.save();

    return res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};

// GET /api/games
// Returns all games (for the history page), newest first
const getAllGames = async (req, res, next) => {
  try {
    const games = await Game.find({ status: 'completed' }).sort({ playedAt: -1 });
    return res.status(200).json(games);
  } catch (err) {
    next(err);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    return res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};

module.exports = { createGame, completeGame, getAllGames, getGameById };
