import { useEffect, useState } from 'react';
import { fetchAllGames } from '../api/gameApi';

export default function HistoryPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchAllGames();
        setGames(data);
      } catch (err) {
        console.error(err);
        setError('Could not load game history from the server.');
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  return (
    <div className="page history-page">
      <h2>Game History</h2>

      {loading && <p>Loading games...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && games.length === 0 && <p>No games played yet.</p>}

      {!loading && !error && games.length > 0 && (
        <div className="table-wrapper card">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>Score</th>
                <th>Ties</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game._id}>
                  <td>{new Date(game.playedAt).toLocaleString()}</td>
                  <td>{game.player1Name}</td>
                  <td>{game.player2Name}</td>
                  <td>
                    {game.finalScore.player1} - {game.finalScore.player2}
                  </td>
                  <td>{game.finalScore.ties}</td>
                  <td>
                    <strong>{game.winner}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
