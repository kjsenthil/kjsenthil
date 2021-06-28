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
  contactId: number;
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

export interface AuthState extends Omit<CommonState, 'data' | 'error'> {
  isCredLoggedIn: boolean;
  isPinLoggedIn: boolean;
  accessTokens: TokenItem[];
  contactId?: number;
  twoStepAuthCode?: string;
  credLoginError?: string;
  pinLoginError?: string;
  refreshTokenError?: string;
}
