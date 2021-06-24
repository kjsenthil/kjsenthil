import { Dispatch } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { getPortfolioAssetAllocation, getPortfolioRiskProfile } from '..';
import { extractClientAccounts } from '../../myAccount';
import {
  getAssetModel,
  postGoalCurrentProjections,
  postGoalTargetProjectionsFetcher,
} from '../api';
import extractPercentageEquityAllocationsByAccounts from '../../utils/extractPercentageEquityAllocationsByAccounts';
import {
  setGoalCurrentProjections,
  setGoalCurrentProjectionsError,
  setGoalCurrentProjectionsLoading,
  setGoalCurrentProjectionsSuccess,
  setGoalTargetProjections,
  setGoalTargetProjectionsError,
  setGoalTargetProjectionsLoading,
  setGoalTargetProjectionsSuccess,
} from '../reducers';
import { FetchGoalCurrentProjectionsParams } from '../types';

const callPostUpdateCurrentProjections = (dispatch: Dispatch) => async ({
  clientAge,
  drawdownAmount,
  drawdownStartDate,
  drawdownEndDate,
  shouldIncludeStatePension,
  accountBreakdown,
  fees,
  investmentSummary = [],
  includedClientAccounts = [],
  fundData,
}: FetchGoalCurrentProjectionsParams) => {
  try {
    dispatch(setGoalCurrentProjectionsLoading());
    dispatch(setGoalTargetProjectionsLoading());

    const ageDiffto100 = clientAge < 100 ? 100 - clientAge : 0;
    const dob100 = dayjs().add(ageDiffto100, 'year');
    const timeHorizon = dob100.diff(dayjs(), 'month');

    const totalContributions =
      accountBreakdown?.reduce(
        (totalContr, acctObj) => acctObj.accountTotalContribution + totalContr,
        0
      ) || 0;

    const accounts = extractClientAccounts(includedClientAccounts);

    const accountTotals = await extractPercentageEquityAllocationsByAccounts(
      investmentSummary,
      accounts
    );

    // get the percentage equity allocation for the customer's entire portfolio
    const portfolioEquityPercentage = await getPortfolioAssetAllocation(accountTotals);

    // get the TAA that the client's portfolio is most aligned to
    const riskProfile = await getPortfolioRiskProfile({
      portfolioEquityPercentage,
      equityFunds: fundData.allAsset.nodes,
    });

    const portfolioCurrentValue = accountTotals.reduce(
      (accumulator, account) => accumulator + (account.accountTotalHoldings || 0),
      0
    );
    const monthlyContributions = accountTotals.reduce(
      (accumulator, account) => accumulator + (account.monthlyInvestment || 0),
      0
    );

    const { erValue, volatility, zScores } = await getAssetModel(riskProfile.riskModel);

    const currentProjectionsPromise = postGoalCurrentProjections({
      timeHorizon,
      drawdownStartDate: drawdownStartDate?.toString() || '',
      desiredMonthlyDrawdown: drawdownAmount,
      drawdownEndDate: drawdownEndDate?.toString() || '',
      includeStatePension: shouldIncludeStatePension,
      statePensionAmount: shouldIncludeStatePension ? 9339.2 : 0,
      isConeGraph: true,
      lumpSumAmount: 0,
      desiredAmount: 0,
      netContribution: totalContributions,
      monthlyContributions,
      portfolioCurrentValue,
      upfrontContribution: 0,
      feesPercentage: fees / 100,
      preGoalRiskModel: riskProfile.riskModel,
      preGoalExpectedReturn: erValue,
      preGoalExpectedVolatility: volatility,
      preGoalZScoreLowerBound: zScores.lessLikleyLb,
      preGoalZScoreUpperBound: zScores.lessLikelyUb,
      postGoalRiskModel: riskProfile.riskModel,
      postGoalExpectedReturn: erValue,
      postGoalExpectedVolatility: volatility,
      postGoalZScoreLowerBound: zScores.moreLikelyLb,
      postGoalZScoreUpperBound: zScores.moreLikelyUb,
    });

    const targetProjectionsPromise = postGoalTargetProjectionsFetcher({
      timeToAge100: timeHorizon,
      preGoalRiskModel: riskProfile.riskModel,
      portfolioValue: portfolioCurrentValue,
      desiredMonthlyDrawdown: drawdownAmount,
      drawdownStartDate: drawdownStartDate?.toString() || '',
      drawdownEndDate: drawdownEndDate?.toString() || '',
      preGoalExpectedReturn: erValue,
      preGoalVolatility: volatility,
      feesPercentage: fees / 100,
      postGoalRiskModel: riskProfile.riskModel,
      postGoalExpectedReturn: erValue,
      postGoalVolatility: volatility,
      includeStatePension: shouldIncludeStatePension,
      statePensionAmount: shouldIncludeStatePension ? 9339.2 : 0,

      // TODO: To be provided by the state machine
      goalLumpSum: 100000,
      lumpSumDate: '2079-01-01',
      upfrontContribution: 0,
      desiredValueAtEndOfDrawdown: 10000,
    });

    const [currentProjectionsResponse, targetProjectionsResponse] = await Promise.all([
      currentProjectionsPromise,
      targetProjectionsPromise,
    ]);

    dispatch(setGoalCurrentProjectionsSuccess());
    dispatch(setGoalTargetProjectionsSuccess());

    dispatch(setGoalCurrentProjections(currentProjectionsResponse));
    dispatch(setGoalTargetProjections(targetProjectionsResponse));

    return {
      currentProjectionsResponse,
      targetProjectionsResponse,
    };
  } catch (error) {
    dispatch(setGoalCurrentProjectionsError(error));
    dispatch(setGoalTargetProjectionsError(error));

    return error;
  }
};

export default callPostUpdateCurrentProjections;
