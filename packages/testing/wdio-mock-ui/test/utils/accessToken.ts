import axios from "axios";
import { loginCredentials } from "../environments/stage";
import { loginApiUrl, pinApiUrl } from "../environments/stage";

export const login = async () => {
  const { username, password } = loginCredentials;
  const loginPayload = {
    data: {
      attributes: {
        apiClientId: "myaccounts-spa",
        username: username.toString(),
        password: password.toString(),
      },
    },
  };
  const loginResponse = await axios.post(loginApiUrl, loginPayload);
  const { twoStepAuthCode } = await loginResponse.data.data.attributes;
  return twoStepAuthCode;
};

export const pinLogin = async (twoStepAuthCode: string) => {
  const pinLoginPayload = {
    data: {
      attributes: {
        apiClientId: "myaccounts-spa",
        pin: [
          { position: 2, value: 2 },
          { position: 4, value: 4 },
          { position: 6, value: 6 },
        ],
        twoStepAuthCode,
      },
    },
  };
  const pinLoginResponse = await axios.post(pinApiUrl, pinLoginPayload);
  const { accessToken } = await pinLoginResponse.data.data.attributes.tokens[0];
  return accessToken;
};
