import Cookies from 'js-cookie';
import { TokenItem } from '../auth';

const DEFAULT_EXPIRY_IN_MS = 30 * 60 * 1000; // 30 minutes

export interface CookieOptions {
  cookieDomain?: string;
  expiryInMs?: number;
}

const setTokensInCookies = (tokens: TokenItem[], options: CookieOptions) => {
  tokens.forEach((token) => {
    const expires = new Date(new Date().getTime() + (options.expiryInMs || DEFAULT_EXPIRY_IN_MS));
    Cookies.set(
      token.application,
      JSON.stringify({ accessToken: token.accessToken, refreshToken: token.refreshToken }),
      { expires, domain: options.cookieDomain }
    );
  });
};

export default setTokensInCookies;
