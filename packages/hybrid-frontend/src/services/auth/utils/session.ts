import { SessionTokenValues, DH_SESSION_KEY } from '../constants';

export type AuthType = keyof typeof SessionTokenValues;
/* eslint-disable implicit-arrow-linebreak */
export const isBrowser = () => typeof window !== 'undefined';

// eslint-disable-next-line no-confusing-arrow
const getHybridLoginSession = (): string | null =>
  isBrowser() && window.localStorage.getItem(DH_SESSION_KEY)
    ? window.localStorage.getItem(DH_SESSION_KEY)
    : null;

const unsetHybridLoginSession = () => window.localStorage.removeItem(DH_SESSION_KEY);

const setHybridLoginSession = (sessionTokenValue: string) =>
  window.localStorage.setItem(DH_SESSION_KEY, sessionTokenValue);

export const handleLoginSession = (authType: AuthType): void => {
  const sessionTokenValue = SessionTokenValues[authType];
  setHybridLoginSession(sessionTokenValue);
};

export const isLoggedInSession = (authType: AuthType = 'MY_ACCOUNT'): boolean => {
  const hSession = getHybridLoginSession();
  if (hSession) {
    if (authType === 'MY_ACCOUNT') {
      return true;
    }
    return authType === 'XPLAN' && hSession === SessionTokenValues.XPLAN;
  }

  return false;
};

export const logoutSession = (callback?: () => void): void => {
  unsetHybridLoginSession();
  if (callback) {
    callback();
  }
};
