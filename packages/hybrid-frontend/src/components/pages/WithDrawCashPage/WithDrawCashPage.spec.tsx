import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { PerformanceDataPeriod } from '@tswdts/react-components';
import { authSlice as authReducer } from '../../../services/auth';
import {
  clientSlice as clientReducer,
  InvestmentSummarySlice as investmentSummaryReducer,
} from '../../../services/myAccount';
import WithDrawCashPage from './WithDrawCashPage';
import mockGetPerformanceResponse from '../../../services/performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import { mockInvestmentAccounts } from '../../../services/myAccount/mocks';

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

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

jest.mock('@reach/router', () => ({
  useLocation: () => ({ pathname: '/' }),
}));

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
        performance: () => ({
          status: 'success',
          ...mockPerformanceData,
        }),
      },
    });
    renderWithProviders(<WithDrawCashPage />, store);
  });

  it('render card correctly', () => {
    // button
    expect(screen.getByText('Withdraw Cash')).toBeInTheDocument();
  });
});
