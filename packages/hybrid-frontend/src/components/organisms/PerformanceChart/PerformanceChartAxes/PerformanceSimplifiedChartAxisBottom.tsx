import * as React from 'react';
import { AxisBottom, AxisScale, SharedAxisProps } from '@visx/axis';
import { ChartDimensionWithExtras } from '../../../../config/chart';
import useChartStyles from '../../../../hooks/ChartHooks/useChartStyles';

export interface PerformanceChartAxisBottomProps extends SharedAxisProps<AxisScale> {
  chartDimension: ChartDimensionWithExtras;
}

export default function PerformanceSimplifiedChartAxisBottom({
  scale,
  chartDimension,
  ...props
}: PerformanceChartAxisBottomProps) {
  const chartStyles = useChartStyles();

  return (
    <AxisBottom
      scale={scale}
      stroke={chartStyles.STROKE_COLOR.GRID}
      strokeWidth={chartStyles.STROKE_WIDTH.GRID}
      strokeDasharray={chartStyles.STROKE_DASHARRAY.GRID}
      top={chartDimension.innerHeight}
      hideTicks
      tickComponent={() => null}
      {...props}
    />
  );
}
