const express = require('express');
const {
  createGame,
  completeGame,
  getAllGames,
  getGameById
} = require('../controllers/game.controller');

const router = express.Router();

router.post('/', createGame);
router.patch('/:id/complete', completeGame);
router.get('/', getAllGames);
router.get('/:id', getGameById);

module.exports = router;
