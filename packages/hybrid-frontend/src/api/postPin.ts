import { PinLoginItem } from '../types';
import { myAccountsAPIClientId, postApiHeader } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (pinLoginVals: PinLoginItem[], twoStepAuthCode: string) => {
  const payload = {
    data: {
      attributes: {
        apiClientId: myAccountsAPIClientId,
        pin: pinLoginVals,
        twoStepAuthCode,
      },
    },
  };

  const response = await fetch(ENDPOINTS['identity-pin'], {
    method: 'POST',
    headers: postApiHeader,
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Pin Log in failed'));
};
