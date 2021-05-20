import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../api';
import { authSlice as authReducer } from '../../auth';
import { goalSlice as goalReducer } from '../../goal';
import clientReducer, { getClient } from './clientSlice';
import { mockClientResponse } from '../mocks';

jest.mock('../api', () => ({
  getMyAccountClient: jest.fn(),
}));

describe('clientSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        client: clientReducer,
        goal: goalReducer,
      },
    });
  });

  describe('dispatch getClient', () => {
    const getClientAction = getClient() as any;

    beforeEach(() => {
      (api.getMyAccountClient as jest.Mock).mockResolvedValue(mockClientResponse);
    });

    it('starts with sensible defaults', () => {
      const { status, getClientError } = store.getState().client;

      expect(status).toStrictEqual('idle');
      expect(getClientError).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(getClientAction);
        const { status, getClientError } = store.getState().client;

        expect(api.getMyAccountClient).toHaveBeenCalledTimes(1);
        expect(status).toStrictEqual('loading');
        expect(getClientError).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(getClientAction);
        const { status, getClientError } = store.getState().client;

        expect(status).toStrictEqual('success');
        expect(getClientError).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets getClientError', async () => {
        const error = 'Something went wrong';
        (api.getMyAccountClient as jest.Mock).mockRejectedValue(error);
        await store.dispatch(getClientAction);
        const { status, getClientError } = store.getState().client;

        expect(status).toStrictEqual('error');
        expect(getClientError).toStrictEqual(error);
      });
    });
  });
});
