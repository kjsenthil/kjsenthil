import * as React from 'react';
import { ChartDimension, ChartDimensionWithExtras, ScreenSize } from '../../../../../config/chart';
import { getChartDimensionWithExtras } from '../../../../../utils/chart';
import { useScreenSize } from '../../../../../hooks';

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

function usePerformanceProjectionsSimplifiedChartDimension(
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

export default usePerformanceProjectionsSimplifiedChartDimension;
