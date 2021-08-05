/* eslint-disable no-nested-ternary */
import React from 'react';
import { navigate } from 'gatsby';
import Img from 'gatsby-image';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import {
  formatCurrency,
  formatPercent,
  CurrencyPresentationVariant,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import { Box, Button, Grid, Icon, Spacer, Typography, useMediaQuery, useTheme } from '../../atoms';
import { ChartPeriodSelection, Legend, MainCard } from '../../molecules';
import { FeatureToggle } from '../../particles';
import { GoalMainCardPlaceholder, PerformanceSimplifiedChart } from '../../organisms';
import { usePerformanceChartDimension } from '../../organisms/PerformanceChart/hooks';
import { MyAccountLayout } from '../../templates';
import { RootState } from '../../../store';
import {
  fetchPerformanceAccountsAggregated,
  PerformanceDataPeriod,
  setPerformanceDataPeriod,
} from '../../../services/performance';
import humanizePeriodLabel from '../../../utils/chart/humanizePeriodLabel';
import {
  useBasicInfo,
  useContributionsData,
  useGoalImages,
  usePerformanceData,
} from '../../../hooks';
import { FeatureFlagNames } from '../../../constants';
import { createGoal, GoalType } from '../../../services/goal';
import { goalCreationPaths, NavPaths } from '../../../config/paths';

const currencyFormatter = (val: number) =>
  formatCurrency(val, CurrencyPresentationVariant.ACTUAL_TOPLINE);

const percentFormatter = (val: number) =>
  formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE);

const HomePage = () => {
  const {
    client: { included },
    performance: { performanceDataPeriod, error: performanceError },
  } = useSelector((state: RootState) => state);

  const basicInfo = useBasicInfo();

  const dispatch = useDispatch();

  const setDataPeriod = (period: PerformanceDataPeriod) => {
    dispatch(setPerformanceDataPeriod(period));
  };

  const accountIdsJoined =
    included?.map(({ attributes: { accountId } }) => accountId).join(',') ?? '';

  React.useEffect(() => {
    if (accountIdsJoined) {
      dispatch(fetchPerformanceAccountsAggregated());
      setDataPeriod(PerformanceDataPeriod['5Y']);
    }
  }, [accountIdsJoined]);

  const images = useGoalImages();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm' as any));

  const performanceData = usePerformanceData();
  const contributionsData = useContributionsData();
  const performanceChartDimension = usePerformanceChartDimension();
  const hasDataForPerformanceChart = performanceData.length > 0 && contributionsData.length > 0;

  const totalContributed = contributionsData.length
    ? contributionsData[contributionsData.length - 1].value - contributionsData[0].value
    : 0;

  const totalPerformance = performanceData.length
    ? performanceData[performanceData.length - 1].value - performanceData[0].value
    : 0;

  const totalReturn = totalPerformance - totalContributed;

  const totalReturnPercentage =
    totalPerformance && totalContributed ? totalPerformance / totalContributed - 1 : 0;

  const renderChartPeriodSelection = (
    <ChartPeriodSelection
      currentPeriod={performanceDataPeriod}
      performanceDataPeriod={PerformanceDataPeriod}
      setCurrentPeriod={setDataPeriod}
    />
  );

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
      onClick={() => navigate(NavPaths.LIFE_PLAN_PAGE)}
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
          valueFormatter={currencyFormatter}
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
          valueFormatter={currencyFormatter}
          percentageChange={totalReturnPercentage}
          percentageFormatter={percentFormatter}
          shouldAnimate
        />
      </Grid>
    </>
  );

  const createDefaultGoalHandler = () => {
    dispatch(createGoal({ goalType: GoalType.UNCATEGORIZED }));
  };

  const { firstName, totalInvested, totalGainLoss } = basicInfo;
  return (
    <MyAccountLayout
      basicInfo={basicInfo}
      heading={{
        primary: `You have ${currencyFormatter(totalInvested)}`,
        secondary: `Hi ${firstName},`,
        tertiary: `${currencyFormatter(totalGainLoss)} total ${
          totalGainLoss >= 0 ? 'gain' : 'loss'
        }`,
      }}
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
                ) : performanceError ? (
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
            vertical
            renderActionEl={renderManageMyLifePlan}
            title={`${basicInfo.firstName}'s life plan`}
            buttons={goalCreationPaths}
            imageElement={
              <Img fluid={images.lifePlan.childImageSharp.fluid} alt="Lifeplan chart placeholder" />
            }
            onAddGoal={(path) => navigate(path)}
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
