import { MyAccountItem } from '../types';
import getMyAccountClient from './getMyAccountClient';

const getMyAccountClientAccounts = async (contactId: string): Promise<MyAccountItem[]> => {
  const clientResponse = await getMyAccountClient(contactId);

  return clientResponse.included.map((account) => {
    const { accountId, accountName } = account.attributes;
    return {
      id: accountId.toString(),
      name: accountName,
    };
  });
};

export default getMyAccountClientAccounts;
