import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getPerformanceContactFetcher } from '../api';
import { PerformanceState } from '../types';

interface GetPerformanceContactPayloadCreatorProps {
  contactId: string;
}

const getPerformanceContact = createAsyncThunk(
  'performance/getPerformanceContact',
  async ({ contactId }: GetPerformanceContactPayloadCreatorProps) =>
    getPerformanceContactFetcher({ contactId })
);

export const getPerformanceContactActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<PerformanceState>
) => {
  builder
    .addCase(getPerformanceContact.pending, (state) => {
      state.status = 'loading';
      state.performanceError = undefined;
    })
    .addCase(getPerformanceContact.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.performanceError = undefined;
      state.performance = payload;
    })
    .addCase(getPerformanceContact.rejected, (state, action) => {
      state.status = 'error';
      state.performanceError = action.error.message;
    });
};

export default getPerformanceContact;
