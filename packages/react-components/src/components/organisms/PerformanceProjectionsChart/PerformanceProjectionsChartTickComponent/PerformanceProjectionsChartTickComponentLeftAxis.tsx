import * as React from 'react';
import { TickRendererProps } from '@visx/axis';
import { Text } from '@visx/text';
import { useChartStyles } from '../../../../hooks';

export interface PerformanceProjectionsChartTickComponentLeftAxisProps extends TickRendererProps {
  // Note: we have to pass chartStyles as a prop rather than having
  // PerformanceChartTickComponent uses useChartStyles() directly. Otherwise we
  // will run into the mismatched hook call order error when the chart period
  // changes.
  // The cause for this is likely due to how d3 is handling the showing / hiding
  // of chart ticks. Unknown for sure at this point but passing the chartStyles
  // down as a prop works well enough.
  chartStyles: ReturnType<typeof useChartStyles>;
}

export default function PerformanceProjectionsChartTickComponentLeftAxis({
  chartStyles,
  x,
  y,
  formattedValue,
  ...tickLabelProps
}: PerformanceProjectionsChartTickComponentLeftAxisProps) {
  return (
    <Text
      x={x}
      y={y}
      {...tickLabelProps}
      fill={chartStyles.TEXT_COLOR.AXES}
      fontSize={chartStyles.TEXT_SIZE.AXES}
      fontFamily={chartStyles.TEXT_FONT.COMMON}
      style={{ fontWeight: 'bold' }}
    >
      {formattedValue}
    </Text>
  );
}
