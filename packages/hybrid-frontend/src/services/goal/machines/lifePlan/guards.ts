import { LifePlanMachineContext } from './types';

const isDrawdownEndAgeUpTo100 = (ctx: LifePlanMachineContext) => ctx.drawdownEndAge <= 100;

const isClientAgeUpToDrawdownStartAge = (ctx: LifePlanMachineContext) =>
  ctx.drawdownStartAge >= ctx.clientAge;

const isDrawdownEndAgeGreaterThanStartAge = (ctx: LifePlanMachineContext) =>
  ctx.drawdownEndAge > ctx.drawdownStartAge;

export default {
  isDrawdownEndAgeUpTo100,
  isClientAgeUpToDrawdownStartAge,
  isDrawdownEndAgeGreaterThanStartAge,
};
