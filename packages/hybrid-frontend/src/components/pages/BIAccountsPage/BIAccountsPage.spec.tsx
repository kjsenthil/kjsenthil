import React from 'react';
import { renderWithProviders, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { authSlice as authReducer } from '../../../services/auth';
import {
  clientSlice as clientReducer,
  InvestmentSummarySlice as investmentSummaryReducer,
  investmentAccountsSlice as investmentAccountsReducer,
} from '../../../services/myAccount';
import BIAccountsPage from './BIAccountsPage';
import performanceReducer from '../../../services/performance/reducers/performanceSlice';

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

describe('BIAccountsPage', () => {
  const store: Store = configureStore({
    reducer: {
      auth: authReducer,
      client: clientReducer,
      performance: performanceReducer,
      investmentSummary: investmentSummaryReducer,
      investmentAccounts: investmentAccountsReducer,
    },
  });

  test('BIAccountsPage title has been successfully rendered', async () => {
    renderWithProviders(<BIAccountsPage />, store);
    expect(screen.getByText('TOTAL VALUE')).toBeInTheDocument();
  });
});
