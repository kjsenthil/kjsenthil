import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import {
  Box,
  Button,
  CurrencyPresentationVariant,
  Grid,
  Icon,
  Spacer,
  Typography,
  axisBottomConfig,
  SummaryPanel,
  ChartPeriodSelection,
  DisabledComponent,
  MainCard,
  formatCurrency,
  PerformanceChart,
  AccountsTableHeader,
  AccountsTable,
  usePerformanceChartDimension,
  PerformanceDataPeriod,
  humanizePeriodLabel,
  getPossessiveSuffix,
} from '@tsw/react-components';
import { MyAccountLayout } from '../../templates';
import {
  fetchPerformanceAccountsAggregated,
  setPerformanceDataPeriod,
} from '../../../services/performance';
import {
  useBasicInfo,
  useContributionsData,
  useDispatchThunkOnRender,
  useInvestmentAccounts,
  usePerformanceData,
  usePerformanceDataPeriod,
} from '../../../hooks';
import { RootState } from '../../../store';
import { calculateInvestmentReturn } from '../../../services/myAccount';

const BIAccountsPage = () => {
  const {
    performance: { status: performanceStatus, error: performanceError },
  } = useSelector((state: RootState) => state);

  const basicInfo = useBasicInfo();
  const { accountsSummary, investmentAccounts } = useInvestmentAccounts({ shouldDispatch: false });

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

  const returnLabel = humanizePeriodLabel(
    performanceDataPeriod,
    (humanizedPeriod) => `LAST ${humanizedPeriod.toUpperCase()} RETURN`,
    true
  );

  const summaryContributions =
    investmentAccounts?.reduce(
      (totalContribution, account) => account.accountTotalNetContribution + totalContribution,
      0
    ) || 0;

  const accountsTableData =
    investmentAccounts?.filter((account) => account.accountType === 'accounts') || [];

  const linkedAccountsTableData =
    investmentAccounts?.filter((account) => account.accountType === 'linked-accounts') || [];

  const setDataPeriod = (period: PerformanceDataPeriod) => {
    dispatch(setPerformanceDataPeriod(period));
  };

  const investmentReturn = calculateInvestmentReturn(performanceData, contributionsData);

  return (
    <MyAccountLayout
      basicInfo={basicInfo}
      heading={{
        primary: `Investments`,
        secondary: `${basicInfo.firstName}${getPossessiveSuffix(basicInfo.firstName)}`,
      }}
    >
      <Grid item container xs={12} spacing={1} justifyContent="flex-end">
        <Grid item xs={12} sm={9}>
          <Typography variant="h2" color="primary" colorShade="dark2">
            Total Value:{' '}
            {formatCurrency(
              accountsSummary.totalInvested,
              CurrencyPresentationVariant.ACTUAL_TOPLINE
            )}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <ChartPeriodSelection
            currentPeriod={performanceDataPeriod}
            performanceDataPeriod={PerformanceDataPeriod}
            setCurrentPeriod={setDataPeriod}
            periodTextDisplay={(period) => (period === '7d' ? '1w' : period)}
          />
        </Grid>
      </Grid>
      <Spacer y={7} />
      <Grid item container spacing={6}>
        <Grid item xs={12}>
          <SummaryPanel
            totalValue={accountsSummary?.totalInvested}
            totalNetContributions={summaryContributions}
            totalReturn={accountsSummary?.totalGainLoss}
            totalReturnPercentage={accountsSummary?.totalGainLossPercentage}
            periodBasedReturn={{
              value: investmentReturn.value,
              percent: investmentReturn.percent,
              label: returnLabel,
            }}
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
              <AccountsTable
                period={performanceDataPeriod}
                headerRow={AccountsTableHeader(returnLabel)}
                dataRow={accountsTableData}
              />
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
                period={performanceDataPeriod}
                headerRow={AccountsTableHeader(returnLabel)}
                dataRow={linkedAccountsTableData}
              />
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
                    setCurrentPeriod: (newPeriod: PerformanceDataPeriod) =>
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
