import * as React from 'react';
import { localPoint } from '@visx/event';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { Bisector, bisector } from 'd3-array';
import { ResizeObserver } from '@juggle/resize-observer';
import { ContributionDatum, PerformanceDatum, TimeSeriesDatum } from '../data/utils';
import { ChartDimension } from '../../../../config/chart';

export interface UsePerformanceChartTooltipProps {
  chartDimension: ChartDimension;

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

  // TODO: this is used to determine the position of the circle indicator on
  //  the contribution line. Is there a better way?
  contributionIndicatorPosY: number | undefined;
}

export interface DetermineTooltipPositionProps {
  mouseX: number;

  chartDimension: ChartDimension;

  performanceData: PerformanceDatum[];
  contributionsData: ContributionDatum[];

  bisectDate: Bisector<TimeSeriesDatum, Date>['left'];

  xAccessor: (d: TimeSeriesDatum) => Date;
  xScale: any;
}

export const determineTooltipDataAndPosition = ({
  mouseX,
  chartDimension,
  performanceData,
  contributionsData,
  bisectDate,
  xAccessor,
  xScale,
}: DetermineTooltipPositionProps): { x: number; pd: PerformanceDatum; cd: ContributionDatum } => {
  const x = mouseX - chartDimension.margin.left;

  // TODO: Optimize / make this clearer
  const x0 = xScale.invert(x);
  const index = bisectDate(performanceData, x0, 1);
  const pd0 = performanceData[index - 1];
  const pd1 = performanceData[index];
  let pd = pd0;
  if (pd1 && xAccessor(pd1)) {
    const distX1 = x0.valueOf() - xAccessor(pd0).valueOf();
    const distX2 = xAccessor(pd1).valueOf() - x0.valueOf();

    pd = distX1 > distX2 ? pd1 : pd0;
  }
  const cd0 = contributionsData[index - 1];
  const cd1 = contributionsData[index];
  let cd = cd0;
  if (cd1 && xAccessor(cd1)) {
    const distX1 = x0.valueOf() - xAccessor(cd0).valueOf();
    const distX2 = xAccessor(cd1).valueOf() - x0.valueOf();

    cd = distX1 > distX2 ? cd1 : cd0;
  }

  return {
    x,
    pd,
    cd,
  };
};

export default function usePerformanceChartTooltip({
  chartDimension,
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

  const bisectDate = bisector<TimeSeriesDatum, Date>((d: TimeSeriesDatum) => d.date).left;

  const handleShowContributionsTooltip = React.useCallback(
    (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      // TooltipInPortal expects coordinates to be relative to containerRef
      // localPoint returns coordinates relative to the nearest SVG, which
      // is what containerRef is set to.
      const { x: mouseX } = localPoint(e) ?? { x: 0, y: 0 };

      const { x, cd, pd } = determineTooltipDataAndPosition({
        mouseX,
        chartDimension,
        performanceData,
        contributionsData,
        bisectDate,
        xAccessor,
        xScale,
      });

      if (performanceData.length > 0 && contributionsData.length > 0) {
        tooltip.showTooltip({
          tooltipLeft: x,
          tooltipTop: yScale(yAccessor(pd)),
          tooltipData: {
            performance: pd,
            contribution: cd,
            contributionIndicatorPosY: yScale(yAccessor(cd)),
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
