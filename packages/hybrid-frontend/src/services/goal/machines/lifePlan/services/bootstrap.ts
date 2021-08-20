import { yearDifference } from '@tswdts/react-components';
import { GoalsApiResponse } from '../../../types';
import { PrepopulateContext, LifePlanMachineContext } from '../types';

const bootstrap = (
  callback: (
    ctx: LifePlanMachineContext
  ) => Promise<{ goal: GoalsApiResponse | undefined; userDateOfBirth: Date }>
) => async (ctx: LifePlanMachineContext): Promise<PrepopulateContext> => {
  const { goal, userDateOfBirth } = await callback(ctx);

  const result = {
    ...ctx,
    userDateOfBirth,
  };

  if (goal) {
    return {
      ...result,
      index: goal.index,
      monthlyIncome: Number(goal.fields.regularDrawdown?.val.value.val),
      drawdownStartAge: Number(goal.fields.objectiveFrequencyStartAge),
      drawdownEndAge: Number(goal.fields.objectiveFrequencyEndAge),
      lumpSum: Number(goal.fields.biRetirementLumpSum),
      lumpSumAge: yearDifference(goal.fields.biRetirementLumpSumDate?.val!, userDateOfBirth),
      laterLifeLeftOver: Number(goal.fields.biRetirementRemainingAmount),
      shouldIncludeStatePension: (goal.fields.biStatePensionAmount || 0) > 0.1,
    };
  }

  return result;
};

export default bootstrap;
