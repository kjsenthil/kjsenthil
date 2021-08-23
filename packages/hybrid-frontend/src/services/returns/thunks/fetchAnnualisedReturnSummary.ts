import { createAsyncThunk } from '@reduxjs/toolkit';
import { InvestmentSummaryState } from '../../myAccount';
import { postAnnualisedReturns } from '../api';
import { getPerformanceAccountsAggregated } from '../../performance';

const fetchAnnualisedReturnSummary = createAsyncThunk(
  'returns/fetchAnnualisedReturnSummary',
  async (_, { getState }) => {
    const { investmentSummary } = getState() as { investmentSummary: InvestmentSummaryState };

    const clientAccountIds =
      investmentSummary?.data?.map((accountItem) => Number(accountItem.id)) || [];

    const currPortfolioTotal =
      investmentSummary?.data?.reduce(
        (totalVal, investSummaryItem) =>
          investSummaryItem.attributes.cash +
          investSummaryItem.attributes.funds +
          investSummaryItem.attributes.shares +
          totalVal,
        0
      ) || 0;

    const performanceResponse = await getPerformanceAccountsAggregated(clientAccountIds);
    const netConData = performanceResponse?.included[0]?.attributes?.netContributions || [];

    const currDateTime = new Date();

    const firstPerfData = performanceResponse?.data?.attributes?.values.find(
      (perfItem) => perfItem.date === netConData[0].date
    );

    const annualisedReturnPayload = {
      firstPerformanceData: {
        date: firstPerfData?.date,
        firstPerformanceAmount: firstPerfData?.value,
      },
      netContributionData: netConData,
      currentPortfolioData: {
        date: currDateTime.toISOString(),
        currentPortfolioAmount: -currPortfolioTotal,
      },
    };

    const annualisedReturnResp = await postAnnualisedReturns(annualisedReturnPayload);
    return { data: { ...annualisedReturnResp } };
  }
);

export default fetchAnnualisedReturnSummary;
