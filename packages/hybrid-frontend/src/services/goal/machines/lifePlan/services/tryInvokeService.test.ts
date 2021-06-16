import tryInvokeService from './tryInvokeService';

describe('tryInvokeService', () => {
  it('resolves with no validation errors', async () => {
    const callback = jest.fn().mockResolvedValue('resolved');
    expect(await tryInvokeService(() => undefined, callback)).toStrictEqual('resolved');
    expect(await tryInvokeService(() => ({}), callback)).toStrictEqual('resolved');
  });

  it('rejects with validation errors', async () => {
    const callback = jest.fn().mockResolvedValue('resolved');
    const errors = { key: 'val' };
    await expect(tryInvokeService(() => errors, callback)).rejects.toStrictEqual(errors);
  });

  it('rejects with no validation errors', async () => {
    const callback = jest.fn().mockRejectedValue('failure');
    await expect(tryInvokeService(() => undefined, callback)).rejects.toStrictEqual('failure');
  });
});
