import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { ClientResponse } from '../types';

const getClient = async (contactId: string): Promise<ClientResponse> => {
  const includeParamText = '?include=accounts,linked-accounts';

  const url = `${API_ENDPOINTS.MYACCOUNT_CLIENTS.replace(/\{id\}/, contactId)}${includeParamText}`;

  const response = await api.get<ClientResponse>(url);

  return response.data;
};

export default getClient;
