import { navigate } from 'gatsby';
import React from 'react';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { FormInput } from '../../molecules';
import OnBoardLayout from '../../templates/OnBoardLayout';

export const titleText = 'Ok. Lets see how we can get you there.';
const titleSubText = 'How much would you like to save towards buying a home?';

const TargetAmountsPage = () => {
  const { goalCapture, setGoalCapture } = useGlobalContext();

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();

    setGoalCapture((currGoalCapture) => ({
      ...currGoalCapture,
      targetAmount: Number(evt.target.value),
    }));
  };

  return (
    <OnBoardLayout
      titleText={titleText}
      titleSubText={titleSubText}
      onSubmitHandler={() => navigate('/my-account/targetdate')}
      disableCondition={goalCapture.targetAmount <= 0}
    >
      <FormInput
        value={goalCapture.targetAmount}
        onChange={handleOnChange}
        label="Target Amount"
        type="number"
      />
    </OnBoardLayout>
  );
};

export default TargetAmountsPage;
