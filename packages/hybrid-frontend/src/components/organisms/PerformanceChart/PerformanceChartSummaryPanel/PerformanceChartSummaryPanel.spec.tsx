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
        totalReturnPct={0.99921}
      />
    );
  });

  test('The summary panel is visible and its components render correctly', () => {
    const totalValueLabel = screen.getByText('TOTAL VALUE');
    const totalNetContributionsLabel = screen.getByText('NET CONTRIBUTED');
    const totalReturnLabel = screen.getByText('TOTAL RETURN');

    const totalValueNumber = screen.getByText('£2,000.12');
    const totalNetContributionsNumber = screen.getByText('£1,000.46');
    const totalReturnNumber = screen.getByText('£999.67');
    const totalReturnPctNumber = screen.getByText('99.9%');

    expect(totalValueLabel).toBeVisible();
    expect(totalNetContributionsLabel).toBeVisible();
    expect(totalReturnLabel).toBeVisible();

    expect(totalValueNumber).toBeVisible();
    expect(totalNetContributionsNumber).toBeVisible();
    expect(totalReturnNumber).toBeVisible();
    expect(totalReturnPctNumber).toBeVisible();
  });
});
