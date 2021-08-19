import * as React from 'react';
import { renderHook, ResultContainer } from '@testing-library/react-hooks';
import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PerformanceDataPeriod } from '@tsw/react-components';
import useBasicInfo, { BasicInfo } from './useBasicInfo';
import {
  mockInvestmentAccounts,
  mockClientResponse,
  mockInvestmentSummaryResponse,
} from '../../services/myAccount/mocks';
import mockGetPerformanceResponse from '../../services/performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import mockAuthSuccessState from '../../services/auth/mocks/mock-auth-success-state.json';

jest.mock('../../services/myAccount/api', () => ({
  getClient: jest.fn(),
  getInvestmentSummary: jest.fn(),
}));

const getRenderedHook = (store: Store) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return renderHook(() => useBasicInfo(), { wrapper });
};

const mockPerformanceData = {
  ...mockGetPerformanceResponse,
  PerformanceDataPeriod: PerformanceDataPeriod['5Y'],
  error: undefined,
};

describe('useBasicInfo', () => {
  let store: Store;
  let renderedHook: ResultContainer<BasicInfo>;
  describe('when store neither has client nor investmentSummary', () => {
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
          investmentAccounts: () => ({
            data: undefined,
          }),
        },
      });

      renderedHook = getRenderedHook(store);

      expect(renderedHook.result.current).toStrictEqual({
        firstName: '',
        lastName: '',
        isLoading: true,
        clientAge: 31,
        dateOfBirth: new Date(1979, 1, 1),
        totalGainLoss: 0,
        totalInvested: 0,
        totalInvestableCash: 0,
      });
    });
  });

  describe('when store is not empty', () => {
    it('returns basic info', () => {
      const result = {
        firstName: mockClientResponse.data.attributes.firstName,
        lastName: mockClientResponse.data.attributes.lastName,
        dateOfBirth: new Date(mockClientResponse.data.attributes.dateOfBirth),
        clientAge: 48,
        totalInvested: 9489.37,
        totalGainLoss: 4582.13,
        totalInvestableCash: 139778.85,
        isLoading: false,
      };

      store = configureStore({
        reducer: {
          auth: () => ({
            ...mockAuthSuccessState,
          }),
          client: () => mockClientResponse,
          investmentSummary: () => mockInvestmentSummaryResponse,
          investmentAccounts: () => ({
            data: mockInvestmentAccounts,
          }),
          performance: () => ({
            status: 'success',
            ...mockPerformanceData,
          }),
        },
      });

      renderedHook = getRenderedHook(store);
      expect(renderedHook.result.current).toStrictEqual(result);
    });
  });
});
