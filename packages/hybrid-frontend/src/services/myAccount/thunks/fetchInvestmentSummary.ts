import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientAccount, ClientState } from '../types';
import { getInvestmentSummary } from '../api';
import { extractClientAccounts } from '../utils';
import { ClientAccountTypes } from '../../types';

export const fetchInvestmentSummary = createAsyncThunk(
  'client/fetchInvestmentSummary',
  (_, { getState }) => {
    const { client } = getState() as { client: ClientState };

    if (client.included && client.included.length > 0) {
      return getInvestmentSummary(
        extractClientAccounts(
          client.included?.filter<ClientAccount>(
            (props): props is ClientAccount =>
              props.type === ClientAccountTypes.accounts ||
              props.type === ClientAccountTypes.linkedAccounts
          )
        )
      );
    }

    throw new Error('No included client data found in state');
  }
);

export default fetchInvestmentSummary;
