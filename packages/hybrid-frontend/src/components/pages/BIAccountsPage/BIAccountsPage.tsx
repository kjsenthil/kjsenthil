import { Skeleton } from '@material-ui/lab';
import {
  AccountFilter,
  AccountFilterSelection,
  AccountsTable,
  AccountsTableHeader,
  Box,
  Button,
  ChartPeriodSelection,
  CurrencyPresentationVariant,
  DisabledComponent,
  Grid,
  humanizePeriodLabel,
  Icon,
  LinearProgress,
  MainCard,
  PerformanceChart,
  PerformanceDataPeriod,
  Spacer,
  SummaryPanel,
  Theme,
  Typography,
  axisBottomConfig,
  formatCurrency,
  usePerformanceChartDimension,
} from '@tswdts/react-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
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
import { calculateInvestmentReturn, calculateLifetimeReturn } from '../../../services/myAccount';
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
  const lifetimeReturn = calculateLifetimeReturn(
    accountsSummary.totalInvested,
    summaryContributions
  );

  // ---------- Components ---------- //

  const StyledAccountsCard = styled(({ theme, ...props }) => <MainCard {...props} />)`
    ${({ theme }: { background: string; theme: Theme }) => css`
      box-shadow: none;
      background-color: ${theme.palette.background.layout};
      padding: 2px 0;
    `}
  `;

  const StyledPerformanceChartCard = styled(({ theme, ...props }) => <MainCard {...props} />)`
    ${({ theme }: { background: string; theme: Theme }) => css`
      box-shadow: none;
      border: 1px solid ${theme.palette.grey['200']};
      padding: 16px 23px 23px;
    `}
  `;

  const stickyHeaderChildComponent = !basicInfo.basicDataLoadError && (
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
              {basicInfo.basicDataLoadError ? (
                <Skeleton height={100} />
              ) : (
                <AccountFilter
                  hasLinkedAccounts={hasLinkedAccounts}
                  selection={selectedAccountFilter}
                  onSelectionChanged={setSelectedAccountFilter}
                />
              )}
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

        <Grid item xs={12} sm={3}>
          {basicInfo.basicDataLoadError ? (
            <Skeleton height={100} />
          ) : (
            <ChartPeriodSelection
              currentPeriod={performanceDataPeriod}
              performanceDataPeriod={PerformanceDataPeriod}
              setCurrentPeriod={setDataPeriod}
              periodTextDisplay={(period) => (period === '7d' ? '1w' : period)}
            />
          )}
        </Grid>
      </Grid>

      <Spacer y={7} />

      <Grid item container spacing={6}>
        <Grid item xs={12}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {summaryIsLoading ? (
            <LinearProgress />
          ) : basicInfo.basicDataLoadError ? (
            <Skeleton height={100} />
          ) : (
            <SummaryPanel
              totalNetContributions={summaryContributions}
              lifetimeReturn={lifetimeReturn.value}
              lifetimeReturnPercentage={lifetimeReturn.percent}
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
          <Spacer y={0.75} />
        </Grid>

        {basicInfo.basicDataLoadError ? (
          <Grid item xs={12}>
            <MainCard title="My Accounts">
              <Skeleton height={300} />
            </MainCard>
          </Grid>
        ) : (
          accountsTableData.length > 0 && (
            <Grid item xs={12}>
              <StyledAccountsCard
                title={<Typography variant="h4">My accounts</Typography>}
                renderActionEl={() => (
                  <DisabledComponent arrow placement="top" title="Coming soon">
                    <Button variant="contained" color="white" startIcon={<Icon name="plus" />}>
                      Open a new account
                    </Button>
                  </DisabledComponent>
                )}
              >
                <Spacer y={1.5} />
                <AccountsTable
                  period={performanceDataPeriod}
                  headerRow={AccountsTableHeader(humanizedDataPeriod)}
                  dataRow={accountsTableData}
                />
              </StyledAccountsCard>
            </Grid>
          )
        )}

        {linkedAccountsTableData.length > 0 && (
          <Grid item xs={12}>
            <StyledAccountsCard
              title={<Typography variant="h4">Linked accounts</Typography>}
              renderActionEl={() => (
                <DisabledComponent arrow placement="top" title="Coming soon">
                  <Button variant="contained" color="white" startIcon={<Icon name="plus" />}>
                    Link an account
                  </Button>
                </DisabledComponent>
              )}
            >
              <Spacer y={1.5} />
              <AccountsTable
                period={performanceDataPeriod}
                headerRow={AccountsTableHeader(humanizedDataPeriod)}
                dataRow={linkedAccountsTableData}
              />
            </StyledAccountsCard>
          </Grid>
        )}

        <Grid item xs={12}>
          <Spacer y={0.75} />
          <Typography variant="h4" color="primary" colorShade="dark2">
            Performance chart
          </Typography>

          <Spacer y={3} />
          <StyledPerformanceChartCard>
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
          </StyledPerformanceChartCard>
          <Box p={2} pl={2.5} pb={2.5}>
            <Typography variant="b4" color="grey" colorShade="dark1">
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
