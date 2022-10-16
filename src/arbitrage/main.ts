import calculateEverything from "./calculateEverything";
import simulateManyBets from "./simulateManyBets";
import { MathRound, MathRoundList } from "./utils";

// config
const BUDGET = 1000;
// const BIAS_CONFIG = undefined;
const BIAS_CONFIG = [1, 1, 1];

// dataset
const PROVIDED_ODDS = [[3, 5, 99]];

// sim config
const SIMULATION_RUNS = 10;
const START_BALANCE = 1000;

const calculations = calculateEverything({
  oddsDataset: PROVIDED_ODDS,
  biasConfig: BIAS_CONFIG,
  budget: BUDGET,
});
const {
  chances,
  betsToTake,
  profits,
  bestOdds,
  availableWinMargin,
  equalizedBiases,
} = calculations;

console.log("Available margin is", MathRound(availableWinMargin, 2));
console.log("Best odds are", MathRoundList(bestOdds, 1));
console.log("Chances are", MathRoundList(chances, 1));
console.log("Equalized biases are", MathRoundList(equalizedBiases, 2));
console.log("Bets are", MathRoundList(betsToTake, 2));
profits.forEach((profit, winnerIndex) => {
  console.log(`Profit if winner is ${winnerIndex}:`, MathRound(profit, 2));
});

simulateManyBets(SIMULATION_RUNS, START_BALANCE, calculations);
