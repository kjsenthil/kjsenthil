import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getMyAcnClient from '../../../api/getMyAcnClient';
import { ApiAppName, UnauthorizedText } from '../../../constants';
import { Typography } from '../../atoms';
import { RootState } from '../../../store';
import { logoutSession, setShouldRefreshTokens } from '../../../services/auth';

const DashPage = () => {
  const { contactId, accessTokens } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myaccountsAccessToken = accessTokens?.find(
          (tokenItem) => tokenItem.application === ApiAppName.myAccounts
        );

        const data = await getMyAcnClient(myaccountsAccessToken?.accessToken, contactId as string);
        /* eslint-disable-next-line no-console */
        console.log(`getMyAcnClient resp`, data);
      } catch (error) {
        if (accessTokens.length && error.message === UnauthorizedText) {
          dispatch(setShouldRefreshTokens());
        } else {
          logoutSession(() => navigate('/my-account/login'));
        }
      }
    };

    fetchData();
  }, []);

  return <Typography variant="h1">DashBoard Page</Typography>;
};

export default DashPage;
