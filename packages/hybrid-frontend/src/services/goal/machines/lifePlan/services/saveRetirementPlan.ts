import { LifePlanMachineContext } from '../types';

const fields = {
  drawdownStartAge: 'Drawdown start age',
  drawdownEndAge: 'Drawdown end age',
  annualIncome: 'Annual income',
  monthlyIncome: 'Monthly income',
};

const saveRetirementPlan = <T = unknown>(callback: () => Promise<T>) => (
  ctx: LifePlanMachineContext
): Promise<T> =>
  new Promise((resolve, reject) => {
    const errors: Record<string, string> = {};

    Object.keys(fields).forEach((field) => {
      if (!ctx[field]) {
        errors[field] = `${fields[field]} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      reject(errors);
    } else {
      try {
        resolve(callback());
      } catch (error) {
        reject(error);
      }
    }
  });

export default saveRetirementPlan;
