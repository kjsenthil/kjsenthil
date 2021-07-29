import { Interpreter } from 'xstate';
import {
  LifePlanMachineContext,
  LifePlanMachineEvents,
  LifePlanMachineSchema,
} from '../../services/goal/machines/lifePlan';
import useUpdateCurrentProjectionsPrerequisites from '../useUpdateCurrentProjectionsPrerequisites';

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
  | 'handleRemainingAmountChange';

type EventHandlerFunctions = {
  [key in EventHandlers]: InputEventFunction;
};

type BasicHandlerFunctions = {
  [key in BasicHandlers]: () => void;
};

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
  const projectionsPrerequisitesPayload = useUpdateCurrentProjectionsPrerequisites();

  const handleFromAgeChange = (event: InputEvent) => {
    send('SET_DRAWDOWN_AGES', {
      payload: {
        drawdownStartAge: Number(event.target.value || 0),
        drawdownEndAge,
      },
    });
  };

  const handleToAgeChange = (event: InputEvent) => {
    send('SET_DRAWDOWN_AGES', {
      payload: {
        drawdownStartAge,
        drawdownEndAge: Number(event.target.value || 0),
      },
    });
  };

  const handleAnnualIncomeChange = (event: InputEvent) => {
    send('SET_INCOME', {
      payload: {
        annualIncome: Number(event.target.value || 0),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleMonthlyIncomeChange = (event: InputEvent) => {
    send('SET_INCOME', {
      payload: {
        monthlyIncome: Number(event.target.value || 0),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleLumpSumAmountChange = (event: InputEvent) => {
    send('SET_LUMP_SUM_AMOUNT', {
      payload: {
        lumpSum: Number(event.target.value || 0),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleLumpSumAgeChange = (event: InputEvent) => {
    send('SET_LUMP_SUM_AGE', {
      payload: {
        lumpSumAge: Number(event.target.value || 0),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleRemainingAmountChange = (event: InputEvent) => {
    send('SET_LATER_LIFE_LEFT_OVER', {
      payload: {
        laterLifeLeftOver: Number(event.target.value || 0),
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
  };
};

export default useLifePlanMachineHandlers;
