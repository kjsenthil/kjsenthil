import * as React from 'react';
import { TickRendererProps } from '@visx/axis';
import { Text } from '@visx/text';
import { useBreakpoint, useChartStyles } from '../../../../hooks';

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

export interface GetAgeTextProps {
  tickYear: number | undefined;
  todayAge: number | undefined;

  // If true, will show the age number only rather than "AGE N". This is used in
  // mobile views.
  showAgeNumberOnly?: boolean;
}

/**
 * The formatted value passed to our tick component will be a full year string.
 * This function adds an age text to the formatted value.
 */
export function getAgeText({ todayAge, tickYear, showAgeNumberOnly }: GetAgeTextProps): string {
  const prefix = showAgeNumberOnly ? '' : 'AGE\u00a0';

  if (
    tickYear === undefined ||
    todayAge === undefined ||
    Number.isNaN(tickYear) ||
    Number.isNaN(todayAge)
  ) {
    return `${prefix}UNKNOWN`;
  }

  const todayYear = new Date().getFullYear();

  const age = todayAge + (tickYear - todayYear);

  return `${prefix}${age}`;
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
  const { isMobile } = useBreakpoint();

  // When the tick is for today's year, then we always display "TODAY".
  const todayYear = new Date().getFullYear();
  const tickYear = Number(formattedValue);
  const text =
    tickYear === todayYear
      ? 'TODAY'
      : getAgeText({
          tickYear,
          todayAge,
          showAgeNumberOnly: isMobile,
        });

  // We move the final tick a bit to the left to avoid it being clipped
  const textDxOffset = finalYear && Number(formattedValue) === finalYear ? -40 : undefined;

  return (
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
      {text}
    </Text>
  );
}
