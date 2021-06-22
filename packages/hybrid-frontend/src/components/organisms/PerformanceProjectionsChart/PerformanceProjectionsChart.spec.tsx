import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChart from './PerformanceProjectionsChart';
import { mapDate } from './performanceProjectionsData';

import mockProjectionsMonthlyData from './performanceProjectionsData/mocks/mock-projections-monthly-data.json';
import mockHistoricalMonthlyData from './performanceProjectionsData/mocks/mock-historical-monthly-data.json';

import mockGoalsData from './performanceProjectionsData/mocks/mock-goals-annual-data.json';
import mockProjectionsMetadata from './performanceProjectionsData/mocks/mock-projections-metadata.json';

describe('PerformanceProjectionsChartChart', () => {
  const CHART_SIZE = 600;

  test('The chart renders correctly when there is data', () => {
    renderWithTheme(
      <div>
        <PerformanceProjectionsChart
          initialWidth={CHART_SIZE}
          initialHeight={CHART_SIZE}
          parentWidth={CHART_SIZE}
          projectionsData={mockProjectionsMonthlyData.map(mapDate)}
          historicalData={mockHistoricalMonthlyData.map(mapDate)}
          goalsData={mockGoalsData.data.map(mapDate)}
          projectionsMetadata={mockProjectionsMetadata}
        />
      </div>
    );

    expect(screen.getByTestId('performance-projections-chart-svg')).toBeVisible();
  });

  test('The chart shows an error message when there is no data', () => {
    renderWithTheme(
      <div>
        <PerformanceProjectionsChart
          initialWidth={CHART_SIZE}
          initialHeight={CHART_SIZE}
          parentWidth={CHART_SIZE}
          projectionsData={[]}
          historicalData={[]}
          goalsData={mockGoalsData.data.map(mapDate)}
          projectionsMetadata={mockProjectionsMetadata}
        />
      </div>
    );

    expect(screen.queryByTestId('performance-projections-chart-svg')).toBeNull();
    expect(
      screen.getByText(
        'The chart needs both historical and projections data to render and one of these or both are missing!'
      )
    ).toBeVisible();
  });
});
