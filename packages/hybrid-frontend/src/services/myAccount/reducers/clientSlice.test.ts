import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../api';
import clientReducer, { fetchClient } from './clientSlice';
import { mockClientResponse } from '../mocks';

jest.mock('../api', () => ({
  getClient: jest.fn(),
}));

describe('clientSlice', () => {
  let store: Store;

  const contactId = 12345;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: () => ({ contactId }),
        client: clientReducer,
      },
    });
  });
  const fetchClientAction = fetchClient() as any;

  describe('dispatch fetchClient', () => {
    beforeEach(() => {
      (api.getClient as jest.Mock).mockResolvedValue(mockClientResponse);
    });

    it('starts with sensible defaults', () => {
      const { status, error } = store.getState().client;

      expect(status).toStrictEqual('idle');
      expect(error).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(fetchClientAction);
        const { status, error } = store.getState().client;

        expect(api.getClient).toHaveBeenCalledTimes(1);
        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchClientAction);
        const { status, error } = store.getState().client;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets error', async () => {
        const errorMessage = 'Something went wrong';
        (api.getClient as jest.Mock).mockRejectedValue(errorMessage);
        await store.dispatch(fetchClientAction);
        const { status, error } = store.getState().client;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(errorMessage);
      });
    });
  });
});
