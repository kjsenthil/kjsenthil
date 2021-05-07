import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { calcRegularSavings, goalsPayLoad, objectivePayLoad } from '../../../api/apiConstants';
import postGoalCreation from '../../../api/postGoalCreation';
import postLinkGoalObjective from '../../../api/postLinkGoalObjective';
import postObjectiveCreation from '../../../api/postObjectiveCreation';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { RootState } from '../../../store';
import { XPlanAPIResponse, XPlanLinkObjGoalsAPIResponse } from '../../../types';
import { Grid } from '../../atoms';
import { FormInput } from '../../molecules';
import { StatusComponent } from '../../organisms';
import OnBoardLayout from '../../templates/OnBoardLayout';

export const titleText = 'How much could you invest today?';
const titleSubText =
  'Do consider both transferring an existing product and depositing additional money';

const UpfrontContributionPage = () => {
  const [goalStatusMessage, setGoalStatusMessage] = useState<string>('');
  const [objStatusMessage, setObjStatusMessage] = useState<string>('');
  const [linkStatusMessage, setLinkStatusMessage] = useState<string>('');

  const { goalCapture, setGoalCapture, goalDetails } = useGlobalContext();
  const { entityId = 'defaultID' } = useSelector((state: RootState) => state.auth);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.persist();
    const regSavings = calcRegularSavings(goalCapture);

    setGoalCapture((currGoalCapture) => ({
      ...currGoalCapture,
      upfrontInvestment: Number(evt.target.value),
      monthlyInvestment: regSavings,
    }));
  };

  const onCreateGoals = async () => {
    let goalResp: XPlanAPIResponse;
    let objResp: XPlanAPIResponse;
    let linkResp: XPlanLinkObjGoalsAPIResponse;

    try {
      const createGoalPayload = goalsPayLoad(goalDetails.name, goalCapture);

      goalResp = await postGoalCreation(createGoalPayload, entityId);

      if (goalResp) {
        setGoalStatusMessage(
          `Successfully created goal 
          with description ${goalResp?.fields?.description} and 
          goal index ID: ${goalResp?.index} 
          `
        );
      } else {
        setGoalStatusMessage(`Error creating goal`);
        return;
      }
    } catch (error) {
      setGoalStatusMessage(`Error creating goal: ${error}`);
      return;
    }

    try {
      const createObjectivePayload = objectivePayLoad(goalDetails.name);
      objResp = await postObjectiveCreation(createObjectivePayload, entityId);
      if (objResp) {
        setObjStatusMessage(
          `Successfully created objective 
           with description ${objResp?.fields?.description} 
           and obj index ID: ${objResp?.index}`
        );
      } else {
        setObjStatusMessage(`Error creating objective`);
        return;
      }
    } catch (error) {
      setObjStatusMessage(`Error creating objective: ${error}`);
      return;
    }

    try {
      linkResp = await postLinkGoalObjective(goalResp?.index, objResp?.index, entityId);
      if (linkResp) {
        setLinkStatusMessage(
          `Successfully linked 
          goal ID: ${goalResp?.index} to 
          objective ID: ${objResp?.index}`
        );
      } else {
        setLinkStatusMessage(
          `Error linking  
          goal ID: ${goalResp?.index} to 
          objective ID: ${objResp?.index}`
        );
      }
    } catch (error) {
      setLinkStatusMessage(
        `Error linking 
        goal ID: ${goalResp?.index} to 
        objective ID: ${objResp?.index}: ${error}`
      );
    }
    navigate('/my-account/sim');
  };

  return (
    <OnBoardLayout
      titleText={titleText}
      titleSubText={titleSubText}
      onSubmitHandler={onCreateGoals}
      disableCondition={goalCapture.upfrontInvestment <= 0}
    >
      <Grid item xs={12}>
        <FormInput
          value={goalCapture.upfrontInvestment}
          onChange={handleOnChange}
          label="Upfront Amount"
          type="number"
          placeholder="Enter Amount"
        />
      </Grid>
      <Grid item xs={12}>
        <StatusComponent
          entityId={entityId}
          goalStatusMessage={goalStatusMessage}
          objStatusMessage={objStatusMessage}
          linkStatusMessage={linkStatusMessage}
        />
      </Grid>
    </OnBoardLayout>
  );
};

export default UpfrontContributionPage;
