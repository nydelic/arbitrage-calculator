import { Fragment } from "react";
import { calculateArbitrage } from "../arbitrage";
import { MathRound, MathRoundList } from "../arbitrage/utils";
import { useArbitrageFormContext } from "../hooks/useArbitrageForm";

interface ArbitrageCalculationsProps {}

function ArbitrageCalculations({}: ArbitrageCalculationsProps) {
  const { watch } = useArbitrageFormContext();
  const [providedOdds, budget] = watch(["providedOdds", "budget"]);

  // const BIAS_CONFIG = undefined;
  const BIAS_CONFIG = [1, 1, 1];

  // dataset

  // sim config
  const SIMULATION_RUNS = 10;
  const START_BALANCE = 1000;

  const arbCalculations = calculateArbitrage({
    oddsDataset: providedOdds,
    biasConfig: BIAS_CONFIG,
    budget: budget,
  });
  const {
    chances,
    betsToTake,
    profits,
    bestOdds,
    availableWinMargin,
    equalizedBiases,
  } = arbCalculations;

  return (
    <div>
      Available margin is {MathRound(availableWinMargin, 2)} <br />
      Best odds are {MathRoundList(bestOdds, 1).join(" | ")} <br />
      Chances are {MathRoundList(chances, 1).join(" | ")} <br />
      Equalized biases are {MathRoundList(equalizedBiases, 2).join(" | ")}{" "}
      <br />
      Bets are {MathRoundList(betsToTake, 2).join(" | ")} <br />
      {profits.map((profit, winnerIndex) => (
        <Fragment key={winnerIndex}>
          Profit if winner is {winnerIndex}: {MathRound(profit, 2)}
          <br />
        </Fragment>
      ))}
    </div>
  );
}

export default ArbitrageCalculations;
