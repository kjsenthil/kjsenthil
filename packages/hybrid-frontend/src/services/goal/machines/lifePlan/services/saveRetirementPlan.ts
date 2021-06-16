import { LifePlanMachineContext } from '../types';
import tryInvokeService from './tryInvokeService';

const fields = {
  drawdownStartAge: 'Drawdown start age',
  drawdownEndAge: 'Drawdown end age',
  annualIncome: 'Annual income',
  monthlyIncome: 'Monthly income',
};

const saveRetirementPlan = <T = unknown>(callback: (ctx: LifePlanMachineContext) => Promise<T>) => (
  ctx: LifePlanMachineContext
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
    () => callback(ctx)
  );

export default saveRetirementPlan;
