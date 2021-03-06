import extractClientAccounts from './extractClientAccounts';
import { mockClientResponse } from '../../mocks';
import { ClientAccountTypes } from '../../../types';
import { ClientAccount } from '../..';

describe('extractClientAccounts', () => {
  it('returns an array of client accounts', () => {
    const accounts = extractClientAccounts(
      mockClientResponse.included?.filter<ClientAccount>(
        (props): props is ClientAccount =>
          props.type === ClientAccountTypes.accounts ||
          props.type === ClientAccountTypes.linkedAccounts
      )
    );
    expect(accounts).toStrictEqual([
      { accountNumber: 'BI205006', id: '20500', name: 'ISA', type: 'accounts' },
      { accountNumber: 'BI208716', id: '20871', name: 'SIPP', type: 'accounts' },
      { accountNumber: 'BI204993', id: '20499', name: 'GIA', type: 'accounts' },
    ]);
  });

  it('returns an empty array when the client has no accounts', () => {
    const mockClientResponseNoAccounts = {
      ...mockClientResponse,
      included: [],
    };

    const accounts = extractClientAccounts(mockClientResponseNoAccounts.included);
    expect(accounts).toStrictEqual([]);
  });
});
