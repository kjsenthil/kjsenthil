import React from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { setGoalDetails, reset, Goals } from '../../../services/goal';
import { GoalSelection } from '../../organisms';
import { MyAccountLayout } from '../../templates';

const SelectGoalsPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(reset());
  }, []);
  const onSubmitHandler = async (goal: Goals) => {
    dispatch(
      setGoalDetails({
        name: goal,
      })
    );
    navigate('/my-account/target-amount');
  };

  return (
    <MyAccountLayout>
      <GoalSelection onSubmit={onSubmitHandler} />
    </MyAccountLayout>
  );
};

export default SelectGoalsPage;
