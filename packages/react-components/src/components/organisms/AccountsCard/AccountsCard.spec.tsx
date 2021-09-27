import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import mockInvestmentAccountsCardData from './mocks';
import AccountsCard from './AccountsCard';

describe('AccountsCard', () => {
  beforeEach(() => {
    renderWithTheme(<AccountsCard data={mockInvestmentAccountsCardData} />);
  });

  it('renders an AccountsCard', () => {
    const testTexts = [
      'CASH',
      '£0',
      'NET CONTRIBUTION',
      '£31,994',
      'TOTAL VALUE',
      '£38,382',
      'LIFETIME RETURN',
      '£345',
      mockInvestmentAccountsCardData[0].accountName ?? '',
    ];

    testTexts.forEach((testText) => {
      expect(screen.getByText(testText)).toBeVisible();
    });
  });
});
