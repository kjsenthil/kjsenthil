import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

const getMyAccountClient = async (contactId: string) => {
  const path = API_ENDPOINTS.MYACCOUNT_CLIENTS.replace(/\{id\}/, contactId);

  const response = await api.get(path);

  return response.data;
};

export default getMyAccountClient;
