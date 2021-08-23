import { LifePlanMachineContext } from '../types';
import { validateLumpSumAge } from '../validators';
import tryInvokeService from './tryInvokeService';

const requiredFields = {
  drawdownStartAge: 'Drawdown start age',
  drawdownEndAge: 'Drawdown end age',
  annualIncome: 'Annual income',
  monthlyIncome: 'Monthly income',
};

const upsertGoal = <T = unknown>(callback: (ctx: LifePlanMachineContext, event) => Promise<T>) => (
  ctx: LifePlanMachineContext,
  event
): Promise<T> =>
  tryInvokeService<T>(
    () => {
      const errors: Record<string, string> = validateLumpSumAge(ctx);

      Object.keys(requiredFields).forEach((field) => {
        if (!ctx[field]) {
          errors[field] = `${requiredFields[field]} is required`;
        }
      });

      return errors;
    },
    () => callback(ctx, event)
  );

export default upsertGoal;
