import * as React from 'react';
import { AxisBottom, AxisScale, SharedAxisProps } from '@visx/axis';
import PerformanceChartTickComponentBottomAxis from '../PerformanceChartTickComponent/PerformanceChartTickComponentBottomAxis';
import { ChartDimensionWithExtras } from '../../../../config/chart';
import { useChartStyles } from '../../../../hooks';

export interface PerformanceChartAxisBottomProps extends SharedAxisProps<AxisScale> {
  chartDimension: ChartDimensionWithExtras;
}

export default function PerformanceChartAxisBottom({
  scale,
  numTicks,
  chartDimension,
  ...props
}: PerformanceChartAxisBottomProps) {
  // Check PerformanceChartTickComponent to see why we have to pass this down
  // as a prop.
  const chartStyles = useChartStyles();

  return (
    <AxisBottom
      scale={scale}
      top={chartDimension.innerHeight}
      hideAxisLine
      tickLength={0}
      tickStroke="transparent"
      tickComponent={(tickRendererProps) => (
        <PerformanceChartTickComponentBottomAxis chartStyles={chartStyles} {...tickRendererProps} />
      )}
      {...props}
    />
  );
}
