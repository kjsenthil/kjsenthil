import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { ClientResponse } from '../types';

const getMyAccountClient = async (contactId: string): Promise<ClientResponse> => {
  const url = `${API_ENDPOINTS.MYACCOUNT_CLIENTS.replace(/\{id\}/, contactId)}?include=accounts`;

  const response = await api.get<ClientResponse>(url);

  return response.data;
};

export default getMyAccountClient;
