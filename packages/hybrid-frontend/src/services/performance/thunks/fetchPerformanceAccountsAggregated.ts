import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientState } from '../../myAccount';
import { getPerformanceAccountsAggregated } from '../api';
import { GetPerformanceAccountsAggregatedResponse } from '../types';

const fetchPerformanceContact = createAsyncThunk<GetPerformanceAccountsAggregatedResponse, void>(
  'performance/fetchPerformanceAccountsAggregated',
  (_, { getState }) => {
    const {
      client: { included },
    } = getState() as { client: ClientState };

    // Get account IDs from Redux.
    const accountIds = included?.map(({ attributes: { accountId } }) => accountId) ?? [];

    return getPerformanceAccountsAggregated({ accountIds });
  }
);

export default fetchPerformanceContact;
