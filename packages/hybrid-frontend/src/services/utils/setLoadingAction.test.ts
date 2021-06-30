import { CommonState } from '../types';
import setLoadingAction from './setLoadingAction';

describe('setLoadingAction', () => {
  it('sets loading state', () => {
    const state: CommonState = {
      status: 'idle',
      data: undefined,
      error: undefined,
    };

    setLoadingAction(state);

    expect(state.status).toStrictEqual('loading');
    expect(state.error).toBeUndefined();
    expect(state.data).toBeUndefined();
  });
});
