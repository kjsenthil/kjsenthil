import { monthDifference } from '../../../utils/date';
import { CaptureGoalData } from '../types';

// Needs unit tests
const calcRegularSavings = (inputs: CaptureGoalData): number => {
  const currDate = new Date();
  const currDateFormat = currDate.toISOString().split('T')[0];

  const monthsVal = monthDifference(inputs?.targetDate, currDateFormat);

  if (monthsVal <= 0) {
    return 0;
  }

  const regularSavingsVal =
    inputs?.monthlyInvestment ||
    (inputs?.targetAmount - inputs?.upfrontInvestment) / monthsVal ||
    0;

  return regularSavingsVal;
};

export default calcRegularSavings;
