import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { ContributionResponse } from '../types';

const getContributions = async (accountId: string): Promise<ContributionResponse | undefined> => {
  const url = API_ENDPOINTS.MYACCOUNT_CONTRIBUTION.replace(/\{id\}/, accountId);

  try {
    const response = await api.get<ContributionResponse>(url);
    return response?.data;
  } catch (error) {
    if (error.response.status === 404) {
      return undefined;
    }
    throw error;
  }
};

export default getContributions;
