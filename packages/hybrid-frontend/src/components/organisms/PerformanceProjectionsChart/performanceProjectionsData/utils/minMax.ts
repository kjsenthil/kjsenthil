import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

export function getPerformanceProjectionsDataMinValue(
  data: ProjectionsChartProjectionDatum[]
): number {
  return data.reduce(
    (curMin, { valueGood, value, valueBad, netContributionsToDate }) =>
      Math.min(curMin, valueGood, value, valueBad, netContributionsToDate),
    Infinity
  );
}

export function getPerformanceProjectionsDataMaxValue(
  data: ProjectionsChartProjectionDatum[]
): number {
  return data.reduce(
    (curMin, { valueGood, value, valueBad, netContributionsToDate }) =>
      Math.max(curMin, valueGood, value, valueBad, netContributionsToDate),
    -Infinity
  );
}
