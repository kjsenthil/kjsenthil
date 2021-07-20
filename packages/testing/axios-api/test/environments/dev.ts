const { PR_UI_USERNAME, PR_UI_PASSWORD } = process.env;
const { PR_PIN_POSITION_2, PR_PIN_POSITION_4, PR_PIN_POSITION_6 } = process.env;

export const loginCredentials = {
  username: PR_UI_USERNAME || new Error("username not found"),
  password: PR_UI_PASSWORD || new Error("password not found"),
};

export const pinLoginCredentials = {
  pin_position_2: PR_PIN_POSITION_2 || new Error("username not found"),
  pin_position_4: PR_PIN_POSITION_4 || new Error("password not found"),
  pin_position_6: PR_PIN_POSITION_6 || new Error("password not found"),
};

export const apiBaseUrl = `${process.env.API_BASE_URL}`;
export const loginApiUrl = `${apiBaseUrl}/login`;
export const pinApiUrl = `${apiBaseUrl}/pin`;
