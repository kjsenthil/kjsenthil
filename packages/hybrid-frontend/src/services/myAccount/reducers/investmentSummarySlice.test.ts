import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../api';
import investmentSummaryReducer, { fetchInvestmentSummary } from './investmentSummarySlice';
import { mockClientResponse, mockInvestSummaryResponse } from '../mocks';

jest.mock('../api', () => ({
  getInvestmentSummary: jest.fn(),
}));

const mockGetInvestmentSummary = (api.getInvestmentSummary as jest.Mock).mockResolvedValue(
  mockInvestSummaryResponse
);

describe('investmentSummarySlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        investmentSummary: investmentSummaryReducer,
        client: () => mockClientResponse,
      },
    });
  });

  describe('dispatch fetchInvestmentSummary', () => {
    const fetchInvestmentSummaryAction = fetchInvestmentSummary() as any;

    it('starts with sensible defaults', () => {
      const { status, error } = store.getState().investmentSummary;

      expect(['error', 'loading']).not.toContain(status);
      expect(error).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(fetchInvestmentSummaryAction);
        const { status, error } = store.getState().investmentSummary;

        expect(mockGetInvestmentSummary).toHaveBeenCalledTimes(1);
        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchInvestmentSummaryAction);
        const { status, error } = store.getState().investmentSummary;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets error', async () => {
        const errorMessage = 'Something went wrong';
        mockGetInvestmentSummary.mockRejectedValue(errorMessage);
        await store.dispatch(fetchInvestmentSummaryAction);
        const { status, error } = store.getState().investmentSummary;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(errorMessage);
      });
    });
  });
});
