import { GoalsApiResponse } from '../../../types';
import { PrepopulateContext, LifePlanMachineContext } from '../types';

const bootstrap = (
  callback: () => Promise<{ goal: GoalsApiResponse | undefined; userDateOfBirth: Date }>
) => async (ctx: LifePlanMachineContext): Promise<PrepopulateContext> => {
  const { goal, userDateOfBirth } = await callback();

  const result = {
    userDateOfBirth,
    index: ctx.index,
    monthlyIncome: ctx.monthlyIncome,
    drawdownStartAge: ctx.drawdownStartAge,
    drawdownEndAge: ctx.drawdownEndAge,
  };

  if (goal) {
    return {
      ...result,
      index: goal.index,
      monthlyIncome: Number(goal.fields.regularDrawdown?.val.value.val),
      drawdownStartAge: Number(goal.fields.objectiveFrequencyStartAge),
      drawdownEndAge: Number(goal.fields.objectiveFrequencyEndAge),
    };
  }

  return result;
};

export default bootstrap;
