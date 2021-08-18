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
  SetLumpSumAmountEvent,
  SetLumpSumAgeEvent,
  PrepopulateContextEvent,
  SetIndexEvent,
  SetIncludeStatePensionEvent,
  SetAdditionalMonthlyContributionsEvent,
  SetUpfrontContributionEvent,
} from './types';
import * as math from '../../../../utils/math';
import * as validators from './validators';

const setIndex = assign<LifePlanMachineContext, SetIndexEvent>((_, { data }) => ({
  index: data.index,
}));

const setDrawdownAges = assign<LifePlanMachineContext, SetAgesDrawdownEvent>(
  (_, { payload: { drawdownStartAge, drawdownEndAge } }): Partial<LifePlanMachineContext> => ({
    drawdownStartAge,
    drawdownEndAge,
  })
);

const setHasFetchedProjections = assign<LifePlanMachineContext, SetIndexEvent>({
  hasFetchedProjections: true,
});

const prepopulate = assign<LifePlanMachineContext, PrepopulateContextEvent>((ctx, { data }) => {
  if (data) {
    return {
      ...data,
      index: data.index,
      monthlyIncome: data.monthlyIncome,
      annualIncome: Math.round(data.monthlyIncome * 12 * 100) / 100,
      drawdownStartAge: data.drawdownStartAge || ctx.drawdownStartAge,
      drawdownEndAge: data.drawdownEndAge || ctx.drawdownEndAge,
      shouldIncludeStatePension: data.shouldIncludeStatePension,
    };
  }
  return {};
});

const setIncome = assign<LifePlanMachineContext, SetIncomeEvent>(
  (ctx, { payload: { annualIncome, monthlyIncome } }) => {
    if (annualIncome !== undefined && monthlyIncome === undefined) {
      const absoluteAnnualIncome = Math.round(Math.abs(annualIncome));
      return {
        ...ctx,
        annualIncome: absoluteAnnualIncome,
        monthlyIncome: Math.round(absoluteAnnualIncome / 12),
      };
    }
    if (annualIncome === undefined && monthlyIncome !== undefined) {
      const absoluteMonthlyIncome = Math.round(Math.abs(monthlyIncome));
      return {
        ...ctx,
        monthlyIncome: absoluteMonthlyIncome,
        annualIncome: absoluteMonthlyIncome * 12,
      };
    }
    return {};
  }
);

const setLumpSumAmount = assign<LifePlanMachineContext, SetLumpSumAmountEvent>({
  lumpSum: (_, evt) => evt.payload.lumpSum,
});

const setLumpSumAge = assign<LifePlanMachineContext, SetLumpSumAgeEvent>({
  lumpSumAge: (_, evt) => evt.payload.lumpSumAge,
});

const calcuateLumpSumDate = assign<LifePlanMachineContext>({
  lumpSumDate: ({ userDateOfBirth, lumpSumAge }) =>
    calculateDateAfterYears(userDateOfBirth, lumpSumAge),
});

const setLaterLifeLeftOver = assign<LifePlanMachineContext, SetLaterLifeLeftOverEvent>({
  laterLifeLeftOver: (_, evt) => evt.payload.laterLifeLeftOver,
});

const setIncludeStatePension = assign<LifePlanMachineContext, SetIncludeStatePensionEvent>({
  shouldIncludeStatePension: (_, evt) => evt.payload.shouldIncludeStatePension,
});

const setAdditionalMonthlyContributions = assign<
  LifePlanMachineContext,
  SetAdditionalMonthlyContributionsEvent
>({
  monthlyContributions: (_, evt) => evt.payload.additionalMonthlyContributions,
  additionalMonthlyContributions: (_, evt) => evt.payload.additionalMonthlyContributions,
});

const setUpfrontContribution = assign<LifePlanMachineContext, SetUpfrontContributionEvent>({
  upfrontContribution: (_, evt) => evt.payload.upfrontContribution,
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
      drawdownPeriodLengthMonths: Math.abs(monthDifference(ctx.drawdownEndDate, drawdownStartDate)),
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

const validateDrawdownAges = assign<LifePlanMachineContext>((ctx) => ({
  errors: { ...ctx.errors, ...validators.validateDrawdownAges(ctx) },
}));

const setErrors = assign<LifePlanMachineContext, SetErrorsEvent>((ctx, evt) => ({
  errors: { ...ctx.errors, ...evt.data },
}));

const resetErrors = assign({ errors: null });

export default ({
  setIndex,
  setErrors,
  setIncome,
  setLumpSumAmount,
  setLumpSumAge,
  setDrawdownAges,
  setLaterLifeLeftOver,
  setIncludeStatePension,
  setAdditionalMonthlyContributions,
  setUpfrontContribution,
  setHasFetchedProjections,
  calculateAge,
  calcuateLumpSumDate,
  calculateDrawdownDates,
  calculateTomorrowsMoney,
  calculateRetirementPotValue,
  calculateTargetDrawdownAmount,
  calculateDrawdownPeriodLength,
  calculateAnnualNetExpectedReturn,
  calculateMonthlyNetExpectedReturn,
  resetErrors,
  prepopulate,
  validateDrawdownAges,
  reEvaluateDrawdownStartAge,
} as unknown) as AssignAction<LifePlanMachineContext, LifePlanMachineEvents>;
