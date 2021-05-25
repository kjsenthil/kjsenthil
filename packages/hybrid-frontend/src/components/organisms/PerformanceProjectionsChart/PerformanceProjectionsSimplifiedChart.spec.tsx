import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsSimplifiedChart from './PerformanceProjectionsSimplifiedChart';
import { mapDate } from './performanceProjectionsData';
import mockProjectionsData from './performanceProjectionsData/mocks/mock-projections-data.json';
import mockAnnualHistoricalData from './performanceProjectionsData/mocks/mock-annual-historical-data.json';
import mockGoalsData from './performanceProjectionsData/mocks/mock-goals-data.json';
import mockProjectionsMetadata from './performanceProjectionsData/mocks/mock-projections-metadata.json';

describe('PerformanceProjectionsSimplifiedChartChart', () => {
  const CHART_SIZE = 600;

  test('The chart renders correctly', () => {
    renderWithTheme(
      <div
        style={{
          width: CHART_SIZE,
          height: CHART_SIZE,
        }}
      >
        <PerformanceProjectionsSimplifiedChart
          initialWidth={CHART_SIZE}
          initialHeight={CHART_SIZE}
          parentWidth={CHART_SIZE}
          projectionsData={mockProjectionsData.data.map(mapDate)}
          annualHistoricalData={mockAnnualHistoricalData.data.map(mapDate)}
          goalsData={mockGoalsData.data.map(mapDate)}
          projectionsMetadata={mockProjectionsMetadata}
        />
      </div>
    );

    expect(screen.getByTestId('performance-projections-simplified-chart-svg')).toBeVisible();
    expect(
      screen.getByTestId('performance-projections-simplified-chart-historical-area')
    ).toBeVisible();
    expect(
      screen.getByTestId('performance-projections-simplified-chart-historical-line')
    ).toBeVisible();
    expect(
      screen.getByTestId('performance-projections-simplified-chart-projections-area')
    ).toBeVisible();
    expect(
      screen.getByTestId('performance-projections-simplified-chart-projections-line')
    ).toBeVisible();
  });
});
