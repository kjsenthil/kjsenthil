import { PerformanceDataPeriod } from '../../../../services/performance/constants';

const PERIOD_REGEX = /(\d+)([my])/;

/**
 * Given a data period (per the PerformanceDataPeriod enum), return a label for
 * the performance simplified chart (e.g. 1m -> 1 MONTH AGO).
 */
export default function getPerformanceSimplifiedChartBottomAxisLabel(
  dataPeriod: PerformanceDataPeriod
): string {
  if (dataPeriod === PerformanceDataPeriod.ALL_TIME) {
    return 'BEGINNING';
  }

  const regexRes = dataPeriod.match(PERIOD_REGEX);

  if (regexRes && regexRes.length >= 3) {
    const [, count, monthOrYear] = regexRes;

    const pluralSuffix = Number(count) > 1 ? 'S' : '';
    const monthOrYearText = monthOrYear === 'm' ? 'MONTH' : 'YEAR';

    return `${count} ${monthOrYearText}${pluralSuffix} AGO`;
  }

  return '';
}
