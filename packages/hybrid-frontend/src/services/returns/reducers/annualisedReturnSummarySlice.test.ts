import * as api from '../api';
import * as performanceApi from '../../performance/api';
import getStoreAndStateHistory from '../../utils/getStoreAndStateHistory';
import annualisedReturnSummaryReducer from './annualisedReturnSummarySlice';
import { AnnualisedReturnSummaryState } from '../types';

import { fetchAnnualisedReturnSummary } from '../thunks';

import mockPostAnnualisedReturns from '../mocks/mock-post-annualised-returns.json';

import mockPerformanceAccountsAggregatedResponse from '../../performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';

jest.mock('../api');
jest.mock('../../performance/api');

function getAnnualisedReturnSummaryStoreAndStateHistory() {
  return getStoreAndStateHistory<AnnualisedReturnSummaryState>(annualisedReturnSummaryReducer);
}

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

  describe('postAnnualisedReturnsAction action', () => {
    const postAnnualisedReturnsAction = fetchAnnualisedReturnSummary();

    describe('network fetch success case', () => {
      it('performs the network fetch and store states as expected', async () => {
        (performanceApi.getPerformanceAccountsAggregated as jest.Mock).mockResolvedValue(
          mockPerformanceAccountsAggregatedResponse
        );

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
        await store.dispatch(postAnnualisedReturnsAction);

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
        await store.dispatch(postAnnualisedReturnsAction);

        expect(stateHistory).toHaveLength(2);
        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });
  });
});
