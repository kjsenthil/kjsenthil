import store from '.';

describe('store', () => {
  it('to have auth reducer', () => {
    expect(store.getState().auth).not.toBeUndefined();
  });

  it('to have goalCreation reducer', () => {
    expect(store.getState().goalCreation).not.toBeUndefined();
  });
});
