import {
  LifePlanMachineContext,
  LifePlanMachineEvents,
  UpdateSimulateProjectionsEvent,
} from '../types';
import validateDrawdownAges from '../validators/validateDrawdownAges';
import tryInvokeService from './tryInvokeService';

const updateSimulateProjections = (
  callback: (ctx: LifePlanMachineContext, event: UpdateSimulateProjectionsEvent) => Promise<void>
) => (ctx: LifePlanMachineContext, event: LifePlanMachineEvents): Promise<void> =>
  tryInvokeService(
    () => {
      const errors = validateDrawdownAges(ctx);
      return errors;
    },
    () => callback(ctx, event as UpdateSimulateProjectionsEvent)
  );
export default updateSimulateProjections;
