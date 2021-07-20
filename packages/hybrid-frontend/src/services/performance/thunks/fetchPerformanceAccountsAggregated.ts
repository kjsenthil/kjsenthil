import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientState } from '../../myAccount/types';
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

  return getPerformanceAccountsAggregated(accountIds);
});

export default fetchPerformanceAccountsAggregated;
