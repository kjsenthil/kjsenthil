import { Skeleton } from '@material-ui/lab';
import {
  AccountFilter,
  AccountFilterSelection,
  AccountsTable,
  AccountsTableHeader,
  axisBottomConfig,
  Box,
  Button,
  ChartPeriodSelection,
  CurrencyPresentationVariant,
  DisabledComponent,
  formatCurrency,
  Grid,
  humanizePeriodLabel,
  Icon,
  LinearProgress,
  MainCard,
  PerformanceChart,
  PerformanceDataPeriod,
  Spacer,
  SummaryPanel,
  Typography,
  usePerformanceChartDimension,
} from '@tswdts/react-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureFlagNames } from '../../../constants';
import {
  useAccountIds,
  useBasicInfo,
  useContributionsData,
  useDispatchThunkOnRender,
  useFeatureFlagToggle,
  usePerformanceData,
  usePerformanceDataPeriod,
  useSummaryValues,
} from '../../../hooks';
import { calculateInvestmentReturn } from '../../../services/myAccount';
import {
  fetchPerformanceAccountsAggregated,
  setPerformanceDataPeriod,
} from '../../../services/performance';
import { RootState } from '../../../store';
import { MyAccountLayout } from '../../templates';

const BIAccountsPage = () => {
  const expFeatureFlag = useFeatureFlagToggle(FeatureFlagNames.EXP_FEATURE);

  const {
    performance: { status: performanceStatus, error: performanceError },
  } = useSelector((state: RootState) => state);

  const [selectedAccountFilter, setSelectedAccountFilter] = useState<AccountFilterSelection>(
    AccountFilterSelection.ALL_ACCOUNTS
  );

  const basicInfo = useBasicInfo();
  const {
    accountsSummary,
    investmentAccounts,
    hasLinkedAccounts,
    annualisedReturnSummary,
    summaryContributions,
    summaryIsLoading,
  } = useSummaryValues(selectedAccountFilter);

  // Reset filters if experimental features disabled
  useEffect(() => {
    setSelectedAccountFilter(AccountFilterSelection.ALL_ACCOUNTS);
  }, [expFeatureFlag]);

  const accountIds = useAccountIds();
  const hasAccountIds = accountIds && accountIds.length > 0;

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
      enabled: !!performanceData && hasAccountIds,
    }
  );

  const humanizedDataPeriod = humanizePeriodLabel(
    performanceDataPeriod,
    (humanizedPeriod) => `${humanizedPeriod}'s`,
    false,
    ''
  );

  const tableData = (investmentAccounts || []).map(
    ({
      accountType,
      accountName,
      accountInvestments,
      accountCash,
      accountTotalHoldings,
      accountLifetimeReturn,
      annualisedReturn,
      periodReturn,
    }) => ({
      accountType,
      accountName,
      accountInvestments,
      accountCash,
      accountTotalHoldings,
      accountLifetimeReturn,
      annualisedReturn,
      periodReturn,
    })
  );

  const accountsTableData =
    tableData?.filter((account) => account.accountType === 'accounts') || [];

  const linkedAccountsTableData =
    tableData?.filter((account) => account.accountType === 'linked-accounts') || [];

  const setDataPeriod = (period: PerformanceDataPeriod) => {
    dispatch(setPerformanceDataPeriod(period));
  };

  const investmentReturn = calculateInvestmentReturn(performanceData, contributionsData);

  const stickyHeaderChildComponent = (
    <Grid
      container
      justifyContent="space-between"
      alignContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12} sm={8}>
        {expFeatureFlag?.isEnabled && (
          <AccountFilter
            hasLinkedAccounts={hasLinkedAccounts}
            selection={selectedAccountFilter}
            onSelectionChanged={setSelectedAccountFilter}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={3}>
        <ChartPeriodSelection
          currentPeriod={performanceDataPeriod}
          performanceDataPeriod={PerformanceDataPeriod}
          setCurrentPeriod={setDataPeriod}
          periodTextDisplay={(period) => (period === '7d' ? '1w' : period)}
        />
      </Grid>
    </Grid>
  );

  return (
    <MyAccountLayout basicInfo={basicInfo} stickyHeaderChildComponent={stickyHeaderChildComponent}>
      {expFeatureFlag?.isEnabled && (
        <Box mb={5}>
          <Grid container>
            <Grid item xs={12}>
              <AccountFilter
                hasLinkedAccounts={hasLinkedAccounts}
                selection={selectedAccountFilter}
                onSelectionChanged={setSelectedAccountFilter}
              />
            </Grid>
          </Grid>
        </Box>
      )}

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
          {summaryIsLoading ? (
            <LinearProgress />
          ) : (
            <SummaryPanel
              totalNetContributions={summaryContributions}
              lifetimeReturn={accountsSummary?.totalGainLoss}
              lifetimeReturnPercentage={(accountsSummary?.totalGainLossPercentage || 0) / 100}
              periodBasedReturn={{
                value: investmentReturn.value,
                percent: investmentReturn.percent,
                dataPeriod: humanizedDataPeriod,
              }}
              annualisedReturnPercentage={
                (annualisedReturnSummary?.annualisedReturnValue || 0) / 100
              }
            />
          )}
        </Grid>

        {accountsTableData.length > 0 && (
          <Grid item xs={12}>
            <MainCard
              title="My Accounts"
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
                headerRow={AccountsTableHeader(humanizedDataPeriod)}
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
                headerRow={AccountsTableHeader(humanizedDataPeriod)}
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
          <Box p={2} pl={4}>
            <Typography variant="b3" color="grey" colorShade="dark1">
              <i>
                Performance figures are shown net of ongoing charges and include any income
                reinvested net of any taxes taken at source
              </i>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </MyAccountLayout>
  );
};

export default BIAccountsPage;
