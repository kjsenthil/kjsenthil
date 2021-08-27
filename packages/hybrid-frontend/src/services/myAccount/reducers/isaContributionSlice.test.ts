import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import * as api from '../api';
import isaContributionReducer, { fetchIsaContribution } from './isaContributionSlice';
import { mockClientResponse, mockIsaContribution } from '../mocks';

jest.mock('../api', () => ({
  getIsaContribution: jest.fn(),
}));

const mockGetIsaContribution = (api.getIsaContribution as jest.Mock).mockResolvedValue(
  mockIsaContribution
);

describe('isaContributionSlice', () => {
  let store: Store;
  const contactId = 12345;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: () => ({ contactId }),
        isaContribution: isaContributionReducer,
        client: () => mockClientResponse,
      },
    });
  });

  describe('dispatch isaContribution', () => {
    const fetchIsaContributionAction = fetchIsaContribution() as any;

    it('starts with sensible defaults', () => {
      const { status, error } = store.getState().isaContribution;

      expect(['error', 'loading']).not.toContain(status);
      expect(error).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(fetchIsaContributionAction);
        const { status, error } = store.getState().isaContribution;

        expect(mockGetIsaContribution).toHaveBeenCalledTimes(1);
        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchIsaContributionAction);
        const { status, error } = store.getState().isaContribution;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets error', async () => {
        const errorMessage = 'Something went wrong';
        mockGetIsaContribution.mockRejectedValue(errorMessage);
        await store.dispatch(fetchIsaContributionAction);
        const { status, error } = store.getState().isaContribution;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(errorMessage);
      });
    });
  });
});
