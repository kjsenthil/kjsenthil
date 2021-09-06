import * as React from 'react';
import { ChartDimension } from '../../../../config/chart';
import PerformanceProjectionsChartOuterBorderLine from './PerformanceProjectionsChartOuterBorderLine';

export interface PerformanceProjectionsChartOuterBorderProps {
  chartDimension: ChartDimension;
}

export default function PerformanceProjectionsChartOuterBorder({
  chartDimension,
}: PerformanceProjectionsChartOuterBorderProps) {
  return (
    <>
      {/* Top border */}
      <PerformanceProjectionsChartOuterBorderLine
        from={{ x: 0, y: 0 }}
        to={{ x: chartDimension.width, y: 0 }}
      />

      {/* Right border */}
      <PerformanceProjectionsChartOuterBorderLine
        from={{ x: chartDimension.width, y: 0 }}
        to={{ x: chartDimension.width, y: chartDimension.height }}
      />

      {/* Bottom border */}
      <PerformanceProjectionsChartOuterBorderLine
        from={{ x: 0, y: chartDimension.height }}
        to={{ x: chartDimension.width, y: chartDimension.height }}
      />

      {/* Left border */}
      <PerformanceProjectionsChartOuterBorderLine
        from={{ x: 0, y: 0 }}
        to={{ x: 0, y: chartDimension.height }}
      />
    </>
  );
}
