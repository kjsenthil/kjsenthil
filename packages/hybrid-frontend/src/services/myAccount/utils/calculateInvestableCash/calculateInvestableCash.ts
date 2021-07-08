import { Breakdown } from '../../types';

const calculateInvestableCash = (accountBreakdown: Array<Breakdown>) =>
  accountBreakdown
    .filter((account) => account.accountType === 'accounts')
    .reduce((acc, account) => acc + (account.accountCash ?? 0), 0);

export default calculateInvestableCash;
