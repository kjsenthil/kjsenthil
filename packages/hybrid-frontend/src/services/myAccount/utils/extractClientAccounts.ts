import { ClientResponse, MyAccountItem } from '../types';

const extractClientAccounts = (accounts: ClientResponse['included']): MyAccountItem[] =>
  accounts.map((account) => {
    const { accountId, accountName } = account.attributes;
    return {
      id: accountId.toString(),
      name: accountName,
    };
  });

export default extractClientAccounts;
