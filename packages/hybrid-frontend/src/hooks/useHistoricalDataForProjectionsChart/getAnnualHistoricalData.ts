import { group as d3Group, maxIndex as d3MaxIndex } from 'd3-array';
import { ProjectionsChartHistoricalDatum } from '../../services/performance/types';
import { timeSeriesDateAccessor } from '../../utils/chart/accessors';

/**
 * For each year of performance / contributions data, return the latest
 * performance and contributions data point in an array.
 */
export default function getAnnualHistoricalData(
  historicalData: ProjectionsChartHistoricalDatum[]
): ProjectionsChartHistoricalDatum[] {
  const annualHistoricalData: ProjectionsChartHistoricalDatum[] = [];

  const historicalDataByYearMap = d3Group(historicalData, (d) => d.date.getFullYear());

  historicalDataByYearMap.forEach((historicalDataInAYear, year) => {
    // This is the index of the item in the array that contains the latest date
    // (e.g. around 31 December if data runs all the way up to December).
    const mostRecentDayDatumIndex = d3MaxIndex(historicalDataInAYear, timeSeriesDateAccessor);

    const { value, netContributionsToDate } = historicalDataInAYear[mostRecentDayDatumIndex];

    annualHistoricalData.push({
      // Normalize the date to 1 January
      date: new Date(year, 0, 1),

      value,
      netContributionsToDate,
    });
  });

  return annualHistoricalData;
}
