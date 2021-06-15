/* eslint-disable no-nested-ternary */
import React from 'react';
import { useStaticQuery, navigate, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import {
  Box,
  Button,
  Link,
  Icon,
  Grid,
  Typography,
  Spacer,
  useTheme,
  useMediaQuery,
} from '../../atoms';
import { MyAccountLayout } from '../../templates';
import { ChartPeriodSelection, Legend, MainCard } from '../../molecules';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { useContributionsData, usePerformanceData } from '../../../services/performance/hooks';
import { getPerformanceContact, setPerformanceDataPeriod } from '../../../services/performance';
import PerformanceSimplifiedChart from '../../organisms/PerformanceChart/PerformanceSimplifiedChart';
import humanizePeriodLabel from '../../../utils/chart/humanizePeriodLabel';
import { RootState } from '../../../store';
import { useBasicInfo, useDispatchThunkOnRender } from '../../../hooks';
import { usePerformanceChartDimension } from '../../organisms/PerformanceChart/performanceChartDimension/usePerformanceChartDimension';
import { GoalRequestPayload, GoalStatus } from '../../../services/goal';
import { createGoal } from '../../../services/goal/thunks';

export enum PerformanceDataPeriod {
  '1M' = '1m',
  '3M' = '3m',
  '6M' = '6m',
  '1Y' = '1y',
  '5Y' = '5y',
}

const HomePage = () => {
  const {
    auth: { contactId },
    performance: { status: performanceStatus, performanceDataPeriod, performanceError },
  } = useSelector((state: RootState) => state);

  const images = useStaticQuery(graphql`
    query AssetsImages {
      lifePlan: file(relativePath: { eq: "lifePlan.png" }) {
        childImageSharp {
          fluid(maxHeight: 525, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

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
  const dispatchGetPerformanceContact = () =>
    dispatch(getPerformanceContact({ contactId: contactId ?? '' }));
  const { maxRetriesHit: performanceFetchMaxRetriesHit } = useDispatchThunkOnRender(
    dispatchGetPerformanceContact,
    performanceStatus,
    {
      enabled: !!contactId && !!performanceData,
    }
  );

  const totalContributed = contributionsData.length
    ? contributionsData[contributionsData.length - 1].value - contributionsData[0].value
    : 0;

  const totalPerformance = performanceData.length
    ? performanceData[contributionsData.length - 1].value - performanceData[0].value
    : 0;

  const totalReturn = totalPerformance - totalContributed;

  const totalReturnPercentage =
    totalPerformance && totalContributed ? totalPerformance / totalContributed - 1 : 0;

  const setDataPediod = (period: string) => {
    dispatch(setPerformanceDataPeriod(period));
  };

  const renderChartPeriodSelection = (
    <ChartPeriodSelection
      currentPeriod={performanceDataPeriod}
      performanceDataPeriod={PerformanceDataPeriod}
      setCurrentPeriod={setDataPediod}
    />
  );

  React.useEffect(() => {
    setDataPediod(PerformanceDataPeriod['5Y']);
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
      onClick={() => navigate('/my-account/life-plan-management')}
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
    const currDateFormat = new Date().toISOString().split('T')[0];

    const defaultPayload: GoalRequestPayload = {
      fields: {
        description: 'just show me my projection',
        status: GoalStatus.UNFULFILLED,
        category: 9999,
        capture_date: {
          _val: currDateFormat,
          _type: 'Date',
        },
        owner: 'client',
      },
    };

    dispatch(createGoal({ payload: defaultPayload }));
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
          <MainCard
            title={`${basicInfo.firstName}'s life plan`}
            respondTo="sm"
            renderActionEl={renderManageMyLifePlan}
          >
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography variant="b2" color="primary" colorShade="dark2">
                  Save enough money for your most important moments by adding them to your life
                  plan.
                </Typography>
                <Spacer y={3} />
                <Img
                  fluid={images.lifePlan.childImageSharp.fluid}
                  alt="Lifeplan chart placeholder"
                />
              </Grid>
              <Grid item xs={12}>
                <Spacer y={3} />
                <Typography variant="sh3" color="primary" colorShade="dark2">
                  What&#39;s important to you
                </Typography>
                <Spacer y={3} />
              </Grid>

              <Grid container item justify="space-between" spacing={1}>
                <Grid item xs={4}>
                  <Button fullWidth variant="outlined" color="primary">
                    Retirement
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant="outlined" color="primary">
                    Buying a home
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant="outlined" color="primary">
                    My Child&#39;s education
                  </Button>
                </Grid>
                <Grid container item justify="space-between" spacing={1}>
                  <Grid item xs={4}>
                    <Button fullWidth variant="outlined" color="primary">
                      Starting a business
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button fullWidth variant="outlined" color="primary">
                      Emergency fund
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button fullWidth variant="outlined" color="primary">
                      Something else
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container alignItems="center" justify="center">
                <Grid item>
                  <Spacer y={2} />
                  <Link onClick={createDefaultGoalHandler}>
                    I don&#39;t have a specific goal. Just show me my projections.
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </MyAccountLayout>
  );
};

export default HomePage;
