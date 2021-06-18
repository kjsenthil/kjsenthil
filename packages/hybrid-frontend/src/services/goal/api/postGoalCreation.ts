import {
  GoalStatus,
  GoalCategory,
  GoalRequestPayload,
  GoalsApiResponse,
  GoalAdviceType,
  PostGoalParams,
  RetirementInputs,
  OnboardingGoalInputs,
  GoalType,
} from '../types';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import generateDatePayload from '../utils/generateDatePayload';
import { generateCurrencyPayload } from '../utils';

const goalsHardCodedPayloadValues = {
  status: GoalStatus.UNFULFILLED,
  capture_date: generateDatePayload(),
  xpt_external_id: null, // To Check
  owner: 'client' as 'client',
  frequency: 12, //  how often they will take the money out
};

export const createOnboardGoalsPayLoad = (inputs: OnboardingGoalInputs): GoalRequestPayload => {
  const currDate = new Date();
  const currDateMonth = `${`0${currDate.getMonth() + 1}`.slice(
    -2
  )}-${`0${currDate.getDate()}`.slice(-2)}`;

  const targetDateval = inputs?.targetDate.toString() || `${inputs?.targetYear}-${currDateMonth}`;

  return {
    fields: {
      ...goalsHardCodedPayloadValues,
      category: GoalCategory.RETIREMENT, // Investment category (dependent on retirements vs savings)
      advice_type: GoalAdviceType.INVESTMENT,
      frequency: 12,
      description: inputs?.description || '',
      target_amount: generateCurrencyPayload(inputs?.targetAmount),
      target_date: generateDatePayload(targetDateval),
      initial_investment: generateCurrencyPayload(inputs?.upfrontInvestment),
      regular_saving: generateCurrencyPayload(inputs?.monthlyInvestment),
      goal_level_risk_tolerance: inputs?.riskAppetite,
    },
  };
};

export const createLifePlanPayload = ({
  drawdownStartAge,
  drawdownEndAge,
  regularDrawdown,
  description,
}: {
  drawdownStartAge: number;
  drawdownEndAge: number;
  regularDrawdown: number;
  description?: string;
}) => ({
  fields: {
    ...goalsHardCodedPayloadValues,
    status: GoalStatus.UNFULFILLED,
    category: GoalCategory.RETIREMENT,
    description: description || 'Life Plan Retirement',
    regular_drawdown: generateCurrencyPayload(regularDrawdown),
    objective_frequency_start_age: drawdownStartAge,
    objective_frequency_end_age: drawdownEndAge,
    drawdown_frequency: '12',
  },
});

export const createUncategorisedPayload = () => ({
  fields: {
    description: 'just show me my projection',
    status: GoalStatus.UNFULFILLED,
    category: GoalCategory.UNCATEGORIZED,
    capture_date: generateDatePayload(),
  },
});

const postGoalCreation = async ({ inputs, goalType }: PostGoalParams) => {
  let goalsPayload = createUncategorisedPayload();

  switch (goalType) {
    case GoalType.ONBOARDING:
      goalsPayload = createOnboardGoalsPayLoad(inputs as OnboardingGoalInputs);
      break;
    case GoalType.RETIREMENT:
      goalsPayload = createLifePlanPayload(inputs as RetirementInputs);
      break;
    default:
  }

  const goalsURL = API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS;

  const response = await api.post<GoalsApiResponse>(goalsURL, goalsPayload);

  return response.data;
};

export default postGoalCreation;
