import React, { useEffect, ComponentType } from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { RootState } from '../../../store';
import { NavPaths } from '../../../config/paths';
import { ApiAppName } from '../../../constants';
import { setAccessTokensFromCookie } from '../../../services/auth';

interface PrivateRouteProps extends RouteComponentProps {
  Component: ComponentType<RouteComponentProps>;
}
const PrivateRoute = ({ Component, ...rest }: PrivateRouteProps) => {
  const loginPath = NavPaths.ROOT_PAGE;
  const myAccountsAccessToken = Cookies.get(ApiAppName.myAccounts);
  const oisToken = Cookies.get(ApiAppName.ois);

  const { accessTokens } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessTokens.length === 0 && myAccountsAccessToken && oisToken) {
      try {
        const tokens = {
          myAccounts: JSON.parse(myAccountsAccessToken),
          ois: JSON.parse(oisToken),
        };
        dispatch(setAccessTokensFromCookie(tokens));
      } catch (e) {
        console.error(`Could not parse myAccountsAccessToken: ${myAccountsAccessToken}`, e);
      }
    }
  }, [myAccountsAccessToken, oisToken, accessTokens]);

  const isLoggedIn = React.useMemo(() => accessTokens.length > 0, [accessTokens]);
  useEffect(() => {
    /* eslint-disable-next-line no-console */
    if (!isLoggedIn && rest.location?.pathname !== loginPath) {
      navigate(loginPath);
    }
  }, [isLoggedIn]);

  return isLoggedIn ? <Component {...rest} /> : null;
};

export default PrivateRoute;
