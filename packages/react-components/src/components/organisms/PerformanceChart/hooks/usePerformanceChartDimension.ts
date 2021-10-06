import * as React from 'react';
import { ChartDimension, ChartDimensionWithExtras, ScreenSize } from '../../../../config/chart';
import { getChartDimensionWithExtras } from '../../../../utils/chart';
import { useScreenSize } from '../../../../hooks';

const basePerformanceChartDimension: ChartDimension = {
  width: 0,
  height: 240,
  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 60,
  },
};

const performanceChartDimensionByScreenSize: Record<ScreenSize, ChartDimension> = {
  [ScreenSize.MOBILE]: basePerformanceChartDimension,
  [ScreenSize.TABLET]: basePerformanceChartDimension,
  [ScreenSize.DESKTOP]: basePerformanceChartDimension,
  [ScreenSize.DESKTOP_HD]: basePerformanceChartDimension,
};

const performanceChartSimplifiedDimension: ChartDimension = {
  width: 0,
  height: 290,
  margin: {
    top: 10,
    right: 0,
    bottom: 30,
    left: 30,
  },
};

const performanceChartSimplifiedDimensionByScreenSize: Record<ScreenSize, ChartDimension> = {
  [ScreenSize.MOBILE]: performanceChartSimplifiedDimension,
  [ScreenSize.TABLET]: performanceChartSimplifiedDimension,
  [ScreenSize.DESKTOP]: performanceChartSimplifiedDimension,
  [ScreenSize.DESKTOP_HD]: performanceChartSimplifiedDimension,
};

export function usePerformanceChartDimension(parentWidth = 0): ChartDimensionWithExtras {
  const screenSize = useScreenSize();

  return React.useMemo(() => {
    const dimensionBaseWidth = performanceChartDimensionByScreenSize[screenSize];
    const dimensionParentWidth = {
      ...dimensionBaseWidth,
      width: parentWidth,
    };

    return getChartDimensionWithExtras(dimensionParentWidth);
  }, [parentWidth, screenSize]);
}

export function usePerformanceSimplifiedChartDimension(parentWidth = 0): ChartDimensionWithExtras {
  const screenSize = useScreenSize();

  return React.useMemo(() => {
    const dimensionBaseWidth = performanceChartSimplifiedDimensionByScreenSize[screenSize];
    const dimensionParentWidth = {
      ...dimensionBaseWidth,
      width: parentWidth,
    };

    return getChartDimensionWithExtras(dimensionParentWidth);
  }, [parentWidth, screenSize]);
}
