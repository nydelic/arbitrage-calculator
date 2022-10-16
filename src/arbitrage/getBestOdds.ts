type OddsDataSet = number[][];

export default function getBestOdds(oddsDataset: OddsDataSet) {
  const oddsCount = oddsDataset[0].length;

  if (!oddsCount) {
    throw new Error("Dataset needs items");
  }

  const finalOdds: number[] = [];

  for (let currOdd = 0; currOdd < oddsCount; currOdd++) {
    const currOddCollection = oddsDataset.map((provided) => {
      if (provided.length !== oddsCount) {
        console.error(provided.length);
        console.error(oddsCount);
        throw new Error("All items in the dataset must have the same value");
      }

      return provided[currOdd];
    });

    const highestOdd = Math.max(...currOddCollection);
    finalOdds.push(highestOdd);
  }

  return finalOdds;
}
