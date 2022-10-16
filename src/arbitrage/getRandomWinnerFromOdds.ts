import { MathSum } from "./utils";

function getRandomWinnerFromOdds(odds: number[]) {
  const oddsSum = MathSum(odds);
  const winChancesFromOdds = odds.map((odd) => (1 / oddsSum) * odd);

  const ran = Math.random();

  let previousChance = 0;
  let winnerIndex: number | null = null;

  winChancesFromOdds.forEach((winChance, index) => {
    if (typeof winnerIndex === "number") {
      // already found a winner
      return;
    }
    if (ran < winChance + previousChance) {
      winnerIndex = index;
    }
    previousChance += winChance;
  });

  if (winnerIndex === null) {
    throw new Error("Should have found a winner by now");
  }

  return winnerIndex;
}

export default getRandomWinnerFromOdds;
