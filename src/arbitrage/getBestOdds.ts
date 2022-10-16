type OddsDataSet = number[][];

export default function getBestOdds(oddsDataset: OddsDataSet) {
  const maxOddsCount = Math.max(...oddsDataset.map((odds) => odds.length));

  if (!maxOddsCount) {
    throw new Error("Dataset needs items");
  }

  const finalOdds: number[] = [];

  for (let currOdd = 0; currOdd < maxOddsCount; currOdd++) {
    const currOddCollection = oddsDataset.map((providedOdds) => {
      if (providedOdds.length !== maxOddsCount) {
        console.warn("Not all providers have the same amount of odds!");
      }

      return providedOdds[currOdd] || 0;
    });

    const highestOdd = Math.max(...currOddCollection);
    finalOdds.push(highestOdd);
  }

  return finalOdds;
}
