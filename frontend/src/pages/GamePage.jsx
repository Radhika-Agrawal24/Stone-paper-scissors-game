import { useState } from 'react';
import PlayerSetup from '../components/PlayerSetup';
import ChoiceButtons from '../components/ChoiceButtons';
import RoundResult from '../components/RoundResult';
import ScoreBoard from '../components/ScoreBoard';
import GameSummary from '../components/GameSummary';
import { useGameEngine, TURN_PHASE } from '../hooks/useGameEngine';
import { createGame, completeGame } from '../api/gameApi';

export default function GamePage() {
  const [players, setPlayers] = useState(null); // { player1Name, player2Name }
  const [gameId, setGameId] = useState(null);
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [setupError, setSetupError] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error

  const {
    currentRound,
    totalRounds,
    turnPhase,
    rounds,
    score,
    isGameOver,
    selectPlayer1Choice,
    selectPlayer2Choice,
    proceedToNextRound,
    resetGame
  } = useGameEngine();

  const handleStartGame = async (player1Name, player2Name) => {
    setIsCreatingGame(true);
    setSetupError('');
    try {
      const game = await createGame(player1Name, player2Name);
      setGameId(game._id);
      setPlayers({ player1Name, player2Name });
    } catch (err) {
      setSetupError('Could not reach the server to start the game. Please check the backend is running.');
      console.error(err);
    } finally {
      setIsCreatingGame(false);
    }
  };

  // When moving past the final round's reveal, persist the completed game to the DB
  const handleAdvance = async () => {
    const isLastRound = currentRound >= totalRounds;
    proceedToNextRound();

    if (isLastRound && gameId) {
      setSaveStatus('saving');
      try {
        await completeGame(gameId, rounds);
        setSaveStatus('saved');
      } catch (err) {
        console.error(err);
        setSaveStatus('error');
      }
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    setPlayers(null);
    setGameId(null);
    setSaveStatus('idle');
  };

  const lastRound = rounds[rounds.length - 1];

  return (
    <div className="page game-page">
      {!players && (
        <>
          <PlayerSetup onStart={handleStartGame} isLoading={isCreatingGame} />
          {setupError && <p className="error-text center">{setupError}</p>}
        </>
      )}

      {players && !isGameOver && (
        <>
          <ScoreBoard
            player1Name={players.player1Name}
            player2Name={players.player2Name}
            score={score}
            currentRound={currentRound}
            totalRounds={totalRounds}
          />

          {turnPhase === TURN_PHASE.PLAYER1_PICK && (
            <ChoiceButtons playerLabel={players.player1Name} onSelect={selectPlayer1Choice} />
          )}

          {turnPhase === TURN_PHASE.PLAYER2_PICK && (
            <>
              <p className="hint-text">{players.player1Name} has chosen. Pass the device to {players.player2Name}.</p>
              <ChoiceButtons playerLabel={players.player2Name} onSelect={selectPlayer2Choice} />
            </>
          )}

          {turnPhase === TURN_PHASE.REVEAL && (
            <RoundResult
              round={lastRound}
              player1Name={players.player1Name}
              player2Name={players.player2Name}
              onNext={handleAdvance}
              isLastRound={currentRound >= totalRounds}
            />
          )}
        </>
      )}

      {players && isGameOver && (
        <GameSummary
          player1Name={players.player1Name}
          player2Name={players.player2Name}
          score={score}
          rounds={rounds}
          onPlayAgain={handlePlayAgain}
          saveStatus={saveStatus}
        />
      )}
    </div>
  );
}
