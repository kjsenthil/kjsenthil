import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChart from './PerformanceChart';
import { PerformanceDataContextProvider } from './data/dataContext';

describe('PerformanceChartChart', () => {
  const CHART_SIZE = 600;

  test('The chart renders correctly', () => {
    renderWithTheme(
      <div
        style={{
          width: CHART_SIZE,
          height: CHART_SIZE,
        }}
      >
        <PerformanceDataContextProvider>
          <PerformanceChart
            initialWidth={CHART_SIZE}
            initialHeight={CHART_SIZE}
            parentWidth={CHART_SIZE}
          />
        </PerformanceDataContextProvider>
      </div>
    );

    expect(screen.getByTestId('performance-chart-svg')).toBeVisible();
  });
});
