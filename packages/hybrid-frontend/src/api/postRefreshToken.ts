import { TokenItem } from '../types';
import { myAccountsAPIClientId, postApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (prevTokens: TokenItem[]) => {
  const payload = {
    data: {
      type: 'refresh-token',
      id: null,
      attributes: {
        apiClientId: myAccountsAPIClientId,
        tokens: prevTokens,
      },
    },
  };

  const response = await fetch(ENDPOINTS['identity-refresh-token'], {
    method: 'POST',
    headers: postApiHeader,
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Refresh Token failed'));
};
