import * as React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import {
  PerformanceProjectionsChartAxisBottom,
  PerformanceProjectionsChartAxisLeft,
} from './index';
import { useTimeValueScales } from '../../../../hooks';
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
        xScaleRange: [
          chartDimension.margin.left,
          chartDimension.width - chartDimension.margin.right,
        ],
        yScaleRange: [
          chartDimension.height - chartDimension.margin.top - chartDimension.margin.bottom,
          chartDimension.margin.top,
        ],
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2020, 0, 10),
        minValue: 0,
        maxValue: 100,
      });

      return (
        <svg width={300} height={300}>
          <PerformanceProjectionsChartAxisLeft chartDimension={chartDimension} scale={yScale} />
          <PerformanceProjectionsChartAxisBottom
            chartDimension={chartDimension}
            scale={xScale}
            todayAge={31}
          />
        </svg>
      );
    };

    const {
      result: { container },
    } = renderWithTheme(<TestComponent />);

    const axisLeft = container.querySelector('.visx-axis-left');
    const axisBottom = container.querySelector('.visx-axis-bottom');

    expect(axisLeft).toBeVisible();
    expect(axisBottom).toBeVisible();
  });
});
