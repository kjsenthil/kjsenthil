import { navigate } from 'gatsby';
import React, { useState } from 'react';
import postGoalCreation from '../../../api/postGoalCreation';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { Grid, Card, CardContent, Typography } from '../../atoms';
import { Alert } from '../../molecules';
import { CaptureGoal } from '../../organisms';
import { MyAccountLayout } from '../../templates';

const SelectInputsPage = () => {
  const [statusMessage, setstatusMessage] = useState<string>('');

  const { entityId } = useGlobalContext();

  const onCaptureGoalSubmit = async (inputs: any) => {
    try {
      const currDate = new Date();
      const currDateMonth = `${`0${currDate.getMonth() + 1}`.slice(
        -2
      )}-${`0${currDate.getDate()}`.slice(-2)}`;

      const goalsPayload = {
        fields: {
          target_amount: {
            _val: {
              code: 'GBP',
              value: {
                _val: inputs?.targetAmount,
                _type: 'BigDecimal',
              },
            },
            _type: 'Currency',
          },
          target_date: {
            _val: `${inputs?.targetYear}-${currDateMonth}`,
            _type: 'Date',
          },
          initial_investment: {
            _val: {
              code: 'GBP',
              value: {
                _val: inputs?.upfrontInvestment,
                _type: 'BigDecimal',
              },
            },
            _type: 'Currency',
          },
          regular_saving: {
            _val: {
              code: 'GBP',
              value: {
                _val: inputs?.monthlyInvestment,
                _type: 'BigDecimal',
              },
            },
            _type: 'Currency',
          },
          goal_level_risk_tolerance: inputs?.riskAppetite,
        },
      };

      const goalResp = await postGoalCreation(goalsPayload, entityId);

      if (goalResp) {
        setstatusMessage(`Created goal successfully with goal index ID : ${goalResp.index}`);
      } else {
        setstatusMessage(`Error creating the goal with entity ID: ${entityId}`);
      }

      navigate('/gmvp/sim');
    } catch (e) {
      setstatusMessage(`Error: ${e}`);
    }
  };

  return (
    <MyAccountLayout stretch>
      <Grid item xs={12} sm={6}>
        <Grid container>
          <Typography variant="h4" gutterBottom>
            Inputs Page
          </Typography>

          <Grid item>
            <Card>
              <CardContent>
                <CaptureGoal onSubmit={onCaptureGoalSubmit} />
              </CardContent>
            </Card>
          </Grid>

          <Typography variant="h5" gutterBottom>
            Entity ID:
            {entityId}
          </Typography>

          <Grid item>
            <Alert>{statusMessage}</Alert>
          </Grid>
        </Grid>
      </Grid>
    </MyAccountLayout>
  );
};
export default SelectInputsPage;
