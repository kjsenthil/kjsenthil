export interface PinLoginItem {
  position: number;
  value: number;
}

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

export interface AuthState {
  status: 'idle' | 'loading' | 'error' | 'success';
  isCredLoggedIn: boolean;
  isPinLoggedIn: boolean;
  isXplanLoggedIn: boolean;
  accessTokens: TokenItem[];
  contactId?: string;
  twoStepAuthCode?: string;
  credLoginError?: string;
  pinLoginError?: string;
  xplanLoginError?: string;
  refreshTokenError?: string;
  entityId?: string;
}
