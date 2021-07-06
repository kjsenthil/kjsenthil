import * as React from 'react';
import { navigate } from 'gatsby';
import { useMachine } from '@xstate/react';
import { useDispatch, useSelector } from 'react-redux';
import pluralize from 'pluralize';
import styled from 'styled-components';
import {
  Grid,
  Spacer,
  Typography,
  FormControlLabel,
  Radio,
  Tooltip,
  Divider,
  Box,
} from '../../atoms';
import { FormInput, StepCard, RadioGroup, TypographyWithTooltip } from '../../molecules';
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
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { GoalCategory, GoalDefaults, GoalType, postGoalCreation } from '../../../services/goal';

import useAllAssets from '../../../services/assets/hooks/useAllAssets';
import { callPostUpdateCurrentProjections } from '../../../services/projections/asyncCallers';
import useAccountBreakdownInfo from '../../../hooks/useAccountBreakdownInfo';

import AccountsTable from '../../organisms/AccountsTable';
import { InfoBox } from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsSimplifiedChartCard/PerformanceProjectionsSimplifiedChartCard.styles';
import PerformanceProjectionsSimplifiedChart from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsSimplifiedChart';
import { fetchPerformanceAccountsAggregated } from '../../../services/performance';
import { useProjectionsChartData, useDispatchThunkOnRender } from '../../../hooks';
import { NavPaths } from '../../../config/paths';

const InflationAdjustedIncomeDescription = ({ amount }: { amount: number }) => (
  <TypographyWithTooltip tooltip="Some description">
    That&#39;s {formatCurrency(amount, { opts: { maximumFractionDigits: 0 } })} in tomorrow&#39;s
    money
  </TypographyWithTooltip>
);

const EqualSignWrapper = styled(Grid)`
  text-align: center;
`;

const goToLifePlanPage = () => navigate(NavPaths.LIFE_PLAN_PAGE);

const LifePlanManagementPage = () => {
  const dispatch = useDispatch();

  const {
    client,
    performance: { status: performanceStatus },
    investmentSummary,
    goalCurrentProjections,
    goalTargetProjections,
  } = useSelector((state: RootState) => state);

  const dateOfBirth = client.data?.attributes.dateOfBirth!;

  const { accountBreakdown } = useAccountBreakdownInfo();

  const fundData = useAllAssets();

  const [current, send, service] = useMachine(
    lifePlanMachine
      .withConfig({
        actions: lifePlanMachineActions,
        guards: lifePlanMachineGuards,
        services: {
          updateCurrentProjections: lifePlanMachineServices.updateCurrentProjections(
            async ({
              clientAge,
              drawdownStartDate,
              drawdownEndDate,
              monthlyIncome,
              lumpSum,
              laterLifeLeftOver,
              shouldIncludeStatePension,
              fees,
            }: LifePlanMachineContext) =>
              callPostUpdateCurrentProjections(dispatch)({
                clientAge,
                drawdownStartDate,
                drawdownEndDate,
                drawdownAmount: monthlyIncome,
                lumpSum,
                laterLifeLeftOver,
                shouldIncludeStatePension,
                fees,
                accountBreakdown,
                investmentSummary: investmentSummary.data,
                includedClientAccounts: client.included,
                fundData,
              })
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
        userDateOfBirth: new Date(dateOfBirth),
        drawdownStartAge: GoalDefaults.DRAW_DOWN_START_AGE,
        drawdownEndAge: GoalDefaults.DRAW_DOWN_END_AGE,
        expectedReturnOfTAA: GoalDefaults.EXPECTED_RETURN_OF_TAA,
        inflation: GoalDefaults.INFLATION,
      }),
    { devTools: true }
  );

  service.onTransition((state) => {
    if (state.matches('fundingYourRetirement')) {
      goToLifePlanPage();
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

  const projectionsData = useProjectionsChartData({
    goalCategory: GoalCategory.RETIREMENT,
    fallbackGoalData: {
      objectiveFrequencyStartAge: drawdownStartAge,
    },
  });

  const dispatchGetPerformanceContact = () => dispatch(fetchPerformanceAccountsAggregated());

  useDispatchThunkOnRender(dispatchGetPerformanceContact, performanceStatus, {
    enabled: !!projectionsData.projectionsData,
  });

  const onTrackProgress = projectionsData.goalsData[0].progress;
  const onTrackDiffAmount =
    (goalTargetProjections.data?.targetGoalAmount || 0) -
    (goalCurrentProjections.data?.projectedGoalAgeTotal || 0);

  const tableData =
    accountBreakdown?.map((breakdownItem) => ({
      accountType: breakdownItem.accountName || '',
      accountName: breakdownItem.accountName || '',
      accountTotalContribution: breakdownItem.accountTotalContribution,
      monthlyInvestment: breakdownItem.monthlyInvestment || 0,
    })) || [];

  const footerData = [
    'TOTAL',
    formatCurrency(
      tableData.reduce((totalVal, currVal) => totalVal + currVal.accountTotalContribution, 0)
    ),
    formatCurrency(
      tableData.reduce((totalVal, currVal) => totalVal + currVal.monthlyInvestment, 0)
    ),
  ];

  const drawdownPeriodDeviationFromAverage =
    drawdownPeriodLengthYears - GoalDefaults.AVERAGE_DRAW_DOWN_PERIOD_IN_YEARS;

  let drawdownPeriodDeviationFromAverageComparison = '';

  if (drawdownPeriodDeviationFromAverage === 0) {
    drawdownPeriodDeviationFromAverageComparison = 'the same as';
  } else if (drawdownPeriodDeviationFromAverage > 0) {
    drawdownPeriodDeviationFromAverageComparison = `${Math.abs(
      drawdownPeriodDeviationFromAverage
    )} more than`;
  } else {
    drawdownPeriodDeviationFromAverageComparison = `${Math.abs(
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
      onCancelHandler={goToLifePlanPage}
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
                    <TypographyWithTooltip tooltip="Some description">
                      From {drawdownStartDate.getFullYear()} to {drawdownEndDate.getFullYear()}.
                      That&#39;s {pluralize('year', drawdownPeriodLengthYears, true)}, which is{' '}
                      {drawdownPeriodDeviationFromAverageComparison} most people.
                    </TypographyWithTooltip>
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
        <Grid item xs={12} md={10}>
          <Spacer y={3} />
          <StepCard
            title="Which accounts would you like to contribute to your retirement pot?"
            step={4}
            horizontalLayout={false}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box marginY={1}>
                  <InfoBox>
                    <Typography variant="b2" color="grey" colorShade="dark1">
                      {"You're on track to have "}
                      <b>{formatPercent(onTrackProgress)}</b>
                      {" of your target by the time you're "}
                      <b>{drawdownStartAge}</b>.
                      {onTrackDiffAmount === 0 && (
                        <>
                          {` That's a ${onTrackDiffAmount > 0 ? 'surplus' : 'shortfall'} of `}
                          <b>{formatCurrency(onTrackDiffAmount)}</b>.
                        </>
                      )}
                    </Typography>
                    <Box marginY={1}>
                      <Divider />
                    </Box>
                    <Typography variant="b2" color="grey" colorShade="dark1">
                      {"You're likely to have "}
                      <b>{formatCurrency(goalCurrentProjections?.data?.possibleDrawdown || 0)}</b>
                      {' to spend each month, or '}
                      <b>
                        {formatCurrency(
                          goalCurrentProjections?.data?.possibleDrawdownWhenMarketUnderperform || 0
                        )}
                      </b>
                      {' if market underperforms '}
                    </Typography>
                  </InfoBox>
                </Box>

                <PerformanceProjectionsSimplifiedChart {...projectionsData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AccountsTable
                  headerRow={[
                    { value: 'ACCOUNT' },
                    { value: 'TOTAL HOLDINGS' },
                    { value: 'MONTHLY CONTRIBUTION' },
                  ]}
                  dataRow={tableData}
                  footerRow={footerData}
                />
              </Grid>
            </Grid>
          </StepCard>
        </Grid>
      </Grid>
    </GoalCreationLayout>
  );
};

export default LifePlanManagementPage;
