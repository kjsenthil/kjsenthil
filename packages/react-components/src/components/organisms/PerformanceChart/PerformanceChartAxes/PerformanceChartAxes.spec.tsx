import * as React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { scaleLinear, scaleTime } from '@visx/scale';
import { PerformanceChartAxisBottom, PerformanceChartAxisLeft } from './index';
import { ChartDimensionWithExtras } from '../../../../config/chart';

describe('PerformanceChartAxes', () => {
  const chartDimension: ChartDimensionWithExtras = {
    width: 300,
    height: 300,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    innerWidth: 300,
    innerHeight: 300,
  };

  const xScale = scaleTime({
    domain: [new Date(2020, 0, 1), new Date(2020, 0, 10)],
    range: [
      chartDimension.margin.left,
      chartDimension.width - chartDimension.margin.left - chartDimension.margin.right,
    ],
  });

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [
      chartDimension.height - chartDimension.margin.top - chartDimension.margin.bottom,
      chartDimension.margin.top,
    ],
  });

  test('The chart axes render correctly', () => {
    const {
      result: { container },
    } = renderWithTheme(
      <svg width={300} height={300}>
        <PerformanceChartAxisLeft chartDimension={chartDimension} scale={yScale} />
        <PerformanceChartAxisBottom chartDimension={chartDimension} scale={xScale} />
      </svg>
    );

    const axisLeft = container.querySelector('.visx-axis-left');
    const axisBottom = container.querySelector('.visx-axis-bottom');

    expect(axisLeft).toBeVisible();
    expect(axisBottom).toBeVisible();
  });
});
