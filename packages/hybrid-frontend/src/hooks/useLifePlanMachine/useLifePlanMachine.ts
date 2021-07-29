import { useMachine } from '@xstate/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Interpreter, State } from 'xstate';
import {
  lifePlanContext,
  lifePlanMachine,
  lifePlanMachineActions,
  LifePlanMachineContext,
  lifePlanMachineGuards,
  lifePlanMachineServices,
} from '../../services/goal/machines/lifePlan';
import {
  GoalDefaults,
  GoalType,
  postGoalCreation,
  patchGoalUpdate,
  deleteGoal as cancelGoal,
  PostGoalParams,
  fetchGoals,
  GoalCategory,
} from '../../services/goal';

import { IS_PRODUCTION } from '../../config';

import { useAppDispatch } from '../../store';
import {
  fetchClient,
  fetchInvestmentSummary,
  fetchInvestmentAccounts,
} from '../../services/myAccount';
import {
  fetchGoalCurrentProjections,
  fetchTargetProjections,
  prepareCurrentAndTargetProjectionsRequestPayloads,
} from '../../services/projections';
import {
  LifePlanMachineEvents,
  LifePlanMachineSchema,
} from '../../services/goal/machines/lifePlan/types';

const STATE_PENSION = 9339.2;

const useLifePlanMachine = (): {
  state: State<LifePlanMachineContext, LifePlanMachineEvents>;
  send: Interpreter<LifePlanMachineContext, LifePlanMachineSchema, LifePlanMachineEvents>['send'];
  service: Interpreter<LifePlanMachineContext, LifePlanMachineSchema, LifePlanMachineEvents>;
  isLoading: boolean;
} => {
  const dispatch = useAppDispatch();

  const bootstrap = lifePlanMachineServices.bootstrap(async () => {
    const goals = unwrapResult(await dispatch(fetchGoals()));
    const goal = goals.data.find((g) => g.fields.category === GoalCategory.RETIREMENT);
    const client = unwrapResult(await dispatch(fetchClient()));

    unwrapResult(await dispatch(fetchInvestmentSummary()));
    unwrapResult(await dispatch(fetchInvestmentAccounts()));

    return {
      goal,
      userDateOfBirth: new Date(client.data.attributes.dateOfBirth),
    };
  });

  const callCurrentProjections = async (context: LifePlanMachineContext, event) => {
    const {
      currentProjectionsPayload,
      targetProjectionsPayload,
    } = prepareCurrentAndTargetProjectionsRequestPayloads({
      ...context,
      ...event.payload,
    });
    const dispatchedFetchCurrentProjections = await dispatch(
      fetchGoalCurrentProjections(currentProjectionsPayload)
    );
    unwrapResult(dispatchedFetchCurrentProjections);
    const dispatchedFetchTargetProjections = await dispatch(
      fetchTargetProjections(targetProjectionsPayload)
    );
    unwrapResult(dispatchedFetchTargetProjections);
  };

  const updateCurrentProjections = lifePlanMachineServices.updateCurrentProjections(
    callCurrentProjections
  );

  const upsertGoal = lifePlanMachineServices.upsertGoal(async (context, event) => {
    await callCurrentProjections(context, event);
    const {
      index,
      drawdownStartAge,
      drawdownStartDate,
      drawdownEndAge,
      monthlyIncome: regularDrawdown,
      lumpSum,
      lumpSumDate,
      laterLifeLeftOver,
      shouldIncludeStatePension,
      defaultStatePension,
    } = context;
    const inputs: PostGoalParams<GoalType.RETIREMENT> = {
      goalType: GoalType.RETIREMENT,
      inputs: {
        drawdownStartAge,
        drawdownEndAge,
        regularDrawdown,
        lumpSum,
        lumpSumDate: lumpSumDate || drawdownStartDate!,
        laterLifeLeftOver,
        statePension: shouldIncludeStatePension ? defaultStatePension : 0,
      },
    };

    if (index) {
      await patchGoalUpdate(index, inputs);
      return { index };
    }

    const result = await postGoalCreation(inputs);
    return { index: result.index };
  });

  const deleteGoal = lifePlanMachineServices.deleteGoal(({ index }: LifePlanMachineContext) =>
    cancelGoal(Number(index))
  );

  const [state, send, service] = useMachine(
    lifePlanMachine
      .withConfig({
        actions: lifePlanMachineActions,
        guards: lifePlanMachineGuards,
        services: {
          bootstrap,
          updateCurrentProjections,
          upsertGoal,
          deleteGoal,
        },
      })
      .withContext({
        ...lifePlanContext,
        defaultStatePension: STATE_PENSION,
        drawdownStartAge: GoalDefaults.DRAW_DOWN_START_AGE,
        drawdownEndAge: GoalDefaults.DRAW_DOWN_END_AGE,
        expectedReturnOfTAA: GoalDefaults.EXPECTED_RETURN_OF_TAA,
        inflation: GoalDefaults.INFLATION,
      }),
    { devTools: !IS_PRODUCTION }
  );

  const isLoading = [
    'planningYourRetirement.saving',
    'planningYourRetirement.deleting',
    'planningYourRetirement.inputProcessing',
    'planningYourRetirement.bootstrapping',
    'fundingYourRetirement.saving',
    'fundingYourRetirement.deleting',
    'fundingYourRetirement.inputProcessing',
  ].some(state.matches);

  return { state, send, service, isLoading };
};

export default useLifePlanMachine;
