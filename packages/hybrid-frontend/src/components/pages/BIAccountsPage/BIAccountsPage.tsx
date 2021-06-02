import React from 'react';
import { Button, Grid, Spacer } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import SummaryPanel from '../../organisms/SummaryPanel/SummaryPanel';
import MainCard from '../../molecules/MainCard';
import PerformanceChart from '../../organisms/PerformanceChart';
import { mockAccountsTableHeader } from '../../../constants/storybook';
import AccountsTable from '../../organisms/AccountsTable';
import useAccountBreakdownInfo from '../../../hooks/AccountBreakdownInfo/useAccountBreakdownInfo';
import getPerformanceContactMockResponseData from '../../../services/performance/mocks/mock-get-performance-contact-success-response.json';
import {
  mapContributionsData,
  mapPerformanceData,
  PerformanceDataPeriod,
} from '../../../services/performance';
import { axisBottomConfig } from '../../../config/chart';

const BIAccountsPage = () => {
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
            <PerformanceChart
              performanceData={getPerformanceContactMockResponseData.data.attributes.values.map(
                mapPerformanceData
              )}
              contributionsData={getPerformanceContactMockResponseData.included[0].attributes.contributions.map(
                mapContributionsData
              )}
              periodSelectionProps={{
                currentPeriod: PerformanceDataPeriod.ALL_TIME,
                performanceDataPeriod: PerformanceDataPeriod,
                setCurrentPeriod: () => {},
              }}
              axisBottomConfig={axisBottomConfig}
            />
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
