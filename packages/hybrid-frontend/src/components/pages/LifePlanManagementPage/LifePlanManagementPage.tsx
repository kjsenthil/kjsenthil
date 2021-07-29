import * as React from 'react';
import { navigate } from 'gatsby';
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
import { FormInput, RadioGroup, TypographyWithTooltip } from '../../molecules';
import { StepCard } from '../../organisms';
import { GoalCreationLayout } from '../../templates';
import { RootState } from '../../../store';
import { InputFieldsKeys } from '../../../services/goal/machines/lifePlan';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { GoalCategory, GoalDefaults } from '../../../services/goal';

import AccountsTable from '../../organisms/AccountsTable';
import { InfoBox } from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsSimplifiedChartCard/PerformanceProjectionsSimplifiedChartCard.styles';
import PerformanceProjectionsSimplifiedChart from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsSimplifiedChart';
import {
  fetchPerformanceAccountsAggregated,
  PerformanceDataPeriod,
} from '../../../services/performance';
import {
  useProjectionsChartData,
  useDispatchThunkOnRender,
  useLifePlanMachine,
  useUpdateCurrentProjectionsPrerequisites,
} from '../../../hooks';
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

const commonTemplateProps = {
  iconAlt: 'goal image',
  iconSrc: '/goal-graphic.png',
  progressButtonTitle: 'Save',
  title: 'Your life after work',
};

const LifePlanManagementPage = () => {
  const dispatch = useDispatch();

  const {
    performance: { status: performanceStatus },
    investmentAccounts,
    goalCurrentProjections,
    goalTargetProjections,
  } = useSelector((state: RootState) => state);

  const projectionsPrerequisitesPayload = useUpdateCurrentProjectionsPrerequisites();

  const { state: currentState, send, service } = useLifePlanMachine();

  service.onTransition(({ matches }) => {
    if (matches('fundingYourRetirement')) {
      goToLifePlanPage();
    }
  });

  const {
    doesGoalExist,
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
  } = currentState.context;

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

  const tableData = (investmentAccounts.data || []).map(
    ({
      id,
      accountName = '',
      accountType = '',
      accountTotalNetContribution,
      monthlyInvestment = 0,
      periodReturn,
    }) => ({
      id,
      accountType,
      accountName,
      accountTotalNetContribution,
      monthlyInvestment,
      periodReturn,
    })
  );

  const footerData = [
    'TOTAL',
    formatCurrency(
      tableData.reduce((totalVal, currVal) => totalVal + currVal.accountTotalNetContribution, 0)
    ),
    formatCurrency(
      tableData.reduce((totalVal, currVal) => totalVal + currVal.monthlyInvestment, 0)
    ),
  ];

  const drawdownStartYear = drawdownStartDate?.getFullYear() ?? '';
  const drawdownEndYear = drawdownEndDate?.getFullYear() ?? '';

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
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleMonthlyIncomeChange = (event: React.ChangeEvent<any>) => {
    send('SET_INCOME', {
      payload: {
        monthlyIncome: Number(event.target.value || 0),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleGoalDelete = () => {
    send('DELETE');
  };

  const displayError = (field: InputFieldsKeys) =>
    currentState.matches('planningYourRetirement.invalid') ? errors?.[field] : undefined;

  const numberFormatOptions = { opts: { minimumFractionDigits: 0, maximumFractionDigits: 0 } };

  const isLoading = [
    'planningYourRetirement.saving',
    'planningYourRetirement.deleting',
    'planningYourRetirement.processingInput',
    'planningYourRetirement.bootstrapping',
  ].some((state) => currentState.matches(state));

  return (
    <GoalCreationLayout
      {...commonTemplateProps}
      onCancelHandler={goToLifePlanPage}
      onDeleteHandler={doesGoalExist ? handleGoalDelete : undefined}
      isLoading={isLoading}
      progressEventHandler={() => send('SAVE')}
    >
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <StepCard
            title="When would you like to access your retirement income?"
            step={1}
            digitalCoachBoxProps={{
              title: 'It might help to know...',
              description: `You’re planning to retire over ${pluralize(
                'year',
                drawdownPeriodLengthYears,
                true
              )}. That’s ${drawdownPeriodDeviationFromAverageComparison} most people.`,
            }}
          >
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
                  <Spacer y={0.5} />
                  <Typography>That&#39;s year {drawdownStartYear}</Typography>
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
                  <Spacer y={0.5} />
                  <Typography>That&#39;s year {drawdownEndYear}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </StepCard>
        </Grid>

        <Grid item xs={12} md={10}>
          <Spacer y={3} />
          <StepCard
            title="What would you like your retirement income to be?"
            step={2}
            digitalCoachBoxProps={{
              title: 'It might help to know...',
              description:
                'Most people are comfortable in retirement on 60% of their working income.',
            }}
          >
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
                  {!!annualIncome && (
                    <>
                      <Spacer y={1} />
                      <InflationAdjustedIncomeDescription amount={annualIncomeInTomorrowsMoney} />
                    </>
                  )}
                </Grid>
                <EqualSignWrapper item xs={1}>
                  <Typography variant="h4" color="grey" component="span">
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
                  {!!monthlyIncome && (
                    <>
                      <Spacer y={1} />
                      <InflationAdjustedIncomeDescription amount={monthlyIncomeInTomorrowsMoney} />
                    </>
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
            digitalCoachBoxProps={{
              title: 'It might help to know...',
              description:
                'At retirement, you can normally take up to 25% of your pension from age 57 as a tax free cash lump sum.',
            }}
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
            digitalCoachBoxProps={{
              title: 'It might help to know...',
              description:
                'Some people like to leave some money to their family or just have a buffer at the end of their planned retirement.',
            }}
            horizontalLayout={false}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box marginY={1}>
                  <InfoBox>
                    <Typography variant="b2" color="grey" colorShade="dark1">
                      {"You're on track to have "}
                      <b>{formatPercent(onTrackProgress ?? 0, numberFormatOptions)}</b>
                      {" of your target by the time you're "}
                      <b>{drawdownStartAge}</b>.
                      {onTrackDiffAmount === 0 && (
                        <>
                          {` That's a ${onTrackDiffAmount > 0 ? 'surplus' : 'shortfall'} of `}
                          <b>{formatCurrency(onTrackDiffAmount, numberFormatOptions)}</b>.
                        </>
                      )}
                    </Typography>
                    <Box marginY={1}>
                      <Divider />
                    </Box>
                    <Typography variant="b2" color="grey" colorShade="dark1">
                      {"You're likely to have "}
                      <b>
                        {formatCurrency(
                          goalCurrentProjections?.data?.possibleDrawdown || 0,
                          numberFormatOptions
                        )}
                      </b>
                      {' to spend each month, or '}
                      <b>
                        {formatCurrency(
                          goalCurrentProjections?.data?.marketUnderperform.affordableDrawdown || 0,
                          numberFormatOptions
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
                  period={PerformanceDataPeriod['5Y']}
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
