import store from '.';

describe('store', () => {
  it('to have reducers', () => {
    expect(store.getState()).not.toStrictEqual({});
  });
});
