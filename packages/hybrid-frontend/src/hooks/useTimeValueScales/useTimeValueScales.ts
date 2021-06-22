import * as React from 'react';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { scaleLinear, scaleTime } from '@visx/scale';
import { ChartDimension } from '../../config/chart';

export interface UseTimeValueScalesProps {
  chartDimension: ChartDimension;

  // x-axis scale props
  minDate?: Date;
  maxDate?: Date;

  // y-axis scale props
  maxValue?: number;
  minValue?: number;

  // maxValue will be multiplied with 1 + this value to create a "buffer" area
  // that is always above the highest point of the chart
  // e.g. passing 0.1 (10%) will result in the chart's highest point being 10%
  // higher than the underlying data's highest point
  maxValueBuffer?: number;

  // Same principles as above, but applied to the minimum value
  minValueBuffer?: number;
}

const DEFAULT_MAX_VALUE_BUFFER = 0.1;
const DEFAULT_MIN_VALUE_BUFFER = 0.1;

// This domain is used when either minDate or maxDate is undefined
const DEFAULT_TIME_DOMAIN = [new Date(0), new Date(0)];
// This domain is used when either minValue or maxValue is undefined
const DEFAULT_VALUE_DOMAIN = [0, 0];

/**
 * Return a time scale for the x-axis and a linear value scale for the y-axis.
 */
export default function useTimeValueScales({
  minDate,
  maxDate,
  maxValue,
  minValue,
  maxValueBuffer = DEFAULT_MAX_VALUE_BUFFER,
  minValueBuffer = DEFAULT_MIN_VALUE_BUFFER,
  chartDimension,
}: UseTimeValueScalesProps): {
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
} {
  const { margin, height, width } = chartDimension;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const datesDefined = minDate && maxDate;
  const valuesDefined =
    minValue !== undefined &&
    maxValue !== undefined &&
    minValue !== -Infinity &&
    maxValue !== Infinity;

  const xScale = React.useMemo(
    () =>
      scaleTime({
        // Need the "!" post-fix operator here because TypeScript can't infer
        // that minDate and maxDate have been checked for undefined via the
        // datesDefined variable.
        domain: datesDefined ? [minDate!, maxDate!] : DEFAULT_TIME_DOMAIN,
        range: [margin.left, innerWidth],
      }),
    [innerWidth, margin.left, minDate?.getTime(), maxDate?.getTime()]
  );

  const yScale = React.useMemo(
    () =>
      scaleLinear({
        // Need the "!" post-fix operator here because TypeScript can't infer
        // that minValue and maxValue have been checked for undefined via the
        // valuesDefined variable.
        domain: valuesDefined
          ? [minValue!, maxValue! * (1 + maxValueBuffer)]
          : DEFAULT_VALUE_DOMAIN,
        range: [innerHeight * (1 - minValueBuffer), margin.top],

        nice: true,
      }),
    [innerHeight, margin.top, minValue, maxValue, maxValueBuffer, minValueBuffer]
  );

  return {
    xScale,
    yScale,
  };
}
