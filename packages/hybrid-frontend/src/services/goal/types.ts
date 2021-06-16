import { CommonState } from '../types';
import { RiskAppetites } from './constants';

export enum GoalType {
  UNCATEGORIZED = 'uncategorised',
  RETIREMENT = 'retirement',
  ONBOARDING = 'onboarding',
}

export enum GoalStatus {
  FULFILLED = '1',
  UNFULFILLED = '2',
  FULFILLED_PARTIALLY = '3',
  CANCELLED = '4',
}

export enum GoalCategory {
  ESTATE_PLANNING = 0,
  MORTGAGE = 1,
  PROTECTION = 2,
  INVESTMENT = 3,
  RETIREMENT = 5,
  GENERAL_INSURANCE = 6,
  MEDICAL_INUTRANCE = 7,
  LONG_TERM_CARE = 9,
  CLIENT_INITIATED = 10,
  UNCATEGORIZED = 9999,
}

export enum GoalAdviceType {
  ESTATE_PLANNING = 0,
  MORTGAGE = 1,
  PROTECTION = 2,
  INVESTMENT = 3,
  RETIREMENT = 5,
  GENERAL_INSURANCE = 6,
  MEDICAL_INUTRANCE = 7,
  LONG_TERM_CARE = 9,
  CLIENT_INITIATED = 10,
}

export interface GoalRequestPayload {
  fields: GoalApiFields;
}

export interface GoalRequestPayloadValType<
  V = GoalRequestPayloadValue | string | number,
  T = 'Date' | 'Currency' | 'BigDecimal'
> {
  _val: V;
  _type: T;
}

export interface GoalRequestPayloadValue<V = unknown, T = unknown> {
  code: string;
  value: GoalRequestPayloadValType<V, T>;
}

export interface GoalApiFields {
  status: GoalStatus;
  category: GoalCategory;
  advice_type?: GoalAdviceType;
  description: string;
  owner: 'client';
  xpt_external_id?: string | null;
  present_value?: number | null;
  frequency?: number;
  capture_date: GoalRequestPayloadValType<string, 'Date'>;
  target_date?: GoalRequestPayloadValType<string, 'Date'>;
  target_amount?: GoalRequestPayloadValType<
    GoalRequestPayloadValue<number | string, 'BigDecimal'>,
    'Currency'
  >;
  initial_investment?: GoalRequestPayloadValType<
    GoalRequestPayloadValue<number, 'BigDecimal'>,
    'Currency'
  >;
  regular_saving?: GoalRequestPayloadValType<
    GoalRequestPayloadValue<number, 'BigDecimal'>,
    'Currency'
  >;
  goal_level_risk_tolerance?: RiskAppetites;
}

export interface GoalData {
  index: number;
  allow_associates: boolean;
  allow_multiple_account_associates: boolean;

  fields: GoalApiFields;
}

export type GetCurrentGoals = GoalData[] | undefined;

export interface CurrentGoalsState extends CommonState<GetCurrentGoals, undefined> {}

export interface CaptureGoalData {
  targetAmount: number;
  targetYear?: number;
  targetDate: Date | string;
  upfrontInvestment: number;
  monthlyInvestment: number;
  riskAppetite: RiskAppetites;
}

export interface OnboardingGoalInputs extends CaptureGoalData {
  description?: string;
}

export interface RetirementInputs {
  drawdownEndAge: number;
  drawdownStartAge: number;
  regularDrawdown: number;
  description?: string;
}

export type CreateGoalParams =
  | {
      goalType: GoalType.ONBOARDING;
      inputs?: OnboardingGoalInputs;
    }
  | {
      goalType: GoalType.RETIREMENT;
      inputs: RetirementInputs;
    }
  | {
      goalType: GoalType.UNCATEGORIZED;
      inputs?: undefined;
    };

export type PostGoalParams =
  | {
      goalType: GoalType.ONBOARDING;
      inputs: OnboardingGoalInputs;
    }
  | {
      goalType: GoalType.RETIREMENT;
      inputs: RetirementInputs;
    }
  | {
      goalType: GoalType.UNCATEGORIZED;
      inputs: undefined;
    };

export interface GoalDetails {
  id?: string;
  name?: string;
  description?: string;
}

export interface GoalsObjectiveApiResponse {
  index: string;
  fields: {
    description: string;
  };
}

export interface GoalsObjectiveLinkApiResponse {
  entity_id: string;
  linked_obj_index: string;
  list_obj_index: string;
}

export interface GoalCreationState extends CommonState {
  goalCapture: Partial<CaptureGoalData>;
  goalDetails: GoalDetails;
  error: string | undefined;
}

// This kind of data is used by the projections chart
export interface ProjectionsChartGoalDatum {
  date: Date;
  progress: number;
  label: string;
  icon: string;
}
