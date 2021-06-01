import * as React from 'react';
import { AxisBottom, AxisScale, SharedAxisProps } from '@visx/axis';
import PerformanceChartTickComponent from '../PerformanceChartTickComponent/PerformanceChartTickComponent';
import { d3TimeFormatter, D3TimeFormatterType } from '../../../../utils/formatters';
import { ChartDimensionWithExtras } from '../../../../config/chart';
import { PerformanceDataPeriod } from '../../../../services/performance/constants';
import useChartStyles from '../../../../hooks/ChartHooks/useChartStyles';

export interface PerformanceChartAxisBottomProps extends SharedAxisProps<AxisScale> {
  currentPeriod: PerformanceDataPeriod;
  chartDimension: ChartDimensionWithExtras;
}

const axisBottomConfig: Record<
  PerformanceDataPeriod,
  { numTicks: number; tickFormatterType: D3TimeFormatterType }
> = {
  [PerformanceDataPeriod['1M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.DATE_AND_MONTH,
  },
  [PerformanceDataPeriod['3M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.DATE_AND_MONTH,
  },
  [PerformanceDataPeriod['6M']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_AND_MONTH,
  },
  [PerformanceDataPeriod['1Y']]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_AND_MONTH,
  },
  [PerformanceDataPeriod.ALL_TIME]: {
    numTicks: 4,
    tickFormatterType: D3TimeFormatterType.YEAR_ONLY,
  },
};

export default function PerformanceChartAxisBottom({
  scale,
  currentPeriod,
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
      numTicks={axisBottomConfig[currentPeriod].numTicks}
      tickLength={12}
      tickStroke="transparent"
      tickFormat={d3TimeFormatter[axisBottomConfig[currentPeriod].tickFormatterType]}
      tickComponent={(tickRendererProps) => (
        <PerformanceChartTickComponent chartStyles={chartStyles} {...tickRendererProps} />
      )}
      {...props}
    />
  );
}
