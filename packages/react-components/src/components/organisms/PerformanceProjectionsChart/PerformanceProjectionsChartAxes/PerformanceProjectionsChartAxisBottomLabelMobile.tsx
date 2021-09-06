/**
 * This label for the x-axis only appears on mobile view
 */

import * as React from 'react';
import { Text } from '@visx/text';
import { ChartDimension } from '../../../../config/chart';
import { useChartStyles } from '../../../../hooks';

export interface PerformanceProjectionsChartAxisBottomLabelMobileProps {
  chartDimension: ChartDimension;
}

export default function PerformanceProjectionsChartAxisBottomLabelMobile({
  chartDimension,
}: PerformanceProjectionsChartAxisBottomLabelMobileProps) {
  const chartStyles = useChartStyles();

  return (
    <Text
      verticalAnchor="start"
      textAnchor="end"
      x={chartDimension.margin.left - 12}
      y={chartDimension.height - chartDimension.margin.bottom + 12}
      fill={chartStyles.TEXT_COLOR.AXES}
      fontSize={chartStyles.TEXT_SIZE.AXES}
      fontFamily={chartStyles.TEXT_FONT.COMMON}
      width={56}
      lineHeight={15}
      style={{ fontWeight: 'bold' }}
    >
      Age:
    </Text>
  );
}
