import { navigate } from 'gatsby';
import React from 'react';
import { Goals } from '../../../constants';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';

import { GoalSelection } from '../../organisms';
import { MyAccountLayout } from '../../templates';

const SelectGoalsPage = () => {
  const { setGoalDetails } = useGlobalContext();

  const onSubmitHandler = async (goal: Goals) => {
    setGoalDetails({
      name: goal,
    });
    navigate('/my-account/targetamount');
  };

  return (
    <MyAccountLayout pageTitle="Select a goal">
      <GoalSelection onSubmit={onSubmitHandler} />
    </MyAccountLayout>
  );
};

export default SelectGoalsPage;
