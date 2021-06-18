import * as api from '../api';
import goalsReducer, { fetchGoals } from './currentGoalsSlice';
import { CurrentGoals, CurrentGoalsState } from '../types';
import getStoreAndStateHistory from '../../performance/utils/getStoreAndStateHistory';
import mockGetGoalsSuccessResponse from '../mocks/get-goals-success-response.json';

jest.mock('../api');

jest.mock('../utils/filterGoals', () => ({
  __esModule: true,
  default: (goals: unknown) => goals,
}));

function getGoalsStoreAndStateHistory() {
  return getStoreAndStateHistory<CurrentGoalsState>(goalsReducer);
}

describe('currentGoalsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The initial goals state is as expected', () => {
    const { status, data, error, included } = goalsReducer(undefined, { type: 'whatever' });

    expect(status).toBe('idle');
    expect(error).toBeUndefined();
    expect(data).toBeUndefined();
    expect(included).toBeUndefined();
  });

  describe('fetchGoals action', () => {
    const getGoalsAction = fetchGoals();

    describe('network success case', () => {
      it('performs the network fetch and store states as expected', async () => {
        (api.getGoals as jest.Mock).mockResolvedValue(mockGetGoalsSuccessResponse);

        const expectedStates: CurrentGoalsState[] = [
          // This state is the result of the 'pending' action
          { status: 'loading', data: undefined, included: undefined, error: undefined },

          // This state is the result of the 'success' action
          {
            status: 'success',
            data: (mockGetGoalsSuccessResponse as unknown) as CurrentGoals,
            included: undefined,
            error: undefined,
          },
        ];

        const { store, stateHistory } = getGoalsStoreAndStateHistory();
        await store.dispatch(getGoalsAction);

        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });

    describe('network failure case', () => {
      it('performs the network fetch and store states as expected', async () => {
        const mockError = new Error(`Some error`);
        (api.getGoals as jest.Mock).mockRejectedValue(mockError);

        const expectedStates: CurrentGoalsState[] = [
          // This state is the result of the 'pending' action
          { status: 'loading', data: undefined, included: undefined, error: undefined },

          // This state is the result of the 'success' action
          { status: 'error', data: undefined, included: undefined, error: mockError.message },
        ];

        const { store, stateHistory } = getGoalsStoreAndStateHistory();
        await store.dispatch(getGoalsAction);

        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });
  });
});
