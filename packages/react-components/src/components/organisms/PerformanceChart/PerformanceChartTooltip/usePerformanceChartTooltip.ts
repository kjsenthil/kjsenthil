import * as React from 'react';
import { localPoint } from '@visx/event';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { ResizeObserver } from '@juggle/resize-observer';
import { ContributionDatum, PerformanceDatum } from '../performanceData';

import { getDatumAtPosX } from '../../../../utils/chart';
import { TimeSeriesDatum } from '../../../../utils/data';

export interface UsePerformanceChartTooltipProps {
  performanceData: PerformanceDatum[];
  contributionsData: ContributionDatum[];

  xAccessor: (d: TimeSeriesDatum) => Date;
  yAccessor: (d: TimeSeriesDatum) => number;
  xScale: any;
  yScale: any;
}

export interface TooltipData {
  performance: PerformanceDatum;
  contribution: ContributionDatum;

  contributionIndicatorPosY: number | undefined;
  performanceIndicatorPosY: number | undefined;
}

export default function usePerformanceChartTooltip({
  performanceData,
  contributionsData,
  xAccessor,
  yAccessor,
  xScale,
  yScale,
}: UsePerformanceChartTooltipProps) {
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

      const performanceDatumAtPosX = getDatumAtPosX<PerformanceDatum>({
        data: performanceData,
        posX: mouseX,
        xScale,
        dateAccessor: xAccessor,
      });
      const contributionDatumAtPosX = getDatumAtPosX<ContributionDatum>({
        data: contributionsData,
        posX: mouseX,
        xScale,
        dateAccessor: xAccessor,
      });

      if (performanceData.length > 0 && contributionsData.length > 0) {
        const tooltipTopValue = Math.max(
          performanceDatumAtPosX.value,
          contributionDatumAtPosX.value
        );

        tooltip.showTooltip({
          tooltipLeft: mouseX,
          tooltipTop: yScale(tooltipTopValue),
          tooltipData: {
            performance: performanceDatumAtPosX,
            contribution: contributionDatumAtPosX,

            performanceIndicatorPosY: yScale(yAccessor(performanceDatumAtPosX)),
            contributionIndicatorPosY: yScale(yAccessor(contributionDatumAtPosX)),
          },
        });
      }
    },
    [tooltip.showTooltip, xScale, yScale]
  );

  return {
    tooltip,
    tooltipInPortal,
    tooltipStyles,
    handleShowContributionsTooltip,
  };
}
