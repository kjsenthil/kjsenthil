import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../../services/projections';

interface GetPerformanceProjectionsDataMinMaxValueProps {
  projectionsData: ProjectionsChartProjectionDatum[];
  projectionsTargetData?: ProjectionsChartProjectionTargetDatum[];

  // If this is true, will not take into account the upper and lower bound value
  // ranges. Use this when the chart does not display the band.
  noValueRange?: boolean;
}

export function getPerformanceProjectionsDataMinValue({
  projectionsData,
  projectionsTargetData,
  noValueRange,
}: GetPerformanceProjectionsDataMinMaxValueProps): number {
  return projectionsData.reduce(
    (currentMin, { upperBound, value, lowerBound, netContributionsToDate }, i) => {
      const valueTarget = projectionsTargetData
        ? projectionsTargetData[i]?.value ?? Infinity
        : Infinity;

      if (noValueRange) {
        return Math.min(currentMin, value, netContributionsToDate, valueTarget);
      }

      return Math.min(
        currentMin,
        upperBound,
        value,
        lowerBound,
        netContributionsToDate,
        valueTarget
      );
    },
    Infinity
  );
}

export function getPerformanceProjectionsDataMaxValue({
  projectionsData,
  projectionsTargetData,
  noValueRange,
}: GetPerformanceProjectionsDataMinMaxValueProps): number {
  return projectionsData.reduce(
    (currentMax, { upperBound, value, lowerBound, netContributionsToDate }, i) => {
      const valueTarget = projectionsTargetData
        ? projectionsTargetData[i]?.value ?? -Infinity
        : -Infinity;

      if (noValueRange) {
        return Math.max(currentMax, value, netContributionsToDate, valueTarget);
      }

      return Math.max(
        currentMax,
        upperBound,
        value,
        lowerBound,
        netContributionsToDate,
        valueTarget
      );
    },
    -Infinity
  );
}
