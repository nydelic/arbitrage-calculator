function MathRound(value: number, decimals: number) {
  // return value;
  const decimalsFac = Math.pow(10, decimals);
  return Math.round(value * decimalsFac) / decimalsFac;
}

export default MathRound;
