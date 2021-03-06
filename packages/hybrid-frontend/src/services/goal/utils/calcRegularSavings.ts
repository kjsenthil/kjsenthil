import { monthDifference } from '@tswdts/react-components';
import { CaptureGoalData } from '../types';

const calcRegularSavings = (inputs: CaptureGoalData): number => {
  const currDate = new Date(Date.now());
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
