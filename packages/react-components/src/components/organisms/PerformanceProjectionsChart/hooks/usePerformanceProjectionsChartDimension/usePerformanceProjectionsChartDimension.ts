import * as React from 'react';
import { ChartDimension, ChartDimensionWithExtras, ScreenSize } from '../../../../../config/chart';
import { getChartDimensionWithExtras } from '../../../../../utils/chart';
import { useScreenSize } from '../../../../../hooks';

const basePerformanceProjectionsChartDimension: ChartDimension = {
  width: 0,
  height: 330,
  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 60,
  },
};

const performanceProjectionsChartDimensionByScreenSize: Record<ScreenSize, ChartDimension> = {
  [ScreenSize.MOBILE]: basePerformanceProjectionsChartDimension,
  [ScreenSize.TABLET]: basePerformanceProjectionsChartDimension,
  [ScreenSize.DESKTOP]: basePerformanceProjectionsChartDimension,
  [ScreenSize.DESKTOP_HD]: basePerformanceProjectionsChartDimension,
};

function usePerformanceProjectionsChartDimension(parentWidth = 0): ChartDimensionWithExtras {
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

export default usePerformanceProjectionsChartDimension;
