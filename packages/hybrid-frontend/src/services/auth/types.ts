import { GenericResponseData, GenericRequestPayload } from '../api/types';
import { CommonState } from '../types';

export interface PinLoginItem {
  position: number;
  value: number;
}

export type CredLoginResponse = GenericResponseData<{
  twoStepAuthCode: string;
}>;

export type CredLoginRequest = GenericRequestPayload<
  {
    apiClientId: string;
  } & LoginFormData
>;

export type PinLoginResponse = GenericResponseData<{
  tokens: TokenItem[];
  contactId: string;
}>;

export type PinLoginRequest = GenericRequestPayload<{
  apiClientId: string;
  pin: PinLoginItem[];
  twoStepAuthCode: string;
}>;

export type RefreshTokenResponse = GenericResponseData<{
  invalidTokens: TokenItem[];
  newTokens: TokenItem[];
}>;

export type RefreshTokenRequest = GenericRequestPayload<
  {
    apiClientId: string;
    tokens: TokenItem[];
  },
  'refresh-token'
>;

export interface TokenItem {
  application: string;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}

export interface LoginFormData {
  password: string;
  username: string;
}

export interface AuthState extends CommonState {
  isCredLoggedIn: boolean;
  isPinLoggedIn: boolean;
  accessTokens: TokenItem[];
  contactId?: string;
  twoStepAuthCode?: string;
  credLoginError?: string;
  pinLoginError?: string;
  refreshTokenError?: string;
}
