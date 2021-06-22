import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Box, Button, Grid, Spacer, Typography } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import SummaryPanel from '../../organisms/SummaryPanel/SummaryPanel';
import MainCard from '../../molecules/MainCard';
import PerformanceChart from '../../organisms/PerformanceChart';
import { mockAccountsTableHeader } from '../../../constants/storybook';
import AccountsTable from '../../organisms/AccountsTable';
import useAccountBreakdownInfo from '../../../hooks/useAccountBreakdownInfo';
import {
  usePerformanceData,
  useContributionsData,
  usePerformanceDataPeriod,
} from '../../../services/performance/hooks';
import { usePerformanceChartDimension } from '../../organisms/PerformanceChart/hooks';
import {
  getPerformanceContact,
  setPerformanceDataPeriod,
  PerformanceDataPeriod,
} from '../../../services/performance';
import { useDispatchThunkOnRender } from '../../../hooks';
import { RootState } from '../../../store';
import { axisBottomConfig } from '../../../config/chart';

const BIAccountsPage = () => {
  const {
    auth: { contactId },
    performance: { status: performanceStatus, performanceError },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  // Historical performance data
  const performanceData = usePerformanceData();
  const contributionsData = useContributionsData();
  const performanceDataPeriod = usePerformanceDataPeriod();
  const performanceChartDimension = usePerformanceChartDimension();
  const hasDataForPerformanceChart = performanceData.length > 0 && contributionsData.length > 0;

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
        secondary: `Invesments`,
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
                <Button variant="outlined" disabled>
                  Open New Account
                </Button>
              )}
            >
              <AccountsTable headerRow={mockAccountsTableHeader} dataRow={accountsTableData} />
            </MainCard>
          </Grid>
        )}

        {linkedAccountsTableData.length > 0 && (
          <Grid item xs={12}>
            <MainCard
              title="Linked Accounts"
              renderActionEl={() => (
                <Button variant="outlined" disabled>
                  Link An Account
                </Button>
              )}
            >
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
