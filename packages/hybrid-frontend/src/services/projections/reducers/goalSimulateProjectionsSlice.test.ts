import * as api from '../api';
import getStoreAndStateHistory from '../../utils/getStoreAndStateHistory';
import goalSimulateProjectionsReducer from './goalSimulateProjectionsSlice';
import { GoalSimulateProjectionsRequestPayload, GoalSimulateProjectionsState } from '../types';
import mockProjectionsSimulateSuccessResponse from '../mocks/mock-post-goal-simulate-projections-success-response.json';
import { fetchSimulateProjections } from '../thunks';

jest.mock('../api');

function getGoalSimulateProjectionsStoreAndStateHistory() {
  return getStoreAndStateHistory<GoalSimulateProjectionsState>(goalSimulateProjectionsReducer);
}

describe('goalSimulateProjectionsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The initial goal simulate projections state is as expected', () => {
    const { status, data, error } = goalSimulateProjectionsReducer(undefined, { type: 'whatever' });

    expect(data).toBeUndefined();
    expect(status).toBe('idle');
    expect(error).toBeUndefined();
  });

  describe('postGoalSimulateProjections action', () => {
    const postGoalSimulateProjectionsAction = fetchSimulateProjections(
      {} as GoalSimulateProjectionsRequestPayload
    );

    describe('network fetch success case', () => {
      it('performs the network fetch and store states as expected', async () => {
        (api.postGoalSimulateProjections as jest.Mock).mockResolvedValue(
          mockProjectionsSimulateSuccessResponse
        );

        const expectedStates = [
          // This state is the result of the 'pending' action
          {
            data: undefined,
            status: 'loading',
            error: undefined,
          },

          // This state is the result of the 'success' action
          {
            data: mockProjectionsSimulateSuccessResponse,
            status: 'success',
            error: undefined,
          },
        ];

        const { store, stateHistory } = getGoalSimulateProjectionsStoreAndStateHistory();
        await store.dispatch(postGoalSimulateProjectionsAction);

        expect(api.postGoalSimulateProjections).toHaveBeenCalledTimes(1);
        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });

    describe('network fetch failure case', () => {
      it('performs the network fetch and store states as expected', async () => {
        const mockError = new Error(`some error`);
        (api.postGoalSimulateProjections as jest.Mock).mockRejectedValue(mockError);

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

        const { store, stateHistory } = getGoalSimulateProjectionsStoreAndStateHistory();
        await store.dispatch(postGoalSimulateProjectionsAction);

        expect(stateHistory).toHaveLength(2);
        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });
  });
});
