import getBetDiffFromWinner from "./getBetDiffFromWinner";
import getRandomWinnerFromOdds from "./getRandomWinnerFromOdds";

function simulateBet(
  startBalance: number,
  odds: number[],
  betsToTake: number[]
) {
  const winner = getRandomWinnerFromOdds(odds);

  return startBalance + getBetDiffFromWinner(winner, betsToTake, odds);
}

export default simulateBet;
