import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useGoals from './useGoals';
import mockGetGoalsSuccessResponse from '../../services/goal/mocks/get-goals-success-response.json';
import { currentGoalsSlice, fetchGoals } from '../../services/goal';
import * as api from '../../services/goal/api';

jest.mock('../../services/goal/api', () => ({
  getGoals: jest.fn(),
}));

jest.mock('../../services/goal/utils/filterGoals', () => ({
  __esModule: true,
  default: (goals: unknown) => goals,
}));

describe('useGoals', () => {
  let wrapper: (props: { children: React.ReactNode }) => React.ReactElement;

  const mockGetGoals = api.getGoals as jest.Mock;

  beforeEach(() => {
    mockGetGoals.mockResolvedValue(mockGetGoalsSuccessResponse);
  });

  describe('when data is present in store', () => {
    beforeEach(async () => {
      const mockStore = configureStore({
        reducer: {
          currentGoals: currentGoalsSlice,
        },
      });

      await mockStore.dispatch(fetchGoals());
      mockGetGoals.mockReset();
      wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    });

    it('does not call getGoals api', () => {
      renderHook(() => useGoals(), { wrapper });

      expect(api.getGoals).toHaveBeenCalledTimes(0);
    });

    it('returns data present in store', () => {
      const { result } = renderHook(() => useGoals(), { wrapper });

      expect(result.current).toStrictEqual(mockGetGoalsSuccessResponse);
    });

    it('does call getGoals api when forceDispatch is true', async () => {
      mockGetGoals.mockResolvedValue(mockGetGoalsSuccessResponse.slice(1));
      const { result, waitForNextUpdate } = renderHook(() => useGoals(true), { wrapper });

      await waitForNextUpdate({ timeout: 100 });
      expect(api.getGoals).toHaveBeenCalledTimes(1);
      expect(result.current).toStrictEqual(mockGetGoalsSuccessResponse.slice(1));
    });
  });

  describe('when data is not present in store', () => {
    beforeEach(() => {
      const mockStore = configureStore({
        reducer: {
          currentGoals: currentGoalsSlice,
        },
      });

      wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    });

    it('returns undefined if no current goals are preset in store', () => {
      const { result } = renderHook(() => useGoals(), { wrapper });

      expect(result.current).toBeUndefined();
    });

    it('does call getGoals api', () => {
      renderHook(() => useGoals(), { wrapper });

      expect(api.getGoals).toHaveBeenCalledTimes(1);
    });

    it('returns data from api', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGoals(), { wrapper });

      await waitForNextUpdate({ timeout: 100 });
      expect(result.current).toStrictEqual(mockGetGoalsSuccessResponse);
    });
  });
});
