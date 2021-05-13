import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  postGoalCreation,
  postObjectiveCreation,
  postLinkGoalObjective,
  GoalsObjectiveLinkApiResponse,
  GoalsObjectiveApiResponse,
  calcRegularSavings,
} from '../../../services/goalsAndObjectives';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { RootState } from '../../../store';
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
    let goalResp: GoalsObjectiveApiResponse;
    let objResp: GoalsObjectiveApiResponse;
    let linkResp: GoalsObjectiveLinkApiResponse;

    try {
      goalResp = await postGoalCreation({
        goalName: goalDetails.name || 'Create Goal MVP',
        inputs: goalCapture,
        entityId,
      });

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
      objResp = await postObjectiveCreation({
        goalName: goalDetails.name || 'Create objective MVP',
        entityId,
      });
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
