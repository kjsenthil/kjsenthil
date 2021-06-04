import { CommonState } from '../types';
import { RiskAppetites } from './constants';

export interface GoalRequestPayloadValType<
  V = GoalRequestPayloadValue | string | number | Date,
  T = 'Date' | 'Currency' | 'BigDecimal'
> {
  _val: V;
  _type: T;
}

export interface GoalRequestPayloadValue<V = unknown, T = unknown> {
  code: string;
  value: GoalRequestPayloadValType<V, T>;
}

export interface GoalRequestPayload {
  fields: {
    status: string;
    category: number;
    xpt_external_id: string | null;
    owner: string;
    frequency: string;
    description: string;
    capture_date: GoalRequestPayloadValType<Date | string, 'Date'>;
    target_date: GoalRequestPayloadValType<Date | string, 'Date'>;
    target_amount: GoalRequestPayloadValType<
      GoalRequestPayloadValue<number, 'BigDecimal'>,
      'Currency'
    >;
    initial_investment: GoalRequestPayloadValType<
      GoalRequestPayloadValue<number, 'BigDecimal'>,
      'Currency'
    >;
    regular_saving: GoalRequestPayloadValType<
      GoalRequestPayloadValue<number, 'BigDecimal'>,
      'Currency'
    >;
    goal_level_risk_tolerance: RiskAppetites;
  };
}

export interface CaptureGoalData {
  targetAmount: number;
  targetYear?: number;
  targetDate: Date | string;
  upfrontInvestment: number;
  monthlyInvestment: number;
  riskAppetite: RiskAppetites;
}

export interface GoalDetails {
  id?: string;
  name?: string;
  description?: string;
}

export interface ApiFields {
  description: string;
}

export interface GoalsObjectiveApiResponse {
  index: string;
  fields: ApiFields;
}

export interface GoalsObjectiveLinkApiResponse {
  entity_id: string;
  linked_obj_index: string;
  list_obj_index: string;
}

export interface GoalState extends CommonState {
  goalCapture: Partial<CaptureGoalData>;
  goalDetails: GoalDetails;
  goalCreationError?: string;
}

export enum GoalStatus {
  'FULFILLED' = '1',
  'UNFULFILLED' = '2',
  'FULFILLED_PARTIALLY' = '3',
  'CANCELLED' = '4',
}

export interface GoalData {
  index: number; // Looks like this is the goal's ID
  allow_associates: boolean;
  allow_multiple_account_associates: boolean;

  // These fields can be influenced by the 'fields' query parameters. See the
  // get goals fetcher for more details
  fields: {
    description: string;
    category: number;
    status: GoalStatus; // This is a number string
    present_value: number | null;
    target_amount: {
      _val: {
        code: string; // This is the currency code
        value: {
          _val: string; // This is a number string
          _type: string; // e.g. "BigDecimal"
        };
      };
      _type: string;
    };
  };
}

export type GetGoalsResponse = GoalData[];

export interface GoalsState extends CommonState<GetGoalsResponse, undefined> {}

// This kind of data is used by the projections chart
export interface ProjectionsChartGoalDatum {
  date: Date;
  progress: number;
  label: string;
  icon: string;
}
