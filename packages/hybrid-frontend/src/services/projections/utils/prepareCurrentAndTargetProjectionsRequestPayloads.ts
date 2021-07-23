import {
  GoalCurrentProjectionsRequestPayload,
  GoalTargetProjectionsRequestPayload,
  FetchGoalCurrentProjectionsParams,
} from '../types';
import { calculateDateAfterYears, formatDate, monthDifference } from '../../../utils/date';
import { GoalDefaults } from '../../goal';

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
const prepareCurrentAndTargetProjectionsRequestPayloads = ({
  clientAge,
  monthlyIncome,
  drawdownStartDate,
  drawdownEndDate,
  shouldIncludeStatePension,
  lumpSum,
  lumpSumDate,
  laterLifeLeftOver,
  fees,
  assetModel,
  totalNetContributions,
  monthlyContributions,
  portfolioCurrentValue,
}: FetchGoalCurrentProjectionsParams): {
  currentProjectionsPayload: GoalCurrentProjectionsRequestPayload;
  targetProjectionsPayload: GoalTargetProjectionsRequestPayload;
} => {
  const ageDiffTo100 = 100 - clientAge;
  const dob100 = calculateDateAfterYears(new Date(), ageDiffTo100);
  const defaultDrawDownStartDate = calculateDateAfterYears(
    clientAge,
    GoalDefaults.DRAW_DOWN_START_AGE
  );
  const defaultDrawDownEndDate = calculateDateAfterYears(clientAge, GoalDefaults.DRAW_DOWN_END_AGE);

  const timeHorizon = monthDifference(dob100, new Date());

  const { erValue, volatility, zScores, riskModel } = assetModel;

  const formatDrawdownDate = (date: Date) => formatDate(date, 'YYYY-MM-DD', false);

  const commonPayload = {
    postGoalRiskModel: riskModel,
    postGoalExpectedReturn: erValue,
    preGoalRiskModel: riskModel,
    preGoalExpectedReturn: erValue,
    feesPercentage: fees / 100,
    includeStatePension: shouldIncludeStatePension,
    desiredMonthlyDrawdown: monthlyIncome,
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
    netContribution: totalNetContributions,
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
    lumpSumDate: formatDrawdownDate(lumpSumDate || drawdownStartDate || defaultDrawDownStartDate),
    ...commonPayload,
  };

  return {
    currentProjectionsPayload,
    targetProjectionsPayload,
  };
};

export default prepareCurrentAndTargetProjectionsRequestPayloads;
