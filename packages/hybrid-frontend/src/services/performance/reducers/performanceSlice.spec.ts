import * as api from '../api';
import getStoreAndStateHistory from '../utils/getStoreAndStateHistory';
import performanceReducer, {
  getPerformanceContact,
  setPerformance,
  setPerformanceDataPeriod,
} from './performanceSlice';
import { PerformanceDataPeriod } from '../constants';
import { GetPerformanceContactResponse, PerformanceState } from '../types';
import mockGetPerformanceResponse from '../mocks/mock-get-performance-contact-sucess-response-simple.json';

jest.mock('../api');

const contactId = '12345678';

function getPerformanceStoreAndStateHistory() {
  return getStoreAndStateHistory<PerformanceState>(performanceReducer);
}

describe('performanceSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The initial performance state is as expected', () => {
    const {
      status,
      performance,
      performanceError,
      performanceDataPeriod,
    } = performanceReducer(undefined, { type: 'whatever' });

    expect(performance).toBeUndefined();
    expect(status).toBe('idle');
    expect(performanceError).toBeUndefined();
    expect(performanceDataPeriod).toBe(PerformanceDataPeriod['5Y']);
  });

  describe('getPerformanceContact action', () => {
    const getPerformanceAction = getPerformanceContact({
      contactId,
    });

    describe('network fetch success case', () => {
      it('performs the network fetch and store states as expected', async () => {
        (api.getPerformanceContactFetcher as jest.Mock).mockResolvedValue(
          mockGetPerformanceResponse
        );

        const expectedStates = [
          // This state is the result of the 'pending' action
          {
            performance: undefined,
            performanceDataPeriod: PerformanceDataPeriod['5Y'],
            performanceError: undefined,
            status: 'loading',
          },

          // This state is the result of the 'success' action
          {
            performance: mockGetPerformanceResponse,
            performanceDataPeriod: PerformanceDataPeriod['5Y'],
            performanceError: undefined,
            status: 'success',
          },
        ];

        const { store, stateHistory } = getPerformanceStoreAndStateHistory();
        await store.dispatch(getPerformanceAction);

        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });

    describe('network fetch failure case', () => {
      it('performs the network fetch and store states as expected', async () => {
        const mockError = new Error(`Some error`);
        (api.getPerformanceContactFetcher as jest.Mock).mockRejectedValue(mockError);

        const expectedStates = [
          // This state is the result of the 'pending' action
          {
            performance: undefined,
            performanceDataPeriod: PerformanceDataPeriod['5Y'],
            performanceError: undefined,
            status: 'loading',
          },

          // This state is the result of the 'error' action
          {
            performance: undefined,
            performanceDataPeriod: PerformanceDataPeriod['5Y'],
            performanceError: mockError.message,
            status: 'error',
          },
        ];

        const { store, stateHistory } = getPerformanceStoreAndStateHistory();
        await store.dispatch(getPerformanceAction);

        expect(stateHistory).toHaveLength(2);
        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });
  });

  describe('setPerformance action', () => {
    const setPerformanceAction = setPerformance(
      mockGetPerformanceResponse as GetPerformanceContactResponse
    );

    it('updates states as expected', () => {
      const expectedStates = [
        {
          performance: mockGetPerformanceResponse,
          performanceDataPeriod: PerformanceDataPeriod['5Y'],
          performanceError: undefined,
          status: 'idle',
        },
      ];

      const { store, stateHistory } = getPerformanceStoreAndStateHistory();
      store.dispatch(setPerformanceAction);

      expect(stateHistory).toHaveLength(1);
      expectedStates.forEach((expectedState, i) => {
        expect(stateHistory[i]).toEqual(expectedStates[i]);
      });
    });
  });

  describe('setPerformanceDataPeriod action', () => {
    const setPerformanceDataPeriodAction = setPerformanceDataPeriod(PerformanceDataPeriod['1M']);

    it('updates states as expected', () => {
      const expectedStates = [
        {
          performance: undefined,
          performanceDataPeriod: PerformanceDataPeriod['1M'],
          performanceError: undefined,
          status: 'idle',
        },
      ];

      const { store, stateHistory } = getPerformanceStoreAndStateHistory();
      store.dispatch(setPerformanceDataPeriodAction);

      expect(stateHistory).toHaveLength(1);
      expectedStates.forEach((expectedState, i) => {
        expect(stateHistory[i]).toEqual(expectedStates[i]);
      });
    });
  });
});
