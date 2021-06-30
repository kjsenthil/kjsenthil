import * as React from 'react';
import { renderHook, ResultContainer } from '@testing-library/react-hooks';
import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import useAccountBreakdownInfo, { AccountBreakdownInfoProps } from './useAccountBreakdownInfo';
import {
  mockAccountsBreakdownData,
  mockClientResponse,
  mockInvestSummaryResponse,
} from '../../services/myAccount/mocks';

jest.mock('../../services/myAccount/api', () => ({
  getContributions: jest.fn(),
}));

const getRenderedHook = (store: Store) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return renderHook(() => useAccountBreakdownInfo(), { wrapper });
};

describe('useAccountBreakdownInfo', () => {
  let store: Store;
  let renderedHook: ResultContainer<AccountBreakdownInfoProps>;
  describe('when store no accountBreakdown', () => {
    it('returns empty details', () => {
      store = configureStore({
        reducer: {
          client: () => ({
            data: undefined,
          }),
          investmentSummary: () => ({
            data: undefined,
          }),
          accountBreakdown: () => ({}),
        },
      });

      renderedHook = getRenderedHook(store);

      expect(renderedHook.result.current).toStrictEqual({
        accountBreakdown: undefined,
        accountsSummary: {
          totalCash: 0,
          totalGainLoss: 0,
          totalGainLossPercentage: 0,
          totalInvested: 0,
        },
      });
    });
  });

  describe('when store is not empty', () => {
    it('returns account breakdown info', () => {
      store = configureStore({
        reducer: {
          client: () => mockClientResponse,
          investmentSummary: () => mockInvestSummaryResponse,
          accountBreakdown: () => ({
            data: mockAccountsBreakdownData.accountBreakdown,
          }),
        },
      });

      renderedHook = getRenderedHook(store);

      expect(renderedHook.result.current).toEqual(mockAccountsBreakdownData);
    });
  });
});
