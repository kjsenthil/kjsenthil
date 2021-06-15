import { LifePlanMachineContext } from './types';

const context: LifePlanMachineContext = {
  fees: 0,
  inflation: 0,
  clientAge: 0,
  userDateOfBirth: new Date(0),
  expectedReturnOfTAA: 0,
  annualNetExpectedReturn: 0,
  monthlyNetExpectedReturn: 0,
  drawdownStartAge: 0,
  drawdownEndAge: 0,
  drawdownStartDate: null,
  drawdownEndDate: null,
  drawdownPeriodLengthYears: 0,
  drawdownPeriodLengthMonths: 0,
  monthlyCompoundInterestMultiplier: 0,
  desiredAmountAtRetirementEnd: 0,
  targetDrawdownAmount: 0,
  annualIncome: 0,
  monthlyIncome: 0,
  annualIncomeInTomorrowsMoney: 0,
  monthlyIncomeInTomorrowsMoney: 0,
  lumpSum: 0,
  laterLifeLeftOver: 0,
  retirementPotValue: 0,
  shouldIncludeStatePension: false,
  remainingValue: 0,
  errors: null,
};

export default context;
