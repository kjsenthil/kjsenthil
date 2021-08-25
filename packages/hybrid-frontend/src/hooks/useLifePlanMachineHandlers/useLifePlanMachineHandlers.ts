import { Interpreter } from 'xstate';
import {
  LifePlanMachineContext,
  LifePlanMachineEvents,
  LifePlanMachineSchema,
} from '../../services/goal/machines/lifePlan';
import useUpdateSimulateProjectionsPrerequisites from '../useUpdateSimulateProjectionsPrerequisites';

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
type InputEventFunction = (event: InputEvent) => void;
type BasicHandlers = 'handleGoalSave' | 'handleGoalDelete';

type EventHandlers =
  | 'handleToAgeChange'
  | 'handleFromAgeChange'
  | 'handleLumpSumAgeChange'
  | 'handleAnnualIncomeChange'
  | 'handleLumpSumAmountChange'
  | 'handleMonthlyIncomeChange'
  | 'handleStatePensionSelection'
  | 'handleRemainingAmountChange'
  | 'handleAdditionalMonthlyContributions'
  | 'handleUpfrontContribution';

type EventHandlerFunctions = {
  [key in EventHandlers]: InputEventFunction;
};

type BasicHandlerFunctions = {
  [key in BasicHandlers]: () => void;
};

const normalizeNumberTargetValue = (event: InputEvent) =>
  Number((event.target.value || '0').replace(',', ''));

export type LifePlanMachineHandlers = BasicHandlerFunctions &
  EventHandlerFunctions & {
    handleCustomEvent: <T extends string, P extends Object>(type: T, payload?: P) => void;
  };

export interface LifePlanMachineHandlersProps {
  send: Interpreter<LifePlanMachineContext, LifePlanMachineSchema, LifePlanMachineEvents>['send'];
  context: LifePlanMachineContext;
}

const useLifePlanMachineHandlers = ({
  send,
  context: { drawdownEndAge, drawdownStartAge },
}: LifePlanMachineHandlersProps): LifePlanMachineHandlers => {
  const projectionsPrerequisitesPayload = useUpdateSimulateProjectionsPrerequisites();

  const handleFromAgeChange = (event: InputEvent) => {
    send('SET_DRAWDOWN_AGES', {
      payload: {
        drawdownStartAge: normalizeNumberTargetValue(event),
        drawdownEndAge,
      },
    });
  };

  const handleToAgeChange = (event: InputEvent) => {
    send('SET_DRAWDOWN_AGES', {
      payload: {
        drawdownStartAge,
        drawdownEndAge: normalizeNumberTargetValue(event),
      },
    });
  };

  const handleAnnualIncomeChange = (event: InputEvent) => {
    send('SET_INCOME', {
      payload: {
        annualIncome: normalizeNumberTargetValue(event),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleMonthlyIncomeChange = (event: InputEvent) => {
    send('SET_INCOME', {
      payload: {
        monthlyIncome: normalizeNumberTargetValue(event),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleLumpSumAmountChange = (event: InputEvent) => {
    send('SET_LUMP_SUM_AMOUNT', {
      payload: {
        lumpSum: normalizeNumberTargetValue(event),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleLumpSumAgeChange = (event: InputEvent) => {
    send('SET_LUMP_SUM_AGE', {
      payload: {
        lumpSumAge: normalizeNumberTargetValue(event),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleRemainingAmountChange = (event: InputEvent) => {
    send('SET_LATER_LIFE_LEFT_OVER', {
      payload: {
        laterLifeLeftOver: normalizeNumberTargetValue(event),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleStatePensionSelection = (event: InputEvent) => {
    send('SET_INCLUDE_STATE_PENSION', {
      payload: {
        shouldIncludeStatePension: event.target.value === 'true',
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleAdditionalMonthlyContributions = (event: InputEvent) => {
    send('SET_ADDITIONAL_MONTHLY_CONTRIBUTIONS', {
      payload: {
        ...projectionsPrerequisitesPayload,
        additionalMonthlyContributions: normalizeNumberTargetValue(event),
      },
    });
  };

  const handleUpfrontContribution = (event: InputEvent) => {
    send('SET_UPFRONT_CONTRIBUTION', {
      payload: {
        ...projectionsPrerequisitesPayload,
        upfrontContribution: normalizeNumberTargetValue(event),
      },
    });
  };

  const handleGoalDelete = () => {
    send('DELETE');
  };

  const handleGoalSave = () => {
    send('SAVE', { payload: projectionsPrerequisitesPayload });
  };

  const handleCustomEvent = <T extends string, P extends Object>(type: T, payload?: P) => {
    send(type, { payload: { ...payload, ...projectionsPrerequisitesPayload } });
  };

  return {
    handleGoalSave,
    handleGoalDelete,
    handleCustomEvent,
    handleToAgeChange,
    handleFromAgeChange,
    handleLumpSumAgeChange,
    handleAnnualIncomeChange,
    handleLumpSumAmountChange,
    handleMonthlyIncomeChange,
    handleStatePensionSelection,
    handleRemainingAmountChange,
    handleAdditionalMonthlyContributions,
    handleUpfrontContribution,
  };
};

export default useLifePlanMachineHandlers;
