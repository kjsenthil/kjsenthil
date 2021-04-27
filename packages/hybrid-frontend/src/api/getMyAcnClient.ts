import { UnauthorizedText } from '../constants';
import ENDPOINTS from './endpoints';

export default async (bearerToken: string | void, contactId: string) => {
  const clientUrl = ENDPOINTS['myaccount-clients'].replace(/\{id\}/, contactId);

  const clientHeader = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  const response = await fetch(clientUrl, { method: 'GET', headers: clientHeader });

  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    return Promise.reject(new Error(UnauthorizedText));
  }
  return Promise.reject(new Error('Unable to fetch my accounts client details'));
};
