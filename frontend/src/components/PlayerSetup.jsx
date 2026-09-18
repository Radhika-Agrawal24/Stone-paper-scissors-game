import { useState } from 'react';

export default function PlayerSetup({ onStart, isLoading }) {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const p1 = player1Name.trim();
    const p2 = player2Name.trim();

    if (!p1 || !p2) {
      setError('Both player names are required.');
      return;
    }
    if (p1.toLowerCase() === p2.toLowerCase()) {
      setError('Player names must be different.');
      return;
    }

    setError('');
    onStart(p1, p2);
  };

  return (
    <form className="player-setup card" onSubmit={handleSubmit}>
      <h2>Enter Player Names</h2>

      <div className="form-group">
        <label htmlFor="player1">Player 1</label>
        <input
          id="player1"
          type="text"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          placeholder="e.g. Anisha"
          maxLength={30}
        />
      </div>

      <div className="form-group">
        <label htmlFor="player2">Player 2</label>
        <input
          id="player2"
          type="text"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          placeholder="e.g. Rohan"
          maxLength={30}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Starting...' : 'Start Game (6 Rounds)'}
      </button>
    </form>
  );
}
