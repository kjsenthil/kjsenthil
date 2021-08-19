import { InvestmentAccount } from '@tsw/react-components';

const calculateInvestableCash = (investmentAccounts: Array<InvestmentAccount>) =>
  investmentAccounts
    .filter((account) => account.accountType === 'accounts')
    .reduce((acc, account) => acc + (account.accountCash ?? 0), 0);

export default calculateInvestableCash;
