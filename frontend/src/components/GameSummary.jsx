import { CHOICES } from '../constants/choices';

const getEmoji = (choiceKey) => CHOICES.find((c) => c.key === choiceKey)?.emoji || '';

export default function GameSummary({ player1Name, player2Name, score, rounds, onPlayAgain, saveStatus }) {
  const winnerText =
    score.player1 > score.player2
      ? `🏆 ${player1Name} Wins the Game!`
      : score.player2 > score.player1
      ? `🏆 ${player2Name} Wins the Game!`
      : "🤝 It's an Overall Tie!";

  return (
    <div className="game-summary card">
      <h2>{winnerText}</h2>
      <p className="final-score-text">
        Final Score — {player1Name}: {score.player1} | {player2Name}: {score.player2} | Ties: {score.ties}
      </p>

      {saveStatus === 'saving' && <p className="status-text">Saving result...</p>}
      {saveStatus === 'saved' && <p className="status-text success">Game saved to database ✔</p>}
      {saveStatus === 'error' && (
        <p className="status-text error">Could not save game to server. It was still played locally.</p>
      )}

      <h3>Round-by-Round Recap</h3>
      <table className="recap-table">
        <thead>
          <tr>
            <th>Round</th>
            <th>{player1Name}</th>
            <th>{player2Name}</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {rounds.map((r) => (
            <tr key={r.roundNumber}>
              <td>{r.roundNumber}</td>
              <td>
                {getEmoji(r.player1Choice)} {r.player1Choice}
              </td>
              <td>
                {getEmoji(r.player2Choice)} {r.player2Choice}
              </td>
              <td>
                {r.result === 'tie' ? 'Tie' : r.result === 'player1' ? player1Name : player2Name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}
