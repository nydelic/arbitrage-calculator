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
      <h2 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-zinc-900 dark:text-white">
        Results
      </h2>
      <ul className="list-disc ml-3 mb-4">
        <li className="text-zinc-300 dark:text-zinc-500 text-sm">
          Available margin is {MathRound(availableWinMargin, 2)}
        </li>
        <li className="text-zinc-300 dark:text-zinc-500 text-sm">
          Best odds are {MathRoundList(bestOdds, 1).join(" | ")} <br />
        </li>
        {/* <li className="text-zinc-300 dark:text-zinc-500 text-sm">
          Chances are {MathRoundList(chances, 1).join(" | ")} <br />
        </li> */}
        <li className="text-zinc-300 dark:text-zinc-500 text-sm">
          Equalized biases are {MathRoundList(equalizedBiases, 2).join(" | ")}{" "}
          <button
            type="button"
            className="rounded-sm py-1 px-2 bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-500 hover:text-zinc-500 hover:bg-zinc-300"
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
      <div className="font-light text-zinc-500 dark:text-zinc-400">
        <div className="mb-2">
          Bets are {MathRoundList(betsToTake, 2).join(" | ")}
        </div>
        {profits.map((profit, winnerIndex) => (
          <Fragment key={winnerIndex}>
            <div className="mb-2">
              Profit if winner is {winnerIndex + 1}:{" "}
              <span
                className={`dark:bg-zinc-800 px-2 py-1 rounded-sm ${
                  profit >= 0 ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {MathRound(profit, 2)}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ArbitrageCalculations;
