import { AccountFilterSelection, InvestmentAccount } from '@tswdts/react-components';

const getAccountTypes = (filterValue: AccountFilterSelection): string[] => {
  switch (filterValue) {
    case AccountFilterSelection.LINKED_ACCOUNTS:
      return ['linked-accounts'];
    case AccountFilterSelection.MY_ACCOUNTS:
      return ['accounts'];
    case AccountFilterSelection.ALL_ACCOUNTS:
    default:
      return ['accounts', 'linked-accounts'];
  }
};

const byAccountType = (value: AccountFilterSelection) => (account: InvestmentAccount) =>
  getAccountTypes(value).indexOf(account.accountType) !== -1;

const filterAccounts = (
  selectedFilter: AccountFilterSelection,
  accounts?: InvestmentAccount[]
): InvestmentAccount[] | undefined => accounts?.filter(byAccountType(selectedFilter));

export default filterAccounts;
