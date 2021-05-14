import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';

import { createGoal, setGoalCapture } from '../../../services/goal';

import { RootState } from '../../../store';
import { Grid } from '../../atoms';
import { Alert, FormInput } from '../../molecules';
import OnBoardLayout from '../../templates/OnBoardLayout';

export const titleText = 'How much could you invest today?';
const titleSubText =
  'Do consider both transferring an existing product and depositing additional money';

const UpfrontContributionPage = () => {
  const { goalCapture, goalCreationError } = useSelector((state: RootState) => state.goal);

  const dispatch = useDispatch();

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();

    dispatch(
      setGoalCapture({
        upfrontInvestment: Number(evt.target.value),
      })
    );
  };

  const onCreateGoals = async () => {
    await dispatch(createGoal({}));

    if (!goalCreationError) {
      navigate('/my-account/sim');
    }
  };

  return (
    <OnBoardLayout
      titleText={titleText}
      titleSubText={titleSubText}
      onSubmitHandler={onCreateGoals}
      disableCondition={Number(goalCapture.upfrontInvestment) <= 0}
    >
      <Grid item xs={12}>
        <FormInput
          value={String(goalCapture.upfrontInvestment || '')}
          onChange={handleOnChange}
          label="Upfront Amount"
          type="number"
          placeholder="Enter Amount"
        />
      </Grid>
      {goalCreationError && (
        <Grid item xs={12}>
          <Alert>{goalCreationError}</Alert>
        </Grid>
      )}
    </OnBoardLayout>
  );
};

export default UpfrontContributionPage;
