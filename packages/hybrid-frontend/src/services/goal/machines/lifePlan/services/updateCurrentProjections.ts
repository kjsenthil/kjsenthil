import {
  LifePlanMachineContext,
  LifePlanMachineEvents,
  UpdateCurrentProjectionsEvent,
} from '../types';
import validateDrawdownAges from '../validators/validateDrawdownAges';
import tryInvokeService from './tryInvokeService';

const updateCurrentProjections = (
  callback: (ctx: LifePlanMachineContext, event: UpdateCurrentProjectionsEvent) => Promise<void>
) => (ctx: LifePlanMachineContext, event: LifePlanMachineEvents): Promise<void> =>
  tryInvokeService(
    () => {
      const errors = validateDrawdownAges(ctx);

      return errors;
    },
    () => callback(ctx, event as UpdateCurrentProjectionsEvent)
  );
export default updateCurrentProjections;
