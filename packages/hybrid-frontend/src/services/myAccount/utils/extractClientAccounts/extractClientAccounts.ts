import { ClientAccountItem, ClientAccount } from '../../types';

const extractClientAccounts = (investmentAccounts: ClientAccount[]): ClientAccountItem[] =>
  investmentAccounts.map((account) => {
    const { accountId, bestInvestAccount } = account.attributes;
    return {
      id: accountId.toString(),
      name: bestInvestAccount,
      type: account.type,
    };
  });

export default extractClientAccounts;
