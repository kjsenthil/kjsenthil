import * as React from 'react';
import { AxisBottom, AxisScale, SharedAxisProps } from '@visx/axis';
import { usePerformanceProjectionsChartStyles } from '../performanceProjectionsChartStyles/performanceProjectionsChartStyles';
import PerformanceProjectionsChartTickComponentBottomAxis from '../PerformanceProjectionsChartTickComponent/PerformanceProjectionsChartTickComponentBottomAxis';
import { d3TimeFormatter, D3TimeFormatterType } from '../../../../utils/formatters';
import { ChartDimension } from '../../../../config/chart';

export interface PerformanceProjectionsChartAxisBottomProps extends SharedAxisProps<AxisScale> {
  chartDimension: ChartDimension;
}

export default function PerformanceProjectionsChartAxisBottom({
  scale,
  chartDimension,
  ...props
}: PerformanceProjectionsChartAxisBottomProps) {
  // Check PerformanceProjectionsChartTickComponent to see why we have to pass this down
  // as a prop.
  const chartStyles = usePerformanceProjectionsChartStyles();

  // TODO: somehow get user age as of today
  const todayAge = 31;

  return (
    <AxisBottom
      scale={scale}
      hideAxisLine
      top={chartDimension.height - chartDimension.margin.bottom - chartDimension.margin.top}
      numTicks={5}
      tickFormat={d3TimeFormatter[D3TimeFormatterType.YEAR_ONLY]}
      tickLength={0}
      tickStroke="transparent"
      tickComponent={(tickRendererProps) => (
        <PerformanceProjectionsChartTickComponentBottomAxis
          chartStyles={chartStyles}
          todayAge={todayAge}
          {...tickRendererProps}
        />
      )}
      {...props}
    />
  );
}