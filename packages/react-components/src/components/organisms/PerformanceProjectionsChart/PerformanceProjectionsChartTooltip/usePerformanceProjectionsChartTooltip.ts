import * as React from 'react';
import { localPoint } from '@visx/event';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { ResizeObserver } from '@juggle/resize-observer';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { getDatumAtPosX } from '../../../../utils/chart';
import { ChartDimension } from '../../../../config/chart';
import {
  ProjectionsChartProjectionDatum,
  ProjectionsChartProjectionTargetDatum,
} from '../../../../services/projections';
import { TimeSeriesDatum } from '../../../../utils/data';
import { monthDifference } from '../../../../utils/date';

export interface UsePerformanceProjectionsChartTooltipProps {
  chartDimension: ChartDimension;

  projectionsData: ProjectionsChartProjectionDatum[];
  projectionsTargetData?: ProjectionsChartProjectionTargetDatum[];

  dateAccessor: (d: TimeSeriesDatum) => Date;
  performanceAccessor: (d: ProjectionsChartProjectionDatum) => number;
  contributionAccessor: (d: ProjectionsChartProjectionDatum) => number;
  projectionTargetAccessor: (d: ProjectionsChartProjectionTargetDatum) => number;

  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
}

export interface TooltipData {
  performanceProjection: ProjectionsChartProjectionDatum;
  performanceProjectionTarget: ProjectionsChartProjectionTargetDatum | undefined;

  performanceIndicatorPosY: number | undefined;
  contributionIndicatorPosY: number | undefined;
  goalNotMetIndicatorPosY: number | undefined;
}

export default function usePerformanceProjectionsChartTooltip({
  chartDimension,
  projectionsData,
  projectionsTargetData,
  dateAccessor,
  performanceAccessor,
  contributionAccessor,
  projectionTargetAccessor,
  xScale,
  yScale,
}: UsePerformanceProjectionsChartTooltipProps) {
  const tooltip = useTooltip<TooltipData>();

  const tooltipInPortal = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,

    // This prevents the tooltip from jumping around in unintended ways
    detectBounds: false,

    // useTooltipInPortal relies on ResizeObservers. We're adding the
    // recommended polyfill here. More information below:
    // https://airbnb.io/visx/docs/tooltip
    polyfill: ResizeObserver,
  });

  // By default, the tooltip has a card-like style. We remove these stylings to
  // ensure styles to be dictated by us.
  const tooltipStyles = React.useMemo(
    () => ({
      ...defaultStyles,
      boxShadow: 'none',
      padding: 0,
      backgroundColor: 'transparent',
    }),
    []
  );

  const handleShowContributionsTooltip = React.useCallback(
    (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      // TooltipInPortal expects coordinates to be relative to containerRef
      // localPoint returns coordinates relative to the nearest SVG, which
      // is what containerRef is set to.
      const { x: mouseX } = localPoint(e) ?? { x: 0, y: 0 };

      // Adjust the x-position for margins
      const adjMouseX = mouseX - chartDimension.margin.left;

      const projectionDatumAtPosX = getDatumAtPosX<ProjectionsChartProjectionDatum>({
        data: projectionsData,
        posX: adjMouseX,
        xScale,
        dateAccessor,
      });
      const projectionTargetDatumAtPosX =
        projectionsTargetData &&
        getDatumAtPosX<ProjectionsChartProjectionTargetDatum>({
          data: projectionsTargetData,
          posX: adjMouseX,
          xScale,
          dateAccessor,
        });

      // The additional month difference check is to protect against cases when
      // projection target data ends before projection data. We don't want to
      // show tooltip indicators related to projection target data in this
      // case.
      const projectionTargetDatumAtPosXExist = !!(
        projectionTargetDatumAtPosX &&
        monthDifference(projectionDatumAtPosX.date, projectionTargetDatumAtPosX.date) < 1
      );

      if (projectionsData.length > 0) {
        const maxProjectionDatumAtPosXValue = Math.max(
          projectionDatumAtPosX.value,
          projectionDatumAtPosX.lowerBound,
          projectionDatumAtPosX.upperBound,
          projectionDatumAtPosX.netContributionsToDate
        );

        const tooltipTopValue = projectionTargetDatumAtPosXExist
          ? Math.max(projectionTargetDatumAtPosX!.value, maxProjectionDatumAtPosXValue)
          : maxProjectionDatumAtPosXValue;

        tooltip.showTooltip({
          tooltipLeft: adjMouseX,
          tooltipTop: yScale(tooltipTopValue),
          tooltipData: {
            performanceProjection: projectionDatumAtPosX,
            performanceProjectionTarget: projectionTargetDatumAtPosXExist
              ? projectionTargetDatumAtPosX
              : undefined,

            performanceIndicatorPosY: yScale(performanceAccessor(projectionDatumAtPosX)),
            contributionIndicatorPosY: yScale(contributionAccessor(projectionDatumAtPosX)),
            goalNotMetIndicatorPosY: projectionTargetDatumAtPosXExist
              ? // The exclamation mark is necessary else TypeScript can't infer
                // that 'projectionTargetDatumAtPosX' exists at this point
                yScale(projectionTargetAccessor(projectionTargetDatumAtPosX!))
              : undefined,
          },
        });
      }
    },
    [
      tooltip.showTooltip,
      xScale,
      yScale,
      chartDimension.margin.left,
      projectionsData,
      projectionsTargetData,
      dateAccessor,
      performanceAccessor,
      contributionAccessor,
      projectionTargetAccessor,
    ]
  );

  return {
    tooltip,
    tooltipInPortal,
    tooltipStyles,
    handleShowContributionsTooltip,
  };
}
