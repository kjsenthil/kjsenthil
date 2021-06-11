export interface LifePlanMachineContext {
  fees: number;
  userAge: number;
  inflation: number;
  userDateOfBirth: Date;
  expectedReturnOfTAA: number;
  annualNetExpectedReturn: number;
  monthlyNetExpectedReturn: number;
  drawdownStartAge: number;
  drawdownEndAge: number;
  drawdownStartDate: Date | null;
  drawdownEndDate: Date | null;
  drawdownPeriodLengthYears: number;
  drawdownPeriodLengthMonths: number;
  monthlyCompoundInterestMultiplier: number;
  desiredAmountAtRetirementEnd: number;
  targetDrawdownAmount: number;
  annualIncome: number;
  monthlyIncome: number;
  annualIncomeIntomorrowsMoney: number;
  monthlyIncomeIntomorrowsMoney: number;
  lumpSum: number;
  laterLifeLeftOver: number;
  retirementPotValue: number;
  shouldIncludeStatePension: boolean;
  remainingValue: number;
  error: Record<string, string> | null;
}

export interface LifePlanMachineSchema {
  states: {
    planningYourRetirement: {};
    saving: {};
    fundingYourRetirement: {};
  };
}

export type SetAgesDrawdownEvent = {
  type: 'SET_DRAWDOWN_AGES';
  payload: { drawdownStartAge: number; drawdownEndAge: number };
};

export type SetIncomeEvent = {
  type: 'SET_INCOME';
  payload:
    | { annualIncome: number; monthlyIncome: undefined }
    | { annualIncome: undefined; monthlyIncome: number };
};

export type SetLumpSumEvent = {
  type: 'SET_LUMP_SUM';
  payload: { lumpSum: number };
};

export type SetLaterLifeLeftOverEvent = {
  type: 'SET_LATER_LIFE_LEFT_OVER';
  payload: { laterLifeLeftOver: number };
};

export type LifePlanMachineEvents =
  | SetAgesDrawdownEvent
  | SetIncomeEvent
  | SetLumpSumEvent
  | SetLaterLifeLeftOverEvent
  | { type: 'SAVE' };
