// Stone beats scissors, scissors beat paper, paper beats stone.
const BEATS = {
  stone: 'scissors',
  scissors: 'paper',
  paper: 'stone'
};

/**
 * @param {string} p1Choice
 * @param {string} p2Choice
 * @returns {'player1'|'player2'|'tie'}
 */
export function determineWinner(p1Choice, p2Choice) {
  if (p1Choice === p2Choice) return 'tie';
  return BEATS[p1Choice] === p2Choice ? 'player1' : 'player2';
}
