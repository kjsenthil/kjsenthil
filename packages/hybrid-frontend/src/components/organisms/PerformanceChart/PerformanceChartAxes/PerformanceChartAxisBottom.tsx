import * as React from 'react';
import { AxisBottom, AxisScale, SharedAxisProps } from '@visx/axis';
import {
  ChartDimension,
  usePerformanceChartStyles,
} from '../performanceChartStyles/performanceChartStyles';
import {
  d3TimeFormatter,
  D3TimeFormatterType,
} from '../performanceChartFormat/performanceChartFormat';
import PerformanceChartTickComponent from '../PerformanceChartTickComponent/PerformanceChartTickComponent';
import { PerformanceChartPeriod } from '../data/utils';
import { usePerformanceDataPeriod } from '../data/data';

export interface PerformanceChartAxisBottomProps extends SharedAxisProps<AxisScale> {
  chartDimension: ChartDimension;
}

const axisBottomConfig: Record<
  PerformanceChartPeriod,
  { numTicks: number; tickFormatterType: D3TimeFormatterType }
> = {
  [PerformanceChartPeriod['1M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.DATE_AND_MONTH,
  },
  [PerformanceChartPeriod['3M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.DATE_AND_MONTH,
  },
  [PerformanceChartPeriod['6M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_AND_MONTH,
  },
  [PerformanceChartPeriod['1Y']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_AND_MONTH,
  },
  [PerformanceChartPeriod.ALL_TIME]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_ONLY,
  },
};

export default function PerformanceChartAxisBottom({
  scale,
  chartDimension,
  ...props
}: PerformanceChartAxisBottomProps) {
  // Check PerformanceChartTickComponent to see why we have to pass this down
  // as a prop.
  const chartStyles = usePerformanceChartStyles();

  const dataPeriod = usePerformanceDataPeriod();

  return (
    <AxisBottom
      scale={scale}
      hideAxisLine
      top={chartDimension.height - chartDimension.margin.bottom - chartDimension.margin.top}
      numTicks={axisBottomConfig[dataPeriod].numTicks}
      tickLength={12}
      tickStroke="transparent"
      tickFormat={d3TimeFormatter[axisBottomConfig[dataPeriod].tickFormatterType]}
      tickComponent={(tickRendererProps) => (
        <PerformanceChartTickComponent chartStyles={chartStyles} {...tickRendererProps} />
      )}
      {...props}
    />
  );
}
