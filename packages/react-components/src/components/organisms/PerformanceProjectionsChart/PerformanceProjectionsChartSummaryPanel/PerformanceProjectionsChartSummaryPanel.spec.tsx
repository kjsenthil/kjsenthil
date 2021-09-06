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
        showLikelyRangeLegend
      />
    );

    // These legend texts appear once on the component
    const legendTexts = [
      'PROJECTED VALUE',
      '£10,000',
      'NET CONTRIBUTION',
      '£20,000',
      'TARGET VALUE',
      '£40,000',
      '£9,000 - £11,000', // This is the likely range
    ];

    legendTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });

    // There are 2 "Likely Range" labels, one for the chart legend, and one for
    // the likely range toggle.
    const likelyRangeLabels = screen.getAllByText('LIKELY RANGE');
    expect(likelyRangeLabels).toHaveLength(2);
    expect(likelyRangeLabels[0]).toBeVisible();
    expect(likelyRangeLabels[1]).toBeVisible();
  });
});
