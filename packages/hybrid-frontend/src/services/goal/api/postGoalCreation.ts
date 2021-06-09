import {
  GoalStatus,
  CaptureGoalData,
  GoalDetails,
  GoalRequestPayload,
  GoalsObjectiveApiResponse,
} from '../types';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

const goalsHardCodedPayloadValues = {
  status: GoalStatus.UNFULFILLED, // E.g from 4 options - Goal is unfulfilled
  category: 5, // Investment category (dependent on retirements vs savings)
  advice_type: 3, // Investment advice type (dependent on retirements vs savings)
  xpt_external_id: null, // To Check
  owner: 'client',
  frequency: '12', //  how often they will take the money out
};

export const createOnboardGoalsPayLoad = (onboardGoalCreationInputs): GoalRequestPayload => {
  const currDate = new Date();
  const currDateFormat = currDate.toISOString().split('T')[0];
  const currDateMonth = `${`0${currDate.getMonth() + 1}`.slice(
    -2
  )}-${`0${currDate.getDate()}`.slice(-2)}`;

  const { inputs } = onboardGoalCreationInputs;
  const { goalDetails } = onboardGoalCreationInputs;

  const targetDateval = inputs?.targetDate || `${inputs?.targetYear}-${currDateMonth}`;

  const descVal =
    goalDetails.description || `${goalDetails.name} Goal created on ${currDateFormat}`;

  return {
    fields: {
      ...goalsHardCodedPayloadValues,
      description: descVal,
      capture_date: {
        _val: currDateFormat,
        _type: 'Date',
      },
      target_amount: {
        _val: {
          code: 'GBP',
          value: {
            _val: inputs?.targetAmount,
            _type: 'BigDecimal',
          },
        },
        _type: 'Currency',
      },
      target_date: {
        _val: targetDateval,
        _type: 'Date',
      },
      initial_investment: {
        _val: {
          code: 'GBP',
          value: {
            _val: inputs?.upfrontInvestment,
            _type: 'BigDecimal',
          },
        },
        _type: 'Currency',
      },
      regular_saving: {
        _val: {
          code: 'GBP',
          value: {
            _val: inputs?.monthlyInvestment,
            _type: 'BigDecimal',
          },
        },
        _type: 'Currency',
      },
      goal_level_risk_tolerance: inputs?.riskAppetite,
    },
  };
};

interface GoalCreationProps {
  onboardGoalCreationInputs?: {
    goalDetails: GoalDetails;
    inputs: CaptureGoalData;
  };
  payload?: GoalRequestPayload | undefined;
}

const postGoalCreation = async ({ onboardGoalCreationInputs, payload }: GoalCreationProps) => {
  const goalsPayload = payload || createOnboardGoalsPayLoad(onboardGoalCreationInputs);

  const goalsURL = API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS;

  const response = await api.post<GoalsObjectiveApiResponse>(goalsURL, goalsPayload);

  return response.data;
};

export default postGoalCreation;
