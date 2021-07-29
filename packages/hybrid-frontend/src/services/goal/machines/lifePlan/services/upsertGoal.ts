import { LifePlanMachineContext } from '../types';
import tryInvokeService from './tryInvokeService';

const fields = {
  drawdownStartAge: 'Drawdown start age',
  drawdownEndAge: 'Drawdown end age',
  annualIncome: 'Annual income',
  monthlyIncome: 'Monthly income',
  lumpSum: 'Lump sum income',
  lumpSumAge: 'Lump sum withdrawal age',
  laterLifeLeftOver: 'Leftover money',
};

const upsertGoal = <T = unknown>(callback: (ctx: LifePlanMachineContext, event) => Promise<T>) => (
  ctx: LifePlanMachineContext,
  event
): Promise<T> =>
  tryInvokeService<T>(
    () => {
      const errors: Record<string, string> = {};

      Object.keys(fields).forEach((field) => {
        if (!ctx[field]) {
          errors[field] = `${fields[field]} is required`;
        }
      });

      return errors;
    },
    () => callback(ctx, event)
  );

export default upsertGoal;
