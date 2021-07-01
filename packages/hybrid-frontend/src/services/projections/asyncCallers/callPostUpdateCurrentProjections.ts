import { Dispatch } from '@reduxjs/toolkit';
import { getPortfolioAssetAllocation, getPortfolioRiskProfile } from '..';
import { calculateDateAfterYears, formatDate, monthDifference } from '../../../utils/date';
import { GoalDefaults } from '../../goal';
import { extractClientAccounts } from '../../myAccount';
import {
  getAssetModel,
  postGoalCurrentProjections,
  postGoalTargetProjectionsFetcher,
} from '../api';
import { extractPercentageEquityAllocationsByAccounts } from '../../myAccount/utils';
import {
  setGoalCurrentProjectionsError,
  setGoalCurrentProjectionsLoading,
  setGoalCurrentProjectionsSuccess,
  setGoalTargetProjectionsError,
  setGoalTargetProjectionsLoading,
  setGoalTargetProjectionsSuccess,
} from '../reducers';
import { FetchGoalCurrentProjectionsParams } from '../types';

/**
 * This function prepares the requests for two APIs, the goal current projections and goal target projections
 * The payload for both APIs do not specify what goal, but some of the params imply retirement goal
 * such as includeStatePension & statePensionAmount. But ultimately we might need to explicitly
 * specify what goal to get the projections for, or set specify groups of partial payloads that
 * represent goal specific payload items so we know what we are querying the API for.
 * This is pending decisions on API design. For now, there's way to use this function to get
 * projections for other goals, so the implmication is retirement.
 *
 */
const callPostUpdateCurrentProjections = (dispatch: Dispatch) => async ({
  clientAge,
  drawdownAmount,
  drawdownStartDate,
  drawdownEndDate,
  shouldIncludeStatePension,
  accountBreakdown,
  lumpSum,
  laterLifeLeftOver,
  fees,
  investmentSummary = [],
  includedClientAccounts = [],
  fundData,
}: FetchGoalCurrentProjectionsParams) => {
  dispatch(setGoalCurrentProjectionsLoading());
  dispatch(setGoalTargetProjectionsLoading());

  const ageDiffTo100 = 100 - clientAge;
  const dob100 = calculateDateAfterYears(new Date(), ageDiffTo100);
  const defaultDrawDownStartDate = calculateDateAfterYears(
    clientAge,
    GoalDefaults.DRAW_DOWN_START_AGE
  );
  const defaultDrawDownEndDate = calculateDateAfterYears(clientAge, GoalDefaults.DRAW_DOWN_END_AGE);

  const timeHorizon = monthDifference(dob100, new Date());

  const totalContributions =
    (accountBreakdown || []).reduce(
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

  const formatDrawdownDate = (date: Date) => formatDate(date, 'YYYY-MM-DD', false);

  const commonPayload = {
    postGoalRiskModel: riskProfile.riskModel,
    postGoalExpectedReturn: erValue,
    preGoalRiskModel: riskProfile.riskModel,
    preGoalExpectedReturn: erValue,
    feesPercentage: fees / 100,
    includeStatePension: shouldIncludeStatePension,
    desiredMonthlyDrawdown: drawdownAmount,
    drawdownStartDate: formatDrawdownDate(drawdownStartDate || defaultDrawDownStartDate),
    drawdownEndDate: formatDrawdownDate(drawdownEndDate || defaultDrawDownEndDate),
    upfrontContribution: 0,
    statePensionAmount: shouldIncludeStatePension ? 9339.2 : 0,
  };

  const currentProjectionsPayload = {
    timeHorizon,
    isConeGraph: true,
    lumpSumAmount: lumpSum,
    desiredAmount: 0,
    netContribution: totalContributions,
    monthlyContributions,
    portfolioCurrentValue,
    preGoalExpectedVolatility: volatility,
    preGoalZScoreLowerBound: zScores.lessLikleyLb,
    preGoalZScoreUpperBound: zScores.lessLikelyUb,
    postGoalExpectedVolatility: volatility,
    postGoalZScoreLowerBound: zScores.moreLikelyLb,
    postGoalZScoreUpperBound: zScores.moreLikelyUb,
    ...commonPayload,
  };

  const targetProjectionsPayload = {
    timeToAge100: timeHorizon,
    portfolioValue: portfolioCurrentValue,
    preGoalVolatility: volatility,
    postGoalVolatility: volatility,
    goalLumpSum: lumpSum,
    desiredValueAtEndOfDrawdown: laterLifeLeftOver,
    // TODO: To be provided by the state machine
    lumpSumDate: '2079-01-01', // To be specified once the goal state machine has it
    ...commonPayload,
  };

  const currentProjectionsPromise = postGoalCurrentProjections(currentProjectionsPayload);
  const targetProjectionsPromise = postGoalTargetProjectionsFetcher(targetProjectionsPayload);

  const [currentProjectionsResponse, targetProjectionsResponse] = await Promise.allSettled([
    currentProjectionsPromise,
    targetProjectionsPromise,
  ]);

  if (currentProjectionsResponse.status === 'fulfilled') {
    dispatch(setGoalCurrentProjectionsSuccess({ data: currentProjectionsResponse.value }));
  } else {
    dispatch(setGoalCurrentProjectionsError(new Error(currentProjectionsResponse.reason)));
  }

  if (targetProjectionsResponse.status === 'fulfilled') {
    dispatch(setGoalTargetProjectionsSuccess({ data: targetProjectionsResponse.value }));
  } else {
    dispatch(setGoalTargetProjectionsError(new Error(targetProjectionsResponse.reason)));
  }

  return {
    currentProjectionsResponse,
    targetProjectionsResponse,
  };
};

export default callPostUpdateCurrentProjections;
