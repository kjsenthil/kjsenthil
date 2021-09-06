import {
  ProjectionsChartHistoricalDatum,
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../../services';

export interface GetDefaultProjectionsDataPointProps {
  historicalData: ProjectionsChartHistoricalDatum[] | undefined;
  projectionsData: ProjectionsChartProjectionDatum[] | undefined;
  projectionsTargetData: ProjectionsChartProjectionTargetDatum[] | undefined;
}

export interface GetDefaultProjectionsDataPointPropsReturn {
  defaultProjectionDataPoint: ProjectionsChartProjectionDatum | undefined;
  defaultProjectionTargetDataPoint: ProjectionsChartProjectionTargetDatum | undefined;
}

export default function getDefaultProjectionsDataPoint({
  historicalData,
  projectionsData,
  projectionsTargetData,
}: GetDefaultProjectionsDataPointProps): GetDefaultProjectionsDataPointPropsReturn {
  const hasHistoricalData = historicalData && historicalData.length > 0;
  const hasProjectionsData = projectionsData && projectionsData.length > 0;
  const hasProjectionsTargetData = projectionsTargetData && projectionsTargetData.length > 0;

  let defaultProjectionDataPoint: ProjectionsChartProjectionDatum | undefined;
  let defaultProjectionTargetDataPoint: ProjectionsChartProjectionTargetDatum | undefined;

  if (hasProjectionsData) {
    [defaultProjectionDataPoint] = projectionsData!;
  } else if (hasHistoricalData) {
    // This applies when there is no projections data but there is historical
    // data. Can occur when a user has withdrawn all money and thus there is no
    // projection data available for them (but they still have historical data).
    defaultProjectionDataPoint = {
      ...historicalData![0],
      upperBound: 0,
      lowerBound: 0,
    };
  }

  if (hasProjectionsTargetData) {
    [defaultProjectionTargetDataPoint] = projectionsTargetData!;
  }

  return {
    defaultProjectionDataPoint,
    defaultProjectionTargetDataPoint,
  };
}
