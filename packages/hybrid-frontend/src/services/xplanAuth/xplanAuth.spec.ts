import { xplanSessionTokenValue } from '../../constants/index';
import { handleXplanLoginSession, isXplanLoggedInSession, xplanlogoutSession } from './xplanAuth';

describe('auth', () => {
  test('Initial isXplanLoggedInSession', () => {
    const initLogin = isXplanLoggedInSession();
    expect(initLogin).toBeFalsy();
  });

  test('Check login after hybrid session is set', () => {
    handleXplanLoginSession(xplanSessionTokenValue);
    const initLogin = isXplanLoggedInSession();

    expect(initLogin).toBeTruthy();
  });

  test('Check login after logout', () => {
    xplanlogoutSession(() => {});
    const initLogin = isXplanLoggedInSession();

    expect(initLogin).toBeFalsy();
  });
});
