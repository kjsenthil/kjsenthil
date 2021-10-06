import axios from 'axios';
import { loginCredentials, pinLoginCredentials, loginApiUrl, pinApiUrl } from '../environments/env';

const getTwoStepAuthCode = async () => {
  const { username, password } = loginCredentials;
  const loginPayload = {
    data: {
      attributes: {
        apiClientId: 'myaccounts-spa',
        username: username.toString(),
        password: password.toString(),
      },
    },
  };
  const loginResponse = await axios.post(loginApiUrl, loginPayload);
  const { twoStepAuthCode } = await loginResponse.data.data.attributes;
  return twoStepAuthCode;
};

const getAccessToken = async (twoStepAuthCode) => {
  const pinLoginPayload = {
    data: {
      attributes: {
        apiClientId: 'myaccounts-spa',
        pin: [
          { position: 2, value: Number(pinLoginCredentials.pin_position_2) },
          { position: 4, value: Number(pinLoginCredentials.pin_position_4) },
          { position: 6, value: Number(pinLoginCredentials.pin_position_6) },
        ],
        twoStepAuthCode,
      },
    },
  };
  const pinLoginResponse = await axios.post(pinApiUrl, pinLoginPayload);
  const responseObject = await pinLoginResponse.data.data;
  const { contactId } = responseObject.attributes;
  const { accessToken } = responseObject.attributes.tokens[0];
  return { contactId, accessToken };
};

before(async () => {
  const twoStepAuthCode = await getTwoStepAuthCode();
  const accessTokenResponse = await getAccessToken(twoStepAuthCode);
  process.env.TWO_STEP_AUTH_CODE = twoStepAuthCode;
  process.env.CONTACT_ID = accessTokenResponse.contactId;
  process.env.ACCESS_TOKEN = accessTokenResponse.accessToken;
});
