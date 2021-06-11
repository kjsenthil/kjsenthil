import { LifePlanMachineContext } from './types';

const saveRetirementPlan = async (ctx: LifePlanMachineContext): Promise<void> =>
  new Promise((resolve, reject) => {
    const error: Record<string, string> = {};
    if (!ctx.drawdownStartAge) {
      error.drawdownStartAge = 'drawdownStartAge is required';
    }
    if (!ctx.drawdownEndAge) {
      error.drawdownEndAge = 'drawdownEndAge is required';
    }
    if (!ctx.annualIncome) {
      error.annualIncome = 'annualIncome is required';
    }
    if (!ctx.monthlyIncome) {
      error.monthlyIncome = 'monthlyIncome is required';
    }

    if (Object.keys(error).length > 0) {
      reject(error);
    } else {
      resolve();
    }
  });

export default {
  saveRetirementPlan,
};
