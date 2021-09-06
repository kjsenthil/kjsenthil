import { TooltipData } from '../PerformanceProjectionsChartTooltip/usePerformanceProjectionsChartTooltip';
import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../services';
import { PerformanceProjectionsChartSummaryPanelProps } from './PerformanceProjectionsChartSummaryPanel';

export interface GetPerformanceProjectionsChartSummaryPanelValuesProps {
  tooltipData: TooltipData | undefined;
  defaultDataPoint: ProjectionsChartProjectionDatum | undefined;
  defaultTargetDataPoint: ProjectionsChartProjectionTargetDatum | undefined;
}

export type GetPerformanceProjectionsChartSummaryPanelValuesReturn = Required<
  Pick<
    PerformanceProjectionsChartSummaryPanelProps,
    | 'performance'
    | 'performanceLowEnd'
    | 'performanceHighEnd'
    | 'performanceTargetNotMet'
    | 'contributions'
  >
>;

export default function getPerformanceProjectionsChartSummaryPanelValues({
  tooltipData,
  defaultDataPoint,
  defaultTargetDataPoint,
}): GetPerformanceProjectionsChartSummaryPanelValuesReturn {
  let performance = 0;
  let performanceLowEnd = 0;
  let performanceHighEnd = 0;
  let contributions = 0;
  let performanceTargetNotMet: number | undefined;

  if (tooltipData) {
    performance = tooltipData.performanceProjection.value;
    performanceLowEnd = tooltipData.performanceProjection.lowerBound;
    performanceHighEnd = tooltipData.performanceProjection.upperBound;
    contributions = tooltipData.performanceProjection.netContributionsToDate;
    performanceTargetNotMet = tooltipData.performanceProjectionTarget?.value;
  } else if (defaultDataPoint) {
    performance = defaultDataPoint.value;
    performanceLowEnd = defaultDataPoint.lowerBound;
    performanceHighEnd = defaultDataPoint.upperBound;
    contributions = defaultDataPoint.netContributionsToDate;
    performanceTargetNotMet = defaultTargetDataPoint?.value;
  }

  return {
    performance,
    performanceLowEnd,
    performanceHighEnd,
    contributions,
    performanceTargetNotMet,
  };
}
