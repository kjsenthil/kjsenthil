import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { NetContributionResponse } from '../types';

export interface GetNetContributionsAggregatedProps {}

const getNetContributions = async (
  accountIds: number | number[]
): Promise<NetContributionResponse | undefined> => {
  const Ids = Array.isArray(accountIds) ? accountIds : [accountIds];
  const urlPath = API_ENDPOINTS.MYACCOUNT_NETCONTRIBUTION_ACCOUNTS_AGGREGATED;
  const accountIdsQueryParam = Ids.join(',');

  const url = `${urlPath}?filter[id]=${accountIdsQueryParam}`;

  try {
    const response = await api.get<NetContributionResponse>(url);
    return response?.data;
  } catch (error) {
    if (error.response.status === 404) {
      return undefined;
    }

    throw error;
  }
};

export default getNetContributions;
