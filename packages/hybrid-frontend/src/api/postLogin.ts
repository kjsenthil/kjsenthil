import { LoginFormData } from '../services/auth/types';
import { myAccountsAPIClientId, postApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (values: LoginFormData) => {
  const payload = {
    data: {
      attributes: {
        apiClientId: myAccountsAPIClientId,
        password: values.password,
        username: values.username,
      },
    },
  };

  const response = await fetch(ENDPOINTS['identity-login'], {
    method: 'POST',
    headers: postApiHeader,
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Log in failed'));
};
