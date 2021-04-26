import * as React from 'react';
import { scaleLinear, scaleTime } from '@visx/scale';
import { ChartDimension } from '../performanceChartStyles/performanceChartStyles';
import { usePerformanceDataContext } from '../data/dataContext';

export interface GetScalesProps {
  // General dimensions
  chartDimension: ChartDimension;

  // x-axis scale props
  minDate: Date;
  maxDate: Date;

  // y-axis scale props
  maxValue: number;
  minValue: number;

  // maxValue will be multiplied with 1 + this value to create a "buffer" area
  // that is always above the highest point of the chart
  // e.g. passing 0.1 (10%) will result in the chart's highest point being 10%
  // higher than the underlying data's highest point
  maxValueBuffer?: number;
}

const DEFAULT_MAX_VALUE_BUFFER = 0.1;

export default function usePerformanceChartScales({
  minDate,
  maxDate,
  maxValue,
  minValue,
  maxValueBuffer = DEFAULT_MAX_VALUE_BUFFER,
  chartDimension,
}: GetScalesProps) {
  const {
    state: { dataPeriod },
  } = usePerformanceDataContext();

  const { margin, height, width } = chartDimension;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = React.useMemo(
    () =>
      scaleTime({
        domain: [minDate, maxDate],
        range: [margin.left, innerWidth],
      }),
    [innerWidth, margin.left, dataPeriod]
  );

  const yScale = React.useMemo(
    () =>
      scaleLinear({
        domain: [minValue, maxValue * (1 + maxValueBuffer)],
        range: [innerHeight, margin.top],

        nice: true,
      }),
    [innerHeight, margin.top, dataPeriod]
  );

  return {
    xScale,
    yScale,
  };
}
