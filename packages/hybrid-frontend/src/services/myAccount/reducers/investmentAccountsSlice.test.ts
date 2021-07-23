import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../../performance/api';
import { authSlice as authReducer } from '../../auth';
import investmentAccountsReducer, { fetchInvestmentAccounts } from './investmentAccountsSlice';

import { mockClientResponse, mockInvestmentSummaryResponse } from '../mocks';
import mockPerformanceAccountsAggregated from '../../performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';

jest.mock('../../performance/api', () => ({
  getPerformanceAccountsAggregated: jest.fn(),
}));

describe('investmentAccountsSlice', () => {
  let store: Store;
  const mockGetPerformance = api.getPerformanceAccountsAggregated as jest.Mock;
  beforeEach(() => {
    mockGetPerformance.mockResolvedValue(mockPerformanceAccountsAggregated);

    store = configureStore({
      reducer: {
        auth: authReducer,
        client: () => mockClientResponse,
        investmentSummary: () => mockInvestmentSummaryResponse,
        investmentAccounts: investmentAccountsReducer,
      },
    });
  });

  const fetchInvestmentAccountsAction = fetchInvestmentAccounts() as any;

  describe('dispatch fetchInvestmentAccounts', () => {
    it('starts with sensible defaults', () => {
      const { status, data, error } = store.getState().investmentAccounts;

      expect(['data', 'loading']).not.toContain(status);

      expect(error).toBeUndefined();
      expect(data).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', async () => {
        store.dispatch(fetchInvestmentAccountsAction);
        const { status, data, error } = store.getState().investmentAccounts;

        expect(mockGetPerformance).toHaveBeenCalledTimes(3);

        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
        expect(data).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchInvestmentAccountsAction);
        const { status, data, error } = store.getState().investmentAccounts;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
        expect(data).not.toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets error', async () => {
        const errorMessage = 'Could not find client data.';
        mockGetPerformance.mockRejectedValue(errorMessage);
        await store.dispatch(fetchInvestmentAccountsAction);
        const { status, error } = store.getState().investmentAccounts;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(errorMessage);
      });
    });
  });
});
