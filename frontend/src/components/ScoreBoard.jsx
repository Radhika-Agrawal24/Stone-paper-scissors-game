export default function ScoreBoard({ player1Name, player2Name, score, currentRound, totalRounds }) {
  return (
    <div className="scoreboard card">
      <div className="round-indicator">
        Round {Math.min(currentRound, totalRounds)} of {totalRounds}
      </div>
      <div className="score-row">
        <div className="score-box">
          <p className="score-name">{player1Name}</p>
          <p className="score-value">{score.player1}</p>
        </div>
        <div className="score-box ties">
          <p className="score-name">Ties</p>
          <p className="score-value">{score.ties}</p>
        </div>
        <div className="score-box">
          <p className="score-name">{player2Name}</p>
          <p className="score-value">{score.player2}</p>
        </div>
      </div>
    </div>
  );
}
