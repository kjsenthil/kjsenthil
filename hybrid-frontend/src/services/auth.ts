/* eslint-disable implicit-arrow-linebreak */
export const isBrowser = () => typeof window !== 'undefined';

// eslint-disable-next-line no-confusing-arrow
export const getHybridLoginSession = () =>
  isBrowser() && window.localStorage.getItem('hybridLoginSession')
    ? window.localStorage.getItem('hybridLoginSession')
    : '';

const sethybridLoginSession = (hybridLoginSession: string) =>
  window.localStorage.setItem('hybridLoginSession', hybridLoginSession);

export const handleLoginSession = (hybridLoginSession: string) => {
  if (hybridLoginSession) {
    return sethybridLoginSession(hybridLoginSession);
  }

  return false;
};

export const isLoggedInSession = () => {
  const hsession = getHybridLoginSession();
  return hsession === 'HYBRID-LOGIN-SESSION';
};

export const logoutSession = (callback: () => void) => {
  sethybridLoginSession('');
  callback();
};
