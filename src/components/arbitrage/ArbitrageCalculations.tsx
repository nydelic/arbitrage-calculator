import { Fragment } from "react";
import { calculateArbitrage } from "../../arbitrage";
import { MathRound, MathRoundList } from "../../arbitrage/utils";
import { useArbitrageFormContext } from "../../hooks/useArbitrageForm";

interface ArbitrageCalculationsProps {}

function ArbitrageCalculations({}: ArbitrageCalculationsProps) {
  const { watch, setValue } = useArbitrageFormContext();
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
      <h2 className="text-center text-lg">Results</h2>
      <ul className="list-disc ml-3">
        <li className="text-zinc-300 text-sm">
          Available margin is {MathRound(availableWinMargin, 2)}
        </li>
        <li className="text-zinc-300 text-sm">
          Best odds are {MathRoundList(bestOdds, 1).join(" | ")} <br />
        </li>
        <li className="text-zinc-300 text-sm">
          Chances are {MathRoundList(chances, 1).join(" | ")} <br />
        </li>
        <li className="text-zinc-300 text-sm">
          Equalized biases are {MathRoundList(equalizedBiases, 2).join(" | ")}{" "}
          <button
            type="button"
            className="rounded-sm py-1 px-2 bg-zinc-100 text-zinc-400 hover:text-zinc-500 hover:bg-zinc-200"
            onClick={(e) => {
              e.preventDefault();
              equalizedBiases.forEach((bias, biasIndex) => {
                setValue(`biasConfig.${biasIndex}`, Math.round(bias * 100), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              });
            }}
          >
            → Load equalized biases
          </button>
        </li>
      </ul>
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
