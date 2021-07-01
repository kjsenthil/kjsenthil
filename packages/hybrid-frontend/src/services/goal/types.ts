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
  MEDICAL_INSURANCE = 7,
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
  MEDICAL_INSURANCE = 7,
  LONG_TERM_CARE = 9,
  CLIENT_INITIATED = 10,
}

export interface GoalRequestPayload {
  fields: GoalApiFields;
}

export type GoalPayloadValType<
  V = GoalPayloadValue | string | number,
  T = 'Date' | 'Currency' | 'BigDecimal',
  R = '_val' | 'val'
> = R extends '_val'
  ? {
      _val: V;
      _type: T;
    }
  : {
      val: V;
      type: T;
    };

export interface GoalPayloadValue<V = unknown, T = unknown, R = '_val' | 'val'> {
  code: string;
  value: GoalPayloadValType<V, T, R>;
}

export type GoalAmountPayload = GoalPayloadValType<
  GoalPayloadValue<number | string, 'BigDecimal', '_val'>,
  'Currency',
  '_val'
>;

export interface GoalApiFields {
  status: GoalStatus;
  category: GoalCategory;
  advice_type?: GoalAdviceType;
  description: string;
  owner: 'client';
  xpt_external_id?: string | null;
  present_value?: number | null;
  frequency?: number;
  capture_date: GoalPayloadValType<string, 'Date', '_val'>;
  target_date?: GoalPayloadValType<string, 'Date', '_val'>;
  target_amount?: GoalPayloadValType<
    GoalPayloadValue<number | string, 'BigDecimal', '_val'>,
    'Currency',
    '_val'
  >;
  initial_investment?: GoalPayloadValType<
    GoalPayloadValue<number, 'BigDecimal', '_val'>,
    'Currency',
    '_val'
  >;
  regular_saving?: GoalPayloadValType<
    GoalPayloadValue<number, 'BigDecimal', '_val'>,
    'Currency',
    '_val'
  >;
  goal_level_risk_tolerance?: RiskAppetites;
}

export type CurrentGoals = GoalsApiResponse[];

export interface CurrentGoalsState extends CommonState<CurrentGoals, undefined> {}

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

export interface GoalsApiResponse {
  index: number;
  allowAssociates: boolean;
  allowMultipleAccountAssociates: boolean;
  fields: {
    description: string;
    status: GoalStatus;
    category: GoalCategory;
    targetDate?: GoalPayloadValType<string, 'Date', 'val'>;
    targetAmount?: GoalPayloadValType<
      GoalPayloadValue<number | string, 'BigDecimal', 'val'>,
      'Currency',
      'val'
    >;
    objectiveFrequencyEndAge?: number;
    objectiveFrequencyStartAge?: number;
    regularDrawdown?: GoalPayloadValType<
      GoalPayloadValue<number | string, 'BigDecimal', 'val'>,
      'Currency',
      'val'
    >;
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

export interface GoalDatum {
  date: Date;
  progress: number;
  icon: string;
  label: string;
  targetAmount: number;
}
