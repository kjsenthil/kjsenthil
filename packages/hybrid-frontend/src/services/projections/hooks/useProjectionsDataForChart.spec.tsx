import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useProjectionsDataForChart from './useProjectionsDataForChart';

describe('useProjectionsDataForChart', () => {
  it('returns an empty array if projections data is not available', () => {
    const mockStore = configureStore({
      reducer: {
        projections: () => ({
          projections: { projections: undefined },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useProjectionsDataForChart(), { wrapper });

    expect(result.current).toHaveLength(0);
  });

  it('returns chart-appropriate projections data if there is data', () => {
    const currentYear = new Date().getFullYear();
    const mockData = [
      {
        actual: 10000,
        high: 20000,
        low: 5000,
        medium: 12000,
        year: 0,
      },
      {
        actual: 11000,
        high: 21000,
        low: 6000,
        medium: 13000,
        year: 1,
      },
    ];
    const mockExpected = [
      {
        netContributionsToDate: 10000,
        valueGood: 20000,
        valueBad: 5000,
        value: 12000,
        date: new Date(currentYear, 0, 1),
      },
      {
        netContributionsToDate: 11000,
        valueGood: 21000,
        valueBad: 6000,
        value: 13000,
        date: new Date(currentYear + 1, 0, 1),
      },
    ];

    const mockStore = configureStore({
      reducer: {
        projections: () => ({
          projections: {
            projections: mockData,
          },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useProjectionsDataForChart(), { wrapper });

    expect(result.current).toEqual(mockExpected);
  });
});
