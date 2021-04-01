import { Typography } from '@material-ui/core';
import { Link, navigate } from 'gatsby';
import React from 'react';
import CaptureGoal from '../../CaptureGoal/CaptureGoal';
import HeaderMenu from '../../HeaderMenu';

const SelectInputsPage = () => (
  <>
    <HeaderMenu />

    <Typography variant="h2" gutterBottom>
      SelectInputsPage
    </Typography>

    <CaptureGoal onSubmit={() => navigate('/gmvp/sim')} />

    <Link to="/gmvp/goals">Back to Goals Select</Link>
  </>
);

export default SelectInputsPage;
