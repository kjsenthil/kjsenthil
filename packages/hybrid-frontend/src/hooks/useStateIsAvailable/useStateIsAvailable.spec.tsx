import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useStateIsAvailable from './useStateIsAvailable';

describe('useStateIsAvailable', () => {
  let wrapper: (props: { children: React.ReactNode }) => React.ReactElement;
  beforeEach(async () => {
    const mockStore = configureStore({
      reducer: {
        currentGoals: () => ({ status: 'success' }),
        goalSimulateProjections: () => ({ status: 'idle' }),
        auth: () => ({ status: 'success' }),
        investmentSummary: () => ({ status: 'failure' }),
      },
    });

    wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;
  });

  describe('when an array is given', () => {
    it('returns true if all required states have status === success', () => {
      const { result } = renderHook(() => useStateIsAvailable(['currentGoals']), { wrapper });

      expect(result.current).toBeTrue();
    });

    it('returns false if one of the required states have status !== success', () => {
      const { result } = renderHook(
        () => useStateIsAvailable(['currentGoals', 'investmentSummary']),
        { wrapper }
      );

      expect(result.current).toBeFalse();
    });

    it('returns false if none of the required states have status !== success', () => {
      const { result } = renderHook(
        () => useStateIsAvailable(['goalSimulateProjections', 'investmentSummary']),
        { wrapper }
      );

      expect(result.current).toBeFalse();
    });
  });

  describe('when a single state is given', () => {
    it('returns true if a given state status is successful', () => {
      const { result } = renderHook(() => useStateIsAvailable('currentGoals'), { wrapper });

      expect(result.current).toBeTrue();
    });

    it('returns false if a given state status is not successful', () => {
      const { result } = renderHook(() => useStateIsAvailable('investmentSummary'), { wrapper });

      expect(result.current).toBeFalse();
    });
  });
});
