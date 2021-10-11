import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccountState } from '../types';
import { getInvestmentAccountDetails } from '../api';

export const fetchInvestmentAccountDetails = createAsyncThunk(
  'client/fetchInvestmentAccountDetails',
  (_, { getState }) => {
    const { selectedAccount } = getState() as { selectedAccount: AccountState };
    const account = selectedAccount?.account;

    if (account?.id === undefined) throw new Error('No selected account data found in state');

    return getInvestmentAccountDetails({
      accountId: Number(account.id),
      filter: undefined,
      include: ['cash-position'],
    });
  }
);

export default fetchInvestmentAccountDetails;
