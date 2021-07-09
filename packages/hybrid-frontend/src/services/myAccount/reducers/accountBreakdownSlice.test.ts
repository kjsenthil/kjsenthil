import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../api';
import { authSlice as authReducer } from '../../auth';
import accountBreakdownReducer, { fetchAccountBreakdown } from './accountBreakdownSlice';

import { mockClientResponse, mockNetContributions, mockInvestSummaryResponse } from '../mocks';

jest.mock('../api', () => ({
  getNetContributions: jest.fn(),
}));

describe('accountBreakdownSlice', () => {
  let store: Store;
  const mockGetContributions = api.getNetContributions as jest.Mock;
  beforeEach(() => {
    mockGetContributions.mockResolvedValue(mockNetContributions);

    store = configureStore({
      reducer: {
        auth: authReducer,
        client: () => mockClientResponse,
        investmentSummary: () => mockInvestSummaryResponse,
        accountBreakdown: accountBreakdownReducer,
      },
    });
  });

  const fetchAccountBreakdownAction = fetchAccountBreakdown() as any;

  describe('dispatch fetchAccountBreakdown', () => {
    it('starts with sensible defaults', () => {
      const { status, data, error } = store.getState().accountBreakdown;

      expect(['data', 'loading']).not.toContain(status);

      expect(error).toBeUndefined();
      expect(data).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', async () => {
        store.dispatch(fetchAccountBreakdownAction);
        const { status, data, error } = store.getState().accountBreakdown;

        expect(mockGetContributions).toHaveBeenCalledTimes(3);

        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
        expect(data).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchAccountBreakdownAction);
        const { status, data, error } = store.getState().accountBreakdown;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
        expect(data).not.toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets error', async () => {
        const errorMessage = 'Could not find client data.';
        (api.getNetContributions as jest.Mock).mockRejectedValue(errorMessage);
        await store.dispatch(fetchAccountBreakdownAction);
        const { status, error } = store.getState().accountBreakdown;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(errorMessage);
      });
    });
  });
});
