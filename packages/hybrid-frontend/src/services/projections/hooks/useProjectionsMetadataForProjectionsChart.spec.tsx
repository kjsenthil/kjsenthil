import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MockDate from 'mockdate';
import useProjectionsMetadataForProjectionsChart from './useProjectionsMetadataForProjectionsChart';

function getWrapperWithMockStore(dateOfBirth?: string) {
  const mockStore = configureStore({
    reducer: {
      client: () => ({
        data: dateOfBirth ? { attributes: { dateOfBirth } } : undefined,
      }),
    },
  });

  return ({ children }) => <Provider store={mockStore}>{children}</Provider>;
}

describe('useProjectionsMetadataForProjectionsChart', () => {
  beforeEach(() => {
    MockDate.set('2021-12-21');
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('There is no client data', () => {
    it('returns undefined if client data is not available', () => {
      const wrapper = getWrapperWithMockStore();
      const { result } = renderHook(() => useProjectionsMetadataForProjectionsChart(), { wrapper });

      expect(result.current).toBeUndefined();
    });
  });

  describe('There is client data', () => {
    it('returns correct metadata when yearsUntilRetirement > 0', () => {
      const wrapper = getWrapperWithMockStore('1971-12-21T00:00:00');
      const { result } = renderHook(() => useProjectionsMetadataForProjectionsChart(), { wrapper });

      expect(result.current).toEqual({
        investmentPeriod: 50,
        todayAge: 50,
      });
    });

    it('returns correct metadata when yearsUntilRetirement <= 0', () => {
      const wrapper = getWrapperWithMockStore('1900-12-21T00:00:00');
      const { result } = renderHook(() => useProjectionsMetadataForProjectionsChart(), { wrapper });

      expect(result.current).toEqual({
        investmentPeriod: 50,
        todayAge: 121,
      });
    });
  });
});
