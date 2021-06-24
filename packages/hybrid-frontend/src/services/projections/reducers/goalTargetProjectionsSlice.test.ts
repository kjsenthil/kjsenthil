import * as api from '../api';
import getStoreAndStateHistory from '../../performance/utils/getStoreAndStateHistory';
import goalTargetProjectionsReducer, {
  postGoalTargetProjections,
  setGoalTargetProjections,
  setGoalTargetProjectionsSuccess,
  setGoalTargetProjectionsLoading,
  setGoalTargetProjectionsError,
} from './goalTargetProjectionsSlice';
import { GoalTargetProjectionsRequestPayload, GoalTargetProjectionsState } from '../types';
import mockProjectionsTargetSuccessResponse from '../mocks/mock-projections-target-success-response-simple.json';

jest.mock('../api');

function getGoalTargetProjectionsStoreAndStateHistory() {
  return getStoreAndStateHistory<GoalTargetProjectionsState>(goalTargetProjectionsReducer);
}

describe('goalTargetProjectionsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The initial goal target projections state is as expected', () => {
    const { status, data, error } = goalTargetProjectionsReducer(undefined, { type: 'whatever' });

    expect(data).toBeUndefined();
    expect(status).toBe('idle');
    expect(error).toBeUndefined();
  });

  describe('postGoalTargetProjections action', () => {
    const postGoalTargetProjectionsAction = postGoalTargetProjections(
      {} as GoalTargetProjectionsRequestPayload
    );

    describe('network fetch success case', () => {
      it('performs the network fetch and store states as expected', async () => {
        (api.postGoalTargetProjectionsFetcher as jest.Mock).mockResolvedValue(
          mockProjectionsTargetSuccessResponse
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
            data: mockProjectionsTargetSuccessResponse,
            status: 'success',
            error: undefined,
          },
        ];

        const { store, stateHistory } = getGoalTargetProjectionsStoreAndStateHistory();
        await store.dispatch(postGoalTargetProjectionsAction);

        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });

    describe('network fetch failure case', () => {
      it('performs the network fetch and store states as expected', async () => {
        const mockError = new Error(`some error`);
        (api.postGoalTargetProjectionsFetcher as jest.Mock).mockRejectedValue(mockError);

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

        const { store, stateHistory } = getGoalTargetProjectionsStoreAndStateHistory();
        await store.dispatch(postGoalTargetProjectionsAction);

        expect(stateHistory).toHaveLength(2);
        expectedStates.forEach((expectedState, i) => {
          expect(stateHistory[i]).toEqual(expectedStates[i]);
        });
      });
    });
  });

  describe('setGoalTargetProjections action', () => {
    const setGoalTargetProjectionsAction = setGoalTargetProjections(
      mockProjectionsTargetSuccessResponse
    );

    it('updates states as expected', () => {
      const expectedStates: GoalTargetProjectionsState[] = [
        {
          data: mockProjectionsTargetSuccessResponse,
          status: 'idle',
          error: undefined,
        },
      ];

      const { store, stateHistory } = getGoalTargetProjectionsStoreAndStateHistory();
      store.dispatch(setGoalTargetProjectionsAction);

      expect(stateHistory).toHaveLength(1);
      expectedStates.forEach((expectedState, i) => {
        expect(stateHistory[i]).toEqual(expectedStates[i]);
      });
    });
  });

  describe('setGoalTargetProjectionsSuccess action', () => {
    const setGoalTargetProjectionsSuccessAction = setGoalTargetProjectionsSuccess();

    it('updates states as expected', () => {
      const expectedStates: GoalTargetProjectionsState[] = [
        {
          data: undefined,
          status: 'success',
          error: undefined,
        },
      ];

      const { store, stateHistory } = getGoalTargetProjectionsStoreAndStateHistory();
      store.dispatch(setGoalTargetProjectionsSuccessAction);

      expect(stateHistory).toHaveLength(1);
      expectedStates.forEach((expectedState, i) => {
        expect(stateHistory[i]).toEqual(expectedStates[i]);
      });
    });
  });

  describe('setGoalTargetProjectionsLoading action', () => {
    const setGoalTargetProjectionsLoadingAction = setGoalTargetProjectionsLoading();

    it('updates states as expected', () => {
      const expectedStates: GoalTargetProjectionsState[] = [
        {
          data: undefined,
          status: 'loading',
          error: undefined,
        },
      ];

      const { store, stateHistory } = getGoalTargetProjectionsStoreAndStateHistory();
      store.dispatch(setGoalTargetProjectionsLoadingAction);

      expect(stateHistory).toHaveLength(1);
      expectedStates.forEach((expectedState, i) => {
        expect(stateHistory[i]).toEqual(expectedStates[i]);
      });
    });
  });

  describe('setGoalTargetProjectionsError action', () => {
    const errorMessage = 'some error';
    const setGoalTargetProjectionsErrorAction = setGoalTargetProjectionsError(errorMessage);

    it('updates states as expected', () => {
      const expectedStates: GoalTargetProjectionsState[] = [
        {
          data: undefined,
          status: 'error',
          error: errorMessage,
        },
      ];

      const { store, stateHistory } = getGoalTargetProjectionsStoreAndStateHistory();
      store.dispatch(setGoalTargetProjectionsErrorAction);

      expect(stateHistory).toHaveLength(1);
      expectedStates.forEach((expectedState, i) => {
        expect(stateHistory[i]).toEqual(expectedStates[i]);
      });
    });
  });
});
