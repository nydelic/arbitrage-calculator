import getBestOdds from "./getBestOdds";
import getBetChancesFromOdds from "./getBetChancesFromOdds";
import getBetDiffFromWinner from "./getBetDiffFromWinner";
import getBetsFromChances from "./getBetsFromChances";
import getBiasedChances from "./getBiasedChances";
import { MathSum } from "./utils";

interface CalculateEverythingArgs {
  oddsDataset: number[][];
  biasConfig?: number[];
  budget: number;
}

function calculateEverything({
  oddsDataset,
  biasConfig,
  budget,
}: CalculateEverythingArgs) {
  const bestOdds = getBestOdds(oddsDataset);

  const baseChances = getBetChancesFromOdds(bestOdds);
  const equalizedBiases = [...baseChances]; // same as chances

  const bookMakerMargin = MathSum(baseChances);
  const availableWinMargin = 1 - bookMakerMargin;

  const chances = biasConfig
    ? getBiasedChances(baseChances, biasConfig, availableWinMargin)
    : baseChances;

  const betsToTake = getBetsFromChances(budget, chances);

  const profits = bestOdds.map((odd, winnerIndex) => {
    const winnerResult = getBetDiffFromWinner(
      winnerIndex,
      betsToTake,
      bestOdds
    );

    return winnerResult;
  });

  const stake = MathSum(betsToTake);

  // verify calculations
  if (Math.abs(budget - stake) > 0.1) {
    console.error(`Budget: ${budget} | CaluclatedStake: ${stake}`);
    throw "Calculated stake (sum of bets) should be exactly the budget that was provided!";
  }
  return {
    chances,
    betsToTake,
    profits,
    bestOdds,
    availableWinMargin,
    equalizedBiases,
  };
}

export default calculateEverything;
