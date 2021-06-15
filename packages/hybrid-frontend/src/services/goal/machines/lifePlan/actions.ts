import { assign, AssignAction } from 'xstate';
import {
  monthDifference,
  calculateAgeToday,
  calculateDateAfterYears,
  yearDifference,
} from '../../../../utils/date';
import {
  LifePlanMachineContext,
  LifePlanMachineEvents,
  SetAgesDrawdownEvent,
  SetErrorsEvent,
  SetIncomeEvent,
  SetLaterLifeLeftOverEvent,
  SetLumpSumEvent,
} from './types';
import * as math from '../../../../utils/math';

const setDrawdownAges = assign<LifePlanMachineContext, SetAgesDrawdownEvent>(
  (_, { payload: { drawdownStartAge, drawdownEndAge } }): Partial<LifePlanMachineContext> => ({
    drawdownStartAge,
    drawdownEndAge,
  })
);

const setIncome = assign<LifePlanMachineContext, SetIncomeEvent>(
  (ctx, { payload: { annualIncome, monthlyIncome } }) => {
    if (annualIncome !== undefined && monthlyIncome === undefined) {
      const absoluteAnnualIncome = Math.round(Math.abs(annualIncome) * 100) / 100;
      return {
        ...ctx,
        annualIncome: absoluteAnnualIncome,
        monthlyIncome: Math.round((absoluteAnnualIncome / 12) * 100) / 100,
      };
    }
    if (annualIncome === undefined && monthlyIncome !== undefined) {
      const absoluteMonthlyIncome = Math.round(Math.abs(monthlyIncome) * 100) / 100;
      return {
        ...ctx,
        monthlyIncome: absoluteMonthlyIncome,
        annualIncome: Math.round(absoluteMonthlyIncome * 12 * 100) / 100,
      };
    }
    return {};
  }
);

const setLumpSum = assign<LifePlanMachineContext, SetLumpSumEvent>({
  lumpSum: (_, evt) => evt.payload.lumpSum,
});

const setLaterLifeLeftOver = assign<LifePlanMachineContext, SetLaterLifeLeftOverEvent>({
  laterLifeLeftOver: (_, evt) => evt.payload.laterLifeLeftOver,
});

const calculateDrawdownDates = assign<LifePlanMachineContext>(
  ({ userDateOfBirth, drawdownStartAge, drawdownEndAge }) => ({
    drawdownStartDate: calculateDateAfterYears(userDateOfBirth, drawdownStartAge),
    drawdownEndDate: calculateDateAfterYears(userDateOfBirth, drawdownEndAge),
  })
);

const calculateRetirementPotValue = assign<LifePlanMachineContext>({
  retirementPotValue: (ctx) => ctx.targetDrawdownAmount + ctx.laterLifeLeftOver + ctx.lumpSum,
});

const calculateAge = assign<LifePlanMachineContext>({
  clientAge: ({ userDateOfBirth }) => (userDateOfBirth ? calculateAgeToday(userDateOfBirth) : 0),
});

const reEvaluateDrawdownStartAge = assign<LifePlanMachineContext>({
  drawdownStartAge: ({ clientAge, drawdownStartAge }) => Math.max(clientAge, drawdownStartAge),
});

const calculateAnnualNetExpectedReturn = assign<LifePlanMachineContext>({
  annualNetExpectedReturn: ({ expectedReturnOfTAA, fees }) => expectedReturnOfTAA - fees,
});

const calculateMonthlyNetExpectedReturn = assign<LifePlanMachineContext>({
  monthlyNetExpectedReturn: ({ annualNetExpectedReturn }) =>
    math.calculateMonthlyNetExpectedReturn({ annualNetExpectedReturn }),
});

const calculateDrawdownPeriodLength = assign<LifePlanMachineContext>((ctx) => {
  if (ctx.drawdownStartDate && ctx.drawdownEndDate) {
    let drawdownStartDate = new Date(ctx.drawdownStartDate);

    if (ctx.clientAge > ctx.drawdownStartAge) {
      drawdownStartDate = new Date();
    }

    return {
      drawdownPeriodLengthYears: Math.abs(yearDifference(ctx.drawdownEndDate, drawdownStartDate)),
      drawdownPeriodLengthMonths: Math.abs(
        monthDifference(ctx.drawdownEndDate, drawdownStartDate) + 1
      ),
    };
  }
  return ctx;
});

const calculateTargetDrawdownAmount = assign<LifePlanMachineContext>({
  targetDrawdownAmount: (ctx) => ctx.monthlyIncome * ctx.drawdownPeriodLengthMonths,
});

const calculateTomorrowsMoney = assign<LifePlanMachineContext>(
  ({ inflation, drawdownStartDate, annualIncome }) => {
    const timePeriodInYears =
      (drawdownStartDate || new Date()).getFullYear() - new Date().getFullYear();

    const annualIncomeInTomorrowsMoney = Math.round(
      math.calculateAnnualReturnAfterInflation({
        annualIncome,
        inflation,
        timePeriodInYears,
      })
    );
    const monthlyIncomeInTomorrowsMoney = Math.round(annualIncomeInTomorrowsMoney / 12);
    return {
      annualIncomeInTomorrowsMoney,
      monthlyIncomeInTomorrowsMoney,
    };
  }
);

const setErrors = assign<LifePlanMachineContext, SetErrorsEvent>((ctx, evt) => ({
  errors: { ...ctx.errors, ...evt.data },
}));

const resetErrors = assign({ errors: null });

export default ({
  setErrors,
  resetErrors,
  setIncome,
  setLumpSum,
  setDrawdownAges,
  setLaterLifeLeftOver,
  reEvaluateDrawdownStartAge,
  calculateAge,
  calculateDrawdownDates,
  calculateTomorrowsMoney,
  calculateRetirementPotValue,
  calculateTargetDrawdownAmount,
  calculateDrawdownPeriodLength,
  calculateAnnualNetExpectedReturn,
  calculateMonthlyNetExpectedReturn,
} as unknown) as AssignAction<LifePlanMachineContext, LifePlanMachineEvents>;
