import { navigate } from 'gatsby';
import React from 'react';

import { GoalSelection } from '../../organisms';
import { MyAccountLayout } from '../../templates';

const SelectGoalsPage = () => (
  <MyAccountLayout pageTitle="Select a goal">
    <GoalSelection onSubmit={() => navigate('/gmvp/inputs')} />
  </MyAccountLayout>
);

export default SelectGoalsPage;
