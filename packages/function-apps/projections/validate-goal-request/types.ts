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
    status: GoalStatus;
    category: GoalCategory;
    advice_type: GoalAdviceType;
    drawdown_frequency: number;
    objective_frequency_start_age: number;
    objective_frequency_end_age: number;
    description: string;
    capture_date: GoalRequestPayloadValType<Date | string, 'Date'>;
    regular_drawdown: GoalRequestPayloadValType<GoalRequestPayloadValue<number, 'BigDecimal'>, 'Currency'>;
  };
}

export interface ValidationError {
  property: string;
  message: string;
  code: string;
}

