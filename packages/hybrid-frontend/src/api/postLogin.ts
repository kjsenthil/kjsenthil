import { LoginFormData } from '../components/organisms/LoginForm/LoginForm';
import { APIMBaseUrl, myAccountsAPIClientId, postApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (values: LoginFormData) => {
  const apimBaseUrl = ENDPOINTS['apim-base-url'] || APIMBaseUrl;

  const payload = {
    data: {
      attributes: {
        apiClientId: myAccountsAPIClientId,
        password: values.password,
        username: values.username,
      },
    },
  };

  const response = await fetch(`${apimBaseUrl}/login`, {
    method: 'POST',
    headers: postApiHeader,
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Log in failed'));
};
