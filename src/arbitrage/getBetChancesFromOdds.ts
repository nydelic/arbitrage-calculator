function getBetChancesFromOdds(odds: number[]) {
  return odds.map((odd) => 1 / odd);
}

export default getBetChancesFromOdds;
