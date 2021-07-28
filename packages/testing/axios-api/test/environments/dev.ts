const {
  PR_UI_USERNAME,
  PR_UI_PASSWORD,
  PR_PIN_POSITION_2,
  PR_PIN_POSITION_4,
  PR_PIN_POSITION_6,
  PR_ISA_ACCOUNT_ID,
  PR_GIA_ACCOUNT_ID,
  PR_SIPP_ACCOUNT_ID,
  PR_ACCOUNT_IDs,
} = process.env;

export const loginCredentials = {
  username: PR_UI_USERNAME || new Error("username not found"),
  password: PR_UI_PASSWORD || new Error("password not found"),
};

export const pinLoginCredentials = {
  pin_position_2: PR_PIN_POSITION_2 || new Error("username not found"),
  pin_position_4: PR_PIN_POSITION_4 || new Error("password not found"),
  pin_position_6: PR_PIN_POSITION_6 || new Error("password not found"),
};

export const accountIds = {
  isa_account_id: PR_ISA_ACCOUNT_ID || new Error("isa_account_id not found"),
  gia_account_id: PR_GIA_ACCOUNT_ID || new Error("gia_account_id not found"),
  sipp_account_id: PR_SIPP_ACCOUNT_ID || new Error("sipp_account_id not found"),
  all_account_ids: PR_ACCOUNT_IDs || new Error("account_ids not found"),
};

export const apiBaseUrl = `${process.env.API_BASE_URL}`;
export const loginApiUrl = `${apiBaseUrl}/login`;
export const pinApiUrl = `${apiBaseUrl}/pin`;
