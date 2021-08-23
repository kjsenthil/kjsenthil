import guards from '../guards';

import { LifePlanMachineContext, InputFieldsKeys } from '../types';

const validateLumpSumAge = (
  ctx: LifePlanMachineContext
): Partial<Record<Partial<InputFieldsKeys>, string>> => {
  const errors: Partial<Record<InputFieldsKeys, string>> = {};

  if (ctx.lumpSumAge && !ctx.lumpSum) {
    errors.lumpSum = 'Lump sum amount is required';
  } else if (ctx.lumpSum && !guards.isLumpSumAgeGreaterThanUserAge(ctx)) {
    errors.lumpSumAge = 'The lump sum age should be in the future';
  }

  if (ctx.lumpSum && !ctx.lumpSumAge) {
    errors.lumpSumAge = 'Lump sum withdrawal age is required';
  } else if (ctx.lumpSum && !guards.isLumpSumAgeUpToDrawdownStartAge(ctx)) {
    errors.lumpSumAge = 'The lump sum should be taken out at or before your retirement';
  }

  return errors;
};

export default validateLumpSumAge;
