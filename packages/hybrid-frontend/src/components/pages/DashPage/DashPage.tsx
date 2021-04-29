import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import getMyAcnClient from '../../../api/getMyAcnClient';
import postRefreshToken from '../../../api/postRefreshToken';
import { ApiAppName, UnauthorizedText } from '../../../constants';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { logoutSession } from '../../../services/auth/auth';
import { Typography } from '../../atoms';

const DashPage = () => {
  const { contactId, accessTokens, setAccessTokens } = useGlobalContext();

  useEffect(() => {
    const checkAndRefreshToken = async (parentError) => {
      if (accessTokens && parentError.message === UnauthorizedText) {
        try {
          const data = await postRefreshToken(accessTokens);
          const newToken = data.Data.Attributes.NewTokens;
          setAccessTokens(newToken);
        } catch (error) {
          logoutSession(() => navigate('dacn/login'));
        }
      } else {
        logoutSession(() => navigate('dacn/login'));
      }
    };

    const fetchData = async () => {
      try {
        const myaccountsAccessToken = accessTokens?.find(
          (tokenItem) => tokenItem.application === ApiAppName.myAccounts
        );

        const data = await getMyAcnClient(myaccountsAccessToken?.accessToken, contactId);
        /* eslint-disable-next-line no-console */
        console.log(`getMyAcnClient resp`, data);
      } catch (error) {
        checkAndRefreshToken(error);
      }
    };

    fetchData();
  }, []);

  return <Typography variant="h1">DashBoard Page</Typography>;
};

export default DashPage;
