import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, Store } from 'redux';
import goalReducer, { createGoal, setGoalDetails } from './goalCreationSlice';
import * as api from '../api';
import { authSlice as authReducer } from '../../auth';
import { GoalType, RetirementInputs } from '../types';

jest.mock('../api', () => ({
  postGoalCreation: jest.fn(),
}));

const inputs: RetirementInputs = {
  drawdownEndAge: 80,
  drawdownStartAge: 56,
  regularDrawdown: 7000,
  lumpSumDate: new Date(2055, 1, 1),
};

const mockGoalDetails = { name: 'Retirement' };

describe('goalCreationSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        goalCreation: goalReducer,
        auth: authReducer,
      },
    });

    store.dispatch(setGoalDetails(mockGoalDetails));
  });

  describe('dispatch createGoal', () => {
    const createGoalAction = (createGoal({
      inputs,
      goalType: GoalType.RETIREMENT,
    }) as unknown) as AnyAction;

    beforeEach(() => {
      (api.postGoalCreation as jest.Mock).mockResolvedValue({
        fields: { description: 'Retirement', index: 1 },
      });
    });

    it('starts with sensible defaults', () => {
      const { status, error } = store.getState().goalCreation;

      expect(status).toStrictEqual('idle');
      expect(error).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(createGoalAction);
        const { status, error } = store.getState().goalCreation;

        expect(api.postGoalCreation).toHaveBeenCalledWith({
          inputs,
          goalType: 'retirement',
        });
        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(createGoalAction);
        const { status, error } = store.getState().goalCreation;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets createGoalError', async () => {
        const goalCreationError = 'Something went wrong';
        (api.postGoalCreation as jest.Mock).mockRejectedValue(goalCreationError);
        await store.dispatch(createGoalAction);
        const { status, error } = store.getState().goalCreation;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(goalCreationError);
      });
    });
  });
});
