import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import SummaryPanel, { SummaryPanelProps } from './SummaryPanel';

const periodBasedReturn = {
  value: 7632.04,
  percent: 0.4511,
  label: 'LAST 3 MONTHS RETURN',
};
const baseSummaryPanelProps: SummaryPanelProps = {
  totalNetContributions: 120726.83,
  lifetimeReturn: 27512.14,
  lifetimeReturnPercentage: 0.2534,
  annualisedReturnPercentage: 0.2,
  periodBasedReturn,
};

describe('SummaryPanel', () => {
  test('The summary panel is visible and its components render correctly', () => {
    renderWithTheme(<SummaryPanel {...baseSummaryPanelProps} />);

    const testTexts = [
      'NET CONTRIBUTIONS',
      '£120,726',
      'LIFETIME RETURN',
      '+ £27,512',
      '+ 25.3%',
      'ANNUALISED RETURN',
      '+ 20.0%',
      'LAST 3 MONTHS RETURN',
      '+ £7,632',
      '+ 45.1%',
    ];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });
  });
});
