import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { LoginFormData } from '../types';

const postXplanLogin = async ({ username, password }: LoginFormData): Promise<void> => {
  const loginURL = API_ENDPOINTS.LOGIN_TO_XPLAN;

  const payload = new URLSearchParams({
    username,
    password,
    loginmode: 'client',
    force: '1',
    domain: 'coa',
    site_type: 'full',
  });

  const response = await api.post(loginURL, payload);

  return response.data;
};

export default postXplanLogin;
