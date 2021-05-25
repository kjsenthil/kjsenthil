import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

interface GetPerformanceProjectionsDataMinMaxValueOptions {
  // If this is true, will not take into account the valueGood (high band) and
  // valueBad (low band) values.
  noValueRange?: boolean;
}

export function getPerformanceProjectionsDataMinValue(
  data: ProjectionsChartProjectionDatum[],
  { noValueRange }: GetPerformanceProjectionsDataMinMaxValueOptions = {}
): number {
  return data.reduce(
    (currentMin, { valueGood, value, valueBad, netContributionsToDate, valueGoalNotMet }) => {
      const valueGoalNotMetNumber = valueGoalNotMet === undefined ? Infinity : valueGoalNotMet;

      if (noValueRange) {
        return Math.min(currentMin, value, netContributionsToDate, valueGoalNotMetNumber);
      }

      return Math.min(
        currentMin,
        valueGood,
        value,
        valueBad,
        netContributionsToDate,
        valueGoalNotMetNumber
      );
    },
    Infinity
  );
}

export function getPerformanceProjectionsDataMaxValue(
  data: ProjectionsChartProjectionDatum[],
  { noValueRange }: GetPerformanceProjectionsDataMinMaxValueOptions = {}
): number {
  return data.reduce(
    (currentMax, { valueGood, value, valueBad, netContributionsToDate, valueGoalNotMet }) => {
      const valueGoalNotMetNumber = valueGoalNotMet === undefined ? -Infinity : valueGoalNotMet;

      if (noValueRange) {
        return Math.max(currentMax, value, netContributionsToDate, valueGoalNotMetNumber);
      }

      return Math.max(
        currentMax,
        valueGood,
        value,
        valueBad,
        netContributionsToDate,
        valueGoalNotMetNumber
      );
    },
    -Infinity
  );
}
