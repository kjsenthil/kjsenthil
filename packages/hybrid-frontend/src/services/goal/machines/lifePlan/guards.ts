import { LifePlanMachineContext } from './types';

const isDrawdownEndAgeUpTo100 = (ctx: LifePlanMachineContext) => ctx.drawdownEndAge <= 100;

const isUserAgeUpToDrawdownStartAge = (ctx: LifePlanMachineContext) =>
  ctx.drawdownStartAge >= ctx.clientAge;

const isDrawdownEndAgeGreaterThanStartAge = (ctx: LifePlanMachineContext) =>
  ctx.drawdownEndAge > ctx.drawdownStartAge;

const isLumpSumAgeUpToDrawdownStartAge = (ctx: LifePlanMachineContext) =>
  ctx.drawdownStartAge >= ctx.lumpSumAge;

const isLumpSumAgeGreaterThanUserAge = (ctx: LifePlanMachineContext) =>
  ctx.lumpSumAge > ctx.clientAge;

const doesGoalExist = (ctx: LifePlanMachineContext) => !!ctx.index;

const shouldFetchProjections = (ctx: LifePlanMachineContext) =>
  !ctx.hasFetchedProjections && !!ctx.index;

const areDrawdownDatesValid = (ctx: LifePlanMachineContext) =>
  isDrawdownEndAgeUpTo100(ctx) &&
  isUserAgeUpToDrawdownStartAge(ctx) &&
  isDrawdownEndAgeGreaterThanStartAge(ctx);

const isLumpSumDateValid = (ctx: LifePlanMachineContext) =>
  isLumpSumAgeUpToDrawdownStartAge(ctx) && isLumpSumAgeGreaterThanUserAge(ctx);

export default {
  isDrawdownEndAgeUpTo100,
  isUserAgeUpToDrawdownStartAge,
  isLumpSumAgeGreaterThanUserAge,
  isDrawdownEndAgeGreaterThanStartAge,
  isLumpSumAgeUpToDrawdownStartAge,
  doesGoalExist,
  areDrawdownDatesValid,
  isLumpSumDateValid,
  shouldFetchProjections,
};
