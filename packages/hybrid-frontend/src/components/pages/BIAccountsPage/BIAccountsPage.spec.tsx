import { configureStore } from '@reduxjs/toolkit';
import { renderWithProviders, screen } from '@tsw/test-util';
import React from 'react';
import { Store } from 'redux';
import { authSlice as authReducer } from '../../../services/auth';
import {
  clientSlice as clientReducer,
  investmentAccountsSlice as investmentAccountsReducer,
  InvestmentSummarySlice as investmentSummaryReducer,
} from '../../../services/myAccount';
import { performanceSlice as performanceReducer } from '../../../services/performance';
import { annualisedReturnSummarySlice as annualisedReturnSummaryReducer } from '../../../services/returns/reducers';
import BIAccountsPage from './BIAccountsPage';

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

describe('BIAccountsPage', () => {
  beforeEach(() => {
    const store: Store = configureStore({
      reducer: {
        auth: authReducer,
        client: clientReducer,
        performance: performanceReducer,
        investmentSummary: investmentSummaryReducer,
        investmentAccounts: investmentAccountsReducer,
        annualisedReturnSummary: annualisedReturnSummaryReducer,
      },
    });
    renderWithProviders(<BIAccountsPage />, store);
  });

  test('BIAccountsPage title has been successfully rendered', () => {
    expect(screen.getByText('Total Value: £0')).toBeInTheDocument();
  });

  it('renders coach card successfully', () => {
    expect(screen.getByText('Speak to a coach')).toBeInTheDocument();
  });
});
