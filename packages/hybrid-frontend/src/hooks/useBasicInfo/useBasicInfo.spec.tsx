import * as React from 'react';
import { renderHook, ResultContainer } from '@testing-library/react-hooks';
import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import useBasicInfo, { BasicInfo } from './useBasicInfo';
import {
  mockAccountsBreakdown,
  mockClientResponse,
  mockInvestSummaryResponse,
} from '../../services/myAccount/mocks';

jest.mock('../../services/myAccount/api', () => ({
  getClient: jest.fn(),
  getInvestmentSummary: jest.fn(),
}));

const getRenderedHook = (store: Store) => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return renderHook(() => useBasicInfo(), { wrapper });
};

describe('useBasicInfo', () => {
  let store: Store;
  let renderedHook: ResultContainer<BasicInfo>;
  describe('when store neither has client nor investmentSummary', () => {
    it('returns empty details', () => {
      store = configureStore({
        reducer: {
          client: () => ({
            data: undefined,
          }),
          investmentSummary: () => ({
            data: undefined,
          }),
          accountBreakdown: () => ({
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
        dateOfBirth: '',
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
        dateOfBirth: mockClientResponse.data.attributes.dateOfBirth,
        clientAge: 48,
        totalInvested: 635376.130119,
        totalGainLoss: 122249.170119,
        totalInvestableCash: 139778.85,
        isLoading: false,
      };

      store = configureStore({
        reducer: {
          client: () => mockClientResponse,
          investmentSummary: () => mockInvestSummaryResponse,
          accountBreakdown: () => ({
            data: mockAccountsBreakdown,
          }),
        },
      });

      renderedHook = getRenderedHook(store);
      expect(renderedHook.result.current).toStrictEqual(result);
    });
  });
});
