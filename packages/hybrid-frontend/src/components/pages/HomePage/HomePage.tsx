/* eslint-disable no-nested-ternary */
import React from 'react';
import { navigate } from 'gatsby';
import Img from 'gatsby-image';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Box, Button, Icon, Grid, Typography, Spacer, useTheme, useMediaQuery } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import { ChartPeriodSelection, Legend, MainCard } from '../../molecules';
import { PerformanceSimplifiedChart, GoalMainCardPlaceholder } from '../../organisms';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { fetchPerformanceContact, setPerformanceDataPeriod } from '../../../services/performance';
import humanizePeriodLabel from '../../../utils/chart/humanizePeriodLabel';
import { RootState } from '../../../store';
import {
  useBasicInfo,
  useDispatchThunkOnRender,
  useGoalImages,
  usePerformanceData,
  useContributionsData,
} from '../../../hooks';
import { usePerformanceChartDimension } from '../../organisms/PerformanceChart/hooks/usePerformanceChartDimension';

import { FeatureToggle } from '../../particles';
import { FeatureFlagNames } from '../../../constants';
import { createGoal, GoalType } from '../../../services/goal';

export enum PerformanceDataPeriod {
  '1M' = '1m',
  '3M' = '3m',
  '6M' = '6m',
  '1Y' = '1y',
  '5Y' = '5y',
}

const HomePage = () => {
  const {
    performance: { status: performanceStatus, performanceDataPeriod, error: performanceError },
  } = useSelector((state: RootState) => state);

  const images = useGoalImages();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm' as any));

  const dispatch = useDispatch();

  // Historical performance data: false
  const performanceData = usePerformanceData();
  const contributionsData = useContributionsData();
  const performanceChartDimension = usePerformanceChartDimension();
  const hasDataForPerformanceChart = performanceData.length > 0 && contributionsData.length > 0;

  // Projected performance data
  const basicInfo = useBasicInfo();

  // Fetch performance data for performance chart
  const dispatchGetPerformanceContact = () => dispatch(fetchPerformanceContact());
  const { maxRetriesHit: performanceFetchMaxRetriesHit } = useDispatchThunkOnRender(
    dispatchGetPerformanceContact,
    performanceStatus,
    {
      enabled: !!performanceData,
    }
  );

  const totalContributed = contributionsData.length
    ? contributionsData[contributionsData.length - 1].value - contributionsData[0].value
    : 0;

  const totalPerformance = performanceData.length
    ? performanceData[performanceData.length - 1].value - performanceData[0].value
    : 0;

  const totalReturn = totalPerformance - totalContributed;

  const totalReturnPercentage =
    totalPerformance && totalContributed ? totalPerformance / totalContributed - 1 : 0;

  const setDataPeriod = (period: string) => {
    dispatch(setPerformanceDataPeriod(period));
  };

  const renderChartPeriodSelection = (
    <ChartPeriodSelection
      currentPeriod={performanceDataPeriod}
      performanceDataPeriod={PerformanceDataPeriod}
      setCurrentPeriod={setDataPeriod}
    />
  );

  React.useEffect(() => {
    setDataPeriod(PerformanceDataPeriod['5Y']);
  }, []);

  const renderManageMyInvestmentButton = (fullWidth: boolean) => (
    <Button
      color="gradient"
      startIcon={<Icon fontSize="inherit" name="statistics" />}
      variant="contained"
      fullWidth={fullWidth}
    >
      Manage my investments
    </Button>
  );

  const renderManageMyLifePlan = (fullWidth: boolean) => (
    <Button
      color="gradient"
      startIcon={<Icon fontSize="inherit" name="statistics" />}
      onClick={() => navigate('/my-account/life-plan')}
      variant="contained"
      fullWidth={fullWidth}
    >
      Manage my life plan
    </Button>
  );

  const renderLegendsWithIndicators = (
    <>
      <Grid item xs={6}>
        <Legend
          chartIndicatorProps={{
            color: 'primary',
            variant: 'solid',
          }}
          title="Total Value"
          valueSizeVariant="sh4"
        />
      </Grid>
      <Grid item xs={6}>
        <Legend
          chartIndicatorProps={{
            color: 'secondary',
            variant: 'dashed-3',
          }}
          title="Contribution"
          valueSizeVariant="sh4"
        />
      </Grid>
    </>
  );

  const renderLegendsWithValues = (
    <>
      <Grid item xs={6}>
        <Legend
          title={humanizePeriodLabel(
            performanceDataPeriod,
            (humanizedPeriod) =>
              `LAST ${humanizedPeriod.toUpperCase()}${isMobile ? '\n' : ' '}CONTRIBUTED`
          )}
          valueSizeVariant={isMobile ? 'b2' : 'b1'}
          value={totalContributed}
          valueFormatter={formatCurrency}
          shouldAnimate
        />
      </Grid>
      <Grid item xs={6}>
        <Legend
          title={humanizePeriodLabel(
            performanceDataPeriod,
            (humanizedPeriod) =>
              `LAST ${humanizedPeriod.toUpperCase()}${isMobile ? '\n' : ' '}RETURN`
          )}
          valueSizeVariant={isMobile ? 'b2' : 'b1'}
          value={totalReturn}
          valueFormatter={formatCurrency}
          percentageChange={totalReturnPercentage}
          percentageFormatter={formatPercent}
          shouldAnimate
        />
      </Grid>
    </>
  );

  const createDefaultGoalHandler = () => {
    dispatch(createGoal({ goalType: GoalType.UNCATEGORIZED }));
  };

  return (
    <MyAccountLayout
      heading={({ firstName, totalInvested, totalGainLoss }) => ({
        primary: `You have ${formatCurrency(totalInvested)}`,
        secondary: `Hi ${firstName},`,
        tertiary: `${formatCurrency(totalGainLoss)} total ${totalGainLoss >= 0 ? 'gain' : 'loss'}`,
      })}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MainCard
            title="Past performance"
            respondTo="sm"
            renderActionEl={renderManageMyInvestmentButton}
          >
            <Spacer y={2} />
            <Grid container alignItems="center">
              {!isMobile ? (
                <Grid item container xs={12} direction="column">
                  <Grid container item xs={12} justify="space-between" alignItems="center">
                    <Grid item container sm={5}>
                      {renderChartPeriodSelection}
                    </Grid>
                    <Grid item sm={6} container direction="row" alignItems="flex-end">
                      {renderLegendsWithIndicators}
                    </Grid>
                  </Grid>

                  <Spacer y={3} />
                  <Grid container item xs={12}>
                    {renderLegendsWithValues}
                  </Grid>
                </Grid>
              ) : (
                <Grid item container direction="column" xs={12}>
                  <Grid
                    item
                    xs={12}
                    container
                    display="flex"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    {renderLegendsWithValues}
                  </Grid>
                  <Spacer y={2} />
                  <Grid item container xs={12}>
                    {renderLegendsWithIndicators}
                  </Grid>
                  <Spacer y={3} />
                  <Grid container item xs={12}>
                    {renderChartPeriodSelection}
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                {hasDataForPerformanceChart ? (
                  <Box>
                    <PerformanceSimplifiedChart
                      dataPeriod={performanceDataPeriod}
                      performanceData={performanceData}
                      contributionsData={contributionsData}
                    />
                  </Box>
                ) : performanceFetchMaxRetriesHit && performanceError ? (
                  <Typography>{performanceError}</Typography>
                ) : (
                  <Skeleton height={performanceChartDimension.height} />
                )}
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6}>
          <GoalMainCardPlaceholder
            renderActionEl={renderManageMyLifePlan}
            title={`${basicInfo.firstName}'s life plan`}
            imageElement={
              <Img fluid={images.lifePlan.childImageSharp.fluid} alt="Lifeplan chart placeholder" />
            }
            onRetirementClick={() => navigate('/my-account/life-plan-management')}
            onCreateDefaultGoal={createDefaultGoalHandler}
          />
        </Grid>

        <FeatureToggle flagName={FeatureFlagNames.EXP_FEATURE}>
          <Grid item xs={12}>
            <MainCard title="Experimental Title">
              <Typography>Experimental Content</Typography>
            </MainCard>
          </Grid>
        </FeatureToggle>
      </Grid>
    </MyAccountLayout>
  );
};

export default HomePage;
