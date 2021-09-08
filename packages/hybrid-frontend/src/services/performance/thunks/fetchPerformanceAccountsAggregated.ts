import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientState } from '../../myAccount';
import { getPerformanceAccountsAggregated } from '../api';
import { PerformanceAccountsAggregatedResponse } from '../types';

const fetchPerformanceAccountsAggregated = createAsyncThunk<
  PerformanceAccountsAggregatedResponse | undefined,
  number[] | undefined
>('performance/fetchPerformanceAccountsAggregated', (accountIds, { getState }) => {
  const {
    client: { included },
  } = getState() as { client: ClientState };
  const accountsIdsToFetch =
    accountIds ?? included?.map(({ attributes: { accountId } }) => accountId) ?? [];

  if (accountsIdsToFetch.length > 0) return getPerformanceAccountsAggregated(accountsIdsToFetch);

  throw new Error(`There are no account IDs to retrieve performance data for`);
});

export default fetchPerformanceAccountsAggregated;
