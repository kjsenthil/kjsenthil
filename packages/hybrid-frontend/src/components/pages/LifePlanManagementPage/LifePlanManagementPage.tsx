import * as React from 'react';
import { useMachine } from '@xstate/react';
import { useSelector } from 'react-redux';
import pluralize from 'pluralize';
import { Grid, Spacer, Typography, FormControlLabel, Radio, Tooltip } from '../../atoms';
import { FormInput, MainCard, RadioGroup } from '../../molecules';
import { GoalCreationLayout } from '../../templates';
import { RootState } from '../../../store';
import {
  lifePlanContext,
  lifePlanMachine,
  lifePlanMachineActions,
  lifePlanMachineServices,
} from '../../../services/goal/machines/lifePlan';
import { formatCurrency } from '../../../utils/formatters';

const AVERAGE_DRAWDOWN_PERIOD_IN_YEARS = 22;
const FROM_AGE = 65;
const TO_AGE = 87;

interface FormCardProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

const FormCard = ({ step, title, children }: FormCardProps) => (
  <MainCard>
    <Grid container direction="row" spacing={3}>
      <Grid item xs={1}>
        <Typography variant="h3" component="h2" color="primary">
          {step}.
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h4" component="h3">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6} container direction="column" spacing={2}>
        {children}
      </Grid>
    </Grid>
  </MainCard>
);

const InflationAdjustedIncomeDescription = ({ amount }: { amount: number }) => (
  <Typography variant="b3">That&#39;s {formatCurrency(amount)} in tomorrow&#39;s money</Typography>
);

const LifePlanManagementPage = () => {
  const { client } = useSelector((state: RootState) => ({
    client: state.client.data,
  }));

  const [current, send] = useMachine(
    lifePlanMachine
      .withConfig({ actions: lifePlanMachineActions, services: lifePlanMachineServices })
      .withContext({
        ...lifePlanContext,
        userDateOfBirth: new Date(client?.attributes.dateOfBirth!),
        drawdownStartAge: FROM_AGE,
        drawdownEndAge: TO_AGE,
        expectedReturnOfTAA: 0.043,
        inflation: 0.02,
      }),
    { devTools: true }
  );

  const {
    drawdownStartDate,
    drawdownStartAge,
    drawdownEndAge,
    drawdownEndDate,
    drawdownPeriodLengthYears,
    annualIncome,
    monthlyIncome,
    annualIncomeIntomorrowsMoney,
    monthlyIncomeIntomorrowsMoney,
  } = current.context;

  const drawdownPeriodDeviationFromAverage =
    drawdownPeriodLengthYears - AVERAGE_DRAWDOWN_PERIOD_IN_YEARS;

  let drawdownPeriodDeviationFromAverageComparision = '';

  if (drawdownPeriodDeviationFromAverage === 0) {
    drawdownPeriodDeviationFromAverageComparision = 'the same as';
  } else if (drawdownPeriodDeviationFromAverage > 0) {
    drawdownPeriodDeviationFromAverageComparision = `${Math.abs(
      drawdownPeriodDeviationFromAverage
    )} more than`;
  } else {
    drawdownPeriodDeviationFromAverageComparision = `${Math.abs(
      drawdownPeriodDeviationFromAverage
    )} less than`;
  }

  const handleFromAgeChange = (event: React.ChangeEvent<any>) => {
    send('SET_DRAWDOWN_AGES', {
      payload: {
        drawdownStartAge: Number(event.target.value),
        drawdownEndAge,
      },
    });
  };

  const handleToAgeChange = (event: React.ChangeEvent<any>) => {
    send('SET_DRAWDOWN_AGES', {
      payload: {
        drawdownStartAge,
        drawdownEndAge: Number(event.target.value),
      },
    });
  };

  const handleAnnualIncomeChange = (event: React.ChangeEvent<any>) => {
    send('SET_INCOME', {
      payload: {
        annualIncome: Number(event.target.value || 0),
      },
    });
  };

  const handleMonthlyIncomeChange = (event: React.ChangeEvent<any>) => {
    send('SET_INCOME', {
      payload: {
        monthlyIncome: Number(event.target.value || 0),
      },
    });
  };

  return (
    <GoalCreationLayout
      iconAlt="goal image"
      iconSrc="/goal-graphic.png"
      onCancelHandler={() => {}}
      onDeleteHandler={() => {}}
      progressButtonTitle="Next"
      progressEventHandler={() => send('SAVE')}
      title="Your life after work"
    >
      <Grid container justify="center">
        <Grid item xs={10}>
          <FormCard title="When would you like to take your retirement income?" step={1}>
            <Grid item container direction="row">
              <FormInput
                label="From age"
                name="from-age"
                type="number"
                onChange={handleFromAgeChange}
                value={drawdownStartAge || undefined}
              />
              <Spacer x={3} />
              <FormInput
                label="To age"
                name="to-age"
                type="number"
                onChange={handleToAgeChange}
                value={drawdownEndAge || undefined}
              />
            </Grid>
            <Grid item xs={12}>
              {drawdownStartDate && drawdownEndDate && (
                <Typography variant="b3">
                  From {drawdownStartDate.getFullYear()} to {drawdownEndDate.getFullYear()}.
                  That&#39;s {pluralize('year', drawdownPeriodLengthYears, true)}, which is{' '}
                  {drawdownPeriodDeviationFromAverageComparision} most people.
                </Typography>
              )}
            </Grid>
          </FormCard>
        </Grid>
        <Grid item xs={10} container>
          <Spacer y={3} />
          <FormCard title="How much would you like your retirement to be?" step={2}>
            <Grid item container direction="row" alignItems="baseline" justify="space-between">
              <Grid item xs={5}>
                <FormInput
                  label="Annual income"
                  name="annual-income"
                  type="number"
                  onChange={handleAnnualIncomeChange}
                  value={String(Math.round(annualIncome * 100) / 100 || '')}
                />
                <Spacer y={1} />
                {!!annualIncome && (
                  <InflationAdjustedIncomeDescription amount={annualIncomeIntomorrowsMoney} />
                )}
              </Grid>
              <Grid item>
                <Typography variant="h4" color="grey" component="span">
                  =
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <FormInput
                  label="Monthly income"
                  name="monthly-income"
                  type="number"
                  onChange={handleMonthlyIncomeChange}
                  value={String(annualIncome > 0 ? Math.round(monthlyIncome * 100) / 100 : '')}
                />
                <Spacer y={1} />
                {!!monthlyIncome && (
                  <InflationAdjustedIncomeDescription amount={monthlyIncomeIntomorrowsMoney} />
                )}
              </Grid>
            </Grid>
          </FormCard>
        </Grid>
        <Grid item xs={10}>
          <Spacer y={3} />
          <FormCard
            title="Would you like to include the full State Pension in your estimated income?"
            step={3}
          >
            <Grid item container direction="row">
              <Tooltip arrow enterDelay={100} leaveDelay={300} placement="top" title="Coming soon">
                <span>
                  <RadioGroup row>
                    <>
                      <FormControlLabel value="true" control={<Radio disabled />} label="Yes" />
                      <FormControlLabel value="false" control={<Radio disabled />} label="No" />
                    </>
                  </RadioGroup>
                </span>
              </Tooltip>
            </Grid>
          </FormCard>
        </Grid>
      </Grid>
    </GoalCreationLayout>
  );
};

export default LifePlanManagementPage;
