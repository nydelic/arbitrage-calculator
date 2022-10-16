function getBetWin(winner: number, odds: number[], bets: number[]) {
  if (typeof bets[winner] === "undefined") {
    throw new Error(`The winner does not exist: ${winner}`);
  }
  return bets[winner] * odds[winner];
}

export default getBetWin;
