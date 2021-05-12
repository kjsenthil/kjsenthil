import * as React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import {
  PerformanceProjectionsChartAxisBottom,
  PerformanceProjectionsChartAxisLeft,
} from './index';
import { PerformanceProjectionsDataContextProvider } from '../data/performanceProjectionsChartDataContext';
import { useTimeValueScales } from '../../../../hooks/ChartHooks';
import { ChartDimension } from '../../../../config/chart';

describe('PerformanceProjectionsChartAxes', () => {
  test('The chart axes render correctly', () => {
    const chartDimension: ChartDimension = {
      width: 300,
      height: 300,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    };

    const TestComponent = () => {
      const { xScale, yScale } = useTimeValueScales({
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2020, 0, 10),
        minValue: 0,
        maxValue: 100,
        chartDimension,
      });

      return (
        <PerformanceProjectionsDataContextProvider>
          <svg width={300} height={300}>
            <PerformanceProjectionsChartAxisLeft chartDimension={chartDimension} scale={yScale} />
            <PerformanceProjectionsChartAxisBottom chartDimension={chartDimension} scale={xScale} />
          </svg>
        </PerformanceProjectionsDataContextProvider>
      );
    };

    const { container } = renderWithTheme(<TestComponent />);

    const axisLeft = container.querySelector('.visx-axis-left');
    const axisBottom = container.querySelector('.visx-axis-bottom');

    expect(axisLeft).toBeVisible();
    expect(axisBottom).toBeVisible();
  });
});
