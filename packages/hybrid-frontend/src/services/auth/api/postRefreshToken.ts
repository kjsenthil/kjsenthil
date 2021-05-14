import api from '../../api';
import { MY_ACCOUNTS_API_CLIENT_ID, API_ENDPOINTS } from '../../../config';
import { RefreshTokenRequest, RefreshTokenResponse, TokenItem } from '../types';

const postRefreshToken = async (prevTokens: TokenItem[]) => {
  const payload: RefreshTokenRequest = {
    data: {
      type: 'refresh-token',
      id: null,
      attributes: {
        apiClientId: MY_ACCOUNTS_API_CLIENT_ID,
        tokens: prevTokens,
      },
    },
  };

  const response = await api.post<RefreshTokenResponse>(
    API_ENDPOINTS.IDENTITY_REFRESH_TOKEN,
    payload
  );

  return response.data;
};

export default postRefreshToken;
