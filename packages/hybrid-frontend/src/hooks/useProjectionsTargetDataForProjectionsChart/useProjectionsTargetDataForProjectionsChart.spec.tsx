import * as React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { configureStore } from '@reduxjs/toolkit';
import MockDate from 'mockdate';
import useProjectionsTargetDataForProjectionsChart from './useProjectionsTargetDataForProjectionsChart';
import {
  GoalTargetProjectionMonth,
  ProjectionsChartProjectionTargetDatum,
} from '../../services/projections/types';

describe('useProjectionsTargetDataForProjectionsChart', () => {
  beforeEach(() => {
    MockDate.set('2020-01-01');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('returns an empty array if projections data is not available', () => {
    const mockStore = configureStore({
      reducer: {
        goalTargetProjections: () => ({
          data: undefined,
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useProjectionsTargetDataForProjectionsChart(), { wrapper });

    expect(result.current).toHaveLength(0);
  });

  it('returns chart-appropriate projections data if there is data', () => {
    const currentYear = new Date().getFullYear();
    const mockData: GoalTargetProjectionMonth[] = [
      {
        month: 0,
        projectedValue: 1000,
      },
      {
        month: 1,
        projectedValue: 2000,
      },
    ];
    const mockExpected: ProjectionsChartProjectionTargetDatum[] = [
      {
        date: new Date(currentYear, 0, 1),
        value: 1000,
      },
      {
        date: new Date(currentYear, 1, 1),
        value: 2000,
      },
    ];

    const mockStore = configureStore({
      reducer: {
        goalTargetProjections: () => ({
          data: { projections: mockData },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useProjectionsTargetDataForProjectionsChart(), { wrapper });

    expect(result.current).toEqual(mockExpected);
  });
});
