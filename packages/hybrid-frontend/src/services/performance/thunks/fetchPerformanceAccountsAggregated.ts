import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientState } from '../../myAccount';
import { getPerformanceAccountsAggregated } from '../api';
import { PerformanceAccountsAggregatedResponse } from '../types';

const fetchPerformanceAccountsAggregated = createAsyncThunk<
  PerformanceAccountsAggregatedResponse | undefined,
  void
>('performance/fetchPerformanceAccountsAggregated', (_, { getState }) => {
  const {
    client: { included },
  } = getState() as { client: ClientState };

  // Get account IDs from Redux.
  const accountIds = included?.map(({ attributes: { accountId } }) => accountId) ?? [];

  if (accountIds.length > 0) return getPerformanceAccountsAggregated(accountIds);

  throw new Error(`There are no account IDs to retrieve performance data for`);
});

export default fetchPerformanceAccountsAggregated;
