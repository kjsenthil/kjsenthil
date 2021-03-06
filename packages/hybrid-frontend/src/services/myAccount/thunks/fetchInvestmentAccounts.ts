import { createAsyncThunk } from '@reduxjs/toolkit';
import { InvestmentAccount, periodDifference } from '@tswdts/react-components';
import { getPerformanceAccountsAggregated, NetContributionValueWithDate } from '../../performance';
import { AnnualisedReturnsResponse, postAnnualisedReturns } from '../../returns';
import { ClientAccountTypes } from '../../types';
import { getMonthlySavingsAmount } from '../api';
import { ClientAccount, ClientState, InvestmentSummary, InvestmentSummaryState } from '../types';
import { extractClientAccounts } from '../utils';
import calculateInvestmentReturnForAllPeriods from '../utils/calculateInvestmentReturnForAllPeriods';
import calculateLifetimeReturn from '../utils/calculateLifetimeReturn';

const fetchInvestmentAccounts = createAsyncThunk(
  'client/fetchInvestmentAccounts',
  async (_, { getState }): Promise<{ data: Array<InvestmentAccount> }> => {
    const { client, investmentSummary } = getState() as {
      client: ClientState;
      investmentSummary: InvestmentSummaryState;
    };

    if (!client.included) {
      throw new Error('Could not find client data.');
    }

    if (!investmentSummary.data) {
      throw new Error('Could not find investment summary data.');
    }

    const extractedClientAccounts = extractClientAccounts(
      client.included?.filter<ClientAccount>(
        (props): props is ClientAccount =>
          props.type === ClientAccountTypes.accounts ||
          props.type === ClientAccountTypes.linkedAccounts
      )
    );

    const investmentAccountsPromises = investmentSummary.data.map(
      async (investSummaryItem: InvestmentSummary) => {
        const { name: accountName = '', type: accountType = '', accountNumber = '' } =
          extractedClientAccounts.find(
            (clientAccount) => clientAccount.id === investSummaryItem.id
          ) || {};

        const accountTotalHoldings =
          investSummaryItem.attributes.cash +
          investSummaryItem.attributes.funds +
          investSummaryItem.attributes.shares;

        const accountInvestments =
          investSummaryItem.attributes.funds + investSummaryItem.attributes.shares;

        const performanceResponse = await getPerformanceAccountsAggregated(
          Number(investSummaryItem.id)
        );

        const monthlyInvestment = await getMonthlySavingsAmount(investSummaryItem.id);

        let netContributions: NetContributionValueWithDate[] = [];
        let annualisedReturnSummaryAmount: AnnualisedReturnsResponse;
        // Only call annualised return if there is valid performance data
        if (performanceResponse) {
          netContributions = performanceResponse?.included[0]?.attributes?.netContributions || [];

          const firstPerfData = performanceResponse?.data?.attributes?.values.find(
            (perfItem) => perfItem.date === netContributions[0].date
          );

          const currDateTime = new Date();

          const annualisedReturnPayload = {
            firstPerformanceData: {
              date: firstPerfData?.date,
              firstPerformanceAmount: firstPerfData?.value,
            },
            netContributionData: netContributions,
            currentPortfolioData: {
              date: currDateTime.toISOString(),
              currentPortfolioAmount: -accountTotalHoldings,
            },
          };

          try {
            annualisedReturnSummaryAmount = await postAnnualisedReturns(annualisedReturnPayload);
          } catch (error) {
            annualisedReturnSummaryAmount = {
              annualisedReturnValue: undefined,
              transactionData: [],
            };
          }
        } else {
          annualisedReturnSummaryAmount = { annualisedReturnValue: undefined, transactionData: [] };
        }

        const netContributionToDate =
          netContributions && netContributions.length > 0
            ? netContributions[netContributions.length - 1].netContributionsToDate
            : 0;

        const accountLifetimeReturn = calculateLifetimeReturn(
          accountTotalHoldings,
          netContributionToDate
        );

        const periodReturn = calculateInvestmentReturnForAllPeriods(
          performanceResponse?.data?.attributes?.values ?? [],
          performanceResponse?.included[0]?.attributes?.netContributions ?? []
        );

        Object.keys(periodReturn).forEach((period) => {
          const firstPerfDate = performanceResponse?.data?.attributes?.values[0]?.date;
          const periodDiff = firstPerfDate && periodDifference(firstPerfDate, period);
          if (periodDiff && periodDiff < 0) {
            periodReturn[period] = accountLifetimeReturn;
          }
        });

        return {
          id: investSummaryItem.id,
          accountName,
          accountNumber,
          accountType,
          accountTotalHoldings,
          accountTotalNetContribution: netContributionToDate,
          accountCash: investSummaryItem.attributes.cash,
          accountReturn: investSummaryItem.attributes.gainLoss,
          accountReturnPercentage: investSummaryItem.attributes.gainLossPercent,
          accountInvestments,
          accountLifetimeReturn,
          periodReturn,
          annualisedReturn: annualisedReturnSummaryAmount?.annualisedReturnValue ?? 0,
          monthlyInvestment,
        };
      }
    );

    const investmentAccounts = await Promise.all(investmentAccountsPromises);

    return { data: investmentAccounts };
  }
);

export default fetchInvestmentAccounts;
