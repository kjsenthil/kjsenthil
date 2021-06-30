import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from '../types';

const setDataAction = (customCaseReducer?: CaseReducer) => <T>(
  state: CommonState,
  action: PayloadAction<T>
) => {
  state.status = 'success';
  state.error = undefined;
  if (customCaseReducer) {
    customCaseReducer(state, action);
  } else if (action.payload) {
    Object.keys(action.payload).forEach((key) => {
      state[key] = action.payload[key];
    });
  }
};

export default setDataAction;
