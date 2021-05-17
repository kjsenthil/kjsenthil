import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectionResponse, ProjectionsState } from '../types';
import { getProjections, getProjectionsActionReducerMapBuilder } from '../thunks';

const initialState: ProjectionsState = {
  status: 'idle',
  projections: {},
};

const projectionsSlice = createSlice({
  name: 'projections',
  initialState,
  reducers: {
    setProjections: (state, action: PayloadAction<ProjectionResponse>) => {
      state.projections = action.payload;
    },
  },
  extraReducers: (builder) => {
    getProjectionsActionReducerMapBuilder(builder);
  },
});

export { getProjections };
export const { setProjections } = projectionsSlice.actions;

export default projectionsSlice.reducer;
