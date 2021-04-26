import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import usePerformanceChartScales from './usePerformanceChartScales';
import { PerformanceDataContextProvider } from '../data/dataContext';

describe('usePerformanceChartScales', () => {
  test('The hook returns the x-axis scale and the y-axis scale as expected', () => {
    // The performance chart scales hook uses the performance data context
    const wrapper = ({ children }) => (
      <PerformanceDataContextProvider>{children}</PerformanceDataContextProvider>
    );

    const minDate = new Date(2020, 0, 1);
    const maxDate = new Date(2020, 0, 10);
    const minValue = 0;
    const maxValue = 100;
    const chartDimension = {
      width: 600,
      height: 300,
      margin: {
        top: 10,
        right: 20,
        bottom: 30,
        left: 40,
      },
    };
    const maxValueBuffer = 0;

    const { result } = renderHook(
      () =>
        usePerformanceChartScales({
          minDate,
          maxDate,
          minValue,
          maxValue,
          maxValueBuffer,
          chartDimension,
        }),
      { wrapper }
    );

    // x-axis scale assertions

    expect(result.current.xScale(minDate)).toBe(chartDimension.margin.left);
    expect(result.current.xScale(maxDate)).toBe(
      chartDimension.width - chartDimension.margin.left - chartDimension.margin.right
    );

    // y-axis scale assertions

    expect(result.current.yScale(minValue)).toBe(
      chartDimension.height - chartDimension.margin.top - chartDimension.margin.bottom
    );
    expect(result.current.yScale(maxValue)).toBe(chartDimension.margin.top);
  });
});
