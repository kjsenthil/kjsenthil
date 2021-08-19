import * as React from 'react';
import { AxisLeft, AxisScale, SharedAxisProps } from '@visx/axis';
import { useChartStyles } from '../../../../hooks';
import PerformanceProjectionsChartTickComponentLeftAxis from '../PerformanceProjectionsChartTickComponent/PerformanceProjectionsChartTickComponentLeftAxis';
import { d3ValueFormatter } from '../../../../utils/formatters';
import { ChartDimension } from '../../../../config/chart';

export interface PerformanceChartAxisLeftProps extends SharedAxisProps<AxisScale> {
  chartDimension: ChartDimension;
}

export default function PerformanceProjectionsChartAxisLeft({
  scale,
  chartDimension,
  ...props
}: PerformanceChartAxisLeftProps) {
  // Check PerformanceProjectionsChartTickComponent to see why we have to pass this down
  // as a prop.
  const chartStyles = useChartStyles();

  return (
    <AxisLeft
      scale={scale}
      left={chartDimension.margin.left}
      hideAxisLine
      numTicks={6}
      tickLength={20}
      tickStroke="transparent"
      tickFormat={d3ValueFormatter}
      tickComponent={(tickRendererProps) => (
        <PerformanceProjectionsChartTickComponentLeftAxis
          chartStyles={chartStyles}
          {...tickRendererProps}
        />
      )}
      {...props}
    />
  );
}
