import { LifePlanMachineContext } from './types';

const isDrawdownEndAgeUpTo100 = (ctx: LifePlanMachineContext) => ctx.drawdownEndAge <= 100;

const isUserAgeUpToDrawdownStartAge = (ctx: LifePlanMachineContext) =>
  ctx.drawdownStartAge >= ctx.clientAge;

const isDrawdownEndAgeGreaterThanStartAge = (ctx: LifePlanMachineContext) =>
  ctx.drawdownEndAge > ctx.drawdownStartAge;

const doesGoalExist = (ctx: LifePlanMachineContext) => !!ctx.index;

const shouldFetchProjections = (ctx: LifePlanMachineContext) =>
  !ctx.hasFetchedProjections && !!ctx.index;

const areDrawdownDatesValid = (ctx: LifePlanMachineContext) =>
  isDrawdownEndAgeUpTo100(ctx) &&
  isUserAgeUpToDrawdownStartAge(ctx) &&
  isDrawdownEndAgeGreaterThanStartAge(ctx);

export default {
  isDrawdownEndAgeUpTo100,
  isUserAgeUpToDrawdownStartAge,
  isDrawdownEndAgeGreaterThanStartAge,
  doesGoalExist,
  areDrawdownDatesValid,
  shouldFetchProjections,
};
