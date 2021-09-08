import { createAsyncThunk } from '@reduxjs/toolkit';
import { InvestmentSummaryState } from '../../myAccount';
import { PerformanceState } from '../../performance';
import { postAnnualisedReturns } from '../api';
import { AnnualisedReturnsResponse } from '../types';

const fetchAnnualisedReturnSummary = createAsyncThunk<
  {
    data: AnnualisedReturnsResponse | undefined;
  },
  number[] | undefined
>('returns/fetchAnnualisedReturnSummary', async (accountIds, { getState }) => {
  const { investmentSummary, performance } = getState() as {
    investmentSummary: InvestmentSummaryState;
    performance: PerformanceState;
  };

  const currPortfolioTotal =
    investmentSummary?.data?.reduce(
      (totalVal, investSummaryItem) =>
        investSummaryItem.attributes.cash +
        investSummaryItem.attributes.funds +
        investSummaryItem.attributes.shares +
        totalVal,
      0
    ) || 0;

  const netConData = performance?.included?.[0]?.attributes?.netContributions ?? [];

  const currDateTime = new Date();

  const firstPerfData = performance?.data?.attributes?.values.find(
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
});

export default fetchAnnualisedReturnSummary;
