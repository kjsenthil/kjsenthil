import { ClientResponse, ClientAccountItem } from '../../types';

const extractClientAccounts = (
  investmentAccounts: ClientResponse['included']
): ClientAccountItem[] =>
  investmentAccounts.map((account) => {
    const { accountId, accountName } = account.attributes;
    return {
      id: accountId.toString(),
      name: accountName,
      type: account.type,
    };
  });

export default extractClientAccounts;
