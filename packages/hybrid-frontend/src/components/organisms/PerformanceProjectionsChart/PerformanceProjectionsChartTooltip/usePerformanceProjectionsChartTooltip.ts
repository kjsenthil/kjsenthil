import * as React from 'react';
import { localPoint } from '@visx/event';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { ResizeObserver } from '@juggle/resize-observer';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { PerformanceProjectionsDatum } from '../data/performanceProjectionsChartDataUtils';
import { getDatumAtPosX } from '../../../../utils/chart';
import { ChartDimension } from '../../../../config/chart';

export interface UsePerformanceProjectionsChartTooltipProps {
  chartDimension: ChartDimension;

  projectionsData: PerformanceProjectionsDatum[];
  goalMet: boolean;

  dateAccessor: (d: PerformanceProjectionsDatum) => Date;
  performanceAccessor: (d: PerformanceProjectionsDatum) => number;
  contributionAccessor: (d: PerformanceProjectionsDatum) => number;
  goalNotMetAccessor: (d: PerformanceProjectionsDatum) => number;

  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
}

export interface TooltipData {
  performanceProjection: PerformanceProjectionsDatum;

  performanceIndicatorPosY: number | undefined;
  contributionIndicatorPosY: number | undefined;
  goalNotMetIndicatorPosY: number | undefined;
}

export default function usePerformanceProjectionsChartTooltip({
  chartDimension,
  projectionsData,
  goalMet,
  dateAccessor,
  performanceAccessor,
  contributionAccessor,
  goalNotMetAccessor,
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

      const datumAtPosX = getDatumAtPosX<PerformanceProjectionsDatum>({
        data: projectionsData,
        posX: adjMouseX,
        xScale,
        dateAccessor,
      });

      if (projectionsData.length > 0) {
        tooltip.showTooltip({
          tooltipLeft: adjMouseX,
          tooltipTop: goalMet
            ? yScale(performanceAccessor(datumAtPosX))
            : yScale(goalNotMetAccessor(datumAtPosX)),
          tooltipData: {
            performanceProjection: datumAtPosX,
            performanceIndicatorPosY: yScale(performanceAccessor(datumAtPosX)),
            contributionIndicatorPosY: yScale(contributionAccessor(datumAtPosX)),
            goalNotMetIndicatorPosY: goalMet ? 0 : yScale(goalNotMetAccessor(datumAtPosX)),
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
      goalMet,
      dateAccessor,
      performanceAccessor,
      contributionAccessor,
      goalNotMetAccessor,
    ]
  );

  return {
    tooltip,
    tooltipInPortal,
    tooltipStyles,
    handleShowContributionsTooltip,
  };
}
