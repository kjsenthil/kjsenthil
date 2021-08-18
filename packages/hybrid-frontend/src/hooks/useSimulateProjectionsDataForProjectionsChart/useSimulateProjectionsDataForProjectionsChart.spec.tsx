import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useSimulateProjectionsDataForProjectionsChart from './useSimulateProjectionsDataForProjectionsChart';

describe('useSimulateProjectionsDataForProjectionsChart', () => {
  it('returns an empty array if projections data is not available', () => {
    const mockStore = configureStore({
      reducer: {
        goalSimulateProjections: () => ({
          data: { projectionData: undefined },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useSimulateProjectionsDataForProjectionsChart(), {
      wrapper,
    });

    expect(result.current).toHaveLength(0);
  });

  it('returns an empty array if contribution data is not available', () => {
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

    const mockStore = configureStore({
      reducer: {
        goalSimulateProjections: () => ({
          data: { projectionData: mockData, contributionData: undefined },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useSimulateProjectionsDataForProjectionsChart(), {
      wrapper,
    });

    expect(result.current).toHaveLength(0);
  });

  it('returns chart-appropriate projections data if there is data', () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const mockProjectionData = [
      {
        upper: 20000,
        lower: 5000,
        average: 12000,
        monthNo: 1,
      },
      {
        upper: 21000,
        lower: 6000,
        average: 13000,
        monthNo: 10,
      },
    ];

    const mockContributionData = [
      {
        value: 10000,
        monthNo: 1,
      },
      {
        value: 11000,
        monthNo: 10,
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
        goalSimulateProjections: () => ({
          data: {
            projectionData: mockProjectionData,
            contributionData: mockContributionData,
          },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useSimulateProjectionsDataForProjectionsChart(), {
      wrapper,
    });

    expect(result.current).toEqual(mockExpected);
  });
});
