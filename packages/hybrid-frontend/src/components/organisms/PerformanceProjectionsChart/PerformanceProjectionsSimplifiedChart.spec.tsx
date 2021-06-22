import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsSimplifiedChart from './PerformanceProjectionsSimplifiedChart';
import { mapDate } from './performanceProjectionsData';
import { ProjectionsChartProjectionDatum } from '../../../services/projections';
import { ProjectionsChartHistoricalDatum } from '../../../services/performance';

import mockProjectionsMonthlyData from './performanceProjectionsData/mocks/mock-projections-monthly-data.json';
import mockHistoricalMonthlyData from './performanceProjectionsData/mocks/mock-historical-monthly-data.json';
import mockGoalsMonthlyData from './performanceProjectionsData/mocks/mock-goals-monthly-data.json';
import mockProjectionsMetadata from './performanceProjectionsData/mocks/mock-projections-metadata.json';

describe('PerformanceProjectionsSimplifiedChartChart', () => {
  const CHART_SIZE = 600;

  const elementTestIds = [
    'performance-projections-simplified-chart-svg',
    'performance-projections-simplified-chart-historical-area',
    'performance-projections-simplified-chart-historical-line',
    'performance-projections-simplified-chart-projections-area',
    'performance-projections-simplified-chart-projections-line',
  ];

  const mockProjectionsData = mockProjectionsMonthlyData.map(mapDate);
  const mockHistoricalData = mockHistoricalMonthlyData.map(mapDate);
  const mockGoalsData = mockGoalsMonthlyData.data.map(mapDate);

  test('The chart renders correctly when there is data', () => {
    renderWithTheme(
      <div>
        <PerformanceProjectionsSimplifiedChart
          initialWidth={CHART_SIZE}
          initialHeight={CHART_SIZE}
          parentWidth={CHART_SIZE}
          projectionsData={mockProjectionsData}
          historicalData={mockHistoricalData}
          goalsData={mockGoalsData}
          projectionsMetadata={mockProjectionsMetadata}
        />
      </div>
    );

    elementTestIds.forEach((testId) => expect(screen.getByTestId(testId)).toBeVisible());
  });

  // 3 cases: no projections data, no historical data, and no both projections
  // and historical data
  const noDataCases: Array<
    [ProjectionsChartProjectionDatum[], ProjectionsChartHistoricalDatum[]]
  > = [
    [[], mockHistoricalData],
    [mockProjectionsData, []],
    [[], []],
  ];

  test.each(noDataCases)(
    'The chart renders correctly when there is no data',
    (projectionsData, historicalData) => {
      renderWithTheme(
        <div>
          <PerformanceProjectionsSimplifiedChart
            initialWidth={CHART_SIZE}
            initialHeight={CHART_SIZE}
            parentWidth={CHART_SIZE}
            projectionsData={projectionsData}
            historicalData={historicalData}
            goalsData={mockGoalsData}
            projectionsMetadata={mockProjectionsMetadata}
          />
        </div>
      );

      elementTestIds.forEach((testId) => expect(screen.queryByTestId(testId)).toBeNull());
      expect(
        screen.getByText(
          'The chart needs both historical and projections data to render and one of these or both are missing!'
        )
      ).toBeVisible();
    }
  );
});
