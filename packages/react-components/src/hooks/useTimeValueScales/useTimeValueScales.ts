import * as React from 'react';
import { ScaleTime, ScaleLinear } from 'd3-scale';
import { scaleLinear, scaleTime } from '@visx/scale';

export interface UseTimeValueScalesProps {
  yScaleRange: number[];
  xScaleRange: number[];

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
}

const DEFAULT_MAX_VALUE_BUFFER = 0;

// This domain is used when either minDate or maxDate is undefined
const DEFAULT_TIME_DOMAIN = [new Date(0), new Date(0)];
// This domain is used when either minValue or maxValue is undefined.
// The maximum is set to 100. If both values are 0 then the chart won't render
// very nicely.
const DEFAULT_VALUE_DOMAIN = [0, 100];

/**
 * Return a time scale for the x-axis and a linear value scale for the y-axis.
 */
export default function useTimeValueScales({
  minDate,
  maxDate,
  maxValue,
  minValue,
  maxValueBuffer = DEFAULT_MAX_VALUE_BUFFER,
  xScaleRange,
  yScaleRange,
}: UseTimeValueScalesProps): {
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
} {
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
        range: xScaleRange,
      }),
    [xScaleRange[0], xScaleRange[1], minDate?.getTime(), maxDate?.getTime()]
  );

  const yScale = React.useMemo(
    () =>
      scaleLinear({
        // Need the "!" post-fix operator here because TypeScript can't infer
        // that minValue and maxValue have been checked for undefined via the
        // valuesDefined variable.
        domain: valuesDefined
          ? // We don't want both minValue and maxValue to be 0 - otherwise the
            // chart won't render very nicely
            [minValue!, maxValue! * (1 + maxValueBuffer) || DEFAULT_VALUE_DOMAIN[1]]
          : DEFAULT_VALUE_DOMAIN,
        range: yScaleRange,
      }),
    [yScaleRange[0], yScaleRange[1], minValue, maxValue, maxValueBuffer]
  );

  return {
    xScale,
    yScale,
  };
}
