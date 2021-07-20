import { ReducersMapObject } from 'redux';
import * as api from '../api';
import getStoreAndStateHistory from '../../utils/getStoreAndStateHistory';
import performanceReducer, {
  fetchPerformanceAccountsAggregated,
  setPerformanceDataPeriod,
} from './performanceSlice';
import { PerformanceDataPeriod } from '../constants';
import { PerformanceAccountsAggregatedResponse, PerformanceState } from '../types';
import mockPerformanceAccountsAggregatedResponse from '../mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import { AuthState } from '../../auth';
import { ClientState } from '../../myAccount';
import { DeepPartial } from '../../../utils/common';

jest.mock('../api');

type StateMap = { auth: AuthState; performance: PerformanceState };

function getPerformanceStoreAndStateHistory() {
  return getStoreAndStateHistory<StateMap, ReducersMapObject>({
    client: (): DeepPartial<ClientState> => ({
      included: [{ attributes: { accountId: 12345678 } }],
    }),
    performance: performanceReducer,
  });
}

const expectStateMatchesUpdated = (
  expectedStates: Array<PerformanceState>,
  stateHistory: Array<StateMap>
) => {
  expectedStates.forEach((expectedState, i) => {
    expect(stateHistory[i].performance).toEqual(expectedState);
  });
};

describe('performanceSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The initial performance state is as expected', () => {
    const { status, data, error, performanceDataPeriod } = performanceReducer(undefined, {
      type: 'whatever',
    });

    expect(data).toBeUndefined();
    expect(status).toBe('idle');
    expect(error).toBeUndefined();
    expect(performanceDataPeriod).toBe(PerformanceDataPeriod['5Y']);
  });

  describe('fetch performance data action', () => {
    const fetchPerformanceAction = fetchPerformanceAccountsAggregated();

    describe('network fetch success case', () => {
      it('performs the network fetch and store states as expected', async () => {
        (api.getPerformanceAccountsAggregated as jest.Mock).mockResolvedValue(
          mockPerformanceAccountsAggregatedResponse
        );

        const expectedStates: Array<PerformanceState> = [
          // This state is the result of the 'pending' action
          {
            data: undefined,
            included: undefined,
            performanceDataPeriod: PerformanceDataPeriod['5Y'],
            error: undefined,
            status: 'loading',
          },

          // This state is the result of the 'success' action
          {
            data: mockPerformanceAccountsAggregatedResponse.data as PerformanceAccountsAggregatedResponse['data'],
            included: mockPerformanceAccountsAggregatedResponse.included as PerformanceAccountsAggregatedResponse['included'],
            performanceDataPeriod: PerformanceDataPeriod['5Y'],
            error: undefined,
            status: 'success',
          },
        ];

        const { store, stateHistory } = getPerformanceStoreAndStateHistory();
        await store.dispatch(fetchPerformanceAction);

        expectStateMatchesUpdated(expectedStates, stateHistory);
      });
    });

    describe('network fetch failure case', () => {
      it('performs the network fetch and store states as expected', async () => {
        const mockError = new Error(`Some error`);
        (api.getPerformanceAccountsAggregated as jest.Mock).mockRejectedValue(mockError);

        const expectedStates: Array<PerformanceState> = [
          // This state is the result of the 'pending' action
          {
            data: undefined,
            included: undefined,
            performanceDataPeriod: PerformanceDataPeriod['5Y'],
            error: undefined,
            status: 'loading',
          },

          // This state is the result of the 'error' action
          {
            data: undefined,
            included: undefined,
            performanceDataPeriod: PerformanceDataPeriod['5Y'],
            error: mockError.message,
            status: 'error',
          },
        ];

        const { store, stateHistory } = getPerformanceStoreAndStateHistory();
        await store.dispatch(fetchPerformanceAction);

        expect(stateHistory).toHaveLength(2);
        expectStateMatchesUpdated(expectedStates, stateHistory);
      });
    });
  });

  describe('setPerformanceDataPeriod action', () => {
    const setPerformanceDataPeriodAction = setPerformanceDataPeriod(PerformanceDataPeriod['1M']);

    it('updates states as expected', () => {
      const expectedStates: Array<PerformanceState> = [
        {
          data: undefined,
          included: undefined,
          performanceDataPeriod: PerformanceDataPeriod['1M'],
          error: undefined,
          status: 'idle',
        },
      ];

      const { store, stateHistory } = getPerformanceStoreAndStateHistory();
      store.dispatch(setPerformanceDataPeriodAction);

      expect(stateHistory).toHaveLength(1);
      expectStateMatchesUpdated(expectedStates, stateHistory);
    });
  });
});
