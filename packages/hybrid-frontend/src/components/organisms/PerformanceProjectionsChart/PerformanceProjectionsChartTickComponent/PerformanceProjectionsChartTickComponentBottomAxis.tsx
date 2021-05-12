import * as React from 'react';
import { TickRendererProps } from '@visx/axis';
import { Text } from '@visx/text';
import { usePerformanceProjectionsChartStyles } from '../performanceProjectionsChartStyles/performanceProjectionsChartStyles';

export interface PerformanceProjectionsChartTickComponentBottomAxisProps extends TickRendererProps {
  // Note: we have to pass chartStyles as a prop rather than having
  // PerformanceChartTickComponent uses useChartStyles() directly. Otherwise we
  // will run into the mismatched hook call order error when the chart period
  // changes.
  // The cause for this is likely due to how d3 is handling the showing / hiding
  // of chart ticks. Unknown for sure at this point but passing the chartStyles
  // down as a prop works well enough.
  chartStyles: ReturnType<typeof usePerformanceProjectionsChartStyles>;

  todayAge: number;
}

/**
 * The formatted value passed to our tick component will be a full year string.
 * This function adds an age text to the formatted value.
 */
export function getAgeText(formattedValue: string | undefined, todayAge: number): string {
  const tickYear = Number(formattedValue);

  if (Number.isNaN(tickYear)) return `Age unknown`;

  const todayYear = new Date().getFullYear();

  const age = todayAge + (tickYear - todayYear);

  return `Age ${age}`;
}

export default function PerformanceProjectionsChartTickComponentBottomAxis({
  chartStyles,
  todayAge,
  x,
  y,
  formattedValue,
  ...tickLabelProps
}: PerformanceProjectionsChartTickComponentBottomAxisProps) {
  return (
    <>
      <Text
        x={x}
        y={y}
        {...tickLabelProps}
        fill={chartStyles.TEXT_COLOR.AXES}
        fontSize={chartStyles.TEXT_SIZE.AXES}
        fontFamily={chartStyles.TEXT_FONT.COMMON}
        width={56}
        lineHeight={15}
        style={{ fontWeight: 'bold' }}
      >
        {formattedValue}
      </Text>
      <Text
        x={x}
        y={y + 15}
        {...tickLabelProps}
        fill={chartStyles.TEXT_COLOR.AXES}
        fontSize={chartStyles.TEXT_SIZE.AXES}
        fontFamily={chartStyles.TEXT_FONT.COMMON}
        width={56}
        lineHeight={15}
        style={{ fontWeight: 'bold' }}
      >
        {getAgeText(formattedValue, todayAge)}
      </Text>
    </>
  );
}
