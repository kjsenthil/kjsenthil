import * as React from 'react';
import { renderHook, ResultContainer } from '@testing-library/react-hooks';
import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PerformanceDataPeriod } from '@tswdts/react-components';
import useInvestmentAccounts, { InvestmentAccountsProps } from './useInvestmentAccounts';
import {
  mockInvestmentAccounts,
  mockBasicInvestmentSummary,
  mockClientResponse,
  mockInvestmentSummaryResponse,
} from '../../services/myAccount/mocks';
import mockGetPerformanceResponse from '../../services/performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import mockAuthSuccessState from '../../services/auth/mocks/mock-auth-success-state.json';

const getRenderedHook = (store: Store) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return renderHook(() => useInvestmentAccounts(), { wrapper });
};

const mockPerformanceData = {
  ...mockGetPerformanceResponse,
  PerformanceDataPeriod: PerformanceDataPeriod['5Y'],
  error: undefined,
};

describe('useInvestmentAccounts', () => {
  let store: Store;
  let renderedHook: ResultContainer<InvestmentAccountsProps>;
  describe('when store no accounts', () => {
    it('returns empty details', () => {
      store = configureStore({
        reducer: {
          auth: () => ({}),
          client: () => ({
            data: undefined,
          }),
          investmentSummary: () => ({
            data: undefined,
          }),
          performance: () => ({
            data: undefined,
          }),
          investmentAccounts: () => ({}),
        },
      });

      renderedHook = getRenderedHook(store);

      expect(renderedHook.result.current).toStrictEqual({
        investmentAccounts: undefined,
        accountsSummary: {
          totalGainLoss: 0,
          totalGainLossPercentage: 0,
          totalInvested: 0,
        },
      });
    });
  });

  describe('when store is not empty', () => {
    it('returns investment accounts for a given client', () => {
      store = configureStore({
        reducer: {
          auth: () => ({
            ...mockAuthSuccessState,
          }),
          client: () => mockClientResponse,
          investmentSummary: () => mockInvestmentSummaryResponse,
          performance: () => ({
            status: 'success',
            ...mockPerformanceData,
          }),
          investmentAccounts: () => ({
            data: mockInvestmentAccounts,
          }),
        },
      });

      renderedHook = getRenderedHook(store);

      expect(renderedHook.result.current).toEqual({
        accountsSummary: mockBasicInvestmentSummary,
        investmentAccounts: mockInvestmentAccounts,
      });
    });
  });
});
