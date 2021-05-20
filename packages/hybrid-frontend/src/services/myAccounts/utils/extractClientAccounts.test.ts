import extractClientAccounts from './extractClientAccounts';
import { mockClientResponse } from '../mocks';

describe('extractClientAccounts', () => {
  it('returns an array of client accounts', () => {
    const accounts = extractClientAccounts(mockClientResponse);
    expect(accounts).toStrictEqual([
      { id: '20500', name: 'ISA ' },
      { id: '20871', name: 'SIPP ' },
    ]);
  });

  it('returns an empty array when the client has no accounts', () => {
    const mockClientNoAccounts = {
      ...mockClientResponse,
      included: [],
    };

    const accounts = extractClientAccounts(mockClientNoAccounts);
    expect(accounts).toStrictEqual([]);
  });
});
