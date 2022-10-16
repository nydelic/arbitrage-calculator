function MathSum(numbers: number[]) {
  return numbers.reduce((partialSum, a) => partialSum + a, 0);
}

export default MathSum;
