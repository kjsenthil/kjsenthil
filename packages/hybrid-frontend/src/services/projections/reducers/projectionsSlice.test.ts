import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import projectionsReducer, { fetchProjections } from './projectionsSlice';
import * as api from '../api';
import {
  getEquityAllocation,
  getInvestAccounts,
  getMonthlySavingsAmount,
} from '../../myAccount/api';
import { authSlice as authReducer } from '../../auth';
import { goalSlice as goalReducer } from '../../goal';
import { mockAccounts, mockInvestAccounts } from '../../myAccount/mocks';
import { mockAssets } from '../../assets/mocks';
import { RiskModel, SedolCode } from '../../types';
import { mockProjectionResponse } from '../mocks';

jest.mock('../../myAccount/api', () => ({
  getInvestAccounts: jest.fn(),
  getEquityAllocation: jest.fn(),
  getMonthlySavingsAmount: jest.fn(),
}));

jest.mock('../api', () => ({
  getPortfolioAssetAllocation: jest.fn(),
  getPortfolioRiskProfile: jest.fn(),
  postProjections: jest.fn(),
}));

describe('projectionsSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        goal: goalReducer,
        projections: projectionsReducer,
      },
    });
  });

  describe('dispatch fetchProjections', () => {
    const fetchProjectionsAction = fetchProjections({
      accounts: mockAccounts,
      fundData: mockAssets,
    }) as any;

    beforeEach(() => {
      (getInvestAccounts as jest.Mock).mockResolvedValue(mockInvestAccounts);
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
      const { status, postProjectionsError } = store.getState().projections;

      expect(status).toStrictEqual('idle');
      expect(postProjectionsError).toBeUndefined();
    });

    describe('when call is still pending', () => {
      it('sets status to loading', async () => {
        store.dispatch(fetchProjectionsAction);
        const { status, postProjectionsError } = store.getState().projections;

        expect(getInvestAccounts).toHaveBeenCalledTimes(1);
        expect(getInvestAccounts).toHaveBeenCalledWith(mockAccounts);

        expect(status).toStrictEqual('loading');
        expect(postProjectionsError).toBeUndefined();
      });
    });

    describe('when call is fulfilled', () => {
      it('sets status to success', async () => {
        await store.dispatch(fetchProjectionsAction);
        const { status, postProjectionsError } = store.getState().projections;

        expect(status).toStrictEqual('success');
        expect(postProjectionsError).toBeUndefined();
      });
    });

    describe('when call is rejected', () => {
      it('sets postProjectionsError', async () => {
        const error = 'Something went wrong';
        (api.postProjections as jest.Mock).mockRejectedValue(error);
        await store.dispatch(fetchProjectionsAction);
        const { status, postProjectionsError } = store.getState().projections;

        expect(status).toStrictEqual('error');
        expect(postProjectionsError).toStrictEqual(error);
      });
    });
  });
});
