import getStoreAndStateHistory from '../../utils/getStoreAndStateHistory';
import * as api from '../api';

import mockPostAnnualisedReturns from '../mocks/mock-post-annualised-returns.json';

import { fetchAnnualisedReturnSummary } from '../thunks';
import annualisedReturnSummaryReducer from './annualisedReturnSummarySlice';

jest.mock('../api');
jest.mock('../../performance/api');

const getAnnualisedReturnSummaryStoreAndStateHistory = () =>
  getStoreAndStateHistory(annualisedReturnSummaryReducer);

describe('annualisedReturnSummarySlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The initial summary annualised return state is as expected', () => {
    const { status, data, error } = annualisedReturnSummaryReducer(undefined, { type: 'whatever' });

    expect(data).toBeUndefined();
    expect(status).toBe('idle');
    expect(error).toBeUndefined();
  });

  describe('fetchAnnualisedReturnSummary action', () => {
    const fetchAnnualisedReturnSummaryAction = fetchAnnualisedReturnSummary();

    describe('network fetch success case', () => {
      it('performs the network fetch and store states as expected', async () => {
        (api.postAnnualisedReturns as jest.Mock).mockResolvedValue(mockPostAnnualisedReturns);

        const expectedStates = [
          // This state is the result of the 'pending' action
          {
            data: undefined,
            status: 'loading',
            error: undefined,
          },

          // This state is the result of the 'success' action
          {
            data: mockPostAnnualisedReturns,
            status: 'success',
            error: undefined,
          },
        ];

        const { store, stateHistory } = getAnnualisedReturnSummaryStoreAndStateHistory();
        await store.dispatch(fetchAnnualisedReturnSummaryAction);

        expect(api.postAnnualisedReturns).toHaveBeenCalledTimes(1);
        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });

    describe('network fetch failure case', () => {
      it('performs the network fetch and store states as expected', async () => {
        const mockError = new Error(`Some error`);
        (api.postAnnualisedReturns as jest.Mock).mockRejectedValue(mockError);

        const expectedStates = [
          // This state is the result of the 'pending' action
          {
            data: undefined,
            status: 'loading',
            error: undefined,
          },

          // This state is the result of the 'error' action
          {
            data: undefined,
            status: 'error',
            error: mockError.message,
          },
        ];

        const { store, stateHistory } = getAnnualisedReturnSummaryStoreAndStateHistory();
        await store.dispatch(fetchAnnualisedReturnSummaryAction);

        expect(stateHistory).toHaveLength(2);
        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });
  });
});
