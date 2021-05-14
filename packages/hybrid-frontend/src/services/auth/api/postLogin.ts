import api from '../../api';
import { API_ENDPOINTS, MY_ACCOUNTS_API_CLIENT_ID } from '../../../config';
import { CredLoginRequest, CredLoginResponse, LoginFormData } from '../types';

const postLogin = async ({ username, password }: LoginFormData) => {
  const payload: CredLoginRequest = {
    data: {
      attributes: {
        apiClientId: MY_ACCOUNTS_API_CLIENT_ID,
        username,
        password,
      },
    },
  };

  const response = await api.post<CredLoginResponse>(API_ENDPOINTS.IDENTITY_LOGIN, payload);
  return response.data;
};

export default postLogin;
