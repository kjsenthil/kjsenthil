import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeatureToggleData } from '../api';

const fetchFeatureToggleData = createAsyncThunk('featureToggle/featureToggleData', async () => {
  const featureToggleData = await getFeatureToggleData();

  return {
    data: featureToggleData,
  };
});

export default fetchFeatureToggleData;
