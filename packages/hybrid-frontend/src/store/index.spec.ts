import store from '.';

describe('store', () => {
  it('to have auth reducer', () => {
    expect(store.getState().auth).not.toBeUndefined();
  });

  it('to have goal reducer', () => {
    expect(store.getState().goal).not.toBeUndefined();
  });
});
