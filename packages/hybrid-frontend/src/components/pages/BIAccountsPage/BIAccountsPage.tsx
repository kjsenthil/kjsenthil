import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Box, Button, Grid, Icon, Spacer, Typography } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import SummaryPanel from '../../organisms/SummaryPanel/SummaryPanel';
import MainCard from '../../molecules/MainCard';
import PerformanceChart from '../../organisms/PerformanceChart';
import { mockAccountsTableHeader } from '../../../constants/storybook';
import AccountsTable from '../../organisms/AccountsTable';
import useAccountBreakdownInfo from '../../../hooks/useAccountBreakdownInfo';
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
} from '../../../hooks';
import { RootState } from '../../../store';
import { axisBottomConfig } from '../../../config/chart';
import { DisabledComponent } from '../../molecules';

const BIAccountsPage = () => {
  const {
    performance: { status: performanceStatus, error: performanceError },
  } = useSelector((state: RootState) => state);

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

  // Account Breakdown Data
  const { accountsSummary, accountBreakdown } = useAccountBreakdownInfo();

  const summaryContributions =
    accountBreakdown?.reduce(
      (totalContr, acctObj) => acctObj.accountTotalContribution + totalContr,
      0
    ) || 0;

  const accountsTableData =
    accountBreakdown?.filter((breakItem) => breakItem.accountType === 'accounts') || [];

  const linkedAccountsTableData =
    accountBreakdown?.filter((breakItem) => breakItem.accountType === 'linked-accounts') || [];

  return (
    <MyAccountLayout
      heading={(basicInfo) => ({
        primary: `${basicInfo.firstName}'s`,
        secondary: `Investments`,
      })}
    >
      <Spacer y={3} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SummaryPanel
            totalValue={accountsSummary?.totalInvested}
            totalContributions={summaryContributions}
            totalReturn={accountsSummary?.totalGainLoss}
            totalReturnPct={accountsSummary?.totalGainLossPercentage}
          />
        </Grid>

        <Grid item xs={12}>
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
              <AccountsTable headerRow={mockAccountsTableHeader} dataRow={accountsTableData} />
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
              <AccountsTable
                headerRow={mockAccountsTableHeader}
                dataRow={linkedAccountsTableData}
              />
            </MainCard>
          </Grid>
        )}
      </Grid>
    </MyAccountLayout>
  );
};

export default BIAccountsPage;
