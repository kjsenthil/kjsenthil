import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMyAccountClient } from '../../../services/myAccounts';
import { Typography } from '../../atoms';
import { RootState } from '../../../store';

const DashPage = () => {
  const { contactId = '' } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyAccountClient(contactId);
      /* eslint-disable-next-line no-console */
      console.log(`getMyAcnClient resp`, data);
    };

    fetchData();
  }, []);

  return <Typography variant="h1">DashBoard Page</Typography>;
};

export default DashPage;
