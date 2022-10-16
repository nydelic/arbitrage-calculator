import calculateEverything from "./calculateEverything";
import simulateBet from "./simulateBet";

function simulateManyBets(
  simulationRuns: number,
  startBalance: number,
  calculations: ReturnType<typeof calculateEverything>
) {
  const { chances, betsToTake, profits, bestOdds } = calculations;

  let fluidBalance = startBalance;

  for (let runIndex = 0; runIndex < simulationRuns; runIndex++) {
    fluidBalance = simulateBet(fluidBalance, bestOdds, betsToTake);
  }

  console.log("Diff after simulations:", fluidBalance - startBalance);
}

export default simulateManyBets;
