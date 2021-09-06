import { TooltipData } from './usePerformanceProjectionsChartTooltip';
import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../services';

type Accessor = (obj: unknown) => number;

export interface GetDefaultTooltipDataProps {
  defaultProjectionDataPoint: ProjectionsChartProjectionDatum | undefined;
  defaultProjectionTargetDataPoint: ProjectionsChartProjectionTargetDatum | undefined;

  // It's expected that these accessors take a datum in the form of either
  // ProjectionsChartProjectionDatum or ProjectionsChartProjectionTargetDatum,
  // and return a number that's already been through either the x-scale or the
  // y-scale.
  scaledDateAccessor: Accessor;
  scaledProjectionAccessor: Accessor;
  scaledProjectionUpperBoundAccessor: Accessor;
  scaledProjectionTargetAccessor: Accessor;
  scaledContributionAccessor: Accessor;
}

export interface GetDefaultTooltipDataReturn {
  defaultTooltipLeft: number;
  defaultTooltipTop: number;
  defaultTooltipData: TooltipData | undefined;
}

export default function getDefaultTooltipData({
  defaultProjectionDataPoint,
  defaultProjectionTargetDataPoint,
  scaledDateAccessor,
  scaledProjectionAccessor,
  scaledProjectionUpperBoundAccessor,
  scaledProjectionTargetAccessor,
  scaledContributionAccessor,
}: GetDefaultTooltipDataProps): GetDefaultTooltipDataReturn {
  // When the chart is not hovered on, we show the tooltip and indicator at the
  // default (in our case this is the earliest) data point

  let defaultTooltipLeft = 0;
  let defaultTooltipTop = 0;
  let defaultTooltipData: TooltipData | undefined;

  if (defaultProjectionDataPoint) {
    defaultTooltipLeft = scaledDateAccessor(defaultProjectionDataPoint);
    defaultTooltipTop = scaledProjectionUpperBoundAccessor(defaultProjectionDataPoint);
    defaultTooltipData = {
      performanceProjection: defaultProjectionDataPoint,
      performanceProjectionTarget: defaultProjectionTargetDataPoint,

      performanceIndicatorPosY: scaledProjectionAccessor(defaultProjectionDataPoint),
      contributionIndicatorPosY: scaledContributionAccessor(defaultProjectionDataPoint),
      goalNotMetIndicatorPosY: defaultProjectionTargetDataPoint
        ? scaledProjectionTargetAccessor(defaultProjectionTargetDataPoint)
        : undefined,
    };
  }

  return {
    defaultTooltipLeft,
    defaultTooltipTop,
    defaultTooltipData,
  };
}
