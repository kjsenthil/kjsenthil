import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import SummaryPanel from './SummaryPanel';

describe('SummaryPanel', () => {
  beforeEach(() => {
    renderWithTheme(
      <SummaryPanel
        totalValue={148238.52}
        totalNetContributions={120726.83}
        totalReturn={27512.14}
        totalReturnPct={0.2534}
        threeMonthsReturn={7632.04}
        threeMonthsReturnPct={0.4511}
      />
    );
  });

  test('The summary panel is visible and its components render correctly', () => {
    const totalValueLabel = screen.getByText('TOTAL VALUE');
    const totalNetContributionsLabel = screen.getByText('NET CONTRIBUTIONS');
    const totalReturnLabel = screen.getByText('TOTAL RETURN');
    const threeMonthsReturnLabel = screen.getByText('LAST 3 MONTHS RETURN');

    const totalValueNumber = screen.getByText('£148,238.52');
    const totalNetContributionsNumber = screen.getByText('£120,726.83');
    const totalReturnNumber = screen.getByText('+£27,512.14');
    const threeMonthsReturnNumber = screen.getByText('+£7,632.04');

    expect(totalValueLabel).toBeVisible();
    expect(totalNetContributionsLabel).toBeVisible();
    expect(totalReturnLabel).toBeVisible();
    expect(threeMonthsReturnLabel).toBeVisible();

    expect(totalValueNumber).toBeVisible();
    expect(totalNetContributionsNumber).toBeVisible();
    expect(totalReturnNumber).toBeVisible();
    expect(threeMonthsReturnNumber).toBeVisible();
  });
});
