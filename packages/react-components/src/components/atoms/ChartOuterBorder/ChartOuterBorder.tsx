import * as React from 'react';
import { ChartDimension } from '../../../config/chart';
import ChartOuterBorderLine from './ChartOuterBorderLine';

export interface ChartOuterBorderProps {
  chartDimension: ChartDimension;
}

export default function ChartOuterBorder({ chartDimension }: ChartOuterBorderProps) {
  return (
    <>
      {/* Top border */}
      <ChartOuterBorderLine from={{ x: 0, y: 0 }} to={{ x: chartDimension.width, y: 0 }} />

      {/* Right border */}
      <ChartOuterBorderLine
        from={{ x: chartDimension.width, y: 0 }}
        to={{ x: chartDimension.width, y: chartDimension.height }}
      />

      {/* Bottom border */}
      <ChartOuterBorderLine
        from={{ x: 0, y: chartDimension.height }}
        to={{ x: chartDimension.width, y: chartDimension.height }}
      />

      {/* Left border */}
      <ChartOuterBorderLine from={{ x: 0, y: 0 }} to={{ x: 0, y: chartDimension.height }} />
    </>
  );
}
