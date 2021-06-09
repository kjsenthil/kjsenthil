import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import { setGoalCapture } from '../../../services/goal';
import { FormInput } from '../../molecules';
import OnBoardLayout from '../../templates/OnBoardLayout';
import { RootState } from '../../../store';

export const titleText = 'Ok. Lets see how we can get you there.';
const titleSubText = 'How much would you like to save towards buying a home?';

const TargetAmountsPage = () => {
  const { goalCapture } = useSelector((state: RootState) => state.goalCreation);

  const dispatch = useDispatch();

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();

    dispatch(
      setGoalCapture({
        targetAmount: Number(evt.target.value),
      })
    );
  };

  return (
    <OnBoardLayout
      titleText={titleText}
      titleSubText={titleSubText}
      onSubmitHandler={() => navigate('/my-account/target-date')}
      disableCondition={Number(goalCapture.targetAmount) <= 0}
    >
      <FormInput
        value={String(goalCapture.targetAmount)}
        onChange={handleOnChange}
        label="Target Amount"
        type="number"
      />
    </OnBoardLayout>
  );
};

export default TargetAmountsPage;
