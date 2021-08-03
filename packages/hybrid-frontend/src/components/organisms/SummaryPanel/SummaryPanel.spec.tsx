import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import SummaryPanel from './SummaryPanel';

const periodBasedReturn = {
  value: 7632.04,
  percent: 0.4511,
  label: 'LAST 3 MONTHS RETURN',
};
describe('SummaryPanel', () => {
  beforeEach(() => {
    renderWithTheme(
      <SummaryPanel
        totalValue={148238.52}
        totalNetContributions={120726.83}
        totalReturn={27512.14}
        totalReturnPercentage={0.2534}
        periodBasedReturn={periodBasedReturn}
      />
    );
  });

  test('The summary panel is visible and its components render correctly', () => {
    const totalValueLabel = screen.getByText('TOTAL VALUE');
    const totalNetContributionsLabel = screen.getByText('NET CONTRIBUTIONS');
    const totalReturnLabel = screen.getByText('LIFETIME RETURN');
    const periodBasedReturnLabel = screen.getByText('LAST 3 MONTHS RETURN');

    const totalValueNumber = screen.getByText('£148,238.52');
    const totalNetContributionsNumber = screen.getByText('£120,726.83');
    const totalReturnNumber = screen.getByText('+ £27,512.14');
    const periodBasedReturnValue = screen.getByText('+ £7,632.04');

    expect(totalValueLabel).toBeVisible();
    expect(totalNetContributionsLabel).toBeVisible();
    expect(totalReturnLabel).toBeVisible();
    expect(periodBasedReturnLabel).toBeVisible();

    expect(totalValueNumber).toBeVisible();
    expect(totalNetContributionsNumber).toBeVisible();
    expect(totalReturnNumber).toBeVisible();
    expect(periodBasedReturnValue).toBeVisible();
  });
});
