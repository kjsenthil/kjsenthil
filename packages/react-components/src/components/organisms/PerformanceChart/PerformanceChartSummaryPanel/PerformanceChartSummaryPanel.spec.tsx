import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChartSummaryPanel from './PerformanceChartSummaryPanel';

describe('PerformanceChartSummaryPanel', () => {
  beforeEach(() => {
    renderWithTheme(
      <PerformanceChartSummaryPanel
        totalPerformance={2000.123}
        totalNetContributions={1000.456}
        totalReturn={999.667}
        totalReturnPercentage={0.99921}
      />
    );
  });

  test('The summary panel is visible and its components render correctly', () => {
    const testTexts = [
      'TOTAL VALUE',
      '£2,000',
      'NET CONTRIBUTION',
      '£1,000',
      'LIFETIME RETURN',
      '£999',
      '99.9%',
    ];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });
  });
});
