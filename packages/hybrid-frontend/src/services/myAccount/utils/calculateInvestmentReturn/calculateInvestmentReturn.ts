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
    const firstPerformanceData = sortedPerformanceData[0];
    const lastPerformanceData = sortedPerformanceData[sortedPerformanceData.length - 1];
    const firstContributionData = sortedContributionData[0];
    const lastContributionData = sortedContributionData[sortedContributionData.length - 1];

    const lastTotalReturn = lastPerformanceData.value - lastContributionData.value;

    const firstTotalReturn = firstPerformanceData.value - firstContributionData.value;

    value = lastTotalReturn - firstTotalReturn;

    percent = !firstPerformanceData.value ? 0 : value / firstPerformanceData.value;
  }

  return { value, percent };
};

export default calculateInvestmentReturn;
