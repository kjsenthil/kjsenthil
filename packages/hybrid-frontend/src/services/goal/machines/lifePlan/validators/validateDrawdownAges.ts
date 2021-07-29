import guards from '../guards';

import { LifePlanMachineContext, InputFieldsKeys } from '../types';

const validateDrawdownAges = (
  ctx: LifePlanMachineContext
): Partial<Record<Partial<InputFieldsKeys>, string>> => {
  const errors: Partial<Record<InputFieldsKeys, string>> = {};

  if (!guards.isUserAgeUpToDrawdownStartAge(ctx)) {
    errors.drawdownStartAge = 'Please pick an age greater than your current age';
  }
  if (!guards.isDrawdownEndAgeUpTo100(ctx)) {
    errors.drawdownEndAge = 'Please pick an age less than 100';
  } else if (!guards.isDrawdownEndAgeGreaterThanStartAge(ctx)) {
    errors.drawdownEndAge = `Please select an age greater than ${ctx.drawdownStartAge}`;
  }

  return errors;
};

export default validateDrawdownAges;
