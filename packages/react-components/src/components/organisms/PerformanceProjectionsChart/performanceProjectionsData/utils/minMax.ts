import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../../services/projections';
import { ProjectionsChartHistoricalDatum } from '../../../../../services/performance';

export interface GetPerformanceProjectionsDataMinMaxValueProps {
  projectionsData: ProjectionsChartProjectionDatum[];
  projectionsTargetData?: ProjectionsChartProjectionTargetDatum[];

  historicalData: ProjectionsChartHistoricalDatum[];

  // If this is true, will not take into account the upper and lower bound value
  // ranges. Use this when the chart does not display the band.
  noValueRange?: boolean;
}

export function getPerformanceProjectionsDataMinValue({
  projectionsData,
  projectionsTargetData,
  historicalData,
  noValueRange,
}: GetPerformanceProjectionsDataMinMaxValueProps): number {
  const minProjectionData = projectionsData.reduce(
    (currentMin, { upperBound, value, lowerBound, netContributionsToDate }) => {
      if (noValueRange) {
        return Math.min(currentMin, value, netContributionsToDate);
      }

      return Math.min(currentMin, upperBound, value, lowerBound, netContributionsToDate);
    },
    Infinity
  );

  const minProjectionsTargetData =
    projectionsTargetData?.reduce(
      (currentMin, { value }) => Math.min(currentMin, value),
      Infinity
    ) ?? Infinity;

  const minHistoricalData = historicalData.reduce(
    (currentMin, { value, netContributionsToDate }) =>
      Math.min(currentMin, value, netContributionsToDate),
    Infinity
  );

  return Math.min(minProjectionData, minProjectionsTargetData, minHistoricalData);
}

export function getPerformanceProjectionsDataMaxValue({
  projectionsData,
  projectionsTargetData,
  historicalData,
  noValueRange,
}: GetPerformanceProjectionsDataMinMaxValueProps): number {
  const maxProjectionData = projectionsData.reduce(
    (currentMax, { upperBound, value, lowerBound, netContributionsToDate }) => {
      if (noValueRange) {
        return Math.max(currentMax, value, netContributionsToDate);
      }

      return Math.max(currentMax, upperBound, value, lowerBound, netContributionsToDate);
    },
    -Infinity
  );

  const maxProjectionsTargetData =
    projectionsTargetData?.reduce(
      (currentMax, { value }) => Math.max(currentMax, value),
      -Infinity
    ) ?? -Infinity;

  const maxHistoricalData = historicalData.reduce(
    (currentMax, { value, netContributionsToDate }) =>
      Math.max(currentMax, value, netContributionsToDate),
    -Infinity
  );

  return Math.max(maxProjectionData, maxProjectionsTargetData, maxHistoricalData);
}
