import api from '../../api';
import { MY_ACCOUNTS_API_CLIENT_ID, API_ENDPOINTS } from '../../../config';
import { TokenItem } from '../types';

const postRefreshToken = async (prevTokens: TokenItem[]) => {
  const payload = {
    data: {
      type: 'refresh-token',
      id: null,
      attributes: {
        apiClientId: MY_ACCOUNTS_API_CLIENT_ID,
        tokens: prevTokens,
      },
    },
  };

  const response = await api.post(API_ENDPOINTS.IDENTITY_REFRESH_TOKEN, payload);

  return response.data;
};

export default postRefreshToken;
