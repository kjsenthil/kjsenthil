import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import goalReducer, { createGoal, setGoalDetails } from './goalCreationSlice';
import * as api from '../api';
import { authSlice as authReducer } from '../../auth';
import { RiskAppetites } from '../constants';

jest.mock('../api', () => ({
  postGoalCreation: jest.fn(),
}));

const inputs = {
  targetAmount: 1000000,
  targetYear: 2100,
  targetDate: new Date(2100, 11, 31),
  upfrontInvestment: 2000,
  monthlyInvestment: 100,
  riskAppetite: RiskAppetites.CAUTIOUS,
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
    const createGoalAction = createGoal({ inputs }) as any;

    beforeEach(() => {
      (api.postGoalCreation as jest.Mock).mockResolvedValue({
        fields: { description: 'Retirement', index: 1 },
      });
    });

    it('starts with sensible defaults', () => {
      const { status, goalCreationError } = store.getState().goalCreation;

      expect(status).toStrictEqual('idle');
      expect(goalCreationError).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', () => {
        store.dispatch(createGoalAction);
        const { status, goalCreationError } = store.getState().goalCreation;

        expect(api.postGoalCreation).toHaveBeenCalledWith({
          onboardGoalCreationInputs: { goalDetails: mockGoalDetails, inputs },
          payload: undefined,
        });
        expect(status).toStrictEqual('loading');
        expect(goalCreationError).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(createGoalAction);
        const { status, goalCreationError } = store.getState().goalCreation;

        expect(status).toStrictEqual('success');
        expect(goalCreationError).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets createGoalError', async () => {
        const error = 'Something went wrong';
        (api.postGoalCreation as jest.Mock).mockRejectedValue(error);
        await store.dispatch(createGoalAction);
        const { status, goalCreationError } = store.getState().goalCreation;

        expect(status).toStrictEqual('error');
        expect(goalCreationError).toStrictEqual(error);
      });
    });
  });
});