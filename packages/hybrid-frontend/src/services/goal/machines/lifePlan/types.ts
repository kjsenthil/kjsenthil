import { CurrentProjectionsPrerequisitePayload } from '../../../projections';

export interface LifePlanMachineContext {
  index: number | null;
  fees: number;
  defaultStatePension: number;
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
  lumpSumAge: number;
  lumpSumDate: Date | null;
  laterLifeLeftOver: number;
  retirementPotValue: number;
  shouldIncludeStatePension: boolean;
  remainingValue: number;
  hasFetchedProjections: boolean;
  errors: Partial<Record<InputFieldsKeys, string>> | null;
}

export type InputFields = Pick<
  LifePlanMachineContext,
  | 'drawdownStartAge'
  | 'drawdownEndAge'
  | 'annualIncome'
  | 'monthlyIncome'
  | 'lumpSum'
  | 'lumpSumAge'
  | 'laterLifeLeftOver'
>;

export type InputFieldsKeys = keyof InputFields;

export interface LifePlanMachineSchema {
  states: {
    planningYourRetirement: {
      states: {
        bootstrapping: {};
        preInputProcessing: {};
        validate: {};
        normal: {};
        invalid: {};
        inputProcessing: {};
        saving: {};
        deleting: {};
      };
    };
    fundingYourRetirement: {
      states: {
        normal: {};
        invalid: {};
        inputProcessing: {};
        saving: {};
        deleting: {};
      };
    };
    finished: {};
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

export type SwitchToToFunding = {
  type: 'SWITCH_TO_FUNDING';
};

export type SwitchToToFlanning = {
  type: 'SWITCH_TO_PLANNING';
};

export type SetLumpSumAmountEvent = {
  type: 'SET_LUMP_SUM_AMOUNT';
  payload: Pick<LifePlanMachineContext, 'lumpSum'>;
};

export type SetLumpSumAgeEvent = {
  type: 'SET_LUMP_SUM_AGE';
  payload: Pick<LifePlanMachineContext, 'lumpSumAge'>;
};

export type SetLaterLifeLeftOverEvent = {
  type: 'SET_LATER_LIFE_LEFT_OVER';
  payload: Pick<LifePlanMachineContext, 'laterLifeLeftOver'>;
};

export type SetIncludeStatePensionEvent = {
  type: 'SET_INCLUDE_STATE_PENSION';
  payload: Pick<LifePlanMachineContext, 'shouldIncludeStatePension'>;
};

export type UpdateCurrentProjectionsEvent = {
  type: string;
  payload: Omit<CurrentProjectionsPrerequisitePayload, 'riskProfile'>;
};

export type UpdateSimulateProjectionsEvent = {
  type: string;
  payload: Omit<CurrentProjectionsPrerequisitePayload, 'riskProfile'>;
};

export type PrepopulateContextEvent = {
  type: 'done.invoke.bootstrapping';
  data: PrepopulateContext;
  payload?: undefined;
};

export type SetIndexEvent = {
  type: 'done.invoke.upsertGoal';
  data: { index: number };
  payload?: undefined;
};

export type SetErrorsEvent = {
  type: 'error.platform.updateCurrentProjection';
  data: Record<InputFieldsKeys, string>;
};

export type LifePlanMachineEvents =
  | PrepopulateContextEvent
  | SetIndexEvent
  | UpdateCurrentProjectionsEvent
  | SetAgesDrawdownEvent
  | SetIncomeEvent
  | SetLumpSumAmountEvent
  | SetLumpSumAgeEvent
  | SetLaterLifeLeftOverEvent
  | SetIncludeStatePensionEvent
  | SetErrorsEvent
  | SwitchToToFunding
  | SwitchToToFlanning
  | { type: 'SAVE'; payload?: undefined }
  | { type: 'DELETE'; payload?: undefined }
  | {
      type: 'FETCH_PROJETIONS';
      payload: Omit<CurrentProjectionsPrerequisitePayload, 'riskProfile'>;
    };

export type PrepopulateContext =
  | Pick<
      LifePlanMachineContext,
      | 'userDateOfBirth'
      | 'monthlyIncome'
      | 'drawdownStartAge'
      | 'drawdownEndAge'
      | 'index'
      | 'lumpSum'
      | 'lumpSumAge'
      | 'laterLifeLeftOver'
      | 'shouldIncludeStatePension'
    >
  | undefined;
