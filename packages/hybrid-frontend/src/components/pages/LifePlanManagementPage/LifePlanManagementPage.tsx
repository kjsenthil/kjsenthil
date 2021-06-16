import * as React from 'react';
import { navigate } from 'gatsby';
import { useMachine } from '@xstate/react';
import { useSelector } from 'react-redux';
import pluralize from 'pluralize';
import styled from 'styled-components';
import { Grid, Spacer, Typography, FormControlLabel, Radio, Tooltip } from '../../atoms';
import { FormInput, StepCard, RadioGroup, TypographyWithInfoTooltip } from '../../molecules';
import { GoalCreationLayout } from '../../templates';
import { RootState } from '../../../store';
import {
  InputFieldsKeys,
  lifePlanContext,
  lifePlanMachine,
  lifePlanMachineActions,
  LifePlanMachineContext,
  lifePlanMachineGuards,
  lifePlanMachineServices,
} from '../../../services/goal/machines/lifePlan';
import { formatCurrency } from '../../../utils/formatters';
import { GoalType, postGoalCreation } from '../../../services/goal';

const AVERAGE_DRAWDOWN_PERIOD_IN_YEARS = 22;
const DEFAULT_DRAWDOWN_START_AGE = 65;
const DEFAULT_DRAWDOWN_END_AGE = 87;

const InflationAdjustedIncomeDescription = ({ amount }: { amount: number }) => (
  <TypographyWithInfoTooltip tooltip="Some description">
    That&#39;s {formatCurrency(amount, { opts: { maximumFractionDigits: 0 } })} in tomorrow&#39;s
    money
  </TypographyWithInfoTooltip>
);

const EqualSignWrapper = styled(Grid)`
  text-align: center;
`;

const LifePlanManagementPage = () => {
  const { client } = useSelector((state: RootState) => ({
    client: state.client.data,
  }));

  const goToHome = () => navigate('/my-account');
  const [current, send, service] = useMachine(
    lifePlanMachine
      .withConfig({
        actions: lifePlanMachineActions,
        guards: lifePlanMachineGuards,
        services: {
          updateCurrentProjections: lifePlanMachineServices.updateCurrentProjections(() =>
            // Placeholder: Dispatch /Projections/current-projection here
            Promise.resolve()
          ),
          saveRetirementPlan: lifePlanMachineServices.saveRetirementPlan(
            async ({ drawdownStartAge, drawdownEndAge, monthlyIncome }: LifePlanMachineContext) =>
              postGoalCreation({
                goalType: GoalType.RETIREMENT,
                inputs: {
                  drawdownStartAge,
                  drawdownEndAge,
                  regularDrawdown: monthlyIncome,
                },
              })
          ),
        },
      })
      .withContext({
        ...lifePlanContext,
        userDateOfBirth: new Date(client?.attributes.dateOfBirth!),
        drawdownStartAge: DEFAULT_DRAWDOWN_START_AGE,
        drawdownEndAge: DEFAULT_DRAWDOWN_END_AGE,
        expectedReturnOfTAA: 0.043,
        inflation: 0.02,
      }),
    { devTools: true }
  );

  service.onTransition((state) => {
    if (state.matches('fundingYourRetirement')) {
      goToHome();
    }
  });

  const {
    drawdownStartDate,
    drawdownStartAge,
    drawdownEndAge,
    drawdownEndDate,
    drawdownPeriodLengthYears,
    annualIncome,
    monthlyIncome,
    annualIncomeInTomorrowsMoney,
    monthlyIncomeInTomorrowsMoney,
    errors,
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

  const displayError = (field: InputFieldsKeys) =>
    current.matches('planningYourRetirement.invalid') ? errors?.[field] : undefined;

  return (
    <GoalCreationLayout
      iconAlt="goal image"
      iconSrc="/goal-graphic.png"
      onCancelHandler={goToHome}
      progressButtonTitle="Save"
      isLoading={current.matches('planningYourRetirement.saving')}
      progressEventHandler={() => send('SAVE')}
      title="Your life after work"
    >
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <StepCard title="When would you like to take your retirement income?" step={1}>
            <Grid item container direction="column" spacing={1}>
              <Grid item container justify="space-between" spacing={2}>
                <Grid item xs={6}>
                  <FormInput
                    label="From age"
                    name="from-age"
                    type="number"
                    hideNumberSpinButton
                    fullWidth
                    onChange={handleFromAgeChange}
                    error={displayError('drawdownStartAge')}
                    value={drawdownStartAge || undefined}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    label="To age"
                    name="to-age"
                    type="number"
                    hideNumberSpinButton
                    fullWidth
                    onChange={handleToAgeChange}
                    error={displayError('drawdownEndAge')}
                    value={drawdownEndAge || undefined}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {drawdownStartDate &&
                  drawdownEndDate &&
                  !current.matches('planningYourRetirement.invalid') && (
                    <TypographyWithInfoTooltip tooltip="Some description">
                      From {drawdownStartDate.getFullYear()} to {drawdownEndDate.getFullYear()}.
                      That&#39;s {pluralize('year', drawdownPeriodLengthYears, true)}, which is{' '}
                      {drawdownPeriodDeviationFromAverageComparision} most people.
                    </TypographyWithInfoTooltip>
                  )}
              </Grid>
            </Grid>
          </StepCard>
        </Grid>
        <Grid item xs={12} md={10}>
          <Spacer y={3} />
          <StepCard title="How much would you like your retirement to be?" step={2}>
            <Grid item container direction="column" spacing={2}>
              <Grid item container alignItems="baseline" justify="space-between">
                <Grid item xs={12} md={5}>
                  <FormInput
                    label="Annual income"
                    name="annual-income"
                    type="number"
                    hideNumberSpinButton
                    onChange={handleAnnualIncomeChange}
                    fullWidth
                    error={displayError('annualIncome')}
                    value={String(annualIncome || '')}
                  />
                  <Spacer y={1} />
                  {!!annualIncome && (
                    <InflationAdjustedIncomeDescription amount={annualIncomeInTomorrowsMoney} />
                  )}
                </Grid>
                <EqualSignWrapper item xs={1}>
                  <Typography center variant="h4" color="grey" component="span">
                    =
                  </Typography>
                </EqualSignWrapper>
                <Grid item xs={12} md={5}>
                  <FormInput
                    label="Monthly income"
                    name="monthly-income"
                    type="number"
                    hideNumberSpinButton
                    onChange={handleMonthlyIncomeChange}
                    fullWidth
                    error={displayError('monthlyIncome')}
                    value={String(annualIncome > 0 ? monthlyIncome : '')}
                  />
                  <Spacer y={1} />
                  {!!monthlyIncome && (
                    <InflationAdjustedIncomeDescription amount={monthlyIncomeInTomorrowsMoney} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </StepCard>
        </Grid>
        <Grid item xs={12} md={10}>
          <Spacer y={3} />
          <StepCard
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
          </StepCard>
        </Grid>
      </Grid>
    </GoalCreationLayout>
  );
};

export default LifePlanManagementPage;
