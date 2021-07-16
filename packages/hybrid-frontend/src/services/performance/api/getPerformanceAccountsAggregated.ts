import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetPerformanceAccountsAggregatedResponse } from '../types';

export interface GetPerformanceAccountsAggregatedProps {
  accountIds: number[];
}

export function getPerformanceAccountsAggregatedUrl(accountIds: number | number[]) {
  const Ids = Array.isArray(accountIds) ? accountIds : [accountIds];
  const urlPath = API_ENDPOINTS.MYACCOUNT_PERFORMANCE_ACCOUNTS_AGGREGATED;
  const accountIdsQueryParam = Ids.join(',');

  return `${urlPath}?include=netcontribution-accounts-aggregated&filter[id]=${accountIdsQueryParam}`;
}

export default async function getPerformanceAccountsAggregated(
  accountIds: number | number[]
): Promise<GetPerformanceAccountsAggregatedResponse | undefined> {
  const url = getPerformanceAccountsAggregatedUrl(accountIds);

  try {
    const res = await api.get<GetPerformanceAccountsAggregatedResponse>(url);
    return res.data;
  } catch (error) {
    if (error.response.status === 404) {
      return undefined;
    }

    throw error;
  }
}
