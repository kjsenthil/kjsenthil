import { ClientAccountItem, ClientAccount } from '../../types';

const extractClientAccounts = (investmentAccounts: ClientAccount[]): ClientAccountItem[] =>
  investmentAccounts.map((account) => {
    const { accountId, accountName } = account.attributes;
    return {
      id: accountId.toString(),
      name: accountName,
      type: account.type,
    };
  });

export default extractClientAccounts;
