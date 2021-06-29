import * as React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { FeatureFlagNames } from '../../constants';
import useFeatureFlagToggle from './useFeatureFlagToggle';
import * as api from '../../services/featureToggle/api';
import { fetchFeatureToggleData } from '../../services/featureToggle/thunks';
import mockFlagsData from '../../data/dev/features/flags.json';

jest.mock('../../services/featureToggle/api', () => ({
  getFeatureToggleData: jest.fn(),
}));

describe('useFeatureFlagToggle', () => {
  let wrapper: (props: { children: React.ReactNode }) => React.ReactElement;

  const mockGetFeatureToggleData = api.getFeatureToggleData as jest.Mock;

  beforeEach(() => {
    mockGetFeatureToggleData.mockResolvedValue({ featureFlags: mockFlagsData });
  });

  describe('when data is present in store', () => {
    beforeEach(() => {
      const mockStore = configureStore({
        reducer: {
          featureToggle: () => ({
            data: { featureFlags: mockFlagsData },
          }),
        },
      });

      mockStore.dispatch(fetchFeatureToggleData());

      mockGetFeatureToggleData.mockReset();

      wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    });

    it('returns data present in store', () => {
      const { result } = renderHook(() => useFeatureFlagToggle(FeatureFlagNames.EXP_FEATURE), {
        wrapper,
      });

      expect(result.current?.isEnabled).toStrictEqual(false);
    });
  });
});
