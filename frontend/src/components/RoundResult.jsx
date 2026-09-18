import { CHOICES } from '../constants/choices';

const getEmoji = (choiceKey) => CHOICES.find((c) => c.key === choiceKey)?.emoji || '';

export default function RoundResult({ round, player1Name, player2Name, onNext, isLastRound }) {
  if (!round) return null;

  const resultText =
    round.result === 'tie'
      ? "It's a tie!"
      : round.result === 'player1'
      ? `${player1Name} wins this round!`
      : `${player2Name} wins this round!`;

  return (
    <div className="round-result card">
      <h3>Round {round.roundNumber} Result</h3>
      <div className="reveal-row">
        <div className="reveal-side">
          <p>{player1Name}</p>
          <span className="choice-emoji large">{getEmoji(round.player1Choice)}</span>
          <p className="choice-name">{round.player1Choice}</p>
        </div>
        <div className="reveal-vs">VS</div>
        <div className="reveal-side">
          <p>{player2Name}</p>
          <span className="choice-emoji large">{getEmoji(round.player2Choice)}</span>
          <p className="choice-name">{round.player2Choice}</p>
        </div>
      </div>
      <p className={`result-banner ${round.result}`}>{resultText}</p>
      <button className="btn btn-primary" onClick={onNext}>
        {isLastRound ? 'See Final Result' : 'Next Round'}
      </button>
    </div>
  );
}
