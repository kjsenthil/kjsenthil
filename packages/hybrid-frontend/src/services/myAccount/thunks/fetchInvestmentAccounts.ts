import { createAsyncThunk } from '@reduxjs/toolkit';
import { InvestmentAccount } from '@tswdts/react-components';
import { getPerformanceAccountsAggregated, NetContributionValueWithDate } from '../../performance';
import { AnnualisedReturnsResponse, postAnnualisedReturns } from '../../returns';
import { getMonthlySavingsAmount } from '../api';
import { ClientState, InvestmentSummary, InvestmentSummaryState } from '../types';
import { extractClientAccounts } from '../utils';
import calculateInvestmentReturnForAllPeriods from '../utils/calculateInvestmentReturnForAllPeriods';

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

    const extractedClientAccounts = extractClientAccounts(client.included);

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
          periodReturn: calculateInvestmentReturnForAllPeriods(
            performanceResponse?.data?.attributes?.values ?? [],
            performanceResponse?.included[0]?.attributes?.netContributions ?? []
          ),
          annualisedReturn: annualisedReturnSummaryAmount?.annualisedReturnValue,
          monthlyInvestment,
        };
      }
    );

    const investmentAccounts = await Promise.all(investmentAccountsPromises);

    return { data: investmentAccounts };
  }
);

export default fetchInvestmentAccounts;
