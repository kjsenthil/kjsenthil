import { CurrentProjectionsPrerequisitePayload } from '../../../projections';

export interface LifePlanMachineContext {
  index: number | null;
  doesGoalExist: boolean;
  fees: number;
  clientAge: number;
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
  annualIncomeInTomorrowsMoney: number;
  monthlyIncomeInTomorrowsMoney: number;
  lumpSum: number;
  lumpSumAtAge: number;
  laterLifeLeftOver: number;
  retirementPotValue: number;
  shouldIncludeStatePension: boolean;
  remainingValue: number;
  errors: Record<InputFieldsKeys, string> | null;
}

export type InputFields = Pick<
  LifePlanMachineContext,
  | 'drawdownStartAge'
  | 'drawdownEndAge'
  | 'annualIncome'
  | 'monthlyIncome'
  | 'lumpSum'
  | 'laterLifeLeftOver'
>;

export type InputFieldsKeys = keyof InputFields;

export interface LifePlanMachineSchema {
  states: {
    planningYourRetirement: {
      states: {
        bootstrapping: {};
        normal: {};
        invalid: {};
        processingInput: {};
        saving: {};
        deleting: {};
      };
    };
    fundingYourRetirement: {};
  };
}

export type SetAgesDrawdownEvent = {
  type: 'SET_DRAWDOWN_AGES';
  payload: { drawdownStartAge: number; drawdownEndAge: number };
};

export type SetIncomeEvent = {
  type: 'SET_INCOME' | 'done.invoke.updateCurrentProjection';
  payload: (
    | { annualIncome: number; monthlyIncome: undefined }
    | { annualIncome: undefined; monthlyIncome: number }
  ) &
    Omit<CurrentProjectionsPrerequisitePayload, 'riskProfile'>;
};

export type SetLumpSumEvent = {
  type: 'SET_LUMP_SUM';
  payload: { lumpSum: number };
};

export type SetLaterLifeLeftOverEvent = {
  type: 'SET_LATER_LIFE_LEFT_OVER';
  payload: { laterLifeLeftOver: number };
};

export type UpdateCurrentProjectionsEvent = {
  type: string;
  payload: Omit<CurrentProjectionsPrerequisitePayload, 'riskProfile'>;
};

export type PrepopulateContextEvent = {
  type: 'done.invoke.bootstrapping';
  data: PrepopulateContext;
  payload?: undefined;
};

export type SetErrorsEvent = {
  type: 'error.platform.updateCurrentProjection';
  data: Record<InputFieldsKeys, string>;
};

export type LifePlanMachineEvents =
  | PrepopulateContextEvent
  | UpdateCurrentProjectionsEvent
  | SetAgesDrawdownEvent
  | SetIncomeEvent
  | SetLumpSumEvent
  | SetLaterLifeLeftOverEvent
  | SetErrorsEvent
  | { type: 'SAVE'; payload?: undefined }
  | { type: 'DELETE'; payload?: undefined };

export type PrepopulateContext =
  | Pick<
      LifePlanMachineContext,
      'userDateOfBirth' | 'monthlyIncome' | 'drawdownStartAge' | 'drawdownEndAge' | 'index'
    >
  | undefined;
