import getMonthlyHistoricalData from './getMonthlyHistoricalData';
import getAnnualHistoricalData from './getAnnualHistoricalData';
import usePerformanceData from '../usePerformanceData';
import useContributionsData from '../useContributionsData';
import { ProjectionsChartHistoricalDatum } from '../../services/performance/types';
import { timeSeriesDateSorterDescending } from '../../utils/chart/timeSeriesDateSorter';

/**
 * This hook returns all historical data in a format appropriate for the
 * projections chart.
 *
 * Callers of the hook can choose to get either monthly (default) or annual
 * data.
 *
 * Note that this hook expects performance data and contributions data to have
 * the same amount of data points (i.e. for every day that there is performance
 * data, there should also be a corresponding day with contributions data)
 */
export default function useHistoricalDataForProjectionsChart(
  variant: 'monthly' | 'annual' = 'monthly'
): ProjectionsChartHistoricalDatum[] {
  const performanceData = usePerformanceData({ ignorePeriod: true });
  const contributionsData = useContributionsData({ ignorePeriod: true });

  if (performanceData.length === 0 || contributionsData.length === 0) {
    return [];
  }

  const sortedPerformanceData = [...performanceData].sort(timeSeriesDateSorterDescending);
  const sortedContributionsData = [...contributionsData].sort(timeSeriesDateSorterDescending);

  // This step combines performance and contributions data. We are assuming that
  // performance data and contributions data have identical dates for all of
  // their data points.
  const historicalData: ProjectionsChartHistoricalDatum[] = sortedPerformanceData.map((d, i) => ({
    date: d.date,
    value: d.value,
    netContributionsToDate: sortedContributionsData[i] ? sortedContributionsData[i].value : 0,
  }));

  return variant === 'monthly'
    ? getMonthlyHistoricalData(historicalData, { isSortedDescending: true })
    : getAnnualHistoricalData(historicalData);
}
