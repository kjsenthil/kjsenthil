import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Box, Button, Grid, Icon, Spacer, Typography } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import SummaryPanel from '../../organisms/SummaryPanel/SummaryPanel';
import PerformanceChart from '../../organisms/PerformanceChart';
import { AccountsTableHeader } from '../../../constants';
import AccountsTable from '../../organisms/AccountsTable';
import { usePerformanceChartDimension } from '../../organisms/PerformanceChart/hooks';
import {
  fetchPerformanceAccountsAggregated,
  setPerformanceDataPeriod,
  PerformanceDataPeriod,
} from '../../../services/performance';
import {
  useDispatchThunkOnRender,
  usePerformanceData,
  useContributionsData,
  usePerformanceDataPeriod,
  useAccountBreakdownInfo,
  useBasicInfo,
} from '../../../hooks';
import { RootState } from '../../../store';
import { axisBottomConfig } from '../../../config/chart';
import { ChartPeriodSelection, DisabledComponent, MainCard } from '../../molecules';
import { formatCurrency } from '../../../utils/formatters';

const BIAccountsPage = () => {
  const {
    performance: { status: performanceStatus, error: performanceError },
  } = useSelector((state: RootState) => state);

  const basicInfo = useBasicInfo();
  const { accountsSummary, accountBreakdown } = useAccountBreakdownInfo();

  const dispatch = useDispatch();

  // Historical performance data
  const performanceData = usePerformanceData();
  const contributionsData = useContributionsData();
  const performanceDataPeriod = usePerformanceDataPeriod();
  const performanceChartDimension = usePerformanceChartDimension();
  const hasDataForPerformanceChart = performanceData.length > 0 && contributionsData.length > 0;

  const dispatchGetPerformanceContact = () => dispatch(fetchPerformanceAccountsAggregated());
  const { maxRetriesHit: performanceFetchMaxRetriesHit } = useDispatchThunkOnRender(
    dispatchGetPerformanceContact,
    performanceStatus,
    {
      enabled: !!performanceData,
    }
  );

  const summaryContributions =
    accountBreakdown?.reduce(
      (totalContr, acctObj) => acctObj.accountTotalNetContribution + totalContr,
      0
    ) || 0;

  const accountsTableData =
    accountBreakdown?.filter((breakItem) => breakItem.accountType === 'accounts') || [];

  const linkedAccountsTableData =
    accountBreakdown?.filter((breakItem) => breakItem.accountType === 'linked-accounts') || [];

  const setDataPeriod = (period: string) => {
    dispatch(setPerformanceDataPeriod(period));
  };

  return (
    <MyAccountLayout
      basicInfo={basicInfo}
      heading={{
        primary: `${basicInfo.firstName}'s`,
        secondary: `Investments`,
      }}
    >
      <Grid container xs={12}>
        <Grid xs={9}>
          <Typography variant="h2" color="primary" colorShade="dark2">
            Total Value: {formatCurrency(accountsSummary.totalInvested)}
          </Typography>
        </Grid>
        <Grid xs={3}>
          <ChartPeriodSelection
            currentPeriod={performanceDataPeriod}
            performanceDataPeriod={PerformanceDataPeriod}
            setCurrentPeriod={setDataPeriod}
          />
        </Grid>
      </Grid>
      <Spacer y={7} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SummaryPanel
            totalValue={accountsSummary?.totalInvested}
            totalNetContributions={summaryContributions}
            totalReturn={accountsSummary?.totalGainLoss}
            totalReturnPct={accountsSummary?.totalGainLossPercentage}
          />
        </Grid>

        {accountsTableData.length > 0 && (
          <Grid item xs={12}>
            <MainCard
              title="Your Accounts"
              renderActionEl={() => (
                <DisabledComponent arrow placement="top" title="Coming soon">
                  <Button variant="outlined" startIcon={<Icon name="plus" />}>
                    Open an account
                  </Button>
                </DisabledComponent>
              )}
            >
              <Spacer y={2.5} />
              <AccountsTable headerRow={AccountsTableHeader} dataRow={accountsTableData} />
            </MainCard>
          </Grid>
        )}

        {linkedAccountsTableData.length > 0 && (
          <Grid item xs={12}>
            <MainCard
              title="Linked Accounts"
              renderActionEl={() => (
                <DisabledComponent arrow placement="top" title="Coming soon">
                  <Button variant="outlined" startIcon={<Icon name="plus" />}>
                    Link an account
                  </Button>
                </DisabledComponent>
              )}
            >
              <Spacer y={2.5} />
              <AccountsTable headerRow={AccountsTableHeader} dataRow={linkedAccountsTableData} />
            </MainCard>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="h3" color="primary" colorShade="dark2">
            Performance chart
          </Typography>
          <Spacer y={3} />
          <MainCard>
            {/* eslint-disable-next-line no-nested-ternary */}
            {hasDataForPerformanceChart ? (
              <Box p={2}>
                <PerformanceChart
                  performanceData={performanceData}
                  contributionsData={contributionsData}
                  periodSelectionProps={{
                    performanceDataPeriod: PerformanceDataPeriod,
                    currentPeriod: performanceDataPeriod,
                    setCurrentPeriod: (newPeriod: string) =>
                      dispatch(setPerformanceDataPeriod(newPeriod)),
                  }}
                  axisBottomConfig={axisBottomConfig}
                />
              </Box>
            ) : performanceFetchMaxRetriesHit && performanceError ? (
              <Typography>{performanceError}</Typography>
            ) : (
              <Skeleton height={performanceChartDimension.height} />
            )}
          </MainCard>
        </Grid>
      </Grid>
    </MyAccountLayout>
  );
};

export default BIAccountsPage;
