

const BEATS = {
  stone: 'scissors',
  scissors: 'paper',
  paper: 'stone'
};

/**
 * @param {string} p1Choice - 'stone' | 'paper' | 'scissors'
 * @param {string} p2Choice - 'stone' | 'paper' | 'scissors'
 * @returns {'player1'|'player2'|'tie'}
 */
function determineRoundWinner(p1Choice, p2Choice) {
  if (p1Choice === p2Choice) return 'tie';
  return BEATS[p1Choice] === p2Choice ? 'player1' : 'player2';
}


function computeFinalOutcome(rounds, player1Name, player2Name) {
  const score = { player1: 0, player2: 0, ties: 0 };

  rounds.forEach((round) => {
    const actualResult = determineRoundWinner(round.player1Choice, round.player2Choice);
    round.result = actualResult; // overwrite with server-verified result
    if (actualResult === 'player1') score.player1 += 1;
    else if (actualResult === 'player2') score.player2 += 1;
    else score.ties += 1;
  });

  let winner = 'Tie';
  if (score.player1 > score.player2) winner = player1Name;
  else if (score.player2 > score.player1) winner = player2Name;

  return { score, winner };
}

module.exports = { determineRoundWinner, computeFinalOutcome };
