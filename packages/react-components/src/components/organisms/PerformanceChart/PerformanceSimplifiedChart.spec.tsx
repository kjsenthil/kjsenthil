import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import getPerformanceContactMockResponseData from '../../../services/performance/mocks/mock-get-performance-contact-success-response.json';
import {
  mapContributionsData,
  mapPerformanceData,
  PerformanceDataPeriod,
} from '../../../services/performance';
import PerformanceSimplifiedChart from './PerformanceSimplifiedChart';

describe('PerformanceSimplifiedChart', () => {
  const CHART_SIZE = 600;

  test('The chart renders correctly', () => {
    renderWithTheme(
      <div
        style={{
          width: CHART_SIZE,
          height: CHART_SIZE,
        }}
      >
        <PerformanceSimplifiedChart
          performanceData={getPerformanceContactMockResponseData.data.attributes.values.map(
            mapPerformanceData
          )}
          contributionsData={getPerformanceContactMockResponseData.included[0].attributes.contributions.map(
            mapContributionsData
          )}
          dataPeriod={PerformanceDataPeriod['5Y']}
          initialWidth={CHART_SIZE}
          initialHeight={CHART_SIZE}
          parentWidth={CHART_SIZE}
        />
      </div>
    );

    expect(screen.getByTestId('performance-simplified-chart-svg')).toBeVisible();
  });
});