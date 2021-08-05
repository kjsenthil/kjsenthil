import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import SummaryPanel, { SummaryPanelProps } from './SummaryPanel';

const periodBasedReturn = {
  value: 7632.04,
  percent: 0.4511,
  label: 'LAST 3 MONTHS RETURN',
};
const baseSummaryPanelProps: SummaryPanelProps = {
  totalValue: 148238.52,
  totalNetContributions: 120726.83,
  totalReturn: 27512.14,
  totalReturnPercentage: 0.2534,
  periodBasedReturn,
};
const baseSummaryPanelWithAnnualisedReturnProps: SummaryPanelProps = {
  ...baseSummaryPanelProps,
  annualisedReturnPercentage: 0.2,
};

describe('SummaryPanel', () => {
  test('The summary panel is visible and its components render correctly when annualised return is not provided', () => {
    renderWithTheme(<SummaryPanel {...baseSummaryPanelProps} />);

    const testTexts = [
      'TOTAL VALUE',
      '£148,238',
      'NET CONTRIBUTIONS',
      '£120,726',
      'LIFETIME RETURN',
      '+ £27,512',
      '+ 25.3%',
      'LAST 3 MONTHS RETURN',
      '+ £7,632',
      '+ 45.1%',
    ];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });

    expect(screen.queryByText('ANNUALISED RETURN')).toBeNull();
    expect(screen.queryByText('+ 20.0%')).toBeNull();
  });

  test('The summary panel is visible and its components render correctly when annualised return is provided', () => {
    renderWithTheme(<SummaryPanel {...baseSummaryPanelWithAnnualisedReturnProps} />);

    const testTexts = [
      'TOTAL VALUE',
      '£148,238',
      'NET CONTRIBUTIONS',
      '£120,726',
      'ANNUALISED RETURN',
      '+ 20.0%',
      'LAST 3 MONTHS RETURN',
      '+ £7,632',
      '+ 45.1%',
    ];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });

    expect(screen.queryByText('LIFETIME RETURN')).toBeNull();
    expect(screen.queryByText('+ 27,512')).toBeNull();
    expect(screen.queryByText('+ 25.3%')).toBeNull();
  });
});
