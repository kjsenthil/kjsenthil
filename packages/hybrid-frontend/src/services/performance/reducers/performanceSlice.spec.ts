import { PerformanceDataPeriod } from '@tswdts/react-components';
import { ReducersMapObject } from 'redux';
import { DeepPartial } from '../../../types';
import { AuthState } from '../../auth';
import { ClientState } from '../../myAccount';
import getStoreAndStateHistory from '../../utils/getStoreAndStateHistory';
import * as api from '../api';
import mockPerformanceAccountsAggregatedResponse from '../mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import { PerformanceAccountsAggregatedResponse, PerformanceState } from '../types';
import performanceReducer, {
  fetchPerformanceAccountsAggregated,
  setPerformanceDataPeriod,
} from './performanceSlice';

jest.mock('../api');

type StateMap = { auth: AuthState; performance: PerformanceState };

interface GetPerformanceStoreAndStateHistoryProps {
  // This is used to test the case when there are no account IDs in Redux
  noAccountIds?: boolean;
}

function getPerformanceStoreAndStateHistory({
  noAccountIds,
}: GetPerformanceStoreAndStateHistoryProps = {}) {
  return getStoreAndStateHistory<StateMap, ReducersMapObject>({
    client: (): DeepPartial<ClientState> => ({
      included: noAccountIds ? undefined : [{ attributes: { accountId: 12345678 } }],
      status: noAccountIds ? 'idle' : 'success',
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
        expect(api.getPerformanceAccountsAggregated).toHaveBeenCalledWith([12345678]);
      });

      it('fetches the supplied account IDs when provided', async () => {
        (api.getPerformanceAccountsAggregated as jest.Mock).mockResolvedValue(
          mockPerformanceAccountsAggregatedResponse
        );
        const accountIds = [87654321, 12345678];

        const { store } = getPerformanceStoreAndStateHistory();
        await store.dispatch(fetchPerformanceAccountsAggregated(accountIds));

        expect(api.getPerformanceAccountsAggregated).toHaveBeenCalledWith(accountIds);
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

      it('calls the thunk and errors out as expected when there are no account IDs', async () => {
        const mockError = new Error(`Some error`);
        const mockGetPerformanceAccountsAggregated = api.getPerformanceAccountsAggregated;
        (mockGetPerformanceAccountsAggregated as jest.Mock).mockRejectedValue(mockError);

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
            error: `There are no account IDs to retrieve performance data for`,
            status: 'error',
          },
        ];

        const { store, stateHistory } = getPerformanceStoreAndStateHistory({
          noAccountIds: true,
        });
        await store.dispatch(fetchPerformanceAction);

        expect(stateHistory).toHaveLength(2);
        expectStateMatchesUpdated(expectedStates, stateHistory);

        // The API shouldn't have been called because there are no account IDs
        expect(mockGetPerformanceAccountsAggregated).not.toHaveBeenCalled();
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
