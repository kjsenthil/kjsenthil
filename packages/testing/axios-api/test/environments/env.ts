const {
  API_USER_NAME,
  API_USER_PASSWORD,
  API_PIN_POSITION_2,
  API_PIN_POSITION_4,
  API_PIN_POSITION_6,
  API_ISA_ACCOUNT_ID,
  API_GIA_ACCOUNT_ID,
  API_SIPP_ACCOUNT_ID,
  API_ACCOUNT_IDs,
} = process.env

export const loginCredentials = {
  username: API_USER_NAME || new Error('username not found'),
  password: API_USER_PASSWORD || new Error('password not found'),
}

export const pinLoginCredentials = {
  pin_position_2: API_PIN_POSITION_2 || new Error('username not found'),
  pin_position_4: API_PIN_POSITION_4 || new Error('password not found'),
  pin_position_6: API_PIN_POSITION_6 || new Error('password not found'),
}

export const accountIds = {
  isa_account_id: API_ISA_ACCOUNT_ID || new Error('isa_account_id not found'),
  gia_account_id: API_GIA_ACCOUNT_ID || new Error('gia_account_id not found'),
  sipp_account_id: API_SIPP_ACCOUNT_ID || new Error('sipp_account_id not found'),
  all_account_ids: API_ACCOUNT_IDs || new Error('account_ids not found'),
}

export const apiBaseUrl = `${process.env.API_BASE_URL}`
export const loginApiUrl = `${apiBaseUrl}/login`
export const pinApiUrl = `${apiBaseUrl}/pin`
