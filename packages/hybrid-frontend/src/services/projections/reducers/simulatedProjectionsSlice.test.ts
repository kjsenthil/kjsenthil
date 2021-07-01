import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import projectionsReducer, { fetchSimulatedProjections } from './simulatedProjectionsSlice';
import * as api from '../api';
import { getEquityAllocation, getMonthlySavingsAmount } from '../../myAccount/api';
import { mockClientResponse, mockInvestSummaryResponse } from '../../myAccount/mocks';
import { mockAssets } from '../../assets/mocks';
import { RiskModel, SedolCode } from '../../types';
import { mockProjectionResponse } from '../mocks';

jest.mock('../../myAccount/api', () => ({
  getEquityAllocation: jest.fn(),
  getMonthlySavingsAmount: jest.fn(),
}));

jest.mock('../api', () => ({
  getPortfolioAssetAllocation: jest.fn(),
  getPortfolioRiskProfile: jest.fn(),
  postProjections: jest.fn(),
}));

describe('simulatedProjectionsSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        simulatedProjections: projectionsReducer,
        client: () => mockClientResponse,
        investmentSummary: () => mockInvestSummaryResponse,
      },
    });
  });

  describe('dispatch fetchSimulatedProjections', () => {
    const fetchSimulatedProjectionsAction = fetchSimulatedProjections({
      fundData: mockAssets,
      investmentPeriod: 50,
    }) as any;

    beforeEach(() => {
      (getEquityAllocation as jest.Mock).mockResolvedValue(40);
      (getMonthlySavingsAmount as jest.Mock).mockResolvedValue(150);
      (api.getPortfolioAssetAllocation as jest.Mock).mockResolvedValue(40);
      (api.getPortfolioRiskProfile as jest.Mock).mockResolvedValue({
        riskModel: RiskModel.TAA1,
        sedol: SedolCode.BFY1N37,
      });
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
