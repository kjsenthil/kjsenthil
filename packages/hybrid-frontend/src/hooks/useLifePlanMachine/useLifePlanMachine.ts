import { useMachine } from '@xstate/react';
import { unwrapResult } from '@reduxjs/toolkit';
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

const useLifePlanMachine = () => {
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

  const updateCurrentProjections = lifePlanMachineServices.updateCurrentProjections(
    async (context: LifePlanMachineContext, event) => {
      const {
        currentProjectionsPayload,
        targetProjectionsPayload,
      } = prepareCurrentAndTargetProjectionsRequestPayloads({
        ...context,
        ...event.payload,
      });
      unwrapResult(await dispatch(fetchGoalCurrentProjections(currentProjectionsPayload)));
      unwrapResult(await dispatch(fetchTargetProjections(targetProjectionsPayload)));
    }
  );

  const upsertGoal = lifePlanMachineServices.upsertGoal(
    ({
      index,
      drawdownStartAge,
      drawdownEndAge,
      monthlyIncome: regularDrawdown,
      drawdownStartDate,
    }: LifePlanMachineContext) => {
      const inputs: PostGoalParams<GoalType.RETIREMENT> = {
        goalType: GoalType.RETIREMENT,
        inputs: {
          drawdownStartAge,
          drawdownEndAge,
          regularDrawdown,
          lumpSumDate: new Date(drawdownStartDate!), // TODO: to implement lumpSumDate in V2 of retirement goal creation page
        },
      };

      if (index) {
        return patchGoalUpdate(index, inputs);
      }

      return postGoalCreation(inputs);
    }
  );

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
        drawdownStartAge: GoalDefaults.DRAW_DOWN_START_AGE,
        drawdownEndAge: GoalDefaults.DRAW_DOWN_END_AGE,
        expectedReturnOfTAA: GoalDefaults.EXPECTED_RETURN_OF_TAA,
        inflation: GoalDefaults.INFLATION,
      }),
    { devTools: !IS_PRODUCTION }
  );

  return { state, send, service };
};

export default useLifePlanMachine;
