import * as React from 'react';
import { AxisBottom, AxisScale, SharedAxisProps } from '@visx/axis';
import PerformanceChartTickComponent from '../PerformanceChartTickComponent/PerformanceChartTickComponent';
import { ChartDimensionWithExtras } from '../../../../config/chart';
import useChartStyles from '../../../../hooks/ChartHooks/useChartStyles';

export interface PerformanceChartAxisBottomProps extends SharedAxisProps<AxisScale> {
  chartDimension: ChartDimensionWithExtras;
}

export default function PerformanceChartAxisBottom({
  scale,
  chartDimension,
  ...props
}: PerformanceChartAxisBottomProps) {
  // Check PerformanceChartTickComponent to see why we have to pass this down
  // as a prop.
  const chartStyles = useChartStyles();

  return (
    <AxisBottom
      scale={scale}
      hideAxisLine
      top={chartDimension.innerHeight}
      tickLength={12}
      tickStroke="transparent"
      tickComponent={(tickRendererProps) => (
        <PerformanceChartTickComponent chartStyles={chartStyles} {...tickRendererProps} />
      )}
      {...props}
    />
  );
}
