import { LifePlanMachineContext } from '../types';
import guards from '../guards';

const updateCurrentProjections = <T = unknown>(callback: () => Promise<T>) => (
  ctx: LifePlanMachineContext
): Promise<T> =>
  new Promise((resolve, reject) => {
    const errors: Record<string, string> = {};

    if (!guards.isClientAgeUpToDrawdownStartAge(ctx)) {
      errors.drawdownStartAge = 'Please pick an age of greater than your current age';
    }

    if (!guards.isDrawdownEndAgeUpTo100(ctx)) {
      errors.drawdownEndAge = 'Please pick an age of less than 100';
    } else if (!guards.isDrawdownEndAgeGreaterThanStartAge(ctx)) {
      errors.drawdownEndAge = `Please select an age greater than ${ctx.drawdownStartAge}`;
    }

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

export default updateCurrentProjections;
