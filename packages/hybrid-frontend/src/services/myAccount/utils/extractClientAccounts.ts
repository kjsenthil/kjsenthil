import { ClientResponse, MyAccountItem } from '../types';

const extractClientAccounts = (client: ClientResponse): MyAccountItem[] =>
  client.included.map((account) => {
    const { accountId, accountName } = account.attributes;
    return {
      id: accountId.toString(),
      name: accountName,
    };
  });

export default extractClientAccounts;
