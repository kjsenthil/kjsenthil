import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Box, Grid, Spacer, Typography } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import { fetchProjections } from '../../../services/projections';
import PerformanceProjectionsChart from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsChart';
import { usePerformanceProjectionsChartStyles } from '../../organisms/PerformanceProjectionsChart/performanceProjectionsChartStyles/performanceProjectionsChartStyles';
import useProjectionsDataForChart from '../../../services/projections/hooks/useProjectionsDataForChart';
import { useAnnualHistoricalDataForChart } from '../../organisms/PerformanceProjectionsChart/performanceProjectionsData';
import useGoalsDataForChart from '../../../services/goal/hooks/useGoalsDataForChart';
import useProjectionsMetadataForChart from '../../../services/projections/hooks/useProjectionsMetadataForChart';
import { formatCurrency } from '../../../utils/formatters';
import {
  useContributionsData,
  usePerformanceData,
  usePerformanceDataPeriod,
} from '../../../services/performance/hooks';
import { getPerformanceContact, setPerformanceDataPeriod } from '../../../services/performance';
import PerformanceChart from '../../organisms/PerformanceChart';
import { RootState } from '../../../store';
import { useDispatchThunkOnRender } from '../../../hooks';
import { usePerformanceChartDimension } from '../../organisms/PerformanceChart/performanceChartDimension/usePerformanceChartDimension';
import useAllAssets from '../../../services/assets/hooks/useAllAssets';

const DashPage = () => {
  const {
    auth: { contactId },
    client: { included: clientData },
    investmentSummary: { data: investmentSummaryData },
    performance: { status: performanceStatus, performanceError },
    projections: { status: projectionsStatus, postProjectionsError: projectionsError },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  // Historical performance data
  const performanceData = usePerformanceData();
  const contributionsData = useContributionsData();
  const performanceDataPeriod = usePerformanceDataPeriod();
  const performanceChartDimension = usePerformanceChartDimension();
  const hasDataForPerformanceChart = performanceData.length > 0 && contributionsData.length > 0;

  // Projected performance data
  const projectionsData = useProjectionsDataForChart();
  const annualHistoricalData = useAnnualHistoricalDataForChart();
  const goalsData = useGoalsDataForChart();
  const projectionsMetadata = useProjectionsMetadataForChart();
  const performanceProjectionsChartStyles = usePerformanceProjectionsChartStyles();
  const hasDataForProjectionsChart =
    projectionsData.length > 0 &&
    annualHistoricalData.length > 0 &&
    goalsData.length > 0 &&
    projectionsMetadata;

  const fundData = useAllAssets();

  // Fetch projections data for projections chart
  const dispatchFetchProjections = () =>
    dispatch(
      fetchProjections({ fundData, investmentPeriod: projectionsMetadata?.investmentPeriod ?? 0 })
    );
  const { maxRetriesHit: projectionsFetchMaxRetriesHit } = useDispatchThunkOnRender(
    dispatchFetchProjections,
    projectionsStatus,
    {
      enabled: fundData && clientData && investmentSummaryData && !!projectionsMetadata,
    }
  );

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

  return (
    <MyAccountLayout
      heading={(basicInfo) => ({
        primary: `You have ${formatCurrency(basicInfo.totalInvested)}`,
        secondary: `Hi ${basicInfo.firstName},`,
        tertiary: `${formatCurrency(basicInfo.totalGainLoss)} total ${
          basicInfo.totalGainLoss >= 0 ? 'gain' : 'loss'
        }`,
      })}
    >
      <Typography variant="h2">XO projection spike</Typography>
      <Spacer y={2} />
      <Grid container spacing={3}>
        {/* Performance chart */}
        <Grid item xs={12}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {hasDataForPerformanceChart ? (
            <Box p={2}>
              <PerformanceChart
                performanceData={performanceData}
                contributionsData={contributionsData}
                periodSelectionProps={{
                  currentPeriod: performanceDataPeriod,
                  setCurrentPeriod: (newPeriod) => dispatch(setPerformanceDataPeriod(newPeriod)),
                }}
              />
            </Box>
          ) : performanceFetchMaxRetriesHit && performanceError ? (
            <Typography>{performanceError}</Typography>
          ) : (
            <Skeleton height={performanceChartDimension.height} />
          )}
        </Grid>

        {/* Projections chart */}
        <Grid item xs={12}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {hasDataForProjectionsChart && projectionsMetadata ? (
            <Box p={2}>
              <PerformanceProjectionsChart
                projectionsData={projectionsData}
                annualHistoricalData={annualHistoricalData}
                goalsData={goalsData}
                projectionsMetadata={projectionsMetadata}
              />
            </Box>
          ) : projectionsFetchMaxRetriesHit && projectionsError ? (
            <Typography>{projectionsError}</Typography>
          ) : (
            <Skeleton height={performanceProjectionsChartStyles.DIMENSION.DESKTOP.height} />
          )}
        </Grid>
      </Grid>
    </MyAccountLayout>
  );
};

export default DashPage;
