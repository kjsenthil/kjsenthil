import { formatDate, monthDifference } from '@tswdts/react-components';
import {
  GoalSimulateProjectionsRequestPayload,
  FetchGoalSimulateProjectionsParams,
} from '../types';
import { calculateDateAfterYears } from '../../../utils/date';
import { GoalDefaults } from '../../goal';
import { DrawdownType } from '../../../constants';

/**
 * This function prepares the request for goal simulate projections API
 * For now, there's way to use this function to get
 * projections for other goals, so the implmication is retirement.
 *
 */
const prepareSimulateProjectionsRequestPayload = ({
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
  additionalMonthlyContributions,
  upfrontContribution,
  portfolioCurrentValue,
}: FetchGoalSimulateProjectionsParams): GoalSimulateProjectionsRequestPayload => {
  const ageDiffTo100 = 100 - clientAge;
  const dob100 = calculateDateAfterYears(new Date(), ageDiffTo100);
  const defaultDrawDownStartDate = calculateDateAfterYears(
    clientAge,
    GoalDefaults.DRAW_DOWN_START_AGE
  );
  const defaultDrawDownEndDate = calculateDateAfterYears(clientAge, GoalDefaults.DRAW_DOWN_END_AGE);

  const timeHorizon = monthDifference(dob100, new Date());

  const { erValue, volatility, zScores } = assetModel;

  const customFormatDate = (date: Date) => formatDate(date, 'YYYY-MM-DD', false);

  return {
    timeHorizonToProject: timeHorizon,
    feesPercentage: fees,
    upfrontContribution: upfrontContribution ?? 0,
    monthlyContribution: monthlyContributions + (additionalMonthlyContributions ?? 0),
    currentNetContribution: totalNetContributions,
    currentPortfolioValue: portfolioCurrentValue,
    includeGoal: true,
    drawdownType: DrawdownType.Retirement,
    drawdownRetirement: {
      regularDrawdown: monthlyIncome || 0,
      startDate: customFormatDate(drawdownStartDate || defaultDrawDownStartDate),
      endDate: customFormatDate(drawdownEndDate || defaultDrawDownEndDate),
      lumpSum:
        lumpSum && lumpSumDate
          ? {
              amount: lumpSum,
              date: customFormatDate(lumpSumDate),
            }
          : undefined,
      remainingAmount: laterLifeLeftOver,
      statePensionAmount: shouldIncludeStatePension ? 9339.2 : 0,
    },
    preGoal: {
      expectedReturnPercentage: erValue * 100,
      volatilityPercentage: volatility * 100,
      ZScoreLowerBound: zScores.moreLikelyLb,
      ZScoreUpperBound: zScores.moreLikelyUb,
    },
    postGoal: {
      expectedReturnPercentage: erValue * 100,
      volatilityPercentage: volatility * 100,
      ZScoreLowerBound: zScores.moreLikelyLb,
      ZScoreUpperBound: zScores.moreLikelyUb,
    },
  };
};

export default prepareSimulateProjectionsRequestPayload;
