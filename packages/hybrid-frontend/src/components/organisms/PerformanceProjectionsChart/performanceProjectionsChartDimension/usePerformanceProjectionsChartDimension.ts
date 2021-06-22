import * as React from 'react';
import { ChartDimension, ChartDimensionWithExtras, ScreenSize } from '../../../../config/chart';
import { getChartDimensionWithExtras } from '../../../../utils/chart';
import { useScreenSize } from '../../../../hooks';

const basePerformanceProjectionsChartDimension: ChartDimension = {
  width: 0,
  height: 360,
  margin: {
    top: 10,
    right: 20,
    bottom: 30,
    left: 30,
  },
};

const performanceProjectionsChartDimensionByScreenSize: Record<ScreenSize, ChartDimension> = {
  [ScreenSize.MOBILE]: basePerformanceProjectionsChartDimension,
  [ScreenSize.TABLET]: basePerformanceProjectionsChartDimension,
  [ScreenSize.DESKTOP]: basePerformanceProjectionsChartDimension,
  [ScreenSize.DESKTOP_HD]: basePerformanceProjectionsChartDimension,
};

const performanceProjectionsChartSimplifiedDimension: ChartDimension = {
  width: 0,
  height: 360,
  margin: {
    top: 10,
    right: 0,
    bottom: 30,
    left: 0,
  },
};

const performanceProjectionsChartSimplifiedDimensionByScreenSize: Record<
  ScreenSize,
  ChartDimension
> = {
  [ScreenSize.MOBILE]: performanceProjectionsChartSimplifiedDimension,
  [ScreenSize.TABLET]: performanceProjectionsChartSimplifiedDimension,
  [ScreenSize.DESKTOP]: performanceProjectionsChartSimplifiedDimension,
  [ScreenSize.DESKTOP_HD]: performanceProjectionsChartSimplifiedDimension,
};

export function usePerformanceProjectionsChartDimension(parentWidth = 0): ChartDimensionWithExtras {
  const screenSize = useScreenSize();

  return React.useMemo(() => {
    const dimensionBaseWidth = performanceProjectionsChartDimensionByScreenSize[screenSize];
    const dimensionParentWidth = {
      ...dimensionBaseWidth,
      width: parentWidth,
    };

    return getChartDimensionWithExtras(dimensionParentWidth);
  }, [parentWidth, screenSize]);
}

export function usePerformanceProjectionsSimplifiedChartDimension(
  parentWidth = 0
): ChartDimensionWithExtras {
  const screenSize = useScreenSize();

  return React.useMemo(() => {
    const dimensionBaseWidth =
      performanceProjectionsChartSimplifiedDimensionByScreenSize[screenSize];
    const dimensionParentWidth = {
      ...dimensionBaseWidth,
      width: parentWidth,
    };

    return getChartDimensionWithExtras(dimensionParentWidth);
  }, [parentWidth, screenSize]);
}
