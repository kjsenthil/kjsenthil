import { LifePlanMachineContext } from '../types';
import tryInvokeService from './tryInvokeService';

const deleteGoal = <T = unknown>(callback: (ctx: LifePlanMachineContext) => Promise<T>) => (
  ctx: LifePlanMachineContext
): Promise<T> =>
  tryInvokeService<T>(
    () => {
      const errors: Record<string, string> = {};

      if (!ctx.index) {
        errors.index = 'Goal index is missing';
      }

      return errors;
    },
    () => callback(ctx)
  );

export default deleteGoal;
