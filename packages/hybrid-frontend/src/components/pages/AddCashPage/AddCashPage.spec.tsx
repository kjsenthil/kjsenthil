import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { authSlice as authReducer } from '../../../services/auth';
import {
  clientSlice as clientReducer,
  InvestmentSummarySlice as investmentSummaryReducer,
  IsaContributionSlice as isaContributionReducer,
} from '../../../services/myAccount';
import AddCashPage from './AddCashPage';
import mockGetPerformanceResponse from '../../../services/performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import { PerformanceDataPeriod } from '../../../../../react-components/src';
import { mockInvestmentAccounts } from '../../../services/myAccount/mocks';

jest.mock('../../templates/AccountDetailsLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

const mockPerformanceData = {
  ...mockGetPerformanceResponse,
  performanceDataPeriod: PerformanceDataPeriod['5Y'],
};

const mockAccountData = {
  id: '21977',
  accountName: 'ISA',
  accountNumber: 'BI219774',
  accountType: 'accounts',
  accountTotalHoldings: 9479.442456,
  accountTotalNetContribution: 5041.06,
  accountCash: 0,
  accountReturn: 4582.132456,
  accountReturnPercentage: 93.56,
};

describe('AddCashPage', () => {
  beforeEach(() => {
    const store: Store = configureStore({
      reducer: {
        auth: authReducer,
        client: clientReducer,
        investmentAccounts: () => ({
          status: 'success',
          data: mockInvestmentAccounts.filter((account) => account.accountName === 'ISA'),
        }),
        investmentSummary: investmentSummaryReducer,
        selectedAccount: () => ({
          status: 'success',
          account: mockAccountData,
        }),
        isaContribution: isaContributionReducer,
        performance: () => ({
          status: 'success',
          ...mockPerformanceData,
        }),
      },
    });
    renderWithProviders(<AddCashPage />, store);
  });

  test('renders the ISA contribution heading', () => {
    expect(screen.getByText('ISA ALLOWANCE')).toBeInTheDocument();
  });

  test('renders the add cash card', () => {
    expect(
      screen.getByText('Use a personal debit card to add cash to your ISA account.')
    ).toBeInTheDocument();
    expect(screen.getByText('Transfer an account')).toBeInTheDocument();
  });
});
