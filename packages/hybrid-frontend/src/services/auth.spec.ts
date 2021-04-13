import { handleLoginSession, isLoggedInSession, logoutSession } from './auth';

describe('auth', () => {
  test('Initial isLoggedInSession', () => {
    const initLogin = isLoggedInSession();
    expect(initLogin).toBeFalsy();
  });

  test('Check login after hybrid session is set', () => {
    handleLoginSession('HYBRID-LOGIN-SESSION');
    const initLogin = isLoggedInSession();

    expect(initLogin).toBeTruthy();
  });

  test('Check login after logout', () => {
    logoutSession(() => {});
    const initLogin = isLoggedInSession();

    expect(initLogin).toBeFalsy();
  });
});
