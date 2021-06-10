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
    advice_type: number;
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

