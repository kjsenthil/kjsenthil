import Cookies from 'js-cookie';
import { navigate } from '@reach/router';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavPaths } from '../../../config/paths';
import { logout } from '../../../services/auth';
import { RootState } from '../../../store';
import { LayoutContainer } from '../../templates';
import { ApiAppName } from '../../../constants';
import { COOKIE_DOMAIN } from '../../../config';

interface LogoutPageProps {
  path?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LogoutPage = (_: LogoutPageProps) => {
  const { accessTokens } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const hasAccessTokens = accessTokens.length > 0;

  useEffect(() => {
    if (!hasAccessTokens) {
      navigate(NavPaths.ROOT_PAGE);
    }
  }, [accessTokens]);

  useEffect(() => {
    const cookieOptions = { path: '/', domain: COOKIE_DOMAIN ?? '' };

    Cookies.remove(ApiAppName.myAccounts, cookieOptions);
    Cookies.remove(ApiAppName.ois, cookieOptions);
    dispatch(logout());
  }, []);

  return (
    <LayoutContainer maxWidth={false} disableGutters>
      <span>Logging out</span>
    </LayoutContainer>
  );
};

export default LogoutPage;
