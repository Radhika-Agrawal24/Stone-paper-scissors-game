import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Create a new game with two player names -> returns created game (with _id)
export const createGame = async (player1Name, player2Name) => {
  const { data } = await client.post('/games', { player1Name, player2Name });
  return data;
};

// Persist the full 6-round game once finished
export const completeGame = async (gameId, rounds) => {
  const { data } = await client.patch(`/games/${gameId}/complete`, { rounds });
  return data;
};

// Fetch all completed games for the History page
export const fetchAllGames = async () => {
  const { data } = await client.get('/games');
  return data;
};

// Fetch a single game by id
export const fetchGameById = async (gameId) => {
  const { data } = await client.get(`/games/${gameId}`);
  return data;
};
