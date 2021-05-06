import { isLoggedInSession, handleLoginSession, logoutSession, AuthType } from './session';

describe('auth', () => {
  describe.each`
    authType
    ${'MY_ACCOUNT'}
    ${'XPLAN'}
  `(`when authType is $authType`, ({ authType }: { authType: AuthType }) => {
    it('returns false for isLoggedInSession', () => {
      expect(isLoggedInSession(authType)).toBe(false);
    });

    it('returns true for isLoggedInSession after hybrid session is set', () => {
      handleLoginSession(authType);
      expect(isLoggedInSession(authType)).toBe(true);
    });

    it('returns false for isLoggedInSession after logout', () => {
      const callback = jest.fn();
      logoutSession(callback);

      expect(isLoggedInSession(authType)).toBe(false);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
