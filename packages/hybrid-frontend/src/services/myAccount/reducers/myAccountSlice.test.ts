import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../api';
import { authSlice as authReducer } from '../../auth';
import { goalSlice as goalReducer } from '../../goal';
import myAccountReducer, { fetchClient } from './myAccountSlice';
import { mockClientResponse } from '../mocks';

jest.mock('../api', () => ({
  getClient: jest.fn(),
}));

describe('myAccountSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        myAccount: myAccountReducer,
        goal: goalReducer,
      },
    });
  });

  describe('dispatch fetchClient', () => {
    const getClientAction = fetchClient() as any;

    beforeEach(() => {
      (api.getClient as jest.Mock).mockResolvedValue(mockClientResponse);
    });

    it('starts with sensible defaults', () => {
      const { status, getClientError } = store.getState().myAccount;

      expect(status).toStrictEqual('idle');
      expect(getClientError).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(getClientAction);
        const { status, getClientError } = store.getState().myAccount;

        expect(api.getClient).toHaveBeenCalledTimes(1);
        expect(status).toStrictEqual('loading');
        expect(getClientError).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(getClientAction);
        const { status, getClientError } = store.getState().myAccount;

        expect(status).toStrictEqual('success');
        expect(getClientError).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets getClientError', async () => {
        const error = 'Something went wrong';
        (api.getClient as jest.Mock).mockRejectedValue(error);
        await store.dispatch(getClientAction);
        const { status, getClientError } = store.getState().myAccount;

        expect(status).toStrictEqual('error');
        expect(getClientError).toStrictEqual(error);
      });
    });
  });
});
