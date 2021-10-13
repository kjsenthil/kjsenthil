import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../api';
import bankAccountDetailsReducer, { fetchBankAccountDetails } from './bankAccountDetailsSlice';
import { mockBankAccountDetailsResponse } from '../mocks';

jest.mock('../api', () => ({
  getBankAccountDetails: jest.fn(),
}));

describe('bankDetailsSlice', () => {
  let store: Store;

  const contactId = 12345;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: () => ({ contactId }),
        bankAccountDetails: bankAccountDetailsReducer,
      },
    });
  });

  const fetchBankDetailsAction = fetchBankAccountDetails() as any;

  describe('dispatch fetchBankDetails', () => {
    beforeEach(() => {
      (api.getBankAccountDetails as jest.Mock).mockResolvedValue(mockBankAccountDetailsResponse);
    });

    it('starts with sensible defaults', () => {
      const { status, error } = store.getState().bankAccountDetails;

      expect(status).toStrictEqual('idle');
      expect(error).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(fetchBankDetailsAction);
        const { status, error } = store.getState().bankAccountDetails;

        expect(api.getBankAccountDetails).toHaveBeenCalledTimes(1);
        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchBankDetailsAction);
        const { status, error } = store.getState().bankAccountDetails;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets error', async () => {
        const errorMessage = 'Something went wrong';
        (api.getBankAccountDetails as jest.Mock).mockRejectedValue(errorMessage);
        await store.dispatch(fetchBankDetailsAction);
        const { status, error } = store.getState().bankAccountDetails;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(errorMessage);
      });
    });
  });
});
