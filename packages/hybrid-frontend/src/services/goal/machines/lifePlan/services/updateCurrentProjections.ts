import { LifePlanMachineContext } from '../types';
import guards from '../guards';
import tryInvokeService from './tryInvokeService';

const updateCurrentProjections = <T = unknown>(
  callback: (ctx: LifePlanMachineContext) => Promise<T>
) => (ctx: LifePlanMachineContext): Promise<T> =>
  tryInvokeService(
    () => {
      const errors: Record<string, string> = {};

      if (!guards.isClientAgeUpToDrawdownStartAge(ctx)) {
        errors.drawdownStartAge = 'Please pick an age greater than your current age';
      }

      if (!guards.isDrawdownEndAgeUpTo100(ctx)) {
        errors.drawdownEndAge = 'Please pick an age less than 100';
      } else if (!guards.isDrawdownEndAgeGreaterThanStartAge(ctx)) {
        errors.drawdownEndAge = `Please select an age greater than ${ctx.drawdownStartAge}`;
      }
      return errors;
    },
    () => callback(ctx)
  );
export default updateCurrentProjections;
