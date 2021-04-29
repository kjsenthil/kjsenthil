import React, { useState } from 'react';
import { goalsPayLoad, objectivePayLoad } from '../../../api/apiConstants';
import postGoalCreation from '../../../api/postGoalCreation';
import postLinkGoalObjective from '../../../api/postLinkGoalObjective';
import postObjectiveCreation from '../../../api/postObjectiveCreation';

import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { CaptureGoalData } from '../../../types';
import { Grid, Card, CardContent, Typography } from '../../atoms';
import { Alert } from '../../molecules';
import { CaptureGoal, StatusComponent } from '../../organisms';
import { MyAccountLayout } from '../../templates';

const SelectInputsPage = () => {
  const [goalStatusMessage, setGoalStatusMessage] = useState<string>('');
  const [objStatusMessage, setObjStatusMessage] = useState<string>('');
  const [linkStatusMessage, setLinkStatusMessage] = useState<string>('');

  const { entityId, goalDetails } = useGlobalContext();

  const onCaptureGoalSubmit = async (inputs: CaptureGoalData) => {
    let goalResp: any = null;
    let objResp: any = null;
    let linkResp: any = null;

    try {
      const createGoalPayload = goalsPayLoad(goalDetails.name, inputs);
      goalResp = await postGoalCreation(createGoalPayload, entityId);
      if (goalResp) {
        setGoalStatusMessage(
          `Successfully created goal 
          with description ${goalResp?.fields?.description} 
          and goal index ID: ${goalResp?.index}`
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
  };

  return (
    <MyAccountLayout stretch>
      <Grid container>
        <Grid item xs={6}>
          <Grid container>
            <Typography variant="h4" gutterBottom>
              Capture Inputs Page for Goal: {goalDetails.id}
            </Typography>

            <Grid item>
              <Card>
                <CardContent>
                  <CaptureGoal onSubmit={onCaptureGoalSubmit} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Alert>{goalStatusMessage}</Alert>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <StatusComponent
            entityId={entityId}
            goalStatusMessage={goalStatusMessage}
            objStatusMessage={objStatusMessage}
            linkStatusMessage={linkStatusMessage}
          />
        </Grid>
      </Grid>
    </MyAccountLayout>
  );
};
export default SelectInputsPage;
