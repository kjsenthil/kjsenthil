import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientAccount, ClientState } from '../../myAccount';
import { ClientAccountTypes } from '../../types';
import { getPerformanceAccountsAggregated } from '../api';
import { PerformanceAccountsAggregatedResponse } from '../types';

const fetchPerformanceAccountsAggregated = createAsyncThunk<
  PerformanceAccountsAggregatedResponse | undefined,
  number[] | undefined
>(
  'performance/fetchPerformanceAccountsAggregated',
  (accountIds, { getState }): Promise<PerformanceAccountsAggregatedResponse | undefined> => {
    // let response;
    const {
      client: { included },
    } = getState() as { client: ClientState };

    const accountsOrLinkedAccounts = included?.filter<ClientAccount>(
      (props): props is ClientAccount =>
        props.type === ClientAccountTypes.accounts ||
        props.type === ClientAccountTypes.linkedAccounts
    );

    const mappedAccountIds = accountsOrLinkedAccounts?.map(
      ({ attributes: { accountId } }) => accountId
    );

    if (Array.isArray(mappedAccountIds) && mappedAccountIds.length > 0) {
      return getPerformanceAccountsAggregated(mappedAccountIds);
    }

    throw new Error(`There are no account IDs to retrieve performance data for`);
  }
);

export default fetchPerformanceAccountsAggregated;
