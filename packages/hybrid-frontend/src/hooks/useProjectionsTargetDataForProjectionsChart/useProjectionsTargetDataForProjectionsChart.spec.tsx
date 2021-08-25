import * as React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { configureStore } from '@reduxjs/toolkit';
import MockDate from 'mockdate';
import { ProjectionsChartProjectionTargetDatum } from '@tswdts/react-components';
import useProjectionsTargetDataForProjectionsChart from './useProjectionsTargetDataForProjectionsChart';
import { TargetProjectionMonth } from '../../services/projections';

describe('useProjectionsTargetDataForProjectionsChart', () => {
  beforeEach(() => {
    MockDate.set('2020-01-01T00:00:00');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('returns an empty array if projections data is not available', () => {
    const mockStore = configureStore({
      reducer: {
        goalSimulateProjections: () => ({
          data: { goal: undefined },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useProjectionsTargetDataForProjectionsChart(), {
      wrapper,
    });

    expect(result.current).toHaveLength(0);
  });

  it('returns chart-appropriate projections data if there is data', () => {
    const currentYear = new Date().getFullYear();
    const mockData: TargetProjectionMonth[] = [
      {
        monthNo: 0,
        value: 1000,
      },
      {
        monthNo: 1,
        value: 2000,
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
        goalSimulateProjections: () => ({
          data: { goal: { onTrack: { targetProjectionData: mockData } } },
        }),
      },
    });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;

    const { result } = renderHook(() => useProjectionsTargetDataForProjectionsChart(), {
      wrapper,
    });

    expect(result.current).toEqual(mockExpected);
  });
});
