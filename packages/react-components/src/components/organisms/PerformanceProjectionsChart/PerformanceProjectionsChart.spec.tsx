import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChart from './PerformanceProjectionsChart';
import { mapDate } from './performanceProjectionsData';

import mockProjectionsMonthlyData from './performanceProjectionsData/mocks/mock-projections-monthly-data.json';
import mockHistoricalMonthlyData from './performanceProjectionsData/mocks/mock-historical-monthly-data.json';

import mockGoalsData from './performanceProjectionsData/mocks/mock-goals-annual-data.json';
import mockGoalsMultiData from './performanceProjectionsData/mocks/mock-goals-multiple-data.json';
import mockProjectionsMetadata from './performanceProjectionsData/mocks/mock-projections-metadata.json';

jest.mock(
  './PerformanceProjectionsChartGoalIndicator/PerformanceProjectionsChartGoalIndicator',
  () => ({
    __esModule: true,
    default: ({ label }) => <div data-testid="goalIndicator">{label}</div>,
  })
);

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
          showLikelyRange
          toggleLikelyRange={() => {}}
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
          showLikelyRange
          toggleLikelyRange={() => {}}
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

  test('renders with multiple goal indicators', () => {
    renderWithTheme(
      <div>
        <PerformanceProjectionsChart
          initialWidth={CHART_SIZE}
          initialHeight={CHART_SIZE}
          parentWidth={CHART_SIZE}
          projectionsData={mockProjectionsMonthlyData.map(mapDate)}
          historicalData={mockHistoricalMonthlyData.map(mapDate)}
          goalsData={mockGoalsMultiData.data.map(mapDate)}
          projectionsMetadata={mockProjectionsMetadata}
          showLikelyRange
          toggleLikelyRange={() => {}}
        />
      </div>
    );

    expect(screen.getAllByTestId('goalIndicator')).toHaveLength(3);
    expect(screen.getByText('Lump sum')).toBeVisible();
    expect(screen.getByText('Retirement')).toBeVisible();
    expect(screen.getByText('Remaining')).toBeVisible();
  });

  test('renders ticks for today and the retirement age on the x-axis, but not for other goals or retirement end age', () => {
    renderWithTheme(
      <div>
        <PerformanceProjectionsChart
          initialWidth={CHART_SIZE}
          initialHeight={CHART_SIZE}
          parentWidth={CHART_SIZE}
          projectionsData={mockProjectionsMonthlyData.map(mapDate)}
          historicalData={mockHistoricalMonthlyData.map(mapDate)}
          goalsData={mockGoalsMultiData.data.map(mapDate)}
          projectionsMetadata={mockProjectionsMetadata}
          showLikelyRange
          toggleLikelyRange={() => {}}
        />
      </div>
    );

    expect(screen.getAllByText('TODAY')).toHaveLength(2);
    expect(screen.getByText('AGE 61')).toBeInTheDocument();
    expect(screen.queryByText('AGE 48')).not.toBeInTheDocument();
    expect(screen.queryByText('AGE 96')).not.toBeInTheDocument();
    expect(screen.queryByText('AGE 106')).not.toBeInTheDocument();
  });
});
