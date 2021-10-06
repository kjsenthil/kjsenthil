import * as React from 'react';
import { Text } from '@visx/text';
import { useChartStyles } from '../../../../hooks';

export interface PerformanceChartAxisTickProps {
  x: number;
  y: number;
  chartStyles: ReturnType<typeof useChartStyles>;
  text: string;
  textAnchor: 'end' | 'start' | 'middle' | 'inherit' | undefined;
}

export default function PerformanceChartAxisTick({
  x,
  y,
  chartStyles,
  text,
  textAnchor,
}: PerformanceChartAxisTickProps) {
  return (
    <Text
      x={x}
      y={y}
      verticalAnchor="start"
      textAnchor={textAnchor}
      fill={chartStyles.TEXT_COLOR.AXES}
      fontFamily={chartStyles.TEXT_FONT.COMMON}
      fontSize={chartStyles.TEXT_SIZE.AXES}
      style={{ fontWeight: 'bold' }}
    >
      {text}
    </Text>
  );
}
