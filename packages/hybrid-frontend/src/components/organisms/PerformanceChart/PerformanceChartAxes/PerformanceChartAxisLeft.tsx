import * as React from 'react';
import { AxisLeft, AxisScale, SharedAxisProps } from '@visx/axis';
import { usePerformanceChartStyles } from '../performanceChartStyles/performanceChartStyles';
import PerformanceChartTickComponent from '../PerformanceChartTickComponent/PerformanceChartTickComponent';
import { d3ValueFormatter } from '../../../../utils/formatters';
import { ChartDimension } from '../../../../config/chart';

export interface PerformanceChartAxisLeftProps extends SharedAxisProps<AxisScale> {
  chartDimension: ChartDimension;
}

export default function PerformanceChartAxisLeft({
  scale,
  chartDimension,
  ...props
}: PerformanceChartAxisLeftProps) {
  // Check PerformanceChartTickComponent to see why we have to pass this down
  // as a prop.
  const chartStyles = usePerformanceChartStyles();

  return (
    <AxisLeft
      scale={scale}
      left={chartDimension.margin.left}
      hideZero
      hideAxisLine
      numTicks={5}
      tickLength={20}
      tickStroke="transparent"
      tickFormat={d3ValueFormatter}
      tickComponent={(tickRendererProps) => (
        <PerformanceChartTickComponent chartStyles={chartStyles} {...tickRendererProps} />
      )}
      {...props}
    />
  );
}
