import * as React from 'react';
import { Circle } from '@visx/shape';
import { useChartStyles } from '../../../hooks';

export interface ChartDotIndicatorProps {
  // These props match their counterpart props in visx's <Circle />
  cx: number | undefined;
  cy: number | undefined;

  color: string;
  filter?: string;
}

export default function ChartDotIndicator({ cx, cy, color, filter }: ChartDotIndicatorProps) {
  const chartStyles = useChartStyles();

  return (
    <>
      <Circle
        cx={cx}
        cy={cy}
        r={chartStyles.RADIUS.DOT_INDICATOR_OUTER}
        fill={chartStyles.FILL.DOT_INDICATOR_OUTER}
        stroke={chartStyles.STROKE_COLOR.DOT_INDICATOR_OUTER}
        strokeWidth={chartStyles.STROKE_WIDTH.DOT_INDICATOR_OUTER}
        filter={filter}
        pointerEvents="none"
      />
      <Circle
        cx={cx}
        cy={cy}
        r={chartStyles.RADIUS.DOT_INDICATOR_INNER}
        fill={color}
        stroke={chartStyles.STROKE_COLOR.DOT_INDICATOR_INNER}
        strokeWidth={chartStyles.STROKE_WIDTH.DOT_INDICATOR_INNER}
        pointerEvents="none"
      />
    </>
  );
}
