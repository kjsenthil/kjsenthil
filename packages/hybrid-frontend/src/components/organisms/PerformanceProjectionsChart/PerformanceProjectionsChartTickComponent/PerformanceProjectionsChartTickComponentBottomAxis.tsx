import * as React from 'react';
import { TickRendererProps } from '@visx/axis';
import { Text } from '@visx/text';
import { useChartStyles } from '../../../../hooks';

export interface PerformanceProjectionsChartTickComponentBottomAxisProps extends TickRendererProps {
  // Note: we have to pass chartStyles as a prop rather than having
  // PerformanceChartTickComponent uses useChartStyles() directly. Otherwise we
  // will run into the mismatched hook call order error when the chart period
  // changes.
  // The cause for this is likely due to how d3 is handling the showing / hiding
  // of chart ticks. Unknown for sure at this point but passing the chartStyles
  // down as a prop works well enough.
  chartStyles: ReturnType<typeof useChartStyles>;

  todayAge: number;

  // Default mode shows both years and ages.
  // Simplified mode shows 'TODAY' when the year is today's year, and only ages
  // otherwise.
  displayMode: 'default' | 'simplified';

  // By providing the final year, we can shift the final tick to the left to
  // avoid margin collision.
  finalYear?: number;
}

/**
 * The formatted value passed to our tick component will be a full year string.
 * This function adds an age text to the formatted value.
 */
export function getAgeText(formattedValue: string | undefined, todayAge: number): string {
  const tickYear = Number(formattedValue);

  if (Number.isNaN(tickYear)) return `AGE UNKNOWN`;

  const todayYear = new Date().getFullYear();

  const age = todayAge + (tickYear - todayYear);

  return `AGE ${age}`;
}

export default function PerformanceProjectionsChartTickComponentBottomAxis({
  chartStyles,
  todayAge,
  displayMode,
  finalYear,
  x,
  y,
  formattedValue,
  ...tickLabelProps
}: PerformanceProjectionsChartTickComponentBottomAxisProps) {
  // When the tick is for today's year, then we always display "TODAY".
  // In simplified display mode, only the "TODAY" year text is shown. No other
  // year text ticks are shown.
  const todayYear = new Date().getFullYear();
  const yearText = Number(formattedValue) === todayYear ? 'TODAY' : formattedValue;
  const showYearText =
    displayMode === 'default' || (displayMode === 'simplified' && yearText === 'TODAY');

  // We always show ages in simplified display mode, except for the "TODAY"
  // tick.
  const showAgeText =
    displayMode === 'default' || (displayMode === 'simplified' && yearText !== 'TODAY');

  // There is a y-offset for age texts (because they are on line #2). We don't
  // need this offset when the years are not shown, however.
  const ageTextYOffset = !showYearText ? 0 : 15;

  const textDxOffset = finalYear && Number(formattedValue) === finalYear ? '-4%' : undefined;

  return (
    <>
      {showYearText && (
        <Text
          x={x}
          dx={textDxOffset}
          y={y}
          {...tickLabelProps}
          fill={chartStyles.TEXT_COLOR.AXES}
          fontSize={chartStyles.TEXT_SIZE.AXES}
          fontFamily={chartStyles.TEXT_FONT.COMMON}
          width={56}
          lineHeight={15}
          style={{ fontWeight: 'bold' }}
        >
          {yearText}
        </Text>
      )}
      {showAgeText && (
        <Text
          x={x}
          dx={textDxOffset}
          y={y + ageTextYOffset}
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
      )}
    </>
  );
}
