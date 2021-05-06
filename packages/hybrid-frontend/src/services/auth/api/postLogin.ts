import { LoginFormData } from '../types';
import { myAccountsAPIClientId, postApiHeader } from '../../../api/apiConstants';
import { API_ENDPOINTS } from '../../../config';

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

  const response = await fetch(API_ENDPOINTS['identity-login'], {
    method: 'POST',
    headers: postApiHeader,
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Log in failed'));
};
