import { CommonState } from '../types';
import setErrorAction from './setErrorAction';

describe('setErrorAction', () => {
  it('sets error state and error message from payload', () => {
    const error = 'Something went wrong!';

    const state: CommonState = {
      status: 'idle',
      data: undefined,
      error: undefined,
    };

    setErrorAction(state, { payload: error, type: 'ACTION' });

    expect(state.status).toStrictEqual('error');
    expect(state.error).toStrictEqual(error);
    expect(state.data).toBeUndefined();
  });

  it('sets error state and error message from Error', () => {
    const error = new Error('Something went wrong!');

    const state: CommonState = {
      status: 'idle',
      data: undefined,
      error: undefined,
    };

    setErrorAction(state, { error, type: 'ACTION' });

    expect(state.status).toStrictEqual('error');
    expect(state.error).toStrictEqual(error.message);
    expect(state.data).toBeUndefined();
  });
});
