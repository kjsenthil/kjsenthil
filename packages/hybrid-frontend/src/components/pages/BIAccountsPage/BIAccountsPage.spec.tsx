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
import { annualisedReturnSummarySlice as annualisedReturnSummaryReducer } from '../../../services/returns/reducers';

jest.mock('../../templates/MyAccountLayout', () => ({
  __esModule: true,
  default: ({ children, heading: { primary } }) => (
    <div>
      <p>Primary heading = {primary}</p>
      {children}
    </div>
  ),
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

  test('the primary heading should be Investments', () => {
    expect(screen.getByText('Primary heading = Investments')).toBeInTheDocument();
  });

  it('renders coach card successfully', () => {
    expect(screen.getByText('Speak to a coach')).toBeInTheDocument();
  });
});
