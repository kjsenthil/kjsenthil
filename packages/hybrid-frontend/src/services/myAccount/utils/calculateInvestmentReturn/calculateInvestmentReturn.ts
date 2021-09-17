type Data = { value: number; date: Date };

const calculateInvestmentReturn = (
  sortedPerformanceData: Array<Data>,
  sortedContributionData: Array<Data>
): { value: number; percent: number } => {
  let value = 0;
  let percent = 0;

  if (sortedPerformanceData.length > 1) {
    if (!sortedPerformanceData.length || !sortedContributionData.length) {
      return { value: 0, percent: 0 };
    }

    // get first non zero value
    const firstNonZeroIndex = sortedPerformanceData.findIndex((x) => x.value !== 0);

    const firstPerformanceValue =
      firstNonZeroIndex === -1 ? 0 : sortedPerformanceData[firstNonZeroIndex].value;
    const firstContributionValue =
      firstNonZeroIndex === -1 ? 0 : sortedContributionData[firstNonZeroIndex].value;

    const lastPerformanceData = sortedPerformanceData[sortedPerformanceData.length - 1];
    const lastContributionData = sortedContributionData[sortedContributionData.length - 1];

    const lastTotalReturn = lastPerformanceData.value - lastContributionData.value;

    const firstTotalReturn = firstPerformanceValue - firstContributionValue;
    value = lastTotalReturn - firstTotalReturn;
    percent = !firstPerformanceValue ? 0 : value / firstPerformanceValue;
  }

  return { value, percent };
};

export default calculateInvestmentReturn;
