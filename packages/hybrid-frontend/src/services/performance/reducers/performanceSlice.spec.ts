import { ReducersMapObject } from 'redux';
import * as api from '../api';
import getStoreAndStateHistory from '../utils/getStoreAndStateHistory';
import performanceReducer, {
  fetchPerformanceContact,
  setPerformanceDataPeriod,
} from './performanceSlice';
import { PerformanceDataPeriod } from '../constants';
import { GetPerformanceContactResponse, PerformanceState } from '../types';
import mockGetPerformanceResponse from '../mocks/mock-get-performance-contact-sucess-response-simple.json';
import { AuthState } from '../../auth';

jest.mock('../api');

type StateMap = { auth: AuthState; performance: PerformanceState };

function getPerformanceStoreAndStateHistory() {
  return getStoreAndStateHistory<StateMap, ReducersMapObject>({
    auth: () => ({
      contactId: 12345678,
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

  describe('fetchPerformanceContact action', () => {
    const fetchPerformanceAction = fetchPerformanceContact();

    describe('network fetch success case', () => {
      it('performs the network fetch and store states as expected', async () => {
        (api.getPerformanceContact as jest.Mock).mockResolvedValue(mockGetPerformanceResponse);

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
            data: mockGetPerformanceResponse.data as GetPerformanceContactResponse['data'],
            included: mockGetPerformanceResponse.included as GetPerformanceContactResponse['included'],
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
        (api.getPerformanceContact as jest.Mock).mockRejectedValue(mockError);

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
