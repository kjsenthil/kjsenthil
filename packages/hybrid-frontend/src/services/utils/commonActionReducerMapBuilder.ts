import { ActionReducerMapBuilder, AsyncThunk, CaseReducer } from '@reduxjs/toolkit';
import { CommonState } from '../types';
import setLoadingAction from './setLoadingAction';
import setDataAction from './setDataAction';
import setErrorAction from './setErrorAction';

const commonActionReducerMapBuilder = <Returned, State extends CommonState, ThunkArgs = void>(
  fetcher: AsyncThunk<Returned, ThunkArgs, {}>,
  onFulfilled?: CaseReducer
) => (builder: ActionReducerMapBuilder<State>) => {
  builder
    .addCase(fetcher.pending, setLoadingAction)
    .addCase(fetcher.fulfilled, setDataAction(onFulfilled))
    .addCase(fetcher.rejected, setErrorAction);
};

export default commonActionReducerMapBuilder;
