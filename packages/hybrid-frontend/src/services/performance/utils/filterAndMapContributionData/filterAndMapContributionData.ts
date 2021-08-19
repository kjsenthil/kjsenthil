import { findDateByPeriod, mapContributionsData } from '@tsw/react-components';
import { IncludedNetContributions } from '../../types';

const filterAndMapContributionData = (
  contributionData: IncludedNetContributions['attributes']['netContributions'],
  performanceDataPeriod: string
): { date: Date; value: number }[] => {
  const startDate = findDateByPeriod(
    contributionData.map(({ date }) => date),
    performanceDataPeriod
  );

  const periodContributionsData = contributionData
    .filter((c) => startDate && c.date >= startDate)
    .map(mapContributionsData);

  // If there is only 1 data point in the dataset (can happen when there is
  // missing data and the period selected is short), the line chart won't
  // render. This piece of code ensures there is always at least a 2 points of
  // data provided for the chart by adding an identical datum dated at the
  // period's beginning .
  if (periodContributionsData.length === 1 && startDate) {
    periodContributionsData.push({
      value: periodContributionsData[0].value,
      date: new Date(startDate),
    });
  }

  return periodContributionsData;
};

export default filterAndMapContributionData;
