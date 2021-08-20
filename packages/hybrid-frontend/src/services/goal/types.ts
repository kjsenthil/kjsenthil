import { ProjectionsChartGoalDatum } from '@tswdts/react-components';
import { CommonState } from '../types';
import { RiskAppetites } from './constants';

export enum GoalType {
  UNCATEGORIZED = 'uncategorised',
  RETIREMENT = 'retirement',
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

export type GoalCurrencyValType = GoalPayloadValType<
  GoalPayloadValue<number, 'BigDecimal'>,
  'Currency',
  '_val'
>;

export type GoalDateValType = GoalPayloadValType<string, 'Date', '_val'>;

export interface GoalApiFields {
  status: GoalStatus;
  category: GoalCategory;
  advice_type?: GoalAdviceType;
  description: string;
  owner: 'client';
  present_value?: number | null;
  capture_date: GoalPayloadValType<string, 'Date', '_val'>;
  target_date?: GoalPayloadValType<string, 'Date', '_val'>;
  target_amount?: GoalAmountPayload;
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
  description?: string;
  drawdownEndAge: number;
  drawdownStartAge: number;
  regularDrawdown: number;
  lumpSum?: number;
  lumpSumDate: Date;
  statePension?: number;
  laterLifeLeftOver?: number;
}

export interface CommonPayload {
  status: GoalStatus;
  category: GoalCategory;
  advice_type?: GoalAdviceType;
  capture_date: GoalDateValType;
  owner: 'client';
  description: string;
}

export interface UncategorisedPayload extends CommonPayload {}

export interface RetirementPayload extends CommonPayload {
  regular_drawdown: GoalAmountPayload;
  objective_frequency_start_age: number;
  objective_frequency_end_age: number;
  drawdown_frequency: string;
  bi_retirement_lump_sum: number;
  bi_retirement_lump_sum_date: Date | number | string;
  bi_state_pension_amount: number;
  bi_retirement_remaining_amount: number;
}

export type PostGoalParams<T extends GoalType> = T extends GoalType.RETIREMENT
  ? { goalType: GoalType.RETIREMENT; inputs: RetirementInputs }
  : T extends GoalType.UNCATEGORIZED
  ? { goalType: GoalType.UNCATEGORIZED; inputs?: undefined }
  : { goalType: GoalType; inputs?: unknown };

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
    category: GoalCategory;
    status: GoalStatus;
    present_value?: number | null;
    targetAmount?: GoalPayloadValType<
      GoalPayloadValue<number | string, 'BigDecimal', 'val'>,
      'Currency',
      'val'
    >;
    objectiveFrequencyEndAge?: number;
    objectiveFrequencyStartAge?: number;
    targetDate?: GoalPayloadValType<string, 'Date', 'val'>;
    biRetirementLumpSum?: number;
    biRetirementRemainingAmount?: number;
    biStatePensionAmount?: number;
    biRetirementLumpSumDate?: GoalPayloadValType<string, 'Date', 'val'> | null; // Lump sum date
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

export interface GoalDatum extends ProjectionsChartGoalDatum {
  targetAmount: number;
}
