import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetPerformanceAccountsAggregatedResponse } from '../types';

export interface GetPerformanceAccountsAggregatedProps {
  accountIds: number[];
}

export function getPerformanceAccountsAggregatedUrl({
  accountIds,
}: GetPerformanceAccountsAggregatedProps) {
  const urlPath = API_ENDPOINTS.MYACCOUNT_PERFORMANCE_ACCOUNTS_AGGREGATED;
  const accountIdsQueryParam = accountIds.join(',');

  return `${urlPath}?include=netcontribution-accounts-aggregated&filter[id]=${accountIdsQueryParam}`;
}

export default async function getPerformanceAccountsAggregated({
  accountIds,
}: GetPerformanceAccountsAggregatedProps): Promise<GetPerformanceAccountsAggregatedResponse> {
  const url = getPerformanceAccountsAggregatedUrl({ accountIds });

  const res = await api.get<GetPerformanceAccountsAggregatedResponse>(url);

  return res.data;
}
