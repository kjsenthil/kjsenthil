import { configureStore, Store } from '@reduxjs/toolkit';
import { renderHook, ResultContainer } from '@testing-library/react-hooks';
import {
  AccountFilterSelection,
  InvestmentAccount,
  PerformanceDataPeriod,
} from '@tswdts/react-components';
import React from 'react';
import { Provider } from 'react-redux';
import mockAuthSuccessState from '../../services/auth/mocks/mock-auth-success-state.json';
import {
  mockBasicInvestmentSummary,
  mockClientResponse,
  mockInvestmentAccounts,
  mockInvestmentSummaryResponse,
} from '../../services/myAccount/mocks';
import { PerformanceState } from '../../services/performance';
import mockGetPerformanceResponse from '../../services/performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import useInvestmentAccounts, { InvestmentAccounts } from './useInvestmentAccounts';

const getRenderedHook = (store: Store, filter?: AccountFilterSelection) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  const selectedFilter = filter ?? AccountFilterSelection.ALL_ACCOUNTS;
  return renderHook(() => useInvestmentAccounts({ shouldDispatch: false }, selectedFilter), {
    wrapper,
  });
};

const mockPerformanceData: PerformanceState = {
  ...(mockGetPerformanceResponse as Partial<PerformanceState>),
  performanceDataPeriod: PerformanceDataPeriod['5Y'],
  status: 'success',
  error: undefined,
};

describe('useInvestmentAccounts', () => {
  let store: Store;
  let renderedHook: ResultContainer<InvestmentAccounts>;
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
        hasLinkedAccounts: false,
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
        hasLinkedAccounts: true,
      });
    });

    const filterResults: Array<{
      selectedFilter: AccountFilterSelection;
      expectedAccounts: InvestmentAccount[];
    }> = [
      {
        selectedFilter: AccountFilterSelection.ALL_ACCOUNTS,
        expectedAccounts: mockInvestmentAccounts,
      },
      {
        selectedFilter: AccountFilterSelection.MY_ACCOUNTS,
        expectedAccounts: [mockInvestmentAccounts[0], mockInvestmentAccounts[1]],
      },
      {
        selectedFilter: AccountFilterSelection.LINKED_ACCOUNTS,
        expectedAccounts: [mockInvestmentAccounts[2]],
      },
    ];

    it.each(filterResults)(
      'correctly filters accounts based on selected filter',
      ({ selectedFilter, expectedAccounts }) => {
        store = configureStore({
          reducer: {
            auth: () => ({
              ...mockAuthSuccessState,
            }),
            client: () => mockClientResponse,
            investmentSummary: () => mockInvestmentSummaryResponse,
            performance: () => ({
              ...mockPerformanceData,
            }),
            investmentAccounts: () => ({
              data: mockInvestmentAccounts,
            }),
          },
        });

        renderedHook = getRenderedHook(store, selectedFilter);

        expect(renderedHook.result.current).toEqual({
          accountsSummary: mockBasicInvestmentSummary,
          investmentAccounts: expectedAccounts,
          hasLinkedAccounts: true,
        });
      }
    );
  });
});
