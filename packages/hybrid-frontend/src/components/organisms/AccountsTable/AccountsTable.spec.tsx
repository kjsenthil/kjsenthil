import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import AccountsTable from './AccountsTable';
import { PerformanceDataPeriod } from '../../../services/performance';
import { mockInvestmentAccountsTableHeader, mockInvestmentAccountsTableData } from './mocks';

describe('AccountsTable', () => {
  beforeEach(() => {
    renderWithTheme(
      <AccountsTable
        period={PerformanceDataPeriod['5Y']}
        headerRow={mockInvestmentAccountsTableHeader}
        dataRow={mockInvestmentAccountsTableData}
      />
    );
  });

  it('renders a AccountsTable', () => {
    const testTexts = [
      'ACCOUNT',
      'TOTAL HOLDINGS',
      '£38,382',
      'NET CONTRIBUTIONS',
      '£31,994',
      'CASH',
      'LIFETIME RETURN',
      '+£6,837',
      mockInvestmentAccountsTableData[0].accountName ?? '',
    ];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });

    const zeroPoundTexts = screen.getAllByText('£0');
    expect(zeroPoundTexts).toHaveLength(2);
    expect(zeroPoundTexts[0]).toBeVisible();
    expect(zeroPoundTexts[1]).toBeVisible();
  });
});
