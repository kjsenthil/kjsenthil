import { Typography } from '@material-ui/core';
import { Link } from 'gatsby';
import React from 'react';
import HeaderMenu from '../../HeaderMenu';

const SelectGoalsPage = () => (
  <>
    <HeaderMenu />

    <Typography variant="h2" gutterBottom>
      SelectGoalsPage
    </Typography>

    <Link to="/gmvp/accounts">Back to Account Select</Link>

    <Link to="/gmvp/inputs">Goto inputs</Link>
  </>
);

export default SelectGoalsPage;
