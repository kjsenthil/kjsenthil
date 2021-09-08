import { AccountFilterSelection } from '@tswdts/react-components';
import { mockInvestmentAccounts } from '../../services/myAccount/mocks';
import filterAccounts from './filterAccounts';

describe('filterAccounts', () => {
  const allAccounts = mockInvestmentAccounts;

  it('returns all accounts when filter is all-accounts', () => {
    const filteredAccounts = filterAccounts(AccountFilterSelection.ALL_ACCOUNTS, allAccounts);
    expect(filteredAccounts).toBeArrayOfSize(3);
    expect(filteredAccounts?.map((account) => account.id)).toStrictEqual([
      '12345',
      '23456',
      '34567',
    ]);
  });

  it('returns only my accounts when filter is my-accounts', () => {
    const filteredAccounts = filterAccounts(AccountFilterSelection.MY_ACCOUNTS, allAccounts);
    expect(filteredAccounts).toBeArrayOfSize(2);
    expect(filteredAccounts?.map((account) => account.id)).toStrictEqual(['12345', '23456']);
  });

  it('returns only linked accounts when filter is linked-accounts', () => {
    const filteredAccounts = filterAccounts(AccountFilterSelection.LINKED_ACCOUNTS, allAccounts);
    expect(filteredAccounts).toBeArrayOfSize(1);
    expect(filteredAccounts?.map((account) => account.id)).toStrictEqual(['34567']);
  });

  it('returns an empty array when accounts is undefined', () => {
    const filteredAccounts = filterAccounts(AccountFilterSelection.ALL_ACCOUNTS, undefined);
    expect(filteredAccounts).toBeUndefined();
  });
});
