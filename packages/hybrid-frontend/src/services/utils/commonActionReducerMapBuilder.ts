import { ActionReducerMapBuilder, AsyncThunk, CaseReducer } from '@reduxjs/toolkit';
import { CommonState } from '../types';

const commonActionReducerMapBuilder = <Returned, State extends CommonState, ThunkArgs = void>(
  fetcher: AsyncThunk<Returned, ThunkArgs, {}>,
  onFulfilled?: CaseReducer
) => (builder: ActionReducerMapBuilder<State>) => {
  builder
    .addCase(fetcher.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    })
    .addCase(fetcher.fulfilled, (state, action) => {
      state.status = 'success';
      state.error = undefined;
      if (onFulfilled) {
        onFulfilled(state, action);
      } else if (action.payload) {
        Object.keys(action.payload).forEach((key) => {
          state[key] = action.payload[key];
        });
      }
    })
    .addCase(fetcher.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
};

export default commonActionReducerMapBuilder;
