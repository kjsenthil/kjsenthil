import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useStateIsLoading from './useStateIsLoading';

describe('useStateIsLoading', () => {
  let wrapper: (props: { children: React.ReactNode }) => React.ReactElement;
  beforeEach(async () => {
    const mockStore = configureStore({
      reducer: {
        currentGoals: () => ({ status: 'loading' }),
        goalTargetProjections: () => ({ status: 'loading' }),
        goalCurrentProjections: () => ({ status: 'idle' }),
        auth: () => ({ status: 'success' }),
        investmentSummary: () => ({ status: 'failure' }),
      },
    });

    wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;
  });

  describe('when an array is given', () => {
    it('returns true if all required states have status === loading', () => {
      const { result } = renderHook(
        () => useStateIsLoading(['currentGoals', 'goalTargetProjections']),
        { wrapper }
      );

      expect(result.current).toBeTrue();
    });

    it('returns true if one of the required states have status === loading', () => {
      const { result } = renderHook(
        () => useStateIsLoading(['goalTargetProjections', 'investmentSummary']),
        { wrapper }
      );

      expect(result.current).toBeTrue();
    });

    it('returns false if none of the required states have status !== success', () => {
      const { result } = renderHook(
        () => useStateIsLoading(['goalCurrentProjections', 'investmentSummary', 'auth']),
        { wrapper }
      );

      expect(result.current).toBeFalse();
    });
  });

  describe('when a single state is given', () => {
    it('returns true if a given state status is loading', () => {
      const { result } = renderHook(() => useStateIsLoading('currentGoals'), { wrapper });

      expect(result.current).toBeTrue();
    });

    it('returns false if a given state status is not  loading', () => {
      const { result } = renderHook(() => useStateIsLoading('investmentSummary'), { wrapper });

      expect(result.current).toBeFalse();
    });
  });
});
