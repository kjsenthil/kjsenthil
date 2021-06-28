import { ProjectionsChartHistoricalDatum } from '../../services/performance/types';
import { timeSeriesDateSorterDescending } from '../../utils/chart/timeSeriesDateSorter';

export interface GetMonthlyHistoricalDataConfig {
  // If true, will not sort the provided historical data array in descending
  // order. This is helpful if the provided data is already sorted in descending
  // order.
  isSortedDescending?: boolean;
}

/**
 * This returns monthly data given a series of historical data.
 */
export default function getMonthlyHistoricalData(
  historicalData: ProjectionsChartHistoricalDatum[],
  { isSortedDescending }: GetMonthlyHistoricalDataConfig = {}
): ProjectionsChartHistoricalDatum[] {
  if (historicalData.length <= 1) {
    // No need to do anything if there is only 1 entry (or fewer) in the array
    return historicalData;
  }

  if (!isSortedDescending) {
    // Sort in descending order, so when we traverse from 0 -> array's end, we
    // encounter later months first
    historicalData.sort(timeSeriesDateSorterDescending);
  }

  // We start out with an array containing the first entry. This entry has the
  // latest date.
  const monthlyHistoricalData = [historicalData[0]];

  for (let i = 1; i < historicalData.length; i++) {
    const currentEarliestMonth = monthlyHistoricalData[
      monthlyHistoricalData.length - 1
    ].date.getMonth();

    const currentDatumMonth = historicalData[i].date.getMonth();

    if (currentDatumMonth !== currentEarliestMonth) {
      // currentDatumMonth is guaranteed to be the latest day of the month in
      // this case because the historicalData array is sorted in descending
      // order.
      monthlyHistoricalData.push(historicalData[i]);
    }
  }

  return monthlyHistoricalData;
}
