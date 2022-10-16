import getBetWin from "./getBetWin";
import { MathSum } from "./utils";

function getBetDiffFromWinner(
  winner: number,
  betsToTake: number[],
  odds: number[]
) {
  // amount payed for bets
  const betCost = -MathSum(betsToTake);

  const betWin = getBetWin(winner, odds, betsToTake);

  return betCost + betWin;
}

export default getBetDiffFromWinner;
