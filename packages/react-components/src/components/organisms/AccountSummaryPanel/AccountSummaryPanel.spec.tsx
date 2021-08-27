import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import AccountSummaryPanel from './AccountSummaryPanel';
import { AccountType } from '../../../constants';

describe('AccountSummaryPanel', () => {
  beforeEach(() => {
    renderWithTheme(
      <AccountSummaryPanel
        cashValue={100}
        investmentValue={200}
        totalValue={300}
        accountType={AccountType.ISA}
        isaTitle="ISA ALLOWANCE"
        isaAllowance={20000}
        isaContribution={5000}
      />
    );
  });

  test('The summary panel is visible and its components render correctly', () => {
    const testTexts = [
      'CASH',
      '£100',
      'INVESTMENTS',
      '£200',
      'TOTAL',
      '£300',
      'ISA ALLOWANCE',
      '£20,000',
      '£5,000',
    ];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText, { exact: false })).toBeVisible();
    });
  });
});
