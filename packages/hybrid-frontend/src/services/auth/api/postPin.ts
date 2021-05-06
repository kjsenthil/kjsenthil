import { myAccountsAPIClientId, postApiHeader } from '../../../api/apiConstants';
import { API_ENDPOINTS } from '../../../config';
import { PinLoginItem } from '../types';

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

  const response = await fetch(API_ENDPOINTS['identity-pin'], {
    method: 'POST',
    headers: postApiHeader,
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Pin Log in failed'));
};
