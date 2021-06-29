import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeatureToggleData } from '../api';

const fetchFeatureToggleData = createAsyncThunk('featureToggle/featureToggleData', () => {
  const featureToggleData = getFeatureToggleData();

  return {
    data: featureToggleData,
  };
});

export default fetchFeatureToggleData;
