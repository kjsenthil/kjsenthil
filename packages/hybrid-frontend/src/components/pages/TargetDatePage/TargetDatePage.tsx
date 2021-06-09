import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import { setGoalCapture } from '../../../services/goal';
import { FormInput } from '../../molecules';
import OnBoardLayout from '../../templates/OnBoardLayout';
import { RootState } from '../../../store';

export const titleText = 'When would you like to buy a home by?';
const titleSubText = 'Target Date';

const TargetDatePage = () => {
  const { goalCapture } = useSelector((state: RootState) => state.goalCreation);

  const dispatch = useDispatch();

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();
    dispatch(
      setGoalCapture({
        targetDate: evt.target.value,
      })
    );
  };

  return (
    <OnBoardLayout
      titleText={titleText}
      titleSubText={titleSubText}
      onSubmitHandler={() => navigate('/my-account/upfront-investment')}
      disableCondition={!goalCapture.targetDate}
    >
      <FormInput
        value={goalCapture.targetDate || ''}
        onChange={handleOnChange}
        label="Target Date"
        type="date"
      />
    </OnBoardLayout>
  );
};

export default TargetDatePage;
