import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChartSummaryPanel from './PerformanceProjectionsChartSummaryPanel';

describe('PerformanceProjectionsChartSummaryPanel', () => {
  test('The summary panel is visible and its components render correctly', () => {
    renderWithTheme(
      <PerformanceProjectionsChartSummaryPanel
        performance={10000.1234}
        performanceLowEnd={9000.456}
        performanceHighEnd={11000.789}
        contributions={20000}
        performanceTargetNotMet={40000}
        showLikelyRange
        toggleLikelyRange={() => {}}
      />
    );

    const projectedValueLabel = screen.getByText('PROJECTED VALUE');

    const contributionsLabel = screen.getByText('CONTRIBUTIONS');
    const performanceTargetNotMetLabel = screen.getByText('TARGET VALUE');

    // There are 2 "Likely Range" labels, one for the chart legend, and one for
    // the likely range toggle.
    const likelyRangeLabels = screen.getAllByText('LIKELY RANGE');

    const projectedValueText = screen.getByText('£10,000.12');
    const likelyRangeText = screen.getByText('£9,000 - £11,001');
    const contributionsText = screen.getByText('£20,000.00');
    const performanceTargetNotMetText = screen.getByText('£40,000');

    expect(projectedValueLabel).toBeVisible();
    expect(contributionsLabel).toBeVisible();
    expect(performanceTargetNotMetLabel).toBeVisible();

    expect(likelyRangeLabels).toHaveLength(2);
    expect(likelyRangeLabels[0]).toBeVisible();
    expect(likelyRangeLabels[1]).toBeVisible();

    expect(projectedValueText).toBeVisible();
    expect(likelyRangeText).toBeVisible();
    expect(contributionsText).toBeVisible();
    expect(performanceTargetNotMetText).toBeVisible();
  });
});
