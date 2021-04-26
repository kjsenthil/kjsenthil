import { xplanSessionTokenValue } from '../../constants';

/* eslint-disable implicit-arrow-linebreak */
export const isBrowser = () => typeof window !== 'undefined';

// eslint-disable-next-line no-confusing-arrow
export const getXplanHybridLoginSession = () =>
  isBrowser() && window.localStorage.getItem('xplanHybridLoginSession')
    ? window.localStorage.getItem('xplanHybridLoginSession')
    : '';

const setXplanHybridLoginSession = (xplanHybridLoginSession: string) =>
  window.localStorage.setItem('xplanHybridLoginSession', xplanHybridLoginSession);

export const handleXplanLoginSession = (xplanHybridLoginSession: string) => {
  if (xplanHybridLoginSession) {
    return setXplanHybridLoginSession(xplanHybridLoginSession);
  }

  return false;
};

export const isXplanLoggedInSession = () => {
  const hsession = getXplanHybridLoginSession();
  return hsession === xplanSessionTokenValue;
};

export const xplanlogoutSession = (callback: () => void) => {
  setXplanHybridLoginSession('');
  callback();
};
