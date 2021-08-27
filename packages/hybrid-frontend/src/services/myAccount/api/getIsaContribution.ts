import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { IsaContributionResponse } from '../types';

const getIsaContribution = async (contactId: number): Promise<IsaContributionResponse> => {
  const url = `${API_ENDPOINTS.MYACCOUNT_ISA_CONTRIBUTIONS.replace(/\{id\}/, String(contactId))}`;
  const response = await api.get<IsaContributionResponse>(url);

  return response.data;
};

export default getIsaContribution;
