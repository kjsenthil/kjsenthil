import { Skeleton } from '@material-ui/lab';
import {
  AccountFilter,
  AccountFilterSelection,
  AccountsTable,
  AccountsCard,
  AccountsTableHeader,
  Box,
  Button,
  ButtonBase,
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
  Typography,
  formatCurrency,
  useBreakpoint,
  usePerformanceChartDimension,
  Divider,
  formatPercent,
  PercentPresentationVariant,
  TagBox,
  Modal,
  TypographyWithTooltip,
  periodDifference,
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
import { calculateInvestmentReturn, calculateLifetimeReturn } from '../../../services/myAccount';
import {
  fetchPerformanceAccountsAggregated,
  setPerformanceDataPeriod,
} from '../../../services/performance';
import { RootState } from '../../../store';
import { MyAccountLayout } from '../../templates';
import { StyledAccountsTableCard, StyledPerformanceChartCard } from './BIAccountsPage.styles';

const BIAccountsPage = () => {
  const { isMobile } = useBreakpoint();
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

  const [isYourFiguresModalOpen, setIsYourFiguresModalOpen] = React.useState(false);
  const yourFiguresModalOpenHandler = () => setIsYourFiguresModalOpen(true);
  const yourFiguresModalCloseHandler = () => setIsYourFiguresModalOpen(false);

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
    (humanizedPeriod) =>
      humanizedPeriod === '1 month' || humanizedPeriod === '1 year'
        ? `${humanizedPeriod.substring(2)}'s`
        : `${humanizedPeriod}s'`,
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
      accountTotalNetContribution,
      annualisedReturn,
      periodReturn,
    }) => ({
      accountType,
      accountName,
      accountInvestments,
      accountCash,
      accountTotalHoldings,
      accountLifetimeReturn,
      accountTotalNetContribution,
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

  const lifetimeReturn = calculateLifetimeReturn(
    accountsSummary.totalInvested,
    summaryContributions
  );
  let investmentReturn = calculateInvestmentReturn(performanceData, contributionsData);
  const periodDiff = periodDifference(performanceData[0]?.date, performanceDataPeriod);
  if (periodDiff && periodDiff < 0) {
    investmentReturn = lifetimeReturn;
  }

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

  const renderYourFiguresExplainedTooltip = () => (
    <ButtonBase onClick={yourFiguresModalOpenHandler}>
      <TypographyWithTooltip
        tooltip=""
        typographyProps={{ variant: 'b4' }}
        iconProps={{ color: 'primary' }}
      >
        Your figures explained
      </TypographyWithTooltip>
    </ButtonBase>
  );

  const renderPerformanceChartDisclaimer = () => (
    <Box pt={isMobile ? 1 : 1.5} pl={isMobile ? 1 : 2.5}>
      <Typography fontStyle="italic" variant="i1" color="grey" colorShade="dark1">
        Performance figures are shown net of ongoing charges and include any income reinvested net
        of any taxes taken at source
      </Typography>
    </Box>
  );

  const renderDesktopAccountsTable = (title: string, buttonText: string, data) => (
    <Grid item xs={12}>
      <StyledAccountsTableCard
        title={<Typography variant="h4">{title}</Typography>}
        renderActionEl={() => (
          <DisabledComponent arrow placement="top" title="Coming soon">
            <Button variant="contained" color="white" startIcon={<Icon name="plus" />}>
              {buttonText}
            </Button>
          </DisabledComponent>
        )}
      >
        <Spacer y={1.5} />
        <AccountsTable
          period={performanceDataPeriod}
          headerRow={AccountsTableHeader(humanizedDataPeriod)}
          dataRow={data}
        />
      </StyledAccountsTableCard>
    </Grid>
  );

  const renderMobileAccountsCard = (title: string, data) => (
    <Grid item xs={12}>
      <Grid container item alignItems="center" justifyContent="space-between">
        <Typography variant="h4" color="primary" colorShade="dark2">
          {title}
        </Typography>
        <Icon name="plus" color="primary" />
      </Grid>
      <Spacer y={3} />
      <AccountsCard data={data} footerChildren={renderYourFiguresExplainedTooltip()} />
    </Grid>
  );

  const renderDesktopPerformanceChart = () => (
    <Grid item xs={12}>
      <Spacer y={0.75} />
      <Typography variant="h4" color="primary" colorShade="dark2">
        Performance chart
      </Typography>

      <Spacer y={3} />
      <StyledPerformanceChartCard isMobile={isMobile}>
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
            />
          </Box>
        ) : performanceFetchMaxRetriesHit && performanceError ? (
          <Typography>{performanceError}</Typography>
        ) : (
          <Skeleton height={performanceChartDimension.height} />
        )}
      </StyledPerformanceChartCard>
      {renderPerformanceChartDisclaimer()}
    </Grid>
  );

  const renderYourFiguresExplainedModal = () => (
    <Modal
      modalTitle="Your Figures Explained"
      open={isYourFiguresModalOpen}
      onClose={yourFiguresModalCloseHandler}
    >
      {AccountsTableHeader(humanizedDataPeriod).map(
        (headerWithTooltip) =>
          headerWithTooltip.tooltip !== undefined && (
            <React.Fragment key={headerWithTooltip.value}>
              <Typography variant="sh3" color="primary">
                {headerWithTooltip.value}
              </Typography>
              <Typography variant="b4">{headerWithTooltip.tooltip}</Typography>
              <br />
            </React.Fragment>
          )
      )}
    </Modal>
  );

  const renderMobilePerformanceChart = () => (
    <Grid item xs={12}>
      <Typography variant="h4" color="primary" colorShade="dark2">
        Performance chart
      </Typography>

      <Spacer y={3} />

      <StyledPerformanceChartCard isMobile={isMobile}>
        <Grid container justifyContent="space-between">
          <Typography variant="sh5" color="primary" colorShade="dark2">
            LIFETIME RETURN
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Typography variant="sh3" color="primary" colorShade="dark2">
              {formatCurrency(lifetimeReturn.value, CurrencyPresentationVariant.ACTUAL_TOPLINE)}
            </Typography>
            <Spacer x={0.5} />
            <TagBox
              variant="percentage"
              formatter={(val: number) =>
                formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE)
              }
            >
              {lifetimeReturn.percent}
            </TagBox>
          </Box>
        </Grid>

        <Spacer y={1.5} />
        <Divider />
        <Spacer y={1.5} />

        {/* eslint-disable-next-line no-nested-ternary */}
        {hasDataForPerformanceChart ? (
          <Grid container>
            <PerformanceChart
              data-testid="performance-chart"
              performanceData={performanceData}
              contributionsData={contributionsData}
              legendProps={{
                totalValue: {
                  title: 'TOTAL VALUE',
                },
                netContributed: {
                  title: 'NET CONTRIBUTION',
                },
              }}
              periodSelectionProps={{
                performanceDataPeriod: PerformanceDataPeriod,
                currentPeriod: performanceDataPeriod,
                setCurrentPeriod: (newPeriod: PerformanceDataPeriod) =>
                  dispatch(setPerformanceDataPeriod(newPeriod)),
              }}
            />
          </Grid>
        ) : performanceFetchMaxRetriesHit && performanceError ? (
          <Typography>{performanceError}</Typography>
        ) : (
          <Skeleton height={performanceChartDimension.height} />
        )}

        <Spacer y={2} />
        <Divider orientation="horizontal" color="grey" />
        <Spacer y={1} />
        {renderYourFiguresExplainedTooltip()}
      </StyledPerformanceChartCard>
      {renderPerformanceChartDisclaimer()}
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

      <Grid
        item
        container
        xs={12}
        spacing={1}
        direction={isMobile ? 'column' : 'row'}
        justifyContent="flex-end"
      >
        <Grid item xs={12} sm={isMobile ? 12 : 9}>
          <Typography variant={isMobile ? 'h4' : 'h2'} color="primary" colorShade="dark2">
            Total Value:{' '}
            {formatCurrency(
              accountsSummary.totalInvested,
              CurrencyPresentationVariant.ACTUAL_TOPLINE
            )}
          </Typography>
        </Grid>

        <Spacer y={isMobile ? 3 : 0} />

        <Grid item xs={12} sm={isMobile ? 12 : 3}>
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

      <Spacer y={isMobile ? 3 : 7} />

      <Grid item container spacing={isMobile ? 5 : 6}>
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
              mobileFooterChildren={renderYourFiguresExplainedTooltip()}
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
          accountsTableData.length > 0 &&
          (isMobile
            ? renderMobileAccountsCard('My Accounts', accountsTableData)
            : renderDesktopAccountsTable('My Accounts', 'Open a new account', accountsTableData))
        )}

        {linkedAccountsTableData.length > 0 &&
          (isMobile
            ? renderMobileAccountsCard('Linked Accounts', linkedAccountsTableData)
            : renderDesktopAccountsTable(
                'Linked Accounts',
                'Link an account',
                linkedAccountsTableData
              ))}

        {isMobile ? renderMobilePerformanceChart() : renderDesktopPerformanceChart()}

        {renderYourFiguresExplainedModal()}

        <Spacer y={5} />
      </Grid>
    </MyAccountLayout>
  );
};

export default BIAccountsPage;
