import { ClientResponse, ClientAccountItem } from '../types';

const extractClientAccounts = (accounts: ClientResponse['included']): ClientAccountItem[] =>
  accounts.map((account) => {
    const { accountId, accountName } = account.attributes;
    return {
      id: accountId.toString(),
      name: accountName,
      type: account.type,
    };
  });

export default extractClientAccounts;
