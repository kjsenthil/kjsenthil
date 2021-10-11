import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../api';
import { mockAccountState, mockClientResponse, mockInvestmentAccountDetails } from '../mocks';
import investmentAccountDetailsReducer, {
  fetchInvestmentAccountDetails,
} from './investmentAccountDetailsSlice';

jest.mock('../api', () => ({
  getInvestmentAccountDetails: jest.fn(),
}));

const mockGetInvestmentAccountDetails = (api.getInvestmentAccountDetails as jest.Mock).mockResolvedValue(
  mockInvestmentAccountDetails
);

describe('investmentAccountDetailsSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        investmentAccountDetails: investmentAccountDetailsReducer,
        client: () => mockClientResponse,
        selectedAccount: () => mockAccountState,
      },
    });
  });

  describe('dispatch fetchInvestmentAccountDetails', () => {
    const fetchInvestmentAccountDetailsAction = fetchInvestmentAccountDetails() as any;

    it('starts with sensible defaults', () => {
      const { status, error } = store.getState().investmentAccountDetails;

      expect(['error', 'loading']).not.toContain(status);
      expect(error).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(fetchInvestmentAccountDetailsAction);
        const { status, error } = store.getState().investmentAccountDetails;

        expect(mockGetInvestmentAccountDetails).toHaveBeenCalledTimes(1);
        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchInvestmentAccountDetailsAction);
        const { status, error } = store.getState().investmentAccountDetails;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets error', async () => {
        const errorMessage = 'No selected account data found in state';
        mockGetInvestmentAccountDetails.mockRejectedValue(errorMessage);
        await store.dispatch(fetchInvestmentAccountDetailsAction);
        const { status, error } = store.getState().investmentAccountDetails;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(errorMessage);
      });
    });
  });
});
