import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from '../types';

const setErrorAction = <A extends AnyAction = PayloadAction>(state: CommonState, action: A) => {
  state.status = 'error';
  state.error = action.payload ? action.payload : action.error.message;
};

export default setErrorAction;
