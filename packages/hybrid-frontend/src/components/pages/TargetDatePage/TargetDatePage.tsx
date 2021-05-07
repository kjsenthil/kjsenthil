import { navigate } from 'gatsby';
import React from 'react';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { FormInput } from '../../molecules';
import OnBoardLayout from '../../templates/OnBoardLayout';

export const titleText = 'When would you like to buy a home by?';
const titleSubText = 'Target Date';

const TargetDatePage = () => {
  const { goalCapture, setGoalCapture } = useGlobalContext();
  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();
    setGoalCapture((currGoalCapture) => ({
      ...currGoalCapture,
      targetDate: evt.target.value,
    }));
  };

  return (
    <OnBoardLayout
      titleText={titleText}
      titleSubText={titleSubText}
      onSubmitHandler={() => navigate('/my-account/upfront')}
      disableCondition={!goalCapture.targetDate}
    >
      <FormInput
        value={goalCapture.targetDate}
        onChange={handleOnChange}
        label="Target Date"
        type="date"
      />
    </OnBoardLayout>
  );
};

export default TargetDatePage;
