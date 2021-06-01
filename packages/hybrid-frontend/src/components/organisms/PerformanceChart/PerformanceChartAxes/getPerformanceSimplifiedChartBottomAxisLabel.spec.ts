import { PerformanceDataPeriod } from '../../../../services/performance/constants';
import getPerformanceSimplifiedChartBottomAxisLabel from './getPerformanceSimplifiedChartBottomAxisLabel';

describe('getPerformanceSimplifiedChartBottomAxisLabel', () => {
  const testMapping = [
    [PerformanceDataPeriod.ALL_TIME, 'BEGINNING'],
    [PerformanceDataPeriod['1M'], '1 MONTH AGO'],
    [PerformanceDataPeriod['3M'], '3 MONTHS AGO'],
    [PerformanceDataPeriod['6M'], '6 MONTHS AGO'],
    [PerformanceDataPeriod['1Y'], '1 YEAR AGO'],
  ];

  test.each(testMapping)('works as intended when period is %p', (dataPeriod, expectedText) => {
    expect(getPerformanceSimplifiedChartBottomAxisLabel(dataPeriod as PerformanceDataPeriod)).toBe(
      expectedText as string
    );
  });
});
