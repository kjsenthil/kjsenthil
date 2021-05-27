import { group as d3Group, maxIndex as d3MaxIndex } from 'd3-array';
import { ProjectionsChartAnnualHistoricalDatum } from '../types';
import useContributionsData from './useContributionsData';
import usePerformanceData from './usePerformanceData';
import {
  ContributionDatum,
  PerformanceDatum,
} from '../../../components/organisms/PerformanceChart/performanceData';
import { timeSeriesDateAccessor } from '../../../utils/chart/accessors';

// TODO: this should come from the API ideally - right now we don't know which
//  API provides this - so this is a compromise.

/**
 * For each year of performance / contributions data, return the latest
 * performance and contributions data point in an array.
 *
 * Note: the performance and contributions data should have identical dates,
 * else the data returned probably won't be as expected.
 */
function getAnnualHistoricalData(
  performanceData: PerformanceDatum[],
  contributionsData: ContributionDatum[]
): ProjectionsChartAnnualHistoricalDatum[] {
  const annualHistoricalData: ProjectionsChartAnnualHistoricalDatum[] = [];

  const performanceDataByYearMap = d3Group(performanceData, (d) => d.date.getFullYear());
  const contributionDataByYearMap = d3Group(contributionsData, (d) => d.date.getFullYear());

  performanceDataByYearMap.forEach((performanceDataInAYear, year) => {
    // The index of the item in the performanceDataInAYear array that contains
    // the latest date (e.g. around 31 December if data runs all the way up to
    // December).
    const mostRecentDayDatumIndex = d3MaxIndex(performanceDataInAYear, timeSeriesDateAccessor);

    const performanceValueOnMostRecentDay =
      performanceDataInAYear[mostRecentDayDatumIndex]?.value ?? 0;

    const contributionsDataByYear = contributionDataByYearMap.get(year);
    const contributionsValueOnMostRecentDay = contributionsDataByYear
      ? contributionsDataByYear[mostRecentDayDatumIndex]?.value ?? 0
      : 0;

    annualHistoricalData.push({
      // Normalize the date to 1 January
      date: new Date(year, 0, 1),

      value: performanceValueOnMostRecentDay,
      netContributionsToDate: contributionsValueOnMostRecentDay,
    });
  });

  return annualHistoricalData;
}

export default function useAnnualHistoricalDataForChart(): ProjectionsChartAnnualHistoricalDatum[] {
  const performanceData = usePerformanceData({ ignorePeriod: true });
  const contributionsData = useContributionsData({ ignorePeriod: true });

  if (performanceData.length === 0 || contributionsData.length === 0) {
    return [];
  }

  return getAnnualHistoricalData(performanceData, contributionsData);
}
