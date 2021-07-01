import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useCurrentProjectionsDataForProjectionsChart from './useCurrentProjectionsDataForProjectionsChart';

describe('useCurrentProjectionsDataForProjectionsChart', () => {
  it('returns an empty array if projections data is not available', () => {
    const mockStore = configureStore({
      reducer: {
        goalCurrentProjections: () => ({
          data: { projections: undefined },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useCurrentProjectionsDataForProjectionsChart(), {
      wrapper,
    });

    expect(result.current).toHaveLength(0);
  });

  it('returns chart-appropriate projections data if there is data', () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const mockData = [
      {
        contributionLine: 10000,
        upperBound: 20000,
        lowerBound: 5000,
        projectedValue: 12000,
        month: 1,
      },
      {
        contributionLine: 11000,
        upperBound: 21000,
        lowerBound: 6000,
        projectedValue: 13000,
        month: 10,
      },
    ];
    const mockExpected = [
      {
        netContributionsToDate: 10000,
        upperBound: 20000,
        lowerBound: 5000,
        value: 12000,
        date: new Date(currentYear, currentMonth + 1, 1),
      },
      {
        netContributionsToDate: 11000,
        upperBound: 21000,
        lowerBound: 6000,
        value: 13000,
        date: new Date(currentYear, currentMonth + 10, 1),
      },
    ];

    const mockStore = configureStore({
      reducer: {
        goalCurrentProjections: () => ({
          data: {
            projections: mockData,
          },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useCurrentProjectionsDataForProjectionsChart(), {
      wrapper,
    });

    expect(result.current).toEqual(mockExpected);
  });
});
