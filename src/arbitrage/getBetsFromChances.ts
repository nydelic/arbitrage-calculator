import { MathSum } from "./utils";

function getBetsFromChances(budget: number, chances: number[]) {
  const chancesSum = MathSum(chances);
  return chances.map((chance) => (budget / chancesSum) * chance);
}

export default getBetsFromChances;
