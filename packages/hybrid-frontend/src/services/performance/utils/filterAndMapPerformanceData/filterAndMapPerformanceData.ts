import { findDateByPeriod, mapPerformanceData } from '@tsw/react-components';
import { PerformanceAccountsAggregatedResponse } from '../../types';

const filterAndMapPerformanceData = (
  performanceData: PerformanceAccountsAggregatedResponse['data']['attributes']['values'],
  performanceDataPeriod: string
): { date: Date; value: number }[] => {
  const startDate = findDateByPeriod(
    performanceData.map(({ date }) => date),
    performanceDataPeriod
  );

  const periodPerformanceData = performanceData
    .filter((p) => startDate && p.date >= startDate)
    .map(mapPerformanceData);

  // If there is only 1 data point in the dataset (can happen when there is
  // missing data and the period selected is short), the line chart won't
  // render. This piece of code ensures there is always at least a 2 points of
  // data provided for the chart by adding an identical datum dated at the
  // period's beginning .
  if (periodPerformanceData.length === 1 && startDate) {
    periodPerformanceData.push({
      value: periodPerformanceData[0].value,
      date: new Date(startDate),
    });
  }

  return periodPerformanceData;
};

export default filterAndMapPerformanceData;
