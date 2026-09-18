import { useState, useCallback } from 'react';
import { determineWinner } from '../utils/determineWinner';
import { TOTAL_ROUNDS } from '../constants/choices';


export const TURN_PHASE = {
  PLAYER1_PICK: 'player1_pick',
  PLAYER2_PICK: 'player2_pick',
  REVEAL: 'reveal'
};

export function useGameEngine() {
  const [currentRound, setCurrentRound] = useState(1);
  const [turnPhase, setTurnPhase] = useState(TURN_PHASE.PLAYER1_PICK);
  const [pendingP1Choice, setPendingP1Choice] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [score, setScore] = useState({ player1: 0, player2: 0, ties: 0 });
  const [isGameOver, setIsGameOver] = useState(false);

  const selectPlayer1Choice = useCallback((choice) => {
    setPendingP1Choice(choice);
    setTurnPhase(TURN_PHASE.PLAYER2_PICK);
  }, []);


  const selectPlayer2Choice = useCallback(
    (choice) => {
      const result = determineWinner(pendingP1Choice, choice);

      const roundRecord = {
        roundNumber: currentRound,
        player1Choice: pendingP1Choice,
        player2Choice: choice,
        result
      };

      setRounds((prev) => [...prev, roundRecord]);
      setScore((prev) => {
        if (result === 'player1') return { ...prev, player1: prev.player1 + 1 };
        if (result === 'player2') return { ...prev, player2: prev.player2 + 1 };
        return { ...prev, ties: prev.ties + 1 };
      });
      setTurnPhase(TURN_PHASE.REVEAL);
    },
    [pendingP1Choice, currentRound]
  );

  // Move to the next round (or mark game over after round 6)
  const proceedToNextRound = useCallback(() => {
    if (currentRound >= TOTAL_ROUNDS) {
      setIsGameOver(true);
      return;
    }
    setCurrentRound((prev) => prev + 1);
    setPendingP1Choice(null);
    setTurnPhase(TURN_PHASE.PLAYER1_PICK);
  }, [currentRound]);

  const resetGame = useCallback(() => {
    setCurrentRound(1);
    setTurnPhase(TURN_PHASE.PLAYER1_PICK);
    setPendingP1Choice(null);
    setRounds([]);
    setScore({ player1: 0, player2: 0, ties: 0 });
    setIsGameOver(false);
  }, []);

  const overallWinnerKey =
    score.player1 > score.player2 ? 'player1' : score.player2 > score.player1 ? 'player2' : 'tie';

  return {
    currentRound,
    totalRounds: TOTAL_ROUNDS,
    turnPhase,
    pendingP1Choice,
    rounds,
    score,
    isGameOver,
    overallWinnerKey,
    selectPlayer1Choice,
    selectPlayer2Choice,
    proceedToNextRound,
    resetGame
  };
}
