import { Fragment } from "react";
import { calculateArbitrage } from "../arbitrage";
import { MathRound, MathRoundList } from "../arbitrage/utils";
import { useArbitrageFormContext } from "../hooks/useArbitrageForm";

interface ArbitrageCalculationsProps {}

function ArbitrageCalculations({}: ArbitrageCalculationsProps) {
  const { watch } = useArbitrageFormContext();
  const [providedOdds, budget, enableBias, biasConfig] = watch([
    "providedOdds",
    "budget",
    "enableBias",
    "biasConfig",
  ]);

  const arbCalculations = calculateArbitrage({
    oddsDataset: providedOdds.map((providedOdd) => providedOdd.odds),
    biasConfig: enableBias ? biasConfig : undefined,
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
      <p className="text-zinc-300 text-sm">
        Available margin is {MathRound(availableWinMargin, 2)}
      </p>
      <p className="text-zinc-300 text-sm">
        Best odds are {MathRoundList(bestOdds, 1).join(" | ")} <br />
      </p>
      <p className="text-zinc-300 text-sm">
        Chances are {MathRoundList(chances, 1).join(" | ")} <br />
      </p>
      <p className="text-zinc-300 text-sm">
        Equalized biases are {MathRoundList(equalizedBiases, 2).join(" | ")}{" "}
      </p>
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
