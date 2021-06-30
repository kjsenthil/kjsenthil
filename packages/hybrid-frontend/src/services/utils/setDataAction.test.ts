import { CaseReducer } from '@reduxjs/toolkit';
import { CommonState } from '../types';
import setDataAction from './setDataAction';

describe('setDataAction', () => {
  it('sets data and status to success', () => {
    const state: CommonState = {
      data: undefined,
      included: undefined,
      status: 'idle',
      error: undefined,
    };

    const action = { type: 'ACTION', payload: { data: 'data', included: 'included' } };
    setDataAction()(state, action);
    expect(state.data).toStrictEqual('data');
    expect(state.included).toStrictEqual('included');
    expect(state.status).toStrictEqual('success');
    expect(state.error).toBeUndefined();
  });

  it('sets data and status to success with custom case reducer', () => {
    const customCaseReducer: CaseReducer = (state, action) => {
      state.data = {
        ...action.payload,
      };
    };

    const state: CommonState<{ data: string; included: string }> = {
      data: undefined,
      status: 'idle',
      error: undefined,
    };

    const action = { type: 'ACTION', payload: { data: 'data', included: 'included' } };

    setDataAction(customCaseReducer)(state, action);
    expect(state.data).toStrictEqual({
      data: 'data',
      included: 'included',
    });
    expect(state.status).toStrictEqual('success');
    expect(state.error).toBeUndefined();
  });
});
