import * as React from 'react';
import { AxisLeft, AxisScale, SharedAxisProps } from '@visx/axis';
import PerformanceChartTickComponentLeftAxis from '../PerformanceChartTickComponent/PerformanceChartTickComponentLeftAxis';
import { d3ValueFormatter } from '../../../../utils/formatters';
import { ChartDimension } from '../../../../config/chart';
import { useChartStyles } from '../../../../hooks';

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
  const chartStyles = useChartStyles();

  return (
    <AxisLeft
      scale={scale}
      left={chartDimension.margin.left}
      hideAxisLine
      hideZero
      tickLength={0}
      tickStroke="transparent"
      tickFormat={d3ValueFormatter}
      tickComponent={(tickRendererProps) => (
        <PerformanceChartTickComponentLeftAxis chartStyles={chartStyles} {...tickRendererProps} />
      )}
      {...props}
    />
  );
}
