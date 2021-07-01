import { createSlice } from '@reduxjs/toolkit';
import { SimulatedProjectionsState } from '../types';
import { fetchSimulatedProjections } from '../thunks';
import commonActionReducerMapBuilder from '../../utils/commonActionReducerMapBuilder';

const initialState: SimulatedProjectionsState = {
  status: 'idle',
};

const simulatedProjectionsSlice = createSlice({
  name: 'projections',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder(fetchSimulatedProjections),
});

export { fetchSimulatedProjections };

export default simulatedProjectionsSlice.reducer;
