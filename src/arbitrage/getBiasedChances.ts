import { MathSum } from "./utils";

function getBiasedChancesFromWinMargin(
  chances: number[],
  biases: number[],
  winMargin: number
) {
  if (biases.length !== chances.length) {
    throw new Error("Please specify a bias for each item");
  }

  const biasesSum = MathSum(biases);

  const normalizedBiases = biases.map((bias, index) => (1 / biasesSum) * bias);

  const biasedChances = chances.map((chance, index) => {
    const biasedWinMargin = winMargin * normalizedBiases[index];
    return chance + biasedWinMargin;
  });

  return biasedChances;
}

export default getBiasedChancesFromWinMargin;
