import { MathRound } from ".";

function MathRoundList(values: number[], decimals: number) {
  return values.map((value) => MathRound(value, decimals));
}

export default MathRoundList;
