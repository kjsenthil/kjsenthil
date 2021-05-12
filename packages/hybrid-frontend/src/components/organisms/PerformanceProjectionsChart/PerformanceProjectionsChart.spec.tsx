import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChart from './PerformanceProjectionsChart';
import { PerformanceProjectionsDataContextProvider } from './data/performanceProjectionsChartDataContext';

describe('PerformanceProjectionsChartChart', () => {
  const CHART_SIZE = 600;

  test('The chart renders correctly', () => {
    renderWithTheme(
      <div
        style={{
          width: CHART_SIZE,
          height: CHART_SIZE,
        }}
      >
        <PerformanceProjectionsDataContextProvider>
          <PerformanceProjectionsChart
            initialWidth={CHART_SIZE}
            initialHeight={CHART_SIZE}
            parentWidth={CHART_SIZE}
          />
        </PerformanceProjectionsDataContextProvider>
      </div>
    );

    expect(screen.getByTestId('performance-projections-chart-svg')).toBeVisible();
  });
});
