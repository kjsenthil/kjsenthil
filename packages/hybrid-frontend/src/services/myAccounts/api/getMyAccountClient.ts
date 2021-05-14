import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

const getMyAccountClient = async (contactId: string) => {
  const url = API_ENDPOINTS.MYACCOUNT_CLIENTS.replace(/\{id\}/, contactId);

  const response = await api.get(url);

  return response.data;
};

export default getMyAccountClient;
