import {
  LifePlanMachineContext,
  LifePlanMachineEvents,
  UpdateCurrentProjectionsEvent,
} from '../types';
import guards from '../guards';
import tryInvokeService from './tryInvokeService';

const updateCurrentProjections = (
  callback: (ctx: LifePlanMachineContext, event: UpdateCurrentProjectionsEvent) => Promise<void>
) => (ctx: LifePlanMachineContext, event: LifePlanMachineEvents): Promise<void> =>
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
    () => callback(ctx, event as UpdateCurrentProjectionsEvent)
  );
export default updateCurrentProjections;
