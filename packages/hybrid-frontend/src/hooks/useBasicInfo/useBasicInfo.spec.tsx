import * as React from 'react';
import { renderHook, ResultContainer } from '@testing-library/react-hooks';
import { configureStore, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import useBasicInfo, { BasicInfo } from './useBasicInfo';
import { calculateBasicInvestmentSummary } from '../../services/myAccount/utils';
import { mockClientResponse, mockInvestSummaryResponse } from '../../services/myAccount/mocks';

jest.mock('../../services/myAccount/api', () => ({
  getClient: jest.fn(),
  getInvestmentSummary: jest.fn(),
}));

jest.mock('../../services/myAccount/utils/calculateBasicInvestmentSummary.ts', () => ({
  __esModule: true,
  default: jest.fn(),
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
        },
      });

      renderedHook = getRenderedHook(store);

      expect(renderedHook.result.current).toStrictEqual({
        firstName: '',
        lastName: '',
        isLoading: false,
        clientAge: 31,
        dateOfBirth: '',
        totalGainLoss: 0,
        totalInvested: 0,
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
        totalInvested: 1000,
        totalGainLoss: 100,
        isLoading: false,
      };
      (calculateBasicInvestmentSummary as jest.Mock).mockReturnValue({
        totalGainLoss: result.totalGainLoss,
        totalInvested: result.totalInvested,
      });

      store = configureStore({
        reducer: {
          client: () => mockClientResponse,
          investmentSummary: () => mockInvestSummaryResponse,
        },
      });

      renderedHook = getRenderedHook(store);
      expect(renderedHook.result.current).toStrictEqual(result);
    });
  });
});
