import React, { useState } from 'react';
import { goalsPayLoad, objectivePayLoad } from '../../../api/apiConstants';
import postGoalCreation from '../../../api/postGoalCreation';
import postLinkGoalObjective from '../../../api/postLinkGoalObjective';
import postObjectiveCreation from '../../../api/postObjectiveCreation';

import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { Grid, Card, CardContent, Typography } from '../../atoms';
import { Alert } from '../../molecules';
import { CaptureGoal, StatusComponent } from '../../organisms';
import { CaptureGoalData } from '../../organisms/CaptureGoal/CaptureGoal';
import { MyAccountLayout } from '../../templates';

const SelectInputsPage = () => {
  const [goalStatusMessage, setgoalStatusMessage] = useState<string>('');
  const [objStatusMessage, setobjStatusMessage] = useState<string>('');
  const [linkStatusMessage, setlinkStatusMessage] = useState<string>('');

  const { entityId, goalDetails } = useGlobalContext();

  const onCaptureGoalSubmit = async (inputs: CaptureGoalData) => {
    let goalResp: any = null;
    let objResp: any = null;
    let linkResp: any = null;

    const createGoalPayload = goalsPayLoad(goalDetails.name, inputs);

    const createObjectivePayload = objectivePayLoad(goalDetails.name);

    try {
      goalResp = await postGoalCreation(createGoalPayload, entityId);
      if (goalResp) {
        setgoalStatusMessage(
          `Successfully created goal 
          with description ${goalResp?.fields?.description} 
          and goal index ID: ${goalResp?.index}`
        );
      } else {
        setgoalStatusMessage(`Error creating goal`);
      }
    } catch (error) {
      setgoalStatusMessage(`Error creating goal: ${error}`);
    }

    try {
      objResp = await postObjectiveCreation(createObjectivePayload, entityId);
      if (objResp) {
        setobjStatusMessage(
          `Successfully created objective 
           with description ${objResp?.fields?.description} 
           and obj index ID: ${objResp?.index}`
        );
      } else {
        setobjStatusMessage(`Error creating objective`);
      }
    } catch (error) {
      setobjStatusMessage(`Error creating objective: ${error}`);
    }

    try {
      linkResp = await postLinkGoalObjective(goalResp?.index, objResp?.index, entityId);
      if (linkResp) {
        setlinkStatusMessage(
          `Successfully linked 
          goal ID: ${goalResp?.index} to 
          objective ID: ${objResp?.index}`
        );
      } else {
        setlinkStatusMessage(
          `Error linking  
          goal ID: ${goalResp?.index} to 
          objective ID: ${objResp?.index}`
        );
      }
    } catch (error) {
      setlinkStatusMessage(
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
