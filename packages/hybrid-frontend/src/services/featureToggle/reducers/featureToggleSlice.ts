import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commonActionReducerMapBuilder } from '../../utils';
import { fetchFeatureToggleData } from '../thunks';
import { FeatureFlagItem, FeatureToggleResponse, FeatureToggleState } from '../types';

const initialState: FeatureToggleState = {
  status: 'idle',
};

const featureToggleSlice = createSlice({
  name: 'featureToggle',
  initialState,
  reducers: {
    setFeatureToggleFlag: (state, action: PayloadAction<FeatureFlagItem>) => {
      const mappedFeatureFlags = state.data?.featureFlags.map((flagItem: FeatureFlagItem) => {
        if (action.payload.name === flagItem.name) {
          return { ...flagItem, isEnabled: action.payload.isEnabled };
        }
        return flagItem;
      });

      state.data = { featureFlags: mappedFeatureFlags || [] };
    },
  },
  extraReducers: commonActionReducerMapBuilder<{ data: FeatureToggleResponse }, FeatureToggleState>(
    fetchFeatureToggleData
  ),
});

export const { setFeatureToggleFlag } = featureToggleSlice.actions;

export default featureToggleSlice.reducer;
