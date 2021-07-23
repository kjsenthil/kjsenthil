import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import projectionsReducer, { fetchSimulatedProjections } from './simulatedProjectionsSlice';
import * as api from '../api';
import { mockClientResponse, mockInvestmentSummaryResponse } from '../../myAccount/mocks';
import { RiskModel, SedolCode } from '../../types';
import { mockProjectionResponse } from '../mocks';

jest.mock('../api', () => ({
  postProjections: jest.fn(),
}));

describe('simulatedProjectionsSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        simulatedProjections: projectionsReducer,
        client: () => mockClientResponse,
        investmentSummary: () => mockInvestmentSummaryResponse,
      },
    });
  });

  describe('dispatch fetchSimulatedProjections', () => {
    const fetchSimulatedProjectionsAction = fetchSimulatedProjections({
      investmentPeriod: 50,
      monthlyInvestment: 150,
      upfrontInvestment: 40,
      riskProfile: {
        riskModel: RiskModel.TAA1,
        sedol: SedolCode.BFY1N37,
      },
    }) as any;

    beforeEach(() => {
      (api.postProjections as jest.Mock).mockResolvedValue(mockProjectionResponse);
    });

    it('starts with sensible defaults', () => {
      const { status, error } = store.getState().simulatedProjections;

      expect(status).toStrictEqual('idle');
      expect(error).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', async () => {
        store.dispatch(fetchSimulatedProjectionsAction);
        const { status, error } = store.getState().simulatedProjections;

        expect(status).toStrictEqual('loading');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchSimulatedProjectionsAction);
        const { status, error } = store.getState().simulatedProjections;

        expect(status).toStrictEqual('success');
        expect(error).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets postProjectionsError', async () => {
        const postProjectionsError = 'Something went wrong';
        (api.postProjections as jest.Mock).mockRejectedValue(postProjectionsError);
        await store.dispatch(fetchSimulatedProjectionsAction);
        const { status, error } = store.getState().simulatedProjections;

        expect(status).toStrictEqual('error');
        expect(error).toStrictEqual(postProjectionsError);
      });
    });
  });
});
